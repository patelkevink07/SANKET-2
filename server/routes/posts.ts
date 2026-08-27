import { Router, Request, Response } from 'express';
import crypto from 'crypto';
import { authors, posts, postLookupByPlatformId, AuthorRecord, PostRecord } from '../models';

export const postsRouter = Router();

// Ingest / Upsert Post
postsRouter.post('/', (req: Request, res: Response) => {
  try {
    const {
      platform,
      platform_post_id,
      author_platform_id,
      author_username,
      author_bio,
      author_follower_count,
      content,
      language,
      posted_at,
      like_count = 0,
      share_count = 0,
      comment_count = 0,
      raw_json
    } = req.body;

    if (!platform || !platform_post_id || !author_platform_id || !content) {
      return res.status(400).json({ detail: 'Missing required post or author fields' });
    }

    const authorKey = `${platform}:${author_platform_id}`;
    let author = authors.get(authorKey);
    if (!author) {
      author = {
        id: crypto.randomUUID(),
        platform,
        platform_author_id: author_platform_id,
        username: author_username,
        bio_text: author_bio,
        follower_count: author_follower_count,
        is_bot_suspected: false,
        created_at: new Date().toISOString()
      };
      authors.set(authorKey, author);
    } else {
      if (author_username) author.username = author_username;
      if (author_bio) author.bio_text = author_bio;
      if (author_follower_count !== undefined) author.follower_count = author_follower_count;
    }

    const postKey = `${platform}:${platform_post_id}`;
    const existingPostId = postLookupByPlatformId.get(postKey);

    if (existingPostId && posts.has(existingPostId)) {
      const existing = posts.get(existingPostId)!;
      existing.like_count = like_count;
      existing.share_count = share_count;
      existing.comment_count = comment_count;
      return res.json({
        ...existing,
        author: {
          id: author.id,
          platform: author.platform,
          platform_author_id: author.platform_author_id,
          username: author.username,
          bio_text: author.bio_text,
          follower_count: author.follower_count,
          is_bot_suspected: author.is_bot_suspected,
          inferred_age_bracket: author.inferred_age_bracket,
          inferred_region: author.inferred_region,
          inferred_language: author.inferred_language,
          confidence_score: author.confidence_score,
        }
      });
    }

    const postId = crypto.randomUUID();
    const newPost: PostRecord = {
      id: postId,
      platform,
      platform_post_id,
      author_id: author.id,
      content,
      language: language || 'hi-en',
      posted_at: posted_at ? new Date(posted_at).toISOString() : new Date().toISOString(),
      ingested_at: new Date().toISOString(),
      like_count,
      share_count,
      comment_count,
      raw_json
    };

    posts.set(postId, newPost);
    postLookupByPlatformId.set(postKey, postId);

    return res.status(201).json({
      ...newPost,
      author: {
        id: author.id,
        platform: author.platform,
        platform_author_id: author.platform_author_id,
        username: author.username,
        bio_text: author.bio_text,
        follower_count: author.follower_count,
        is_bot_suspected: author.is_bot_suspected,
        inferred_age_bracket: author.inferred_age_bracket,
        inferred_region: author.inferred_region,
        inferred_language: author.inferred_language,
        confidence_score: author.confidence_score,
      }
    });
  } catch (err: any) {
    return res.status(500).json({ detail: err.message || 'Internal server error' });
  }
});

// List Posts with filtering
postsRouter.get('/', (req: Request, res: Response) => {
  const platform = req.query.platform as string | undefined;
  const postedFrom = req.query.from ? new Date(req.query.from as string).getTime() : Date.now() - (7 * 24 * 60 * 60 * 1000);
  const postedTo = req.query.to ? new Date(req.query.to as string).getTime() : Date.now();
  const limit = Math.min(parseInt((req.query.limit as string) || '50', 10), 200);

  const authorById = new Map<string, AuthorRecord>();
  for (const auth of authors.values()) {
    authorById.set(auth.id, auth);
  }

  const postsArray: PostRecord[] = Array.from(posts.values());
  const resultList = postsArray
    .filter((p: PostRecord) => {
      const pTime = new Date(p.posted_at).getTime();
      if (pTime < postedFrom || pTime > postedTo) return false;
      if (platform && p.platform !== platform) return false;
      return true;
    })
    .sort((a: PostRecord, b: PostRecord) => new Date(b.posted_at).getTime() - new Date(a.posted_at).getTime())
    .slice(0, limit)
    .map((p: PostRecord) => {
      const author = authorById.get(p.author_id) || {
        id: p.author_id,
        platform: p.platform,
        platform_author_id: 'unknown',
        username: 'anonymous',
        is_bot_suspected: false,
        created_at: new Date().toISOString()
      };
      return {
        ...p,
        author: {
          id: author.id,
          platform: author.platform,
          platform_author_id: author.platform_author_id,
          username: author.username,
          bio_text: author.bio_text,
          follower_count: author.follower_count,
          is_bot_suspected: author.is_bot_suspected,
          inferred_age_bracket: author.inferred_age_bracket,
          inferred_region: author.inferred_region,
          inferred_language: author.inferred_language,
          confidence_score: author.confidence_score,
        }
      };
    });

  return res.json(resultList);
});

// Get Single Post by ID
postsRouter.get('/:post_id', (req: Request, res: Response) => {
  const post = posts.get(req.params.post_id);
  if (!post) {
    return res.status(404).json({ detail: 'Post not found' });
  }

  let author: AuthorRecord | undefined;
  for (const a of authors.values()) {
    if (a.id === post.author_id) {
      author = a;
      break;
    }
  }

  return res.json({
    ...post,
    author: author || {
      id: post.author_id,
      platform: post.platform,
      platform_author_id: 'unknown',
      username: 'anonymous',
      is_bot_suspected: false,
      created_at: new Date().toISOString()
    }
  });
});
