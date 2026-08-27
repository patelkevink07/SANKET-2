"""
Checks whether a Telegram channel has a linked discussion group --
that's where actual reply/interaction data would live (channels
themselves are broadcast-only, no replies between followers).

Usage:
    python check_discussion.py legend_of_trading
"""
import asyncio
import sys

from telethon import TelegramClient
from telethon.tl.functions.channels import GetFullChannelRequest

from app.core.config import settings


async def main(channel_username: str):
    client = TelegramClient(
        "sanket_telegram_session",  # same session file telegram_ingest.py already created
        settings.telegram_api_id,
        settings.telegram_api_hash,
    )
    async with client:
        entity = await client.get_entity(channel_username)
        full = await client(GetFullChannelRequest(entity))

        linked_id = full.full_chat.linked_chat_id
        if linked_id:
            linked_entity = await client.get_entity(linked_id)
            print(f"YES -- '{channel_username}' has a linked discussion group:")
            print(f"  Title: {linked_entity.title}")
            print(f"  Username: @{linked_entity.username}" if linked_entity.username else "  (no public username -- private group)")
            print(f"\nUse this for network analysis: --channel {linked_entity.username or linked_id}")
        else:
            print(f"NO -- '{channel_username}' has no linked discussion group.")
            print("This channel is broadcast-only; no reply/interaction data exists here.")


if __name__ == "__main__":
    if len(sys.argv) != 2:
        print("Usage: python check_discussion.py <channel_username>")
        sys.exit(1)
    asyncio.run(main(sys.argv[1]))