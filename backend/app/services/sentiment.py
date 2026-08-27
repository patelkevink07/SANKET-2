"""
Real sentiment/emotion inference, replacing the mock SentimentScore
fields from the original frontend prototype.

Two models, loaded lazily (only on first real use, not at import time,
so tests and `python -m app.main` don't pay a multi-second model-load
cost just for importing this module):

- Polarity: cardiffnlp/twitter-xlm-roberta-base-sentiment-multilingual
  Trained on social-media text across many languages, including
  code-mixed content reasonably well. Labels: negative / neutral / positive.

- Emotion: j-hartmann/emotion-english-distilroberta-base
  Labels: anger, disgust, fear, joy, neutral, sadness, surprise.
  HONEST LIMITATION: this one is English-only. For Hindi/Hinglish text
  it will still return a label + confidence, but that confidence is
  less trustworthy on non-English input. Good enough to ship as v1;
  swapping in a proper multilingual emotion model is a clean upgrade
  later without changing this function's interface.

model_version returned by score_text() should be persisted alongside
every score row -- if the models here are ever upgraded/swapped, old
rows stay honestly attributable to the model that actually produced them.
"""
from dataclasses import dataclass
from functools import lru_cache
from typing import Protocol

MODEL_VERSION = "cardiffnlp-xlm-r-sentiment-multilingual+j-hartmann-emotion-en-v1"

_SENTIMENT_MODEL_NAME = "cardiffnlp/twitter-xlm-roberta-base-sentiment-multilingual"
_EMOTION_MODEL_NAME = "j-hartmann/emotion-english-distilroberta-base"

# Cap input length -- these are transformer models with a token limit,
# and social posts are short anyway. Truncate rather than error.
_MAX_CHARS = 2000


@dataclass(frozen=True)
class SentimentResult:
    polarity_label: str      # "positive" | "neutral" | "negative"
    polarity_score: float    # model confidence, 0-1
    emotion_label: str       # "joy" | "anger" | "fear" | "sadness" | "surprise" | "disgust" | "neutral"
    emotion_score: float     # model confidence, 0-1
    model_version: str


class Scorer(Protocol):
    """Structural type so tests can pass a fake without touching HF at all."""
    def __call__(self, text: str) -> list[dict]: ...


@lru_cache(maxsize=1)
def _get_sentiment_pipeline():
    from transformers import pipeline
    return pipeline(
        "sentiment-analysis",
        model=_SENTIMENT_MODEL_NAME,
        top_k=None,
    )


@lru_cache(maxsize=1)
def _get_emotion_pipeline():
    from transformers import pipeline
    return pipeline(
        "text-classification",
        model=_EMOTION_MODEL_NAME,
        top_k=None,
    )


def _top_label(scores: list[dict]) -> tuple[str, float]:
    """HF pipelines with top_k=None return every label's score, unsorted.
    Pick the highest-confidence one."""
    best = max(scores, key=lambda item: item["score"])
    return best["label"].lower(), float(best["score"])


def score_text(
    text: str,
    sentiment_pipeline: Scorer | None = None,
    emotion_pipeline: Scorer | None = None,
) -> SentimentResult:
    """
    Run both models over one piece of text and return a single result.

    sentiment_pipeline / emotion_pipeline are injectable purely for
    testing -- pass a fake callable to test this function's logic
    without downloading or running any real model. Production callers
    (the worker, the API) call this with no arguments and get the real
    lazy-loaded HF pipelines.
    """
    text = (text or "").strip()[:_MAX_CHARS]
    if not text:
        return SentimentResult("neutral", 0.0, "neutral", 0.0, MODEL_VERSION)

    sentiment_fn = sentiment_pipeline or _get_sentiment_pipeline()
    emotion_fn = emotion_pipeline or _get_emotion_pipeline()

    raw_sentiment = sentiment_fn(text)
    raw_emotion = emotion_fn(text)

    # HF pipelines nest one extra list level when called on a single
    # string with top_k=None: [[{...}, {...}, ...]]. Handle both shapes
    # so fakes in tests can be written either way without surprises.
    if raw_sentiment and isinstance(raw_sentiment[0], list):
        raw_sentiment = raw_sentiment[0]
    if raw_emotion and isinstance(raw_emotion[0], list):
        raw_emotion = raw_emotion[0]

    polarity_label, polarity_score = _top_label(raw_sentiment)
    emotion_label, emotion_score = _top_label(raw_emotion)

    return SentimentResult(
        polarity_label=polarity_label,
        polarity_score=polarity_score,
        emotion_label=emotion_label,
        emotion_score=emotion_score,
        model_version=MODEL_VERSION,
    )
