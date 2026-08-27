"""
Telegram ingestion worker.

FIXED from the original version: the original always set the CHANNEL's
own name as every message's author -- correct for broadcast channels
(where that's genuinely true), wrong for groups (where every message
has its own real sender). This version resolves the real per-message
sender via Telethon's message.get_sender(), which is what makes
network/link analysis (who talks to whom) possible at all. For a pure
broadcast channel this now correctly still attributes everything to
one author -- nothing breaks for that case, it's strictly more correct.

Reads PUBLIC groups/channels only. Never point this at anything you
don't have a legitimate, consenting reason to read.

Run locally (not inside a container the first time) because Telethon's
first login is interactive: it'll ask for your phone number, then a
login code sent via Telegram, then a 2FA password if you have one set.
After that first run, it saves a local session file so you don't have
to log in again.

Usage:
    python -m app.workers.telegram_ingest --channel some_group_or_channel --limit 200
"""
import argparse
import asyncio
from datetime import datetime, timezone
from typing import Optional

import httpx
from telethon import TelegramClient
from telethon.tl.types import Message, User, Channel as TelethonChannel

from app.core.config import settings

SESSION_NAME = "sanket_telegram_session"  # local file -- never commit this


def extract_sender_info(sender, fallback_id: str) -> dict:
    """
    Pure function, testable with fake sender objects (no real Telethon
    connection needed). Handles the three cases Telethon can hand back:
      - a real User (normal group member) -> use their id + name
      - a Channel (anonymous-admin post, or the channel itself in a
        broadcast channel) -> use the channel's own id + title
      - None (sender info unavailable / deleted account) -> fall back
        to the channel/group identifier so ingestion doesn't crash,
        but this case should be rare and is worth watching for.
    """
    if sender is None:
        return {"platform_author_id": fallback_id, "username": fallback_id, "display_name": None}

    platform_author_id = str(getattr(sender, "id", fallback_id))

    username = getattr(sender, "username", None)
    if isinstance(sender, User) or hasattr(sender, "first_name"):
        display_name = " ".join(
            part for part in [getattr(sender, "first_name", None), getattr(sender, "last_name", None)] if part
        ) or None
    else:
        display_name = getattr(sender, "title", None)

    return {
        "platform_author_id": platform_author_id,
        "username": username or display_name or platform_author_id,
        "display_name": display_name,
    }


def message_to_post_payload(message: Message, channel_username: str, sender_info: dict) -> Optional[dict]:
    """
    Pure mapping function, kept separate from any network call so it's
    testable without a real Telegram connection. Returns None for
    messages with no text content (pure media/sticker posts) -- nothing
    for the sentiment/trend pipeline to work with there anyway.
    """
    text = (getattr(message, "message", None) or "").strip()
    if not text:
        return None

    posted_at = message.date
    if posted_at.tzinfo is None:
        posted_at = posted_at.replace(tzinfo=timezone.utc)

    reply_to = getattr(message, "reply_to", None)
    reply_to_msg_id = getattr(reply_to, "reply_to_msg_id", None) if reply_to else None

    return {
        "platform": "telegram",
        # channel id alone isn't globally unique across channels, so the
        # dedup key combines channel + message id.
        "platform_post_id": f"{channel_username}:{message.id}",
        "author_platform_id": sender_info["platform_author_id"],
        "author_username": sender_info["username"],
        "content": text,
        "language": None,  # left for the sentiment/NLP stage to infer later
        "posted_at": posted_at.isoformat(),
        "like_count": 0,  # Telegram reactions are a separate, richer
                          # structure -- left at 0 until that's worth modeling
        "share_count": getattr(message, "forwards", None) or 0,
        "comment_count": (
            message.replies.replies if getattr(message, "replies", None) else 0
        ),
        "raw_json": {
            "views": getattr(message, "views", None),
            "channel": channel_username,
            # Needed to build the interaction graph later: which message
            # (and therefore which author, once resolved) this one replied to.
            "reply_to_message_id": (
                f"{channel_username}:{reply_to_msg_id}" if reply_to_msg_id else None
            ),
        },
    }


async def ingest_channel(
    channel: str,
    limit: int,
    api_base: str,
    api_id: int,
    api_hash: str,
) -> None:
    http = httpx.Client(base_url=api_base, timeout=30.0)

    job_resp = http.post("/ingestion/jobs", json={"platform": "telegram"})
    job_resp.raise_for_status()
    job_id = job_resp.json()["id"]
    print(f"Started ingestion job {job_id} for channel '{channel}'")

    ingested = 0
    error_text = None
    distinct_senders = set()

    try:
        async with TelegramClient(SESSION_NAME, api_id, api_hash) as client:
            async for message in client.iter_messages(channel, limit=limit):
                sender = await message.get_sender()
                sender_info = extract_sender_info(sender, fallback_id=channel)
                distinct_senders.add(sender_info["platform_author_id"])

                payload = message_to_post_payload(message, channel, sender_info)
                if payload is None:
                    continue

                resp = http.post("/posts", json=payload)
                if resp.status_code == 201:
                    ingested += 1
                else:
                    print(f"  skipped message {message.id}: {resp.status_code} {resp.text[:200]}")
    except Exception as exc:  # noqa: BLE001 -- surfaced into the job record below
        error_text = str(exc)
        print(f"Ingestion error: {error_text}")

    status = "failed" if error_text else "succeeded"
    http.patch(
        f"/ingestion/jobs/{job_id}/complete",
        params={
            "records_ingested": ingested,
            "status": status,
            **({"error": error_text} if error_text else {}),
        },
    )
    print(f"Job {job_id} {status} -- {ingested} posts ingested, {len(distinct_senders)} distinct senders")


def main():
    parser = argparse.ArgumentParser(description="Ingest a public Telegram group/channel into SANKET")
    parser.add_argument("--channel", required=True, help="Public group/channel username, e.g. bbcnews")
    parser.add_argument("--limit", type=int, default=200)
    parser.add_argument("--api-base", default="http://localhost:8000/api/v1")
    args = parser.parse_args()

    if not settings.telegram_api_id or not settings.telegram_api_hash:
        raise SystemExit(
            "TELEGRAM_API_ID / TELEGRAM_API_HASH are not set. "
            "Add them to backend/.env before running this."
        )

    asyncio.run(
        ingest_channel(
            channel=args.channel,
            limit=args.limit,
            api_base=args.api_base,
            api_id=int(settings.telegram_api_id),
            api_hash=settings.telegram_api_hash,
        )
    )


if __name__ == "__main__":
    main()