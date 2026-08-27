// In-Memory Data Store for Authors, Posts, and Ingestion Jobs
import crypto from 'crypto';

export interface AuthorRecord {
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

export interface PostRecord {
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

export interface IngestionJobRecord {
  id: string;
  platform: string;
  status: 'pending' | 'running' | 'succeeded' | 'failed' | 'rate_limited';
  records_ingested: number;
  started_at: string;
  completed_at?: string;
  error?: string;
}

export const authors = new Map<string, AuthorRecord>(); // key: platform + ':' + platform_author_id
export const posts = new Map<string, PostRecord>(); // key: id
export const postLookupByPlatformId = new Map<string, string>(); // key: platform + ':' + platform_post_id -> id
export const ingestionJobs = new Map<string, IngestionJobRecord>();

// Pre-seed sample records
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
