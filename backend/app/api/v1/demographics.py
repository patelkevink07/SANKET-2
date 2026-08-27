"""
Demographics endpoints. Reuses AuthorOut (already has every
demographic field from Phase 1's schema) -- no new schema needed.
"""
from collections import Counter
from typing import Optional

from fastapi import APIRouter, Depends, Query
from sqlalchemy.orm import Session

from app.core.database import get_db
from app.models.models import Author, Post
from app.schemas.schemas import AuthorOut, DemographicInferResult, DemographicSummaryOut
from app.services.demographics import infer_demographics, detect_bot_signals

router = APIRouter(prefix="/demographics", tags=["demographics"])

MAX_INFER_BATCH = 200


@router.post("/infer-pending", response_model=DemographicInferResult)
def infer_pending(
    limit: int = Query(MAX_INFER_BATCH, le=MAX_INFER_BATCH),
    db: Session = Depends(get_db),
):
    """
    Finds authors with no language inferred yet, runs language/region
    inference and bot-suspicion heuristics, writes results back onto
    the author row directly (these are author-level fields, unlike
    sentiment which is per-post).
    """
    authors = (
        db.query(Author)
        .filter(Author.inferred_language.is_(None))
        .limit(limit)
        .all()
    )

    updated = 0
    for author in authors:
        posts = db.query(Post).filter(Post.author_id == author.id).all()
        post_texts = [p.content for p in posts]
        post_timestamps = [p.posted_at for p in posts]
        sample_text = post_texts[0] if post_texts else None

        demo = infer_demographics(author.bio_text, sample_text)
        bot = detect_bot_signals(post_texts, post_timestamps, has_bio=bool(author.bio_text))

        author.inferred_language = demo.inferred_language
        author.inferred_region = demo.inferred_region
        author.confidence_score = demo.confidence_score
        author.inferred_age_bracket = demo.inferred_age_bracket  # always None -- see service docstring
        author.is_bot_suspected = bot.is_bot_suspected
        updated += 1

    db.commit()
    return DemographicInferResult(authors_processed=updated)


@router.get("/summary", response_model=DemographicSummaryOut)
def demographics_summary(
    platform: Optional[str] = None,
    db: Session = Depends(get_db),
):
    """
    Aggregate-only view -- per your PRD's own requirement that
    demographic output stay aggregate, not per-user profiling exposed
    wholesale. Individual author records are still available via
    GET /api/v1/authors/{id} for role-gated analyst lookups (not yet
    built -- flagging as a follow-up, not silently skipped).
    """
    query = db.query(Author)
    if platform:
        query = query.filter(Author.platform == platform)
    authors = query.all()

    total = len(authors)
    language_counts = Counter(a.inferred_language for a in authors if a.inferred_language)
    region_counts = Counter(a.inferred_region for a in authors if a.inferred_region)
    bot_suspected_count = sum(1 for a in authors if a.is_bot_suspected)
    no_signal_count = sum(1 for a in authors if not a.inferred_language)

    return DemographicSummaryOut(
        total_authors=total,
        no_signal_count=no_signal_count,
        bot_suspected_count=bot_suspected_count,
        language_breakdown=dict(language_counts),
        region_breakdown=dict(region_counts),
    )


@router.get("/authors", response_model=list[AuthorOut])
def list_authors_with_demographics(
    platform: Optional[str] = None,
    bot_suspected_only: bool = False,
    limit: int = Query(50, le=200),
    db: Session = Depends(get_db),
):
    query = db.query(Author)
    if platform:
        query = query.filter(Author.platform == platform)
    if bot_suspected_only:
        query = query.filter(Author.is_bot_suspected.is_(True))
    return query.limit(limit).all()
