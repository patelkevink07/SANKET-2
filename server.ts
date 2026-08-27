import express from 'express';
import path from 'path';
import crypto from 'crypto';
import { createServer as createViteServer } from 'vite';
import { GoogleGenAI } from '@google/genai';

const app = express();
const PORT = 3000;

app.use(express.json());

// In-Memory Data Store for Authors, Posts, and Ingestion Jobs
interface AuthorRecord {
  id: string;
  platform: string;
  platform_author_id: string;
  username?: string;
  bio_text?: string;
  follower_count?: number;
  is_bot_suspected: boolean;
  inferred_age_bracket?: string;
  inferred_region?: string;
  inferred_language?: string;
  confidence_score?: number;
  created_at: string;
}

interface PostRecord {
  id: string;
  platform: string;
  platform_post_id: string;
  author_id: string;
  content: string;
  language?: string;
  posted_at: string;
  ingested_at: string;
  like_count: number;
  share_count: number;
  comment_count: number;
  raw_json?: any;
}

interface IngestionJobRecord {
  id: string;
  platform: string;
  status: 'pending' | 'running' | 'succeeded' | 'failed' | 'rate_limited';
  records_ingested: number;
  started_at: string;
  completed_at?: string;
  error?: string;
}

const authors = new Map<string, AuthorRecord>(); // key: platform + ':' + platform_author_id
const posts = new Map<string, PostRecord>(); // key: id
const postLookupByPlatformId = new Map<string, string>(); // key: platform + ':' + platform_post_id -> id
const ingestionJobs = new Map<string, IngestionJobRecord>();

// Pre-seed some realistic records
const sampleAuthorId = crypto.randomUUID();
const sampleAuthorKey = 'reddit:author_sih_observer';
const sampleAuthor: AuthorRecord = {
  id: sampleAuthorId,
  platform: 'reddit',
  platform_author_id: 'author_sih_observer',
  username: 'indic_tech_watcher',
  bio_text: 'Open-source intelligence researcher focused on Indian tech & policy.',
  follower_count: 14200,
  is_bot_suspected: false,
  inferred_age_bracket: '25-34',
  inferred_region: 'Western Region (MH/GJ)',
  inferred_language: 'hi-en',
  confidence_score: 0.94,
  created_at: new Date(Date.now() - 86400000 * 2).toISOString(),
};
authors.set(sampleAuthorKey, sampleAuthor);

const samplePostId = crypto.randomUUID();
const samplePost: PostRecord = {
  id: samplePostId,
  platform: 'reddit',
  platform_post_id: 't3_sih_2026_post_001',
  author_id: sampleAuthorId,
  content: 'The new national semiconductor mission infra in Gujarat & Maharashtra is gaining massive momentum. Very crucial for national digital autonomy!',
  language: 'hi-en',
  posted_at: new Date(Date.now() - 3600000 * 4).toISOString(),
  ingested_at: new Date(Date.now() - 3600000 * 3).toISOString(),
  like_count: 1420,
  share_count: 310,
  comment_count: 85,
};
posts.set(samplePostId, samplePost);
postLookupByPlatformId.set('reddit:t3_sih_2026_post_001', samplePostId);

const sampleJobId = crypto.randomUUID();
ingestionJobs.set(sampleJobId, {
  id: sampleJobId,
  platform: 'reddit',
  status: 'succeeded',
  records_ingested: 2540,
  started_at: new Date(Date.now() - 3600000 * 2).toISOString(),
  completed_at: new Date(Date.now() - 3600000 * 1.5).toISOString(),
});

// Lazy Gemini AI initialization
let genAI: GoogleGenAI | null = null;
function getGeminiAI(): GoogleGenAI | null {
  if (!genAI && process.env.GEMINI_API_KEY) {
    genAI = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
  }
  return genAI;
}

// -------------------------------------------------------------
// Health Check Endpoint
// -------------------------------------------------------------
app.get('/health', (req, res) => {
  res.json({
    status: 'ok',
    environment: process.env.ENVIRONMENT || process.env.NODE_ENV || 'development',
    service: 'SANKET API & Analytics Engine',
    version: '0.1.0'
  });
});

// -------------------------------------------------------------
// Posts API Router (/api/v1/posts)
// -------------------------------------------------------------
const apiPrefix = process.env.API_V1_PREFIX || '/api/v1';

