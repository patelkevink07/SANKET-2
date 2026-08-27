"""
Quick check: how many distinct authors are in the ingested posts for
a platform, and how are posts distributed across them? This tells us
whether there's real multi-person data to build a network graph from,
or if it's effectively one account broadcasting (channel-like, even
if Telegram calls it a "group").

Usage (run from backend/, server does NOT need to be running --
this reads the DB directly):
    python check_author_diversity.py
"""
from collections import Counter

from app.core.database import SessionLocal
from app.models.models import Post, Author

db = SessionLocal()
try:
    posts = db.query(Post).all()
    if not posts:
        print("No posts found in the database.")
    else:
        author_counts = Counter(p.author_id for p in posts)
        total_posts = len(posts)
        total_authors = len(author_counts)

        print(f"Total posts: {total_posts}")
        print(f"Distinct authors: {total_authors}")
        print()

        for author_id, count in author_counts.most_common(10):
            author = db.query(Author).filter(Author.id == author_id).first()
            name = author.username if author and author.username else author_id
            pct = (count / total_posts) * 100
            print(f"  {name}: {count} posts ({pct:.0f}%)")

        print()
        if total_authors == 1:
            print("VERDICT: Only 1 author. This is broadcast-only, same problem as a channel.")
        elif total_authors <= 3 and author_counts.most_common(1)[0][1] / total_posts > 0.8:
            print("VERDICT: Effectively one dominant poster. Weak for network analysis.")
        else:
            print(f"VERDICT: {total_authors} distinct authors -- workable for network analysis.")
finally:
    db.close()