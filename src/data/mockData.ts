import {
  SocialPost,
  DemographicData,
  TrendTopic,
  NetworkNode,
  NetworkEdge,
  IngestionJob,
  AnalystUser
} from '../types';

export const CURRENT_ANALYST: AnalystUser = {
  id: 'NTRO-ANA-8492',
  name: 'Commander S. K. Verma',
  badgeId: 'GOI/NTRO/2026/0942',
  role: 'Senior Cyber Analyst',
  clearanceLevel: 'TOP SECRET',
  agency: 'National Technical Research Organisation (NTRO)',
  department: 'Open Source Intelligence (OSINT) Cyber Cell'
};

export const MOCK_POSTS: SocialPost[] = [
  {
    id: 'post-101',
    platform: 'x',
    platformPostId: '1827394018273',
    account: {
      id: 'acc-1',
      platform: 'x',
      platformUserId: 'usr_tech_india',
      username: 'tech_bharat_now',
      displayName: 'Bharat Tech Horizons',
      avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80',
      bio: 'Tracking Indian Semiconductor Mission & DeepTech sovereignty. Views are national interest.',
      followerCount: 248000,
      followingCount: 420,
      isProtected: false,
      isBotSuspected: false,
      botScore: 0.04,
      inferredRegion: 'Bengaluru, Karnataka',
      inferredAge: '25-34',
      inferredLanguage: 'English / Hindi',
      centralityScore: 0.88
    },
    content: 'Massive milestone for India’s #SemiconductorMission! The new packaging facility in Dholera is set to begin pilot wafers ahead of schedule. Crucial step for high-tech self-reliance. #DigitalIndia #MakeInIndia',
    language: 'en',
    postedAt: '2026-08-24T21:45:00Z',
    ingestedAt: '2026-08-24T21:45:04Z',
    likeCount: 4890,
    shareCount: 1240,
    commentCount: 312,
    sentiment: {
      primaryLabel: 'excited',
      polarityScore: 0.85,
      sarcasmScore: 0.02,
      anxietyScore: 0.05,
      excitementScore: 0.88,
      supportScore: 0.92,
      oppositionScore: 0.03,
      confidence: 0.94,
      modelVersion: 'sanket-indic-roberta-v3.2'
    },
    topics: ['#SemiconductorMission', '#DigitalIndia', '#MakeInIndia']
  },
  {
    id: 'post-102',
    platform: 'telegram',
    platformPostId: 'tg_chan_98129_482',
    account: {
      id: 'acc-2',
      platform: 'telegram',
      platformUserId: 'tg_infra_watch',
      username: 'BharatInfraPulse',
      displayName: 'Infra Pulse India (Broadcast)',
      avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=80',
      bio: 'Updates on National Expressways, Freight Corridors and High-Speed Rail networks.',
      followerCount: 89400,
      followingCount: 12,
      isProtected: false,
      isBotSuspected: false,
      botScore: 0.08,
      inferredRegion: 'New Delhi, NCR',
      inferredAge: '35-44',
      inferredLanguage: 'Hindi / English',
      centralityScore: 0.76
    },
    content: 'Delhi-Varanasi High Speed Rail project detailed project report enters final clearance stage. 12 stations planned with multi-modal transport hubs. Construction expected in 3 phases.',
    language: 'en',
    postedAt: '2026-08-24T20:12:00Z',
    ingestedAt: '2026-08-24T20:12:02Z',
    likeCount: 2150,
    shareCount: 680,
    commentCount: 145,
    sentiment: {
      primaryLabel: 'supportive',
      polarityScore: 0.72,
      sarcasmScore: 0.01,
      anxietyScore: 0.08,
      excitementScore: 0.65,
      supportScore: 0.86,
      oppositionScore: 0.05,
      confidence: 0.91,
      modelVersion: 'sanket-indic-roberta-v3.2'
    },
    topics: ['#NationalHighwayExpansion', '#HighSpeedRail', '#InfraUpdate']
  },
  {
    id: 'post-103',
    platform: 'x',
    platformPostId: '1827409281741',
    account: {
      id: 'acc-3',
      platform: 'x',
      platformUserId: 'usr_sarcastic_sam',
      username: 'delhi_cynic',
      displayName: 'Rohit Sharma (Observer)',
      avatarUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&auto=format&fit=crop&q=80',
      bio: 'Critique of city infra, traffic, and monsoon prep. Satire alert.',
      followerCount: 14200,
      followingCount: 890,
      isProtected: false,
      isBotSuspected: false,
      botScore: 0.12,
      inferredRegion: 'Delhi NCR',
      inferredAge: '18-24',
      inferredLanguage: 'Hinglish',
      centralityScore: 0.42
    },
    content: 'Haan bhai, potholes are just “natural speed breakers” provided free of charge by municipal corporation. Peak smart city innovation! 👏👏 #SmartCityRealities',
    language: 'hi-en',
    postedAt: '2026-08-24T19:30:00Z',
    ingestedAt: '2026-08-24T19:30:05Z',
    likeCount: 1540,
    shareCount: 420,
    commentCount: 180,
    sentiment: {
      primaryLabel: 'sarcastic',
      polarityScore: -0.68,
      sarcasmScore: 0.94,
      anxietyScore: 0.35,
      excitementScore: 0.02,
      supportScore: 0.04,
      oppositionScore: 0.82,
      confidence: 0.89,
      modelVersion: 'sanket-indic-roberta-v3.2'
    },
    topics: ['#SmartCityRealities', '#CivicInfra']
  },
  {
    id: 'post-104',
    platform: 'x',
    platformPostId: '1827419992019',
    account: {
      id: 'acc-4',
      platform: 'x',
      platformUserId: 'bot_net_alpha_89',
      username: 'news_blast_fast99',
      displayName: 'Fast News Wire',
      avatarUrl: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=100&auto=format&fit=crop&q=80',
      bio: 'Auto aggregator 24/7. Trending hashtags amplification.',
      followerCount: 1200,
      followingCount: 4900,
      isProtected: false,
      isBotSuspected: true,
      botScore: 0.93,
      inferredRegion: 'Unknown Proxy',
      inferredAge: 'Uncertain',
      inferredLanguage: 'English',
      centralityScore: 0.15
    },
    content: 'ALERT: Market fluctuations report 2026! Check stock trends now. #Finance2026 #CyberSecurity2026 #TrendNow',
    language: 'en',
    postedAt: '2026-08-24T18:50:00Z',
    ingestedAt: '2026-08-24T18:50:01Z',
    likeCount: 45,
    shareCount: 890,
    commentCount: 2,
    sentiment: {
      primaryLabel: 'anxious',
      polarityScore: -0.22,
      sarcasmScore: 0.05,
      anxietyScore: 0.78,
      excitementScore: 0.20,
      supportScore: 0.15,
      oppositionScore: 0.30,
      confidence: 0.82,
      modelVersion: 'sanket-indic-roberta-v3.2'
    },
    topics: ['#Finance2026', '#CyberSecurity2026']
  },
  {
    id: 'post-105',
    platform: 'reddit',
    platformPostId: 'rd_thread_k9281a',
    account: {
      id: 'acc-5',
      platform: 'reddit',
      platformUserId: 'u_cyber_scholar',
      username: 'u/IndoCyberShield',
      displayName: 'IndoCyberShield',
      avatarUrl: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&auto=format&fit=crop&q=80',
      bio: 'PhD candidate researching sovereign cloud protocols and cyber defense frameworks in r/developersIndia.',
      followerCount: 4200,
      followingCount: 150,
      isProtected: false,
      isBotSuspected: false,
      botScore: 0.02,
      inferredRegion: 'Hyderabad, Telangana',
      inferredAge: '25-34',
      inferredLanguage: 'English / Telugu',
      centralityScore: 0.65
    },
    content: 'Discussion on DPDP Act compliance architecture for LLM providers operating in India. How are local teams setting up local embeddings vs overseas inference pipelines? Analysis of sovereign data boundary requirements.',
    language: 'en',
    postedAt: '2026-08-24T17:15:00Z',
    ingestedAt: '2026-08-24T17:15:10Z',
    likeCount: 830,
    shareCount: 210,
    commentCount: 94,
    sentiment: {
      primaryLabel: 'neutral',
      polarityScore: 0.15,
      sarcasmScore: 0.01,
      anxietyScore: 0.25,
      excitementScore: 0.40,
      supportScore: 0.70,
      oppositionScore: 0.10,
      confidence: 0.95,
      modelVersion: 'sanket-indic-roberta-v3.2'
    },
    topics: ['#DataSovereignty', '#CyberSecurity2026', '#TechPolicy']
  },
  {
    id: 'post-106',
    platform: 'youtube',
    platformPostId: 'yt_comment_8921a4',
    account: {
      id: 'acc-6',
      platform: 'youtube',
      platformUserId: 'yt_user_anand_v',
      username: 'AnandVanguard',
      displayName: 'Anand Kumar',
      avatarUrl: 'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?w=100&auto=format&fit=crop&q=80',
      bio: 'Public comment on Tech Sovereign documentary.',
      followerCount: 340,
      followingCount: 50,
      isProtected: false,
      isBotSuspected: false,
      botScore: 0.03,
      inferredRegion: 'Pune, Maharashtra',
      inferredAge: '35-44',
      inferredLanguage: 'Hindi / Marathi',
      centralityScore: 0.31
    },
    content: 'यह कदम देश के युवाओं के लिए गेम चेंजर साबित होगा। इंडिक एआई मॉडल्स और लोकल चिप फैब से आत्मनिर्भरता को बड़ा बढ़ावा मिलेगा। जय हिन्द! 🇮🇳',
    language: 'hi',
    postedAt: '2026-08-24T16:00:00Z',
    ingestedAt: '2026-08-24T16:00:06Z',
    likeCount: 420,
    shareCount: 45,
    commentCount: 18,
    sentiment: {
      primaryLabel: 'supportive',
      polarityScore: 0.92,
      sarcasmScore: 0.00,
      anxietyScore: 0.02,
      excitementScore: 0.94,
      supportScore: 0.96,
      oppositionScore: 0.01,
      confidence: 0.97,
      modelVersion: 'sanket-indic-roberta-v3.2'
    },
    topics: ['#IndicAI', '#SemiconductorMission', '#SelfReliance']
  }
];

