"""
Tests only the pure mapping function — no real Telegram connection.
That's deliberate: message_to_post_payload has zero network calls in
it specifically so it can be tested like this.
"""
from datetime import datetime, timezone
from types import SimpleNamespace

from app.workers.telegram_ingest import message_to_post_payload


def _fake_message(**overrides):
    defaults = dict(
        id=42,
        message="Real Telegram post for testing.",
        date=datetime(2026, 8, 20, 12, 0, 0, tzinfo=timezone.utc),
        forwards=3,
        views=1500,
        replies=SimpleNamespace(replies=7),
    )
    defaults.update(overrides)
    return SimpleNamespace(**defaults)


def test_maps_basic_fields():
    msg = _fake_message()
    payload = message_to_post_payload(msg, "some_channel")

    assert payload["platform"] == "telegram"
    assert payload["platform_post_id"] == "some_channel:42"
    assert payload["author_platform_id"] == "some_channel"
    assert payload["content"] == "Real Telegram post for testing."
    assert payload["share_count"] == 3
    assert payload["comment_count"] == 7
    assert payload["raw_json"]["views"] == 1500


def test_skips_empty_media_only_message():
    msg = _fake_message(message="")
    assert message_to_post_payload(msg, "some_channel") is None

    msg2 = _fake_message(message=None)
    assert message_to_post_payload(msg2, "some_channel") is None


def test_handles_no_replies_or_forwards():
    msg = _fake_message(forwards=None, replies=None)
    payload = message_to_post_payload(msg, "some_channel")
    assert payload["share_count"] == 0
    assert payload["comment_count"] == 0


def test_naive_datetime_gets_utc_attached():
    msg = _fake_message(date=datetime(2026, 8, 20, 12, 0, 0))  # no tzinfo
    payload = message_to_post_payload(msg, "some_channel")
    assert payload["posted_at"].endswith("+00:00")