// Ingest / Upsert Post
app.post(`${apiPrefix}/posts`, (req, res) => {
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
app.get(`${apiPrefix}/posts`, (req, res) => {
  const platform = req.query.platform as string | undefined;
  const postedFrom = req.query.from ? new Date(req.query.from as string).getTime() : Date.now() - (7 * 24 * 60 * 60 * 1000);
  const postedTo = req.query.to ? new Date(req.query.to as string).getTime() : Date.now();
  const limit = Math.min(parseInt((req.query.limit as string) || '50', 10), 200);

  const authorById = new Map<string, AuthorRecord>();
  for (const auth of authors.values()) {
    authorById.set(auth.id, auth);
  }

  let resultList = Array.from(posts.values())
    .filter(p => {
      const pTime = new Date(p.posted_at).getTime();
      if (pTime < postedFrom || pTime > postedTo) return false;
      if (platform && p.platform !== platform) return false;
      return true;
    })
    .sort((a, b) => new Date(b.posted_at).getTime() - new Date(a.posted_at).getTime())
    .slice(0, limit)
    .map(p => {
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
app.get(`${apiPrefix}/posts/:post_id`, (req, res) => {
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

// -------------------------------------------------------------
// Ingestion API Router (/api/v1/ingestion)
// -------------------------------------------------------------
app.post(`${apiPrefix}/ingestion/jobs`, (req, res) => {
  const { platform } = req.body;
  if (!platform) {
    return res.status(400).json({ detail: 'Missing platform parameter' });
  }

  const job: IngestionJobRecord = {
    id: crypto.randomUUID(),
    platform,
    status: 'running',
    records_ingested: 0,
    started_at: new Date().toISOString(),
  };

  ingestionJobs.set(job.id, job);
  return res.status(201).json(job);
});

app.patch(`${apiPrefix}/ingestion/jobs/:job_id/complete`, (req, res) => {
  const { job_id } = req.params;
  const { records_ingested, status = 'succeeded', error } = req.body;

  const job = ingestionJobs.get(job_id);
  if (!job) {
    return res.status(404).json({ detail: 'Ingestion job not found' });
  }

  if (!['succeeded', 'failed', 'rate_limited'].includes(status)) {
    return res.status(400).json({ detail: 'Invalid terminal status' });
  }

  job.status = status;
  job.records_ingested = records_ingested || 0;
  job.completed_at = new Date().toISOString();
  job.error = error;

  return res.json(job);
});

app.get(`${apiPrefix}/ingestion/jobs`, (req, res) => {
  const limit = Math.min(parseInt((req.query.limit as string) || '50', 10), 200);
  const list = Array.from(ingestionJobs.values())
    .sort((a, b) => new Date(b.started_at).getTime() - new Date(a.started_at).getTime())
    .slice(0, limit);
  return res.json(list);
});

app.get(`${apiPrefix}/ingestion/jobs/:job_id`, (req, res) => {
  const job = ingestionJobs.get(req.params.job_id);
  if (!job) {
    return res.status(404).json({ detail: 'Ingestion job not found' });
  }
  return res.json(job);
});

// -------------------------------------------------------------
// Server-Side AI Inference Endpoint (Gemini API)
// -------------------------------------------------------------
app.post('/api/analyze-sentiment', async (req, res) => {
  const { text } = req.body;
  if (!text || typeof text !== 'string') {
    return res.status(400).json({ error: 'Text prompt is required' });
  }

  const ai = getGeminiAI();
  if (ai) {
    try {
      const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: `Analyze the following social media post text for sentiment, emotion, Indic/Hinglish linguistic features, sarcasm, polarity (-1.0 to 1.0), and potential threat/narrative vector. Return JSON with the exact fields: sentiment (string), polarity (number between -1 and 1), sarcasmScore (number between 0 and 1), emotion (string), language (string), threatVector (string).
Text: "${text}"`,
        config: {
          responseMimeType: 'application/json'
        }
      });
      const parsed = JSON.parse(response.text || '{}');
      return res.json(parsed);
    } catch (err: any) {
      console.warn('Gemini API call failed, falling back to heuristic engine:', err.message);
    }
  }

  // Robust Heuristic Fallback
  const lower = text.toLowerCase();
  const isSarcastic = lower.includes('wah') || lower.includes('kya badhiya') || lower.includes('great') || lower.includes('world-class') || lower.includes('👏👏');
  const isPositive = lower.includes('good') || lower.includes('best') || lower.includes('success') || lower.includes('proud') || lower.includes('safe') || lower.includes('momentum');

  if (isSarcastic) {
    return res.json({
      sentiment: 'Negative (Inverted by Sarcasm)',
      polarity: -0.68,
      sarcasmScore: 0.92,
      emotion: 'Irony & Sarcasm',
      language: 'Hinglish (Indic-Romanized)',
      threatVector: 'Public Sentiment Vulnerability'
    });
  } else if (isPositive) {
    return res.json({
      sentiment: 'Strongly Positive',
      polarity: 0.85,
      sarcasmScore: 0.08,
      emotion: 'Supportive & Patriotic',
      language: 'English / Indic',
      threatVector: 'Organic Positive Sentiment'
    });
  } else {
    return res.json({
      sentiment: 'Neutral / Informational',
      polarity: 0.05,
      sarcasmScore: 0.15,
      emotion: 'Neutral Observational',
      language: 'Multilingual Ingestion Stream',
      threatVector: 'Standard Baseline Signal'
    });
  }
});

// -------------------------------------------------------------
// Vite Middleware / Static Serving Setup
// -------------------------------------------------------------
async function start() {
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`SANKET Full-Stack Server running on http://0.0.0.0:${PORT}`);
  });
}

start();
