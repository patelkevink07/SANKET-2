from datetime import datetime, timedelta, timezone

from app.services.demographics import (
    infer_language,
    infer_demographics,
    detect_bot_signals,
)


def test_infer_language_detects_hindi_ish_text():
    # Real Hindi text (Devanagari script) should be detected confidently.
    result = infer_language("यह एक परीक्षण संदेश है जो हिंदी में लिखा गया है")
    assert result == "hi"


def test_infer_language_returns_none_for_short_text():
    assert infer_language("ok") is None
    assert infer_language("") is None
    assert infer_language(None) is None


def test_infer_demographics_maps_hindi_to_india_region_low_confidence():
    result = infer_demographics(
        bio_text=None,
        sample_post_text="यह एक परीक्षण संदेश है जो हिंदी में लिखा गया है और काफी लंबा है",
    )
    assert result.inferred_language == "hi"
    assert result.inferred_region == "India"
    assert result.confidence_score == 0.3
    assert result.inferred_age_bracket is None  # never guessed, always None


def test_infer_demographics_no_signal_returns_all_none():
    result = infer_demographics(bio_text=None, sample_post_text=None)
    assert result.inferred_language is None
    assert result.inferred_region is None
    assert result.confidence_score is None


def test_bot_detection_flags_duplicate_content():
    now = datetime.now(timezone.utc)
    # Same message repeated many times = classic spam/bot pattern
    posts = ["Buy now at discount!!"] * 8
    timestamps = [now + timedelta(hours=i) for i in range(8)]

    result = detect_bot_signals(posts, timestamps, has_bio=False)

    assert result.is_bot_suspected is True
    assert result.suspicion_score >= 0.5
    assert any("duplicate" in r for r in result.reasons)


def test_bot_detection_does_not_flag_normal_varied_posting():
    now = datetime.now(timezone.utc)
    posts = [
        "Just had a great meeting about the new project",
        "Weather is lovely today in Bengaluru",
        "Anyone tried the new cafe on MG Road?",
        "Thinking about the semiconductor mission update",
    ]
    timestamps = [now + timedelta(hours=i * 5) for i in range(4)]

    result = detect_bot_signals(posts, timestamps, has_bio=True)

    assert result.is_bot_suspected is False
    assert result.suspicion_score < 0.5


def test_bot_detection_skips_accounts_with_too_little_history():
    result = detect_bot_signals(["one post"], [datetime.now(timezone.utc)], has_bio=True)
    assert result.is_bot_suspected is False
    assert "insufficient" in result.reasons[0]


def test_bot_detection_flags_rapid_regular_posting():
    now = datetime.now(timezone.utc)
    # Posts every 10 seconds, distinct text each time (not caught by duplicate check)
    posts = [f"unique message number {i} with different content" for i in range(6)]
    timestamps = [now + timedelta(seconds=i * 10) for i in range(6)]

    result = detect_bot_signals(posts, timestamps, has_bio=True)

    assert any("s between posts" in r for r in result.reasons)
