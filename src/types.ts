export type PlatformType = 'x' | 'telegram' | 'instagram' | 'facebook' | 'reddit' | 'youtube';

export type EmotionLabel = 'supportive' | 'against' | 'anxious' | 'excited' | 'sarcastic' | 'neutral';

export interface SentimentScore {
  primaryLabel: EmotionLabel;
  polarityScore: number; // -1.0 to +1.0
  sarcasmScore: number; // 0 to 1
  anxietyScore: number;
  excitementScore: number;
  supportScore: number;
  oppositionScore: number;
  confidence: number;
  modelVersion: string;
}

export interface SocialAccount {
  id: string;
  platform: PlatformType;
  platformUserId: string;
  username: string;
  displayName: string;
  avatarUrl: string;
  bio: string;
  followerCount: number;
  followingCount: number;
  isProtected: boolean;
  isBotSuspected: boolean;
  botScore: number; // 0 to 1
  inferredRegion?: string;
  inferredAge?: string;
  inferredLanguage?: string;
  centralityScore: number;
}

export interface SocialPost {
  id: string;
  platform: PlatformType;
  platformPostId: string;
  account: SocialAccount;
  parentPostId?: string;
  postType?: 'post' | 'comment' | 'reply' | 'channel_message';
  content: string;
  language: string; // 'hi', 'en', 'hi-en', 'ta', 'bn', 'mr'
  postedAt: string;
  ingestedAt: string;
  likeCount: number;
  shareCount: number;
  commentCount: number;
  sentiment: SentimentScore;
  topics: string[];
  url?: string;
}

export interface DemographicData {
  ageBrackets: { bracket: string; percentage: number; confidence: number }[];
  geography: { region: string; percentage: number; count: number; sentimentBias: string }[];
  languages: { language: string; name: string; percentage: number }[];
  affinities: { cluster: string; percentage: number; growth: number }[];
  sampleSize: number;
  overallConfidence: number;
  complianceStandard: string;
}

export interface TrendTopic {
  id: string;
  keyword: string;
  normalizedKeyword: string;
  category: string;
  mentionCount: number;
  velocity: number; // % change / hr
  rank: number;
  predictedNextRank: number;
  firstDetectedAt: string;
  sentimentBreakdown: {
    supportive: number;
    against: number;
    anxious: number;
    excited: number;
    sarcastic: number;
  };
  samplePosts: string[];
}

export interface NetworkNode {
  id: string;
  label: string;
  username: string;
  platform: PlatformType;
  role: 'KOL' | 'Amplifier' | 'Bot' | 'Standard' | 'Official';
  followers: number;
  betweennessCentrality: number;
  eigenvectorCentrality: number;
  botProbability: number;
  dominantSentiment: EmotionLabel;
  x?: number;
  y?: number;
  vx?: number;
  vy?: number;
  radius?: number;
  cluster: number;
  activeTimestamps: number[];
}

export interface NetworkEdge {
  id: string;
  source: string;
  target: string;
  type: 'retweet' | 'reply' | 'mention' | 'co_mention';
  weight: number;
  timestamp: string;
}

export interface IngestionJob {
  id: string;
  platform: PlatformType;
  status: 'running' | 'succeeded' | 'failed' | 'rate_limited' | 'pending';
  recordsIngested: number;
  startedAt: string;
  completedAt?: string;
  throughputPerSec: number;
  workerId: string;
}

export interface AnalystUser {
  id: string;
  name: string;
  badgeId: string;
  role: 'Demo Analyst' | 'Demo Supervisor' | 'System Admin' | string;
  clearanceLevel: 'DEMO ACCESS' | 'ANALYST' | 'SUPERVISOR' | string;
  agency: string;
  department: string;
}
