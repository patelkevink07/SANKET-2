from contextlib import asynccontextmanager

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.core.config import settings
from app.core.database import Base, engine
from app.api.v1 import posts, ingestion, sentiment, demographics, network


@asynccontextmanager
async def lifespan(app: FastAPI):
    # Dev-only convenience: creates tables if they don't exist yet.
    # Once this ships to production, switch to Alembic migrations
    # (`alembic upgrade head`) instead of relying on this — create_all
    # doesn't know how to alter existing tables, only create new ones.
    Base.metadata.create_all(bind=engine)
    yield


app = FastAPI(
    title="SANKET API",
    description="Backend for the SANKET social media analytics framework.",
    version="0.1.0",
    lifespan=lifespan,
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.cors_origin_list,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/health")
def health():
    return {"status": "ok", "environment": settings.environment}


app.include_router(posts.router, prefix=settings.api_v1_prefix)
app.include_router(ingestion.router, prefix=settings.api_v1_prefix)
app.include_router(sentiment.router, prefix=settings.api_v1_prefix)
app.include_router(demographics.router, prefix=settings.api_v1_prefix)
app.include_router(network.router, prefix=settings.api_v1_prefix)
