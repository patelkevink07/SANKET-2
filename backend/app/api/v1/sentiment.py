"""
Sentiment endpoints.

Mirrors the posts.py pattern: mandatory-by-default time window, capped
page size, platform filter. One thing that's deliberately different
from posts.py: POST /sentiment/score-pending runs real model inference
inline. That's fine at hackathon/demo data volumes (dozens-hundreds of
posts), but per the architecture doc's own performance-risk notes,
this is exactly the kind of thing that must move to an async worker
(Celery/background job) before this ever runs against real ingestion
volume -- don't let this endpoint's simplicity become a habit.
"""
from datetime import datetime, timedelta, timezone
from typing import Optional

from fastapi import APIRouter, Depends, Query
from sqlalchemy.orm import Session, joinedload

from app.core.database import get_db
from app.models.models import Post, SentimentScore
from app.schemas.schemas import SentimentScoreOut, ScorePendingResult
from app.services.sentiment import score_text

router = APIRouter(prefix="/sentiment", tags=["sentiment"])

MAX_PAGE_SIZE = 200
DEFAULT_WINDOW_DAYS = 7
# Hard cap per trigger call -- scoring is synchronous here, so an
# unbounded batch would hang the request. Call it again to continue.
MAX_SCORE_BATCH = 200


@router.post("/score-pending", response_model=ScorePendingResult)
def score_pending(
    limit: int = Query(MAX_SCORE_BATCH, le=MAX_SCORE_BATCH),
    db: Session = Depends(get_db),
):
    """
    Find posts that don't have a sentiment_scores row yet, score them,
    and write the results. Idempotent by construction -- a post with an
    existing score is never re-selected, so calling this repeatedly is
    safe and just keeps picking up newly-ingested posts.
    """
    already_scored_ids = db.query(SentimentScore.post_id).subquery()
    pending = (
        db.query(Post)
        .filter(Post.id.notin_(already_scored_ids))
        .limit(limit)
        .all()
    )

    scored = 0
    skipped_empty = 0
    for post in pending:
        if not post.content or not post.content.strip():
            skipped_empty += 1
            continue
        result = score_text(post.content)
        db.add(SentimentScore(
            post_id=post.id,
            polarity_label=result.polarity_label,
            polarity_score=result.polarity_score,
            emotion_label=result.emotion_label,
            emotion_score=result.emotion_score,
            model_version=result.model_version,
        ))
        scored += 1

    db.commit()
    return ScorePendingResult(scored=scored, skipped_empty=skipped_empty)


@router.get("", response_model=list[SentimentScoreOut])
def list_sentiment(
    platform: Optional[str] = None,
    posted_from: Optional[datetime] = Query(None, alias="from"),
    posted_to: Optional[datetime] = Query(None, alias="to"),
    limit: int = Query(50, le=MAX_PAGE_SIZE),
    db: Session = Depends(get_db),
):
    """Same windowing discipline as GET /posts -- defaults to last 7 days."""
    if posted_to is None:
        posted_to = datetime.now(timezone.utc)
    if posted_from is None:
        posted_from = posted_to - timedelta(days=DEFAULT_WINDOW_DAYS)

    query = (
        db.query(SentimentScore)
        .join(Post, SentimentScore.post_id == Post.id)
        .options(joinedload(SentimentScore.post))
        .filter(Post.posted_at >= posted_from, Post.posted_at <= posted_to)
    )
    if platform:
        query = query.filter(Post.platform == platform)

    rows = query.order_by(Post.posted_at.desc()).limit(limit).all()

    return [
        SentimentScoreOut(
            post_id=row.post_id,
            platform=row.post.platform,
            posted_at=row.post.posted_at,
            content=row.post.content,
            polarity_label=row.polarity_label,
            polarity_score=row.polarity_score,
            emotion_label=row.emotion_label,
            emotion_score=row.emotion_score,
            model_version=row.model_version,
            computed_at=row.computed_at,
        )
        for row in rows
    ]
