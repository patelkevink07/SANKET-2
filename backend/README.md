# SANKET backend — Phase 1 skeleton

FastAPI + PostgreSQL. This is deliberately minimal: three tables
(`authors`, `posts`, `ingestion_jobs`), one door for ingestion workers
to write through (`POST /api/v1/posts`), and job tracking so ingestion
runs are debuggable instead of invisible.

`sentiment_scores` and `edges` tables aren't here yet — they get added
in Phase 2 (sentiment) and Phase 5 (network analysis), once there's
real logic to populate them.

## Run it locally

```bash
cd backend
cp .env.example .env
docker compose up --build
```

- API: http://localhost:8000
- Interactive docs (auto-generated from the Pydantic schemas): http://localhost:8000/docs
- Postgres: localhost:5432 (user/pass/db all `sanket` — see `.env.example`)

Tables are created automatically on startup in dev. Once this is a
real deployed system, switch to `alembic upgrade head` instead of
relying on `create_all` — it can only create tables, not alter them.

## Run tests (no Docker/Postgres needed)

```bash
pip install -r requirements.txt
pytest tests/ -v
```

The test suite runs against an in-memory SQLite DB so it's fast and
needs nothing running — it's checking app logic, not your Postgres
setup.

## What exists right now

- `POST /api/v1/posts` — upsert a post (and its author). This is the
  endpoint every ingestion worker (Reddit next, then Telegram) writes
  through. Idempotent: re-posting the same `platform` + `platform_post_id`
  updates engagement counts instead of duplicating the row.
- `GET /api/v1/posts` — list posts, filterable by `platform`, `from`,
  `to`. Defaults to the last 7 days if no window is given — this is
  deliberate, see the architecture notes on unbounded time-range
  queries as a performance risk.
- `POST /api/v1/ingestion/jobs`, `PATCH /api/v1/ingestion/jobs/{id}/complete`,
  `GET /api/v1/ingestion/jobs` — job lifecycle tracking for ingestion runs.

## What's next

Phase 2: a real ingestion worker (Reddit via PRAW) that calls
`POST /api/v1/ingestion/jobs` at the start of a run, `POST /api/v1/posts`
for each post it pulls, and `PATCH /api/v1/ingestion/jobs/{id}/complete`
when done.
