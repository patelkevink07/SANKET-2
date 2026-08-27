"""
Runs against an in-memory SQLite DB so this suite needs nothing running
locally — no Docker, no Postgres. Production still runs on Postgres
(see docker-compose.yml); this is purely a fast correctness check on
the app logic itself.
"""
import os

os.environ["DATABASE_URL"] = "sqlite:///:memory:"

from sqlalchemy import create_engine
from sqlalchemy.pool import StaticPool
from sqlalchemy.orm import sessionmaker
from fastapi.testclient import TestClient

from app.core.database import Base, get_db
from app.main import app

engine = create_engine(
    "sqlite:///:memory:",
    connect_args={"check_same_thread": False},
    poolclass=StaticPool,
)
TestingSessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
Base.metadata.create_all(bind=engine)


def override_get_db():
    db = TestingSessionLocal()
    try:
        yield db
    finally:
        db.close()


app.dependency_overrides[get_db] = override_get_db
client = TestClient(app)


def test_health():
    resp = client.get("/health")
    assert resp.status_code == 200
    assert resp.json()["status"] == "ok"


def test_ingest_and_list_post():
    payload = {
        "platform": "reddit",
        "platform_post_id": "t3_abc123",
        "author_platform_id": "u_test_user",
        "author_username": "test_user",
        "content": "Real ingested post for the smoke test.",
        "language": "en",
        "posted_at": "2026-08-20T10:00:00Z",
        "like_count": 5,
    }
    resp = client.post("/api/v1/posts", json=payload)
    assert resp.status_code == 201
    body = resp.json()
    assert body["platform"] == "reddit"
    assert body["author"]["username"] == "test_user"

    # Re-ingesting the same platform_post_id should update, not duplicate.
    payload["like_count"] = 12
    resp2 = client.post("/api/v1/posts", json=payload)
    assert resp2.status_code == 201
    assert resp2.json()["id"] == body["id"]

    listed = client.get(
        "/api/v1/posts",
        params={"platform": "reddit", "from": "2026-08-01T00:00:00Z"},
    )
    assert listed.status_code == 200
    assert len(listed.json()) == 1
    assert listed.json()[0]["like_count"] == 12


def test_ingestion_job_lifecycle():
    created = client.post("/api/v1/ingestion/jobs", json={"platform": "reddit"})
    assert created.status_code == 201
    job_id = created.json()["id"]
    assert created.json()["status"] == "running"

    completed = client.patch(
        f"/api/v1/ingestion/jobs/{job_id}/complete",
        params={"records_ingested": 42, "status": "succeeded"},
    )
    assert completed.status_code == 200
    assert completed.json()["records_ingested"] == 42
    assert completed.json()["status"] == "succeeded"
