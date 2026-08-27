"""
Phase 1 schema: just enough to land real ingested posts and track
ingestion job status. sentiment_scores and edges tables are added in
Phase 2/5 once there's actual sentiment/network logic to store —
no point defining tables for computations that don't exist yet.
"""
import uuid
from datetime import datetime, timezone

from sqlalchemy import (
    Column, String, Text, Integer, Float, Boolean, DateTime, JSON,
    ForeignKey, UniqueConstraint, Index,
)
from sqlalchemy.orm import relationship

from app.core.database import Base


def _uuid():
    return str(uuid.uuid4())


def _now():
    return datetime.now(timezone.utc)


class Author(Base):
    __tablename__ = "authors"
    __table_args__ = (
        UniqueConstraint("platform", "platform_author_id", name="uq_author_platform_id"),
    )

    id = Column(String(36), primary_key=True, default=_uuid)
    platform = Column(String(32), nullable=False)
    platform_author_id = Column(String(128), nullable=False)
    username = Column(String(255))
    bio_text = Column(Text)
    follower_count = Column(Integer)
    is_bot_suspected = Column(Boolean, default=False)

    # Nullable + confidence score: never assert a demographic fact the
    # model isn't confident about. See PRD edge case on low-confidence users.
    inferred_age_bracket = Column(String(32))
    inferred_region = Column(String(128))
    inferred_language = Column(String(64))
    confidence_score = Column(Float)

    created_at = Column(DateTime(timezone=True), default=_now)

    posts = relationship("Post", back_populates="author")


class Post(Base):
    __tablename__ = "posts"
    __table_args__ = (
        UniqueConstraint("platform", "platform_post_id", name="uq_post_platform_id"),
        Index("ix_posts_posted_at", "posted_at"),
    )

    id = Column(String(36), primary_key=True, default=_uuid)
    platform = Column(String(32), nullable=False)
    platform_post_id = Column(String(128), nullable=False)
    author_id = Column(String(36), ForeignKey("authors.id"), nullable=False)

    content = Column(Text, nullable=False)
    language = Column(String(16))

    posted_at = Column(DateTime(timezone=True), nullable=False)
    ingested_at = Column(DateTime(timezone=True), default=_now)

    like_count = Column(Integer, default=0)
    share_count = Column(Integer, default=0)
    comment_count = Column(Integer, default=0)

    # Platform-specific fields that don't warrant a dedicated column yet
    # (Reddit's score/upvote_ratio, Telegram's forward count, etc.)
    raw_json = Column(JSON)

    author = relationship("Author", back_populates="posts")


class IngestionJob(Base):
    __tablename__ = "ingestion_jobs"

    id = Column(String(36), primary_key=True, default=_uuid)
    platform = Column(String(32), nullable=False)
    status = Column(String(32), nullable=False, default="pending")
    # pending -> running -> succeeded | failed | rate_limited

    records_ingested = Column(Integer, default=0)
    started_at = Column(DateTime(timezone=True), default=_now)
    completed_at = Column(DateTime(timezone=True))
    error = Column(Text)

class SentimentScore(Base):
    __tablename__ = "sentiment_scores"
    __table_args__ = (
        UniqueConstraint("post_id", name="uq_sentiment_post_id"),
    )

    id = Column(String(36), primary_key=True, default=_uuid)
    post_id = Column(String(36), ForeignKey("posts.id"), nullable=False)
    polarity_label = Column(String(16), nullable=False)   # positive | neutral | negative
    polarity_score = Column(Float, nullable=False)
    emotion_label = Column(String(16), nullable=False)    # joy | anger | fear | sadness | surprise | disgust | neutral
    emotion_score = Column(Float, nullable=False)
    model_version = Column(String(128), nullable=False)
    computed_at = Column(DateTime(timezone=True), default=_now)

    post = relationship("Post", backref="sentiment_score", uselist=False)

class InteractionEdge(Base):
    __tablename__ = "edges"
    __table_args__ = (
        UniqueConstraint("source_author_id", "target_author_id", "interaction_type",
                          name="uq_edge_source_target_type"),
    )

    id = Column(String(36), primary_key=True, default=_uuid)
    source_author_id = Column(String(36), ForeignKey("authors.id"), nullable=False)
    target_author_id = Column(String(36), ForeignKey("authors.id"), nullable=False)
    interaction_type = Column(String(32), nullable=False, default="reply")
    weight = Column(Integer, nullable=False, default=1)
    observed_at = Column(DateTime(timezone=True), default=_now)
