/**
 * SANKET API Client Service
 * 
 * Configurable REST client connecting to the external backend service over HTTPS/HTTP.
 * Uses `import.meta.env.VITE_API_BASE_URL` (defaulting to `http://localhost:8000/api/v1`).
 * 
 * Gracefully catches network/unreachable errors and falls back to `src/data/mockData.ts`
 * so the frontend functions seamlessly both when connected to live backend services
 * and in isolated standalone environments.
 */

import {
  MOCK_POSTS,
  MOCK_DEMOGRAPHICS,
  MOCK_TRENDS,
  MOCK_SENTIMENT_TIMELINE,
  MOCK_NETWORK_NODES,
  MOCK_NETWORK_EDGES,
  MOCK_INGESTION_JOBS
} from '../data/mockData';
import {
  SocialPost,
  DemographicData,
  TrendTopic,
  NetworkNode,
  NetworkEdge,
  IngestionJob
} from '../types';

export const API_BASE_URL = (
  import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000/api/v1'
).replace(/\/+$/, '');

export interface SentimentAnalysisResponse {
  sentiment: string;
  polarity: number;
  sarcasmScore: number;
  emotion: string;
  language: string;
  threatVector: string;
  confidence?: number;
}

export interface IngestPostPayload {
  platform: string;
  platform_post_id: string;
  author_platform_id: string;
  author_username?: string;
  author_bio?: string;
  author_follower_count?: number;
  content: string;
  language?: string;
  posted_at?: string;
  like_count?: number;
  share_count?: number;
  comment_count?: number;
  raw_json?: any;
}

