"""
Tests the scoring LOGIC in app/services/sentiment.py using fake
pipeline callables -- no real Hugging Face model is downloaded or run
here (this sandbox has no network access to reach HF's servers, and
even with access, downloading ~1GB of model weights has no place in a
fast test suite). The real models get exercised when you run the
worker/endpoint on your own machine, which does have internet.
"""
import pytest

from app.services.sentiment import score_text, MODEL_VERSION


def fake_sentiment_pipeline(text: str):
    return [[
        {"label": "positive", "score": 0.82},
        {"label": "neutral", "score": 0.12},
        {"label": "negative", "score": 0.06},
    ]]


def fake_emotion_pipeline(text: str):
    return [[
        {"label": "joy", "score": 0.71},
        {"label": "neutral", "score": 0.20},
        {"label": "surprise", "score": 0.09},
    ]]


def test_picks_highest_confidence_label_each_model():
    result = score_text(
        "This is great news!",
        sentiment_pipeline=fake_sentiment_pipeline,
        emotion_pipeline=fake_emotion_pipeline,
    )
    assert result.polarity_label == "positive"
    assert result.polarity_score == pytest.approx(0.82)
    assert result.emotion_label == "joy"
    assert result.emotion_score == pytest.approx(0.71)
    assert result.model_version == MODEL_VERSION


def test_empty_text_returns_neutral_without_calling_models():
    calls = {"count": 0}

    def should_not_be_called(text: str):
        calls["count"] += 1
        return [[{"label": "positive", "score": 1.0}]]

    result = score_text("   ", sentiment_pipeline=should_not_be_called, emotion_pipeline=should_not_be_called)

    assert result.polarity_label == "neutral"
    assert result.polarity_score == 0.0
    assert result.emotion_label == "neutral"
    assert calls["count"] == 0


def test_handles_flat_list_shape_not_just_nested():
    # Some pipeline configs return [{...}, {...}] instead of [[{...}, {...}]]
    # depending on HF version -- both shapes must work.
    def flat_sentiment(text: str):
        return [
            {"label": "negative", "score": 0.9},
            {"label": "positive", "score": 0.1},
        ]

    def flat_emotion(text: str):
        return [
            {"label": "anger", "score": 0.6},
            {"label": "sadness", "score": 0.4},
        ]

    result = score_text("bad day", sentiment_pipeline=flat_sentiment, emotion_pipeline=flat_emotion)
    assert result.polarity_label == "negative"
    assert result.emotion_label == "anger"


def test_long_text_is_truncated_not_errored():
    long_text = "a" * 5000

    def echo_len_sentiment(text: str):
        # proves truncation happened -- if not truncated, len would be 5000
        assert len(text) <= 2000
        return [[{"label": "neutral", "score": 1.0}]]

    def echo_len_emotion(text: str):
        assert len(text) <= 2000
        return [[{"label": "neutral", "score": 1.0}]]

    result = score_text(long_text, sentiment_pipeline=echo_len_sentiment, emotion_pipeline=echo_len_emotion)
    assert result.polarity_label == "neutral"
