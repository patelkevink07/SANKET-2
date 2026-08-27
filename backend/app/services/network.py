"""
Network / link analysis, built from real reply-chain data captured by
the fixed telegram_ingest.py (each post's raw_json.reply_to_message_id
points at the parent post, when the message was a reply).

Scope, honestly: this only sees REPLY relationships right now, because
that's the interaction type the ingestion worker currently captures.
Mentions and forwards would need their own extraction logic (parsing
@usernames from text for mentions; Telegram forwards already partially
tracked via message.forwards as a raw count, not a graph edge yet) --
noted as a clear follow-up, not silently absent.

Two pure, DB-agnostic functions here so the graph-building and
centrality math can be unit tested without a real database or a real
NetworkX-shaped fixture beyond simple tuples.
"""
from collections import Counter
from dataclasses import dataclass
from typing import Protocol


class PostLike(Protocol):
    """Structural type -- any object with these attributes works,
    so tests can pass plain objects instead of real SQLAlchemy rows."""
    platform_post_id: str
    author_id: str
    raw_json: dict | None


@dataclass(frozen=True)
class EdgeCandidate:
    source_author_id: str   # the person who replied
    target_author_id: str   # the person being replied to
    weight: int


@dataclass(frozen=True)
class InfluencerScore:
    author_id: str
    in_degree: int            # raw count of replies received -- simple, interpretable
    betweenness: float        # NetworkX betweenness centrality -- who bridges separate clusters


def build_edges_from_posts(posts: list[PostLike]) -> list[EdgeCandidate]:
    """
    Walks every post; for each one that's a reply (per raw_json),
    resolves the parent post's author and counts a source->target
    reply edge. Self-replies are skipped (not a real interaction).
    Parent posts outside the ingested set (e.g. beyond --limit) are
    silently skipped too -- there's no author to attribute the edge to.
    """
    post_by_platform_id = {p.platform_post_id: p for p in posts}
    edge_counts: Counter[tuple[str, str]] = Counter()

    for post in posts:
        raw = post.raw_json or {}
        reply_to_id = raw.get("reply_to_message_id")
        if not reply_to_id:
            continue

        parent = post_by_platform_id.get(reply_to_id)
        if parent is None:
            continue  # parent wasn't ingested (outside limit window)

        if parent.author_id == post.author_id:
            continue  # replying to yourself isn't a social interaction

        edge_counts[(post.author_id, parent.author_id)] += 1

    return [
        EdgeCandidate(source_author_id=src, target_author_id=tgt, weight=w)
        for (src, tgt), w in edge_counts.items()
    ]


def compute_influencers(edges: list[tuple[str, str, int]]) -> list[InfluencerScore]:
    """
    edges: list of (source_author_id, target_author_id, weight) tuples.

    in_degree: simple count of (weighted) replies received -- who gets
    talked to the most. Easy for an analyst to sanity-check by eye.

    betweenness centrality: identifies bridge nodes -- people who
    connect otherwise-separate parts of the conversation, per the
    PRD's "identify high-influence nodes / KOLs" requirement. This is
    the expensive-at-scale computation flagged in the architecture
    doc's performance risks -- fine at hackathon/demo volume (dozens
    to low hundreds of nodes), must move to a scheduled precomputation
    job before this runs against real ingestion volume.
    """
    import networkx as nx

    graph = nx.DiGraph()
    for source, target, weight in edges:
        if graph.has_edge(source, target):
            graph[source][target]["weight"] += weight
        else:
            graph.add_edge(source, target, weight=weight)

    if graph.number_of_nodes() == 0:
        return []

    betweenness = nx.betweenness_centrality(graph, weight="weight")
    in_degrees = dict(graph.in_degree(weight="weight"))

    all_nodes = set(graph.nodes())
    return sorted(
        [
            InfluencerScore(
                author_id=node,
                in_degree=int(in_degrees.get(node, 0)),
                betweenness=betweenness.get(node, 0.0),
            )
            for node in all_nodes
        ],
        key=lambda s: (s.in_degree, s.betweenness),
        reverse=True,
    )