export const MOCK_DEMOGRAPHICS: DemographicData = {
  ageBrackets: [
    { bracket: '18-24', percentage: 28.4, confidence: 0.88 },
    { bracket: '25-34', percentage: 41.2, confidence: 0.92 },
    { bracket: '35-44', percentage: 19.8, confidence: 0.84 },
    { bracket: '45-54', percentage: 7.6, confidence: 0.79 },
    { bracket: '55+', percentage: 3.0, confidence: 0.72 }
  ],
  geography: [
    { region: 'Maharashtra (MMR & Pune)', percentage: 21.5, count: 48200, sentimentBias: '+0.74 (Supportive)' },
    { region: 'Delhi NCR (Capital Region)', percentage: 19.2, count: 43000, sentimentBias: '+0.58 (Mixed)' },
    { region: 'Karnataka (Bengaluru Tech Hub)', percentage: 18.0, count: 40300, sentimentBias: '+0.81 (Excited)' },
    { region: 'Telangana (Hyderabad Region)', percentage: 12.4, count: 27800, sentimentBias: '+0.76 (Supportive)' },
    { region: 'Tamil Nadu (Chennai / Kovai)', percentage: 11.1, count: 24900, sentimentBias: '+0.68 (Supportive)' },
    { region: 'Gujarat (Ahmedabad / GIFT City)', percentage: 9.8, count: 21900, sentimentBias: '+0.89 (High Support)' },
    { region: 'Other States & UTs', percentage: 8.0, count: 17900, sentimentBias: '+0.65 (Supportive)' }
  ],
  languages: [
    { language: 'en', name: 'English', percentage: 44.2 },
    { language: 'hi', name: 'Hindi', percentage: 28.6 },
    { language: 'hi-en', name: 'Hinglish (Code-Mixed)', percentage: 14.8 },
    { language: 'ta', name: 'Tamil', percentage: 4.5 },
    { language: 'te', name: 'Telugu', percentage: 4.1 },
    { language: 'mr', name: 'Marathi', percentage: 2.3 },
    { language: 'bn', name: 'Bengali', percentage: 1.5 }
  ],
  affinities: [
    { cluster: 'DeepTech & Semiconductor Enthusiasts', percentage: 34.2, growth: 18.4 },
    { cluster: 'Policy, Cyber Security & Governance', percentage: 26.8, growth: 12.1 },
    { cluster: 'Infrastructure & National Mobility', percentage: 19.5, growth: 8.7 },
    { cluster: 'Academic & Research Scholars', percentage: 11.3, growth: 4.2 },
    { cluster: 'General Public Opinion', percentage: 8.2, growth: -2.1 }
  ],
  sampleSize: 224000,
  overallConfidence: 0.912,
  complianceStandard: 'ISO 27701 & DPDP Act 2023 Compliant (Differential Privacy ε=0.5)'
};