export const sanketApi = {
  /**
   * Health Check: checks if external backend service is reachable
   */
  async checkHealth(): Promise<{ isLive: boolean; data?: any }> {
    try {
      const rootBase = API_BASE_URL.replace(/\/api\/v\d+$/i, '');
      const response = await fetch(`${rootBase}/health`, {
        method: 'GET',
        headers: { 'Accept': 'application/json' },
        signal: AbortSignal.timeout(3000)
      });
      if (response.ok) {
        const data = await response.json();
        return { isLive: true, data };
      }
      return { isLive: false };
    } catch {
      return { isLive: false };
    }
  },

  /**
   * Fetch Ingested Posts Feed with optional filtering
   */
  async getPosts(params?: { platform?: string; from?: string; to?: string; limit?: number }): Promise<SocialPost[]> {
    try {
      const url = new URL(`${API_BASE_URL}/posts`);
      if (params?.platform && params.platform !== 'all') url.searchParams.set('platform', params.platform);
      if (params?.from) url.searchParams.set('from', params.from);
      if (params?.to) url.searchParams.set('to', params.to);
      if (params?.limit) url.searchParams.set('limit', String(params.limit));

      const response = await fetch(url.toString(), {
        method: 'GET',
        headers: { 'Accept': 'application/json' },
        signal: AbortSignal.timeout(4000)
      });

      if (!response.ok) throw new Error(`HTTP error ${response.status}`);
      const rawPosts = await response.json();

      if (Array.isArray(rawPosts) && rawPosts.length > 0) {
        // Map backend snake_case or standard fields to SocialPost interface
        return rawPosts.map((p: any, idx: number): SocialPost => ({
          id: p.id || `post-live-${idx}`,
          platform: p.platform || 'x',
          platformPostId: p.platform_post_id || p.platformPostId || `p_${idx}`,
          account: {
            id: p.author?.id || p.account?.id || `acc-${idx}`,
            platform: p.author?.platform || p.platform || 'x',
            platformUserId: p.author?.platform_author_id || p.author?.platformUserId || 'usr_unknown',
            username: p.author?.username || p.account?.username || 'user',
            displayName: p.author?.username || p.account?.displayName || 'Social User',
            avatarUrl: p.author?.avatarUrl || p.account?.avatarUrl || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80',
            bio: p.author?.bio_text || p.account?.bio || '',
            followerCount: p.author?.follower_count ?? p.account?.followerCount ?? 500,
            followingCount: p.account?.followingCount ?? 150,
            isProtected: false,
            isBotSuspected: p.author?.is_bot_suspected ?? p.account?.isBotSuspected ?? false,
            botScore: p.account?.botScore ?? (p.author?.is_bot_suspected ? 0.85 : 0.05),
            inferredRegion: p.author?.inferred_region || p.account?.inferredRegion,
            inferredAge: p.author?.inferred_age_bracket || p.account?.inferredAge,
            inferredLanguage: p.author?.inferred_language || p.account?.inferredLanguage,
            centralityScore: p.author?.confidence_score ?? p.account?.centralityScore ?? 0.5
          },
          content: p.content || '',
          language: p.language || 'en',
          postedAt: p.posted_at || p.postedAt || new Date().toISOString(),
          ingestedAt: p.ingested_at || p.ingestedAt || new Date().toISOString(),
          likeCount: p.like_count ?? p.likeCount ?? 0,
          shareCount: p.share_count ?? p.shareCount ?? 0,
          commentCount: p.comment_count ?? p.commentCount ?? 0,
          sentiment: p.sentiment || {
            primaryLabel: 'supportive',
            polarityScore: 0.75,
            sarcasmScore: 0.02,
            anxietyScore: 0.05,
            excitementScore: 0.8,
            supportScore: 0.85,
            oppositionScore: 0.05,
            confidence: 0.9,
            modelVersion: 'sanket-indic-roberta-v3.2'
          },
          topics: p.topics || ['#NationalFocus']
        }));
      }
      return MOCK_POSTS;
    } catch {
      // Graceful fallback to rich mock data
      return MOCK_POSTS;
    }
  },

  /**
   * Submit / Ingest a new post into the backend pipeline
   */
  async ingestPost(payload: IngestPostPayload): Promise<SocialPost | null> {
    try {
      const response = await fetch(`${API_BASE_URL}/posts`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify(payload),
        signal: AbortSignal.timeout(5000)
      });
      if (!response.ok) return null;
      return await response.json();
    } catch {
      return null;
    }
  },

  /**
   * Fetch Ingestion Pipeline Jobs
   */
  async getIngestionJobs(): Promise<IngestionJob[]> {
    try {
      const response = await fetch(`${API_BASE_URL}/ingestion/jobs`, {
        method: 'GET',
        headers: { 'Accept': 'application/json' },
        signal: AbortSignal.timeout(4000)
      });
      if (!response.ok) throw new Error(`HTTP error ${response.status}`);
      const rawJobs = await response.json();
      if (Array.isArray(rawJobs) && rawJobs.length > 0) {
        return rawJobs.map((j: any): IngestionJob => ({
          id: j.id,
          platform: j.platform,
          status: j.status,
          recordsIngested: j.records_ingested ?? j.recordsIngested ?? 0,
          startedAt: j.started_at || j.startedAt || new Date().toISOString(),
          completedAt: j.completed_at || j.completedAt,
          throughputPerSec: j.throughputPerSec ?? 140,
          workerId: j.workerId ?? 'worker-01'
        }));
      }
      return MOCK_INGESTION_JOBS;
    } catch {
      return MOCK_INGESTION_JOBS;
    }
  },

  /**
   * Analyze custom text via Backend NLP/AI endpoint
   */
  async analyzeSentiment(text: string): Promise<SentimentAnalysisResponse> {
    try {
      const response = await fetch(`${API_BASE_URL}/nlp/analyze`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({ text }),
        signal: AbortSignal.timeout(5000)
      });

      if (response.ok) {
        return await response.json();
      }
      throw new Error(`NLP Endpoint responded with status ${response.status}`);
    } catch {
      // Local Indic Heuristic Fallback
      const lower = text.toLowerCase();
      const isSarcastic = lower.includes('wah') || lower.includes('kya badhiya') || lower.includes('great') || lower.includes('world-class') || lower.includes('👏👏');
      const isPositive = lower.includes('good') || lower.includes('best') || lower.includes('success') || lower.includes('proud') || lower.includes('safe') || lower.includes('momentum');

      if (isSarcastic) {
        return {
          sentiment: 'Negative (Inverted by Sarcasm)',
          polarity: -0.68,
          sarcasmScore: 0.92,
          emotion: 'Irony & Sarcasm',
          language: 'Hinglish (Indic-Romanized)',
          threatVector: 'Public Sentiment Vulnerability',
          confidence: 0.94
        };
      } else if (isPositive) {
        return {
          sentiment: 'Strongly Positive',
          polarity: 0.85,
          sarcasmScore: 0.08,
          emotion: 'Supportive & Optimistic',
          language: 'English / Indic',
          threatVector: 'Organic Positive Sentiment',
          confidence: 0.92
        };
      } else {
        return {
          sentiment: 'Neutral / Informational',
          polarity: 0.05,
          sarcasmScore: 0.15,
          emotion: 'Neutral Observational',
          language: 'Multilingual Ingestion Stream',
          threatVector: 'Standard Baseline Signal',
          confidence: 0.88
        };
      }
    }
  },

  /**
   * Fetch Demographics Analysis
   */
  async getDemographics(): Promise<DemographicData> {
    try {
      const response = await fetch(`${API_BASE_URL}/analytics/demographics`, {
        method: 'GET',
        headers: { 'Accept': 'application/json' },
        signal: AbortSignal.timeout(4000)
      });
      if (response.ok) {
        return await response.json();
      }
      return MOCK_DEMOGRAPHICS;
    } catch {
      return MOCK_DEMOGRAPHICS;
    }
  },

  /**
   * Fetch Trending Topics
   */
  async getTrends(): Promise<TrendTopic[]> {
    try {
      const response = await fetch(`${API_BASE_URL}/analytics/trends`, {
        method: 'GET',
        headers: { 'Accept': 'application/json' },
        signal: AbortSignal.timeout(4000)
      });
      if (response.ok) {
        return await response.json();
      }
      return MOCK_TRENDS;
    } catch {
      return MOCK_TRENDS;
    }
  },

  /**
   * Fetch Network Nodes & Edges
   */
  async getNetworkGraph(): Promise<{ nodes: NetworkNode[]; edges: NetworkEdge[] }> {
    try {
      const response = await fetch(`${API_BASE_URL}/analytics/network`, {
        method: 'GET',
        headers: { 'Accept': 'application/json' },
        signal: AbortSignal.timeout(4000)
      });
      if (response.ok) {
        return await response.json();
      }
      return { nodes: MOCK_NETWORK_NODES, edges: MOCK_NETWORK_EDGES };
    } catch {
      return { nodes: MOCK_NETWORK_NODES, edges: MOCK_NETWORK_EDGES };
    }
  },

  /**
   * Fetch Sentiment Timeline
   */
  async getSentimentTimeline(): Promise<typeof MOCK_SENTIMENT_TIMELINE> {
    try {
      const response = await fetch(`${API_BASE_URL}/analytics/timeline`, {
        method: 'GET',
        headers: { 'Accept': 'application/json' },
        signal: AbortSignal.timeout(4000)
      });
      if (response.ok) {
        return await response.json();
      }
      return MOCK_SENTIMENT_TIMELINE;
    } catch {
      return MOCK_SENTIMENT_TIMELINE;
    }
  }
};
