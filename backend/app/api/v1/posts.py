from datetime import datetime, timedelta, timezone
from typing import Optional

from fastapi import APIRouter, Depends, HTTPException, Query
from sqlalchemy.orm import Session, joinedload

from app.core.database import get_db
from app.models.models import Post, Author
from app.schemas.schemas import PostIn, PostOut

router = APIRouter(prefix="/posts", tags=["posts"])

# Hard cap regardless of what the caller asks for — see performance
# risk notes: unbounded scans are the fastest way to make this app slow.
MAX_PAGE_SIZE = 200
DEFAULT_WINDOW_DAYS = 7


@router.post("", response_model=PostOut, status_code=201)
def ingest_post(payload: PostIn, db: Session = Depends(get_db)):
    """
    Upsert a single post (and its author). This is the one door every
    ingestion worker — Reddit, Telegram, whatever comes next — writes
    through, so validation and dedup logic lives in exactly one place.
    """
    author = (
        db.query(Author)
        .filter(
            Author.platform == payload.platform,
            Author.platform_author_id == payload.author_platform_id,
        )
        .first()
    )
    if author is None:
        author = Author(
            platform=payload.platform,
            platform_author_id=payload.author_platform_id,
            username=payload.author_username,
            bio_text=payload.author_bio,
            follower_count=payload.author_follower_count,
        )
        db.add(author)
        db.flush()  # assigns author.id without committing yet
    else:
        # Keep follower count / bio fresh on repeat sightings of the
        # same author rather than only ever writing it once.
        if payload.author_username:
            author.username = payload.author_username
        if payload.author_bio:
            author.bio_text = payload.author_bio
        if payload.author_follower_count is not None:
            author.follower_count = payload.author_follower_count

    existing = (
        db.query(Post)
        .filter(
            Post.platform == payload.platform,
            Post.platform_post_id == payload.platform_post_id,
        )
        .first()
    )
    if existing:
        # Idempotent: re-ingesting the same post (e.g. a retry after a
        # rate-limit failure) updates engagement counts, doesn't duplicate.
        existing.like_count = payload.like_count
        existing.share_count = payload.share_count
        existing.comment_count = payload.comment_count
        db.commit()
        db.refresh(existing)
        return existing

    post = Post(
        platform=payload.platform,
        platform_post_id=payload.platform_post_id,
        author_id=author.id,
        content=payload.content,
        language=payload.language,
        posted_at=payload.posted_at,
        like_count=payload.like_count,
        share_count=payload.share_count,
        comment_count=payload.comment_count,
        raw_json=payload.raw_json,
    )
    db.add(post)
    db.commit()
    db.refresh(post)
    return post


@router.get("", response_model=list[PostOut])
def list_posts(
    platform: Optional[str] = None,
    posted_from: Optional[datetime] = Query(None, alias="from"),
    posted_to: Optional[datetime] = Query(None, alias="to"),
    limit: int = Query(50, le=MAX_PAGE_SIZE),
    db: Session = Depends(get_db),
):
    """
    Defaults to the last 7 days if no window is given — never scans the
    whole table by accident. Widen the window explicitly if you need to.
    """
    if posted_to is None:
        posted_to = datetime.now(timezone.utc)
    if posted_from is None:
        posted_from = posted_to - timedelta(days=DEFAULT_WINDOW_DAYS)

    query = (
        db.query(Post)
        .options(joinedload(Post.author))
        .filter(Post.posted_at >= posted_from, Post.posted_at <= posted_to)
    )
    if platform:
        query = query.filter(Post.platform == platform)

    return query.order_by(Post.posted_at.desc()).limit(limit).all()


@router.get("/{post_id}", response_model=PostOut)
def get_post(post_id: str, db: Session = Depends(get_db)):
    post = (
        db.query(Post)
        .options(joinedload(Post.author))
        .filter(Post.id == post_id)
        .first()
    )
    if not post:
        raise HTTPException(status_code=404, detail="Post not found")
    return post
