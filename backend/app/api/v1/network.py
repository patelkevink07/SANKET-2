"""
Network / link-analysis endpoints.

POST /network/build-edges is the "aggregation job" the architecture
doc calls for -- it recomputes the edges table from current posts.
At hackathon/demo data volume this is cheap enough to call on demand;
per the architecture doc's own performance-risk notes, this must
become a scheduled job (not called per-dashboard-load) before this
runs against real ingestion volume. Flagging in code, not hiding it.

GET /network/influencers computes betweenness centrality live from
the edges table. Same scaling caveat applies even more here --
betweenness is the expensive one. Fine now, needs precomputation later.
"""
from typing import Optional

from fastapi import APIRouter, Depends, Query
from sqlalchemy.orm import Session

from app.core.database import get_db
from app.models.models import Post, Author, InteractionEdge
from app.schemas.schemas import (
    NetworkGraphOut, NetworkNodeOut, NetworkEdgeOut,
    InfluencerOut, BuildEdgesResult,
)
from app.services.network import build_edges_from_posts, compute_influencers

router = APIRouter(prefix="/network", tags=["network"])


@router.post("/build-edges", response_model=BuildEdgesResult)
def build_edges(platform: Optional[str] = None, db: Session = Depends(get_db)):
    """
    Rebuilds the edges table from scratch based on current posts'
    reply chains. Full rebuild (not incremental) -- simple and correct
    at this data volume; an incremental version is a clear future
    optimization once ingestion volume makes a full scan too slow.
    """
    query = db.query(Post)
    if platform:
        query = query.filter(Post.platform == platform)
    posts = query.all()

    candidates = build_edges_from_posts(posts)

    db.query(InteractionEdge).delete()
    for candidate in candidates:
        db.add(InteractionEdge(
            source_author_id=candidate.source_author_id,
            target_author_id=candidate.target_author_id,
            interaction_type="reply",
            weight=candidate.weight,
        ))
    db.commit()

    return BuildEdgesResult(edges_created=len(candidates), posts_scanned=len(posts))


@router.get("", response_model=NetworkGraphOut)
def get_graph(platform: Optional[str] = None, db: Session = Depends(get_db)):
    """Returns nodes + edges for the current graph, ready for a force-directed
    graph component on the frontend (e.g. react-force-graph, per the original
    architecture doc)."""
    edges_query = db.query(InteractionEdge)
    edges = edges_query.all()

    author_ids = {e.source_author_id for e in edges} | {e.target_author_id for e in edges}
    authors = db.query(Author).filter(Author.id.in_(author_ids)).all() if author_ids else []

    return NetworkGraphOut(
        nodes=[NetworkNodeOut(author_id=a.id, username=a.username) for a in authors],
        edges=[
            NetworkEdgeOut(
                source_author_id=e.source_author_id,
                target_author_id=e.target_author_id,
                interaction_type=e.interaction_type,
                weight=e.weight,
            )
            for e in edges
        ],
    )


@router.get("/influencers", response_model=list[InfluencerOut])
def get_influencers(limit: int = Query(20, le=100), db: Session = Depends(get_db)):
    edges = db.query(InteractionEdge).all()
    edge_tuples = [(e.source_author_id, e.target_author_id, e.weight) for e in edges]

    scores = compute_influencers(edge_tuples)[:limit]

    author_ids = [s.author_id for s in scores]
    authors = {a.id: a for a in db.query(Author).filter(Author.id.in_(author_ids)).all()}

    return [
        InfluencerOut(
            author_id=s.author_id,
            username=authors[s.author_id].username if s.author_id in authors else None,
            in_degree=s.in_degree,
            betweenness=s.betweenness,
        )
        for s in scores
    ]