export const MOCK_TRENDS: TrendTopic[] = [
  {
    id: 'trend-1',
    keyword: '#SemiconductorMission',
    normalizedKeyword: 'semiconductor mission',
    category: 'National DeepTech',
    mentionCount: 84200,
    velocity: 42.6, // +42.6% / hr
    rank: 1,
    predictedNextRank: 1,
    firstDetectedAt: '2026-08-23T04:00:00Z',
    sentimentBreakdown: {
      supportive: 68,
      against: 4,
      anxious: 8,
      excited: 18,
      sarcastic: 2
    },
    samplePosts: [
      'Dholera chip fabrication plant clears final regulatory dry-run.',
      'Indian OSAT facilities announce major employment drive.'
    ]
  },
  {
    id: 'trend-2',
    keyword: '#CyberSecurity2026',
    normalizedKeyword: 'cybersecurity 2026',
    category: 'National Security & Defense',
    mentionCount: 52100,
    velocity: 28.3,
    rank: 2,
    predictedNextRank: 2,
    firstDetectedAt: '2026-08-23T11:30:00Z',
    sentimentBreakdown: {
      supportive: 54,
      against: 6,
      anxious: 26,
      excited: 10,
      sarcastic: 4
    },
    samplePosts: [
      'NTRO and CERT-In issue sovereign guidelines for critical cloud infra.',
      'Sovereign encryption protocols updated across financial gateways.'
    ]
  },
  {
    id: 'trend-3',
    keyword: '#DigitalIndia',
    normalizedKeyword: 'digital india',
    category: 'Governance & Citizen Tech',
    mentionCount: 41800,
    velocity: 14.2,
    rank: 3,
    predictedNextRank: 4,
    firstDetectedAt: '2026-08-20T00:00:00Z',
    sentimentBreakdown: {
      supportive: 74,
      against: 8,
      anxious: 4,
      excited: 11,
      sarcastic: 3
    },
    samplePosts: [
      'UPI and ONDC hit record monthly transaction volume across tier-2/3 cities.',
      'DigiLocker integration expands to academic credentials verification.'
    ]
  },
  {
    id: 'trend-4',
    keyword: '#SmartIndiaHackathon2026',
    normalizedKeyword: 'smart india hackathon 2026',
    category: 'Innovation & Youth',
    mentionCount: 36500,
    velocity: 58.9,
    rank: 4,
    predictedNextRank: 3,
    firstDetectedAt: '2026-08-24T06:00:00Z',
    sentimentBreakdown: {
      supportive: 62,
      against: 2,
      anxious: 6,
      excited: 28,
      sarcastic: 2
    },
    samplePosts: [
      'Over 50,000 teams registered for SIH 2026 problem statements.',
      'NTRO problem statement #26152 receives high interest from top engineering institutes.'
    ]
  },
  {
    id: 'trend-5',
    keyword: '#NationalHighwayExpansion',
    normalizedKeyword: 'national highway expansion',
    category: 'Civil Infrastructure',
    mentionCount: 22400,
    velocity: 9.5,
    rank: 5,
    predictedNextRank: 6,
    firstDetectedAt: '2026-08-22T08:00:00Z',
    sentimentBreakdown: {
      supportive: 59,
      against: 14,
      anxious: 12,
      excited: 7,
      sarcastic: 8
    },
    samplePosts: [
      'Greenfield expressway corridors reduce freight transit time by 40%.',
      'Monsoon maintenance audit reports published online.'
    ]
  }
];

