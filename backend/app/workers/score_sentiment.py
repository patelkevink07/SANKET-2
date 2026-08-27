"""
CLI convenience wrapper around POST /api/v1/sentiment/score-pending.

Goes through the real API (same principle as telegram_ingest.py going
through POST /api/v1/posts) rather than talking to the DB directly, so
this exercises the same code path the frontend or any other caller
would use, and stays a thin script rather than a second place business
logic could drift.

Usage (from backend/, with the server already running in another terminal):
    python -m app.workers.score_sentiment
    python -m app.workers.score_sentiment --api-url http://127.0.0.1:8000
"""
import argparse
import sys

import httpx


def run(api_url: str) -> None:
    endpoint = f"{api_url.rstrip('/')}/api/v1/sentiment/score-pending"
    total_scored = 0

    with httpx.Client(timeout=120.0) as client:
        while True:
            resp = client.post(endpoint)
            resp.raise_for_status()
            data = resp.json()
            scored = data["scored"]
            skipped = data["skipped_empty"]
            total_scored += scored
            print(f"Batch: scored {scored}, skipped {skipped} empty posts")
            if scored == 0:
                break

    print(f"Done. Total newly scored: {total_scored}")


def main():
    parser = argparse.ArgumentParser(description="Score all pending posts for sentiment.")
    parser.add_argument("--api-url", default="http://127.0.0.1:8000")
    args = parser.parse_args()
    try:
        run(args.api_url)
    except httpx.ConnectError:
        print(
            f"Could not reach {args.api_url} -- is the server running "
            "(uvicorn app.main:app --reload) in another terminal?",
            file=sys.stderr,
        )
        sys.exit(1)


if __name__ == "__main__":
    main()
