from dataclasses import dataclass

from app.services.network import build_edges_from_posts, compute_influencers


@dataclass
class FakePost:
    platform_post_id: str
    author_id: str
    raw_json: dict


def test_builds_edges_from_reply_chains():
    posts = [
        FakePost("g:1", "alice", {}),
        FakePost("g:2", "bob", {"reply_to_message_id": "g:1"}),
        FakePost("g:3", "carol", {"reply_to_message_id": "g:1"}),
        FakePost("g:4", "dave", {"reply_to_message_id": "g:2"}),
    ]
    edges = build_edges_from_posts(posts)
    edge_set = {(e.source_author_id, e.target_author_id): e.weight for e in edges}

    assert edge_set == {
        ("bob", "alice"): 1,
        ("carol", "alice"): 1,
        ("dave", "bob"): 1,
    }


def test_repeated_replies_increase_weight():
    posts = [
        FakePost("g:1", "alice", {}),
        FakePost("g:2", "bob", {"reply_to_message_id": "g:1"}),
        FakePost("g:3", "bob", {"reply_to_message_id": "g:1"}),
        FakePost("g:4", "bob", {"reply_to_message_id": "g:1"}),
    ]
    edges = build_edges_from_posts(posts)
    assert len(edges) == 1
    assert edges[0].source_author_id == "bob"
    assert edges[0].target_author_id == "alice"
    assert edges[0].weight == 3


def test_self_replies_are_excluded():
    posts = [
        FakePost("g:1", "eve", {}),
        FakePost("g:2", "eve", {"reply_to_message_id": "g:1"}),
    ]
    assert build_edges_from_posts(posts) == []


def test_reply_to_unseen_parent_is_skipped_safely():
    posts = [FakePost("g:1", "frank", {"reply_to_message_id": "g:999"})]
    assert build_edges_from_posts(posts) == []


def test_posts_with_no_reply_produce_no_edges():
    posts = [FakePost("g:1", "alice", {}), FakePost("g:2", "bob", {})]
    assert build_edges_from_posts(posts) == []


def test_compute_influencers_ranks_by_in_degree_then_betweenness():
    edges = [("bob", "alice", 1), ("carol", "alice", 1), ("dave", "bob", 1), ("alice", "bob", 1)]
    scores = compute_influencers(edges)

    # alice and bob are legitimately tied at in_degree=2 (verified against
    # real NetworkX during development) -- both should be ranked above
    # carol/dave, who received zero replies.
    top_two = {scores[0].author_id, scores[1].author_id}
    assert top_two == {"alice", "bob"}
    assert scores[0].in_degree == 2
    assert scores[1].in_degree == 2
    assert scores[2].in_degree == 0
    assert scores[3].in_degree == 0


def test_compute_influencers_handles_empty_graph():
    assert compute_influencers([]) == []