export const MOCK_NETWORK_NODES: NetworkNode[] = [
  {
    id: 'node-1',
    label: 'Bharat Tech Horizons',
    username: '@tech_bharat_now',
    platform: 'x',
    role: 'KOL',
    followers: 248000,
    betweennessCentrality: 0.94,
    eigenvectorCentrality: 0.88,
    botProbability: 0.04,
    dominantSentiment: 'excited',
    cluster: 1,
    activeTimestamps: [1, 2, 3, 4, 5]
  },
  {
    id: 'node-2',
    label: 'NTRO Cyber Cell (Official)',
    username: '@NTRO_CyberAlerts',
    platform: 'x',
    role: 'Official',
    followers: 512000,
    betweennessCentrality: 0.98,
    eigenvectorCentrality: 0.92,
    botProbability: 0.01,
    dominantSentiment: 'supportive',
    cluster: 1,
    activeTimestamps: [1, 2, 3, 4, 5]
  },
  {
    id: 'node-3',
    label: 'BharatInfraPulse',
    username: '@BharatInfraPulse',
    platform: 'telegram',
    role: 'KOL',
    followers: 89400,
    betweennessCentrality: 0.78,
    eigenvectorCentrality: 0.71,
    botProbability: 0.08,
    dominantSentiment: 'supportive',
    cluster: 2,
    activeTimestamps: [2, 3, 4, 5]
  },
  {
    id: 'node-4',
    label: 'IndoCyberShield',
    username: 'u/IndoCyberShield',
    platform: 'reddit',
    role: 'Amplifier',
    followers: 4200,
    betweennessCentrality: 0.65,
    eigenvectorCentrality: 0.58,
    botProbability: 0.02,
    dominantSentiment: 'neutral',
    cluster: 1,
    activeTimestamps: [2, 3, 4, 5]
  },
  {
    id: 'node-5',
    label: 'Delhi Cynic',
    username: '@delhi_cynic',
    platform: 'x',
    role: 'Amplifier',
    followers: 14200,
    betweennessCentrality: 0.52,
    eigenvectorCentrality: 0.45,
    botProbability: 0.12,
    dominantSentiment: 'sarcastic',
    cluster: 3,
    activeTimestamps: [3, 4, 5]
  },
  {
    id: 'node-6',
    label: 'BotCluster Alpha-1',
    username: '@news_blast_fast99',
    platform: 'x',
    role: 'Bot',
    followers: 1200,
    betweennessCentrality: 0.22,
    eigenvectorCentrality: 0.15,
    botProbability: 0.94,
    dominantSentiment: 'anxious',
    cluster: 4,
    activeTimestamps: [4, 5]
  },
  {
    id: 'node-7',
    label: 'BotCluster Alpha-2',
    username: '@trend_matrix_auto',
    platform: 'x',
    role: 'Bot',
    followers: 890,
    betweennessCentrality: 0.19,
    eigenvectorCentrality: 0.12,
    botProbability: 0.96,
    dominantSentiment: 'anxious',
    cluster: 4,
    activeTimestamps: [4, 5]
  },
  {
    id: 'node-8',
    label: 'Bengaluru Techies',
    username: '@blr_hackers_net',
    platform: 'telegram',
    role: 'Amplifier',
    followers: 32000,
    betweennessCentrality: 0.72,
    eigenvectorCentrality: 0.68,
    botProbability: 0.05,
    dominantSentiment: 'excited',
    cluster: 1,
    activeTimestamps: [1, 2, 3, 4, 5]
  },
  {
    id: 'node-9',
    label: 'National Policy Review',
    username: '@PolGovReview',
    platform: 'x',
    role: 'KOL',
    followers: 118000,
    betweennessCentrality: 0.84,
    eigenvectorCentrality: 0.81,
    botProbability: 0.03,
    dominantSentiment: 'supportive',
    cluster: 2,
    activeTimestamps: [1, 2, 3, 4, 5]
  },
  {
    id: 'node-10',
    label: 'SIH Innovation Cell',
    username: '@SIH_Gov_Official',
    platform: 'x',
    role: 'Official',
    followers: 210000,
    betweennessCentrality: 0.91,
    eigenvectorCentrality: 0.86,
    botProbability: 0.01,
    dominantSentiment: 'excited',
    cluster: 1,
    activeTimestamps: [1, 2, 3, 4, 5]
  }
];

