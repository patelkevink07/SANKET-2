"""
Demographic inference for authors, scoped honestly to what public post
text can actually support:

- LANGUAGE: real, via langdetect (statistical, offline, no model
  download). This is the one field here with genuine confidence.

- REGION: inferred *only* from detected language, via a small
  language->likely-region lookup (e.g. "hi" -> "India"). This is a
  weak signal on purpose -- language correlates with region but many
  languages span multiple countries/regions, and this says nothing
  about a specific individual. Confidence is capped low (0.3) to
  reflect that honestly rather than presenting it as a fact.

- AGE BRACKET: NOT inferred. There is no defensible signal for age
  from public post text/bio alone without a trained model we don't
  have and haven't validated. Returning a made-up age bracket here
  would be exactly the "confident-looking wrong answer" that's worse
  than not answering. Always returns None with 0 confidence, and
  callers/UI should render that as "insufficient signal", not as a
  bug.

- BOT SUSPICION: real heuristic signals (not ML), each individually
  weak, combined into a suspicion score:
    - near-duplicate content across an author's own posts (spam/bot pattern)
    - missing bio (weak signal alone, contributes little)
    - unusually high post frequency in a short window
  None of these alone should flag an account; the combination crossing
  a threshold does. This will produce false positives/negatives --
  it's a heuristic, not a verdict, and should be presented as such.
"""
from collections import Counter
from dataclasses import dataclass
from datetime import datetime

from langdetect import detect, LangDetectException

# Deliberately small and conservative -- only languages with a fairly
# concentrated speaker base get a region guess at all. Everything else
# stays None rather than guessing.
_LANGUAGE_TO_LIKELY_REGION = {
    "hi": "India",
    "bn": "India/Bangladesh",
    "ta": "India/Sri Lanka",
    "mr": "India",
    "gu": "India",
    "te": "India",
    "kn": "India",
    "pa": "India/Pakistan",
    "ur": "Pakistan/India",
}
_REGION_CONFIDENCE = 0.3  # capped low deliberately -- see module docstring

_BOT_DUPLICATE_THRESHOLD = 0.6   # share of posts that are near-duplicates
_BOT_MIN_POSTS_TO_JUDGE = 3      # don't flag accounts with too little data
_BOT_SUSPICION_SCORE_THRESHOLD = 0.5


@dataclass(frozen=True)
class DemographicResult:
    inferred_language: str | None
    inferred_region: str | None
    confidence_score: float | None   # confidence in the region guess specifically
    inferred_age_bracket: None = None  # always None -- see module docstring


@dataclass(frozen=True)
class BotSuspicionResult:
    is_bot_suspected: bool
    suspicion_score: float
    reasons: list[str]


def infer_language(text: str) -> str | None:
    """Returns an ISO 639-1 code, or None if text is too short/ambiguous."""
    text = (text or "").strip()
    if len(text) < 10:  # langdetect is unreliable on very short strings
        return None
    try:
        return detect(text)
    except LangDetectException:
        return None


def infer_demographics(bio_text: str | None, sample_post_text: str | None) -> DemographicResult:
    """
    Combines whatever text is available (bio first, falls back to a
    sample post) into a single language->region guess. Age is never
    guessed -- see module docstring.
    """
    source_text = bio_text if (bio_text and len(bio_text.strip()) >= 10) else sample_post_text
    lang = infer_language(source_text)

    if lang is None:
        return DemographicResult(inferred_language=None, inferred_region=None, confidence_score=None)

    region = _LANGUAGE_TO_LIKELY_REGION.get(lang)
    confidence = _REGION_CONFIDENCE if region else None

    return DemographicResult(
        inferred_language=lang,
        inferred_region=region,
        confidence_score=confidence,
    )


def _normalize_for_dedup(text: str) -> str:
    return " ".join((text or "").lower().split())


def _duplicate_ratio(post_texts: list[str]) -> float:
    """Fraction of posts that share exact normalized text with at least
    one other post by the same author -- crude but real signal for
    copy-paste/bot posting."""
    if len(post_texts) < 2:
        return 0.0
    normalized = [_normalize_for_dedup(t) for t in post_texts if t and t.strip()]
    if len(normalized) < 2:
        return 0.0
    counts = Counter(normalized)
    duplicated = sum(count for count in counts.values() if count > 1)
    return duplicated / len(normalized)


def detect_bot_signals(
    post_texts: list[str],
    post_timestamps: list[datetime],
    has_bio: bool,
) -> BotSuspicionResult:
    """
    Heuristic only. Each signal is individually weak; this is a
    suspicion score for a human analyst to weigh, not an automated verdict.
    """
    reasons: list[str] = []
    score = 0.0

    if len(post_texts) < _BOT_MIN_POSTS_TO_JUDGE:
        return BotSuspicionResult(is_bot_suspected=False, suspicion_score=0.0, reasons=["insufficient post history"])

    dup_ratio = _duplicate_ratio(post_texts)
    if dup_ratio >= _BOT_DUPLICATE_THRESHOLD:
        score += 0.5
        reasons.append(f"{dup_ratio:.0%} of posts are near-duplicate content")

    if not has_bio:
        score += 0.1
        reasons.append("no bio text")

    if len(post_timestamps) >= _BOT_MIN_POSTS_TO_JUDGE:
        sorted_ts = sorted(post_timestamps)
        gaps = [
            (sorted_ts[i + 1] - sorted_ts[i]).total_seconds()
            for i in range(len(sorted_ts) - 1)
        ]
        if gaps:
            avg_gap = sum(gaps) / len(gaps)
            # Extremely regular, extremely fast posting (avg < 60s apart)
            # is a real bot-posting-schedule signal.
            if avg_gap < 60:
                score += 0.3
                reasons.append(f"average {avg_gap:.0f}s between posts (very regular/fast)")

    score = min(score, 1.0)
    is_suspected = score >= _BOT_SUSPICION_SCORE_THRESHOLD
    if not reasons:
        reasons.append("no suspicious signals detected")

    return BotSuspicionResult(is_bot_suspected=is_suspected, suspicion_score=score, reasons=reasons)
