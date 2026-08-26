"""
Pydantic contracts for the API boundary. Kept separate from the
SQLAlchemy models on purpose — the DB shape and the API shape are
allowed to diverge (e.g. we never want to accidentally serialize
raw_json wholesale to the frontend without thinking about it).
"""
from datetime import datetime
from typing import Optional

from pydantic import BaseModel, ConfigDict, Field


class AuthorOut(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    id: str
    platform: str
    platform_author_id: str
    username: Optional[str] = None
    bio_text: Optional[str] = None
    follower_count: Optional[int] = None
    is_bot_suspected: bool = False
    inferred_age_bracket: Optional[str] = None
    inferred_region: Optional[str] = None
    inferred_language: Optional[str] = None
    confidence_score: Optional[float] = None


class PostIn(BaseModel):
    """What an ingestion worker sends in to create a post."""
    platform: str
    platform_post_id: str

    # Author fields are flattened here so a single ingestion call can
    # upsert both the post and its author in one request — ingestion
    # workers shouldn't need two round trips per post.
    author_platform_id: str
    author_username: Optional[str] = None
    author_bio: Optional[str] = None
    author_follower_count: Optional[int] = None

    content: str
    language: Optional[str] = None
    posted_at: datetime
    like_count: int = 0
    share_count: int = 0
    comment_count: int = 0
    raw_json: Optional[dict] = None


class PostOut(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    id: str
    platform: str
    platform_post_id: str
    author: AuthorOut
    content: str
    language: Optional[str] = None
    posted_at: datetime
    ingested_at: datetime
    like_count: int
    share_count: int
    comment_count: int


class IngestionJobOut(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    id: str
    platform: str
    status: str
    records_ingested: int
    started_at: datetime
    completed_at: Optional[datetime] = None
    error: Optional[str] = None


class IngestionJobCreate(BaseModel):
    platform: str = Field(..., description="e.g. 'reddit', 'telegram'")