export const MOCK_NETWORK_EDGES: NetworkEdge[] = [
  { id: 'e-1', source: 'node-1', target: 'node-2', type: 'retweet', weight: 4.8, timestamp: '2026-08-24T18:00:00Z' },
  { id: 'e-2', source: 'node-8', target: 'node-1', type: 'mention', weight: 3.5, timestamp: '2026-08-24T18:15:00Z' },
  { id: 'e-3', source: 'node-4', target: 'node-1', type: 'reply', weight: 2.9, timestamp: '2026-08-24T18:30:00Z' },
  { id: 'e-4', source: 'node-10', target: 'node-2', type: 'co_mention', weight: 5.0, timestamp: '2026-08-24T19:00:00Z' },
  { id: 'e-5', source: 'node-1', target: 'node-10', type: 'retweet', weight: 4.2, timestamp: '2026-08-24T19:15:00Z' },
  { id: 'e-6', source: 'node-9', target: 'node-2', type: 'reply', weight: 3.1, timestamp: '2026-08-24T19:40:00Z' },
  { id: 'e-7', source: 'node-3', target: 'node-9', type: 'mention', weight: 2.7, timestamp: '2026-08-24T20:00:00Z' },
  { id: 'e-8', source: 'node-6', target: 'node-7', type: 'co_mention', weight: 6.8, timestamp: '2026-08-24T20:30:00Z' },
  { id: 'e-9', source: 'node-6', target: 'node-1', type: 'mention', weight: 1.2, timestamp: '2026-08-24T20:45:00Z' },
  { id: 'e-10', source: 'node-5', target: 'node-3', type: 'reply', weight: 1.8, timestamp: '2026-08-24T21:00:00Z' }
];

export const MOCK_INGESTION_JOBS: IngestionJob[] = [
  {
    id: 'job-x-stream-01',
    platform: 'x',
    status: 'running',
    recordsIngested: 142850,
    startedAt: '2026-08-24T21:00:00Z',
    throughputPerSec: 124.5,
    workerId: 'worker-node-delhi-01 (Tweepy Async)'
  },
  {
    id: 'job-tg-stream-02',
    platform: 'telegram',
    status: 'running',
    recordsIngested: 89400,
    startedAt: '2026-08-24T21:00:00Z',
    throughputPerSec: 68.2,
    workerId: 'worker-node-delhi-02 (Telethon MTProto)'
  },
  {
    id: 'job-ig-batch-03',
    platform: 'instagram',
    status: 'succeeded',
    recordsIngested: 32100,
    startedAt: '2026-08-24T20:00:00Z',
    completedAt: '2026-08-24T20:45:00Z',
    throughputPerSec: 35.8,
    workerId: 'worker-node-bengaluru-01 (Graph API)'
  },
  {
    id: 'job-rd-stream-04',
    platform: 'reddit',
    status: 'running',
    recordsIngested: 18900,
    startedAt: '2026-08-24T21:00:00Z',
    throughputPerSec: 22.4,
    workerId: 'worker-node-hyd-01 (PRAW Stream)'
  },
  {
    id: 'job-yt-batch-05',
    platform: 'youtube',
    status: 'succeeded',
    recordsIngested: 27400,
    startedAt: '2026-08-24T19:30:00Z',
    completedAt: '2026-08-24T20:15:00Z',
    throughputPerSec: 41.0,
    workerId: 'worker-node-bengaluru-02 (YouTube Data API v3)'
  }
];

export const MOCK_SENTIMENT_TIMELINE = [
  { time: '00:00', supportive: 58, against: 12, anxious: 15, excited: 12, sarcastic: 3, postsCount: 1420 },
  { time: '03:00', supportive: 54, against: 14, anxious: 18, excited: 10, sarcastic: 4, postsCount: 980 },
  { time: '06:00', supportive: 62, against: 10, anxious: 12, excited: 14, sarcastic: 2, postsCount: 1840 },
  { time: '09:00', supportive: 68, against: 8, anxious: 9, excited: 21, sarcastic: 4, postsCount: 4200 },
  { time: '12:00', supportive: 65, against: 11, anxious: 11, excited: 19, sarcastic: 6, postsCount: 5600 },
  { time: '15:00', supportive: 72, against: 7, anxious: 8, excited: 24, sarcastic: 5, postsCount: 6800 },
  { time: '18:00', supportive: 76, against: 6, anxious: 7, excited: 28, sarcastic: 3, postsCount: 8400 },
  { time: '21:00', supportive: 70, against: 9, anxious: 10, excited: 22, sarcastic: 4, postsCount: 6100 }
];

export const MOCK_NOTICES = [
  {
    id: 'not-1',
    isNew: true,
    title: 'Platform Maintenance Schedule for Q3',
    date: '12 Oct 2024',
    category: 'System'
  },
  {
    id: 'not-2',
    isNew: true,
    title: 'Integration of Vernacular NLP Models',
    date: '08 Oct 2024',
    category: 'Model Update'
  },
  {
    id: 'not-3',
    isNew: false,
    title: 'Updated API Documentation v2.1',
    date: '25 Sep 2024',
    category: 'Documentation'
  },
  {
    id: 'not-4',
    isNew: false,
    title: 'SIH 2026 Problem Statement #26152 Evaluation Criteria Finalized',
    date: '18 Sep 2024',
    category: 'Hackathon'
  }
];
