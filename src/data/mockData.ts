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
  id: 'DEMO-ANA-8492',
  name: 'Commander S. K. Verma',
  badgeId: 'DEMO-ANALYST-001',
  role: 'Demo Analyst',
  clearanceLevel: 'DEMO ACCESS',
  agency: 'SIH 2026 Prototype Sandbox',
  department: 'Open Source Intelligence (OSINT) Analytics Cell'
};

export const MOCK_POSTS: SocialPost[] = [
  // X (formerly Twitter) Posts
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

  // Telegram Broadcasts & Channels
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
    content: 'Delhi-Varanasi High Speed Rail project detailed project report enters final clearance stage. 12 stations planned with multi-modal transport hubs. Construction expected in 3 phases. #HighSpeedRail #NationalHighwayExpansion',
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
    id: 'post-107',
    platform: 'telegram',
    platformPostId: 'tg_chan_alert_911',
    account: {
      id: 'acc-7',
      platform: 'telegram',
      platformUserId: 'tg_osint_bharat',
      username: 'BharatOSINT_Alerts',
      displayName: 'Bharat OSINT Operations',
      avatarUrl: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&auto=format&fit=crop&q=80',
      bio: 'Open Source Intelligence aggregation for Indian security analysts and cyber resilience.',
      followerCount: 62400,
      followingCount: 5,
      isProtected: false,
      isBotSuspected: false,
      botScore: 0.05,
      inferredRegion: 'Chandigarh / Punjab',
      inferredAge: '25-34',
      inferredLanguage: 'English / Punjabi',
      centralityScore: 0.81
    },
    content: '⚠️ Advisory: Automated phishing waves detected imitating National Tax Portal OTP notifications. Advise all regional network nodes to enforce FIDO2 WebAuthn authentication. #CyberSecurity2026 #CERTIn',
    language: 'en',
    postedAt: '2026-08-24T18:40:00Z',
    ingestedAt: '2026-08-24T18:40:04Z',
    likeCount: 1890,
    shareCount: 940,
    commentCount: 88,
    sentiment: {
      primaryLabel: 'anxious',
      polarityScore: -0.45,
      sarcasmScore: 0.02,
      anxietyScore: 0.84,
      excitementScore: 0.10,
      supportScore: 0.65,
      oppositionScore: 0.15,
      confidence: 0.93,
      modelVersion: 'sanket-indic-roberta-v3.2'
    },
    topics: ['#CyberSecurity2026', '#CERTIn', '#Infosec']
  },

  // Instagram Public Posts & Reels Commentary
  {
    id: 'post-108',
    platform: 'instagram',
    platformPostId: 'ig_media_78392104',
    account: {
      id: 'acc-8',
      platform: 'instagram',
      platformUserId: 'ig_design_india',
      username: 'bharat_creative_lab',
      displayName: 'Bharat Creative Innovations',
      avatarUrl: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&auto=format&fit=crop&q=80',
      bio: 'Showcasing homegrown tech startups, robotics prototypes and hackathon creators 🇮🇳',
      followerCount: 115000,
      followingCount: 310,
      isProtected: false,
      isBotSuspected: false,
      botScore: 0.02,
      inferredRegion: 'Ahmedabad, Gujarat',
      inferredAge: '18-24',
      inferredLanguage: 'Hindi / English',
      centralityScore: 0.69
    },
    content: 'Student innovators build autonomous rover using indigenous RISC-V Shakti processors at #SmartIndiaHackathon2026! Future of hardware engineering looks bright in India 🔥🤖 #InnovateIndia #DeepTech',
    language: 'en',
    postedAt: '2026-08-24T17:50:00Z',
    ingestedAt: '2026-08-24T17:50:12Z',
    likeCount: 8430,
    shareCount: 1520,
    commentCount: 420,
    sentiment: {
      primaryLabel: 'excited',
      polarityScore: 0.91,
      sarcasmScore: 0.01,
      anxietyScore: 0.02,
      excitementScore: 0.96,
      supportScore: 0.94,
      oppositionScore: 0.01,
      confidence: 0.96,
      modelVersion: 'sanket-indic-roberta-v3.2'
    },
    topics: ['#SmartIndiaHackathon2026', '#InnovateIndia', '#DeepTech']
  },
  {
    id: 'post-109',
    platform: 'instagram',
    platformPostId: 'ig_media_6628190',
    account: {
      id: 'acc-9',
      platform: 'instagram',
      platformUserId: 'ig_lifestyle_kolkata',
      username: 'kolkata_metro_daily',
      displayName: 'Kolkata Urban Vibe',
      avatarUrl: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=100&auto=format&fit=crop&q=80',
      bio: 'Everyday glimpses of City of Joy | Transport, heritage & food.',
      followerCount: 47800,
      followingCount: 190,
      isProtected: false,
      isBotSuspected: false,
      botScore: 0.03,
      inferredRegion: 'Kolkata, West Bengal',
      inferredAge: '18-24',
      inferredLanguage: 'Bengali / English',
      centralityScore: 0.48
    },
    content: 'The underwater metro stretch is saving over 45 minutes of daily commute across the river Hooghly. Smooth transit and super clean stations! 🚇✨ #DigitalIndia #SmartMobility',
    language: 'en',
    postedAt: '2026-08-24T15:20:00Z',
    ingestedAt: '2026-08-24T15:20:08Z',
    likeCount: 6200,
    shareCount: 880,
    commentCount: 215,
    sentiment: {
      primaryLabel: 'supportive',
      polarityScore: 0.88,
      sarcasmScore: 0.00,
      anxietyScore: 0.03,
      excitementScore: 0.82,
      supportScore: 0.91,
      oppositionScore: 0.02,
      confidence: 0.95,
      modelVersion: 'sanket-indic-roberta-v3.2'
    },
    topics: ['#DigitalIndia', '#SmartMobility', '#UrbanInfra']
  },

  // Reddit Discussions
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
      bio: 'PhD candidate researching cloud protocols and cyber defense frameworks in r/developersIndia.',
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
    content: 'Deep dive into DPDP Act compliance architecture for LLM providers operating in India. How are local teams setting up local embeddings vs overseas inference pipelines? Analysis of data boundary requirements. #DataPrivacy #CyberSecurity2026',
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
    topics: ['#DataPrivacy', '#CyberSecurity2026', '#TechPolicy']
  },
  {
    id: 'post-110',
    platform: 'reddit',
    platformPostId: 'rd_thread_z8821p',
    account: {
      id: 'acc-10',
      platform: 'reddit',
      platformUserId: 'u_hardware_guru',
      username: 'u/SiliconBharat',
      displayName: 'SiliconBharat',
      avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=80',
      bio: 'ASIC layout and wafer lithography specialist active in r/India and r/hardware.',
      followerCount: 2890,
      followingCount: 80,
      isProtected: false,
      isBotSuspected: false,
      botScore: 0.01,
      inferredRegion: 'Bengaluru, Karnataka',
      inferredAge: '25-34',
      inferredLanguage: 'English',
      centralityScore: 0.58
    },
    content: 'Reviewing the pilot test wafer yields for the new Dholera packaging cluster under #SemiconductorMission. The 28nm legacy node is ideal for automotive ECUs and industrial IoT gateways. Great foundation for sovereign supply chains.',
    language: 'en',
    postedAt: '2026-08-24T16:45:00Z',
    ingestedAt: '2026-08-24T16:45:12Z',
    likeCount: 1120,
    shareCount: 340,
    commentCount: 156,
    sentiment: {
      primaryLabel: 'supportive',
      polarityScore: 0.78,
      sarcasmScore: 0.01,
      anxietyScore: 0.05,
      excitementScore: 0.74,
      supportScore: 0.89,
      oppositionScore: 0.04,
      confidence: 0.93,
      modelVersion: 'sanket-indic-roberta-v3.2'
    },
    topics: ['#SemiconductorMission', '#DigitalIndia', '#HardwareIndia']
  },

  // YouTube Comments & Video Discourse
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
      bio: 'Public comment on Tech Innovation documentary.',
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
    content: 'यह कदम देश के युवाओं के लिए गेम चेंजर साबित होगा। इंडिक एआई मॉडल्स और लोकल चिप फैब से आत्मनिर्भरता को बड़ा बढ़ावा मिलेगा। जय हिन्द! 🇮🇳 #IndicAI #SemiconductorMission',
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
  },
  {
    id: 'post-111',
    platform: 'youtube',
    platformPostId: 'yt_comment_441098',
    account: {
      id: 'acc-11',
      platform: 'youtube',
      platformUserId: 'yt_user_meera_iyer',
      username: 'MeeraTechBytes',
      displayName: 'Meera Iyer',
      avatarUrl: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&auto=format&fit=crop&q=80',
      bio: 'Electronics engineer analyzing national tech policies on YouTube.',
      followerCount: 18400,
      followingCount: 110,
      isProtected: false,
      isBotSuspected: false,
      botScore: 0.02,
      inferredRegion: 'Chennai, Tamil Nadu',
      inferredAge: '25-34',
      inferredLanguage: 'Tamil / English',
      centralityScore: 0.54
    },
    content: 'Clean explanation of sovereign cloud data corridors! Watching how India scales homegrown AI compute infrastructure is truly inspiring. #DigitalIndia #SmartIndiaHackathon2026',
    language: 'en',
    postedAt: '2026-08-24T14:10:00Z',
    ingestedAt: '2026-08-24T14:10:04Z',
    likeCount: 1450,
    shareCount: 120,
    commentCount: 64,
    sentiment: {
      primaryLabel: 'excited',
      polarityScore: 0.89,
      sarcasmScore: 0.01,
      anxietyScore: 0.03,
      excitementScore: 0.88,
      supportScore: 0.92,
      oppositionScore: 0.02,
      confidence: 0.95,
      modelVersion: 'sanket-indic-roberta-v3.2'
    },
    topics: ['#DigitalIndia', '#SmartIndiaHackathon2026', '#SovereignAI']
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
  complianceStandard: 'Privacy Protection'
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
      'Cyber security guidelines and advisories issued for cloud infra.',
      'Standard encryption protocols updated across digital gateways.'
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
    label: 'Cyber Defense Alerts Node',
    username: '@CyberSecurity_Alerts',
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
    username: '@SIH_InnovationCell',
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

export interface PlatformSpecificData {
  name: string;
  totalPosts: string;
  growthRate: string;
  polarity: string;
  polarityDominant: string;
  activeClustersCount: number;
  activeClusterPeak: string;
  botPercentage: string;
  botCount: string;
  botRings: string;
  timeline: { time: string; supportive: number; against: number; anxious: number; excited: number; sarcastic: number; postsCount: number }[];
  demographics: DemographicData;
  trends: TrendTopic[];
}

export const PLATFORM_DATA_MAP: Record<string, PlatformSpecificData> = {
  all: {
    name: 'All Ingested Channels (5 Platforms)',
    totalPosts: '310,650',
    growthRate: '+18.4% growth / 24h',
    polarity: '+0.74',
    polarityDominant: 'Dominant: Supportive & Optimistic',
    activeClustersCount: 14,
    activeClusterPeak: '#SemiconductorMission (#1 Peak)',
    botPercentage: '4.2%',
    botCount: '1,248',
    botRings: '2 Coordinated Groups Found',
    timeline: MOCK_SENTIMENT_TIMELINE,
    demographics: MOCK_DEMOGRAPHICS,
    trends: MOCK_TRENDS
  },
  x: {
    name: 'X (formerly Twitter)',
    totalPosts: '142,850',
    growthRate: '+24.6% growth / 24h',
    polarity: '+0.61',
    polarityDominant: 'Dominant: Polarized Discourse & Sarcasm',
    activeClustersCount: 8,
    activeClusterPeak: '#SemiconductorMission (High KOL Velocity)',
    botPercentage: '6.8%',
    botCount: '890',
    botRings: '2 Coordinated Groups Found',
    timeline: [
      { time: '00:00', supportive: 45, against: 18, anxious: 19, excited: 10, sarcastic: 8, postsCount: 920 },
      { time: '03:00', supportive: 42, against: 20, anxious: 22, excited: 9, sarcastic: 7, postsCount: 650 },
      { time: '06:00', supportive: 52, against: 15, anxious: 16, excited: 11, sarcastic: 6, postsCount: 1240 },
      { time: '09:00', supportive: 60, against: 12, anxious: 12, excited: 18, sarcastic: 8, postsCount: 2900 },
      { time: '12:00', supportive: 58, against: 14, anxious: 13, excited: 17, sarcastic: 12, postsCount: 3800 },
      { time: '15:00', supportive: 66, against: 10, anxious: 9, excited: 20, sarcastic: 9, postsCount: 4500 },
      { time: '18:00', supportive: 71, against: 9, anxious: 8, excited: 24, sarcastic: 7, postsCount: 5600 },
      { time: '21:00', supportive: 63, against: 12, anxious: 11, excited: 21, sarcastic: 8, postsCount: 4100 }
    ],
    demographics: {
      ageBrackets: [
        { bracket: '18-24', percentage: 34.2, confidence: 0.91 },
        { bracket: '25-34', percentage: 46.5, confidence: 0.94 },
        { bracket: '35-44', percentage: 14.1, confidence: 0.86 },
        { bracket: '45-54', percentage: 3.9, confidence: 0.78 },
        { bracket: '55+', percentage: 1.3, confidence: 0.69 }
      ],
      geography: [
        { region: 'Delhi NCR (Capital Region)', percentage: 28.4, count: 40500, sentimentBias: '+0.54 (Intense Debate)' },
        { region: 'Maharashtra (MMR & Pune)', percentage: 24.1, count: 34400, sentimentBias: '+0.70 (Supportive)' },
        { region: 'Karnataka (Bengaluru Tech Hub)', percentage: 22.8, count: 32500, sentimentBias: '+0.84 (Tech Excited)' },
        { region: 'Telangana (Hyderabad Region)', percentage: 11.2, count: 16000, sentimentBias: '+0.72 (Supportive)' },
        { region: 'Other States & UTs', percentage: 13.5, count: 19450, sentimentBias: '+0.59 (Mixed)' }
      ],
      languages: [
        { language: 'en', name: 'English', percentage: 52.4 },
        { language: 'hi-en', name: 'Hinglish (Code-Mixed)', percentage: 28.2 },
        { language: 'hi', name: 'Hindi', percentage: 14.1 },
        { language: 'ta', name: 'Tamil', percentage: 3.2 },
        { language: 'te', name: 'Telugu', percentage: 2.1 }
      ],
      affinities: [
        { cluster: 'DeepTech & Semiconductor Enthusiasts', percentage: 41.5, growth: 24.2 },
        { cluster: 'Policy, Cyber Security & Governance', percentage: 32.0, growth: 16.8 },
        { cluster: 'Political & Public Discourse', percentage: 18.2, growth: -4.1 },
        { cluster: 'Academic & Research Scholars', percentage: 8.3, growth: 5.4 }
      ],
      sampleSize: 142850,
      overallConfidence: 0.935,
      complianceStandard: 'Privacy Protection'
    },
    trends: [
      {
        id: 'x-trend-1',
        keyword: '#SemiconductorMission',
        normalizedKeyword: 'semiconductor mission',
        category: 'DeepTech Sovereignty',
        mentionCount: 58400,
        velocity: 48.2,
        rank: 1,
        predictedNextRank: 1,
        firstDetectedAt: '2026-08-23T04:00:00Z',
        sentimentBreakdown: { supportive: 64, against: 5, anxious: 7, excited: 20, sarcastic: 4 },
        samplePosts: ['Pilot wafers dry-run cleared in Dholera fab.', 'High-tech domestic fab creates 12,000 OSAT engineering jobs.']
      },
      {
        id: 'x-trend-2',
        keyword: '#CyberSecurity2026',
        normalizedKeyword: 'cybersecurity 2026',
        category: 'National Defense',
        mentionCount: 39100,
        velocity: 31.5,
        rank: 2,
        predictedNextRank: 2,
        firstDetectedAt: '2026-08-23T11:30:00Z',
        sentimentBreakdown: { supportive: 51, against: 7, anxious: 32, excited: 6, sarcastic: 4 },
        samplePosts: ['Critical cloud infrastructure guidelines issued.', 'Advisory on phishing campaign targeting digital banking portals.']
      },
      {
        id: 'x-trend-3',
        keyword: '#SmartCityRealities',
        normalizedKeyword: 'smart city realities',
        category: 'Civic Infrastructure',
        mentionCount: 24800,
        velocity: 18.9,
        rank: 3,
        predictedNextRank: 3,
        firstDetectedAt: '2026-08-24T08:00:00Z',
        sentimentBreakdown: { supportive: 15, against: 48, anxious: 12, excited: 2, sarcastic: 23 },
        samplePosts: ['Monsoon road quality audits ongoing in Delhi and Mumbai.', 'Public civic grievances logged on grievance portal.']
      }
    ]
  },
  telegram: {
    name: 'Telegram Broadcasts',
    totalPosts: '89,400',
    growthRate: '+14.2% growth / 24h',
    polarity: '+0.81',
    polarityDominant: 'Dominant: High Support & Broadcast Information',
    activeClustersCount: 5,
    activeClusterPeak: '#NationalHighwayExpansion (Infra Channel Hubs)',
    botPercentage: '1.9%',
    botCount: '170',
    botRings: '0 Coordinated Groups Found',
    timeline: [
      { time: '00:00', supportive: 68, against: 4, anxious: 8, excited: 18, sarcastic: 2, postsCount: 380 },
      { time: '03:00', supportive: 65, against: 5, anxious: 10, excited: 18, sarcastic: 2, postsCount: 220 },
      { time: '06:00', supportive: 72, against: 4, anxious: 7, excited: 16, sarcastic: 1, postsCount: 540 },
      { time: '09:00', supportive: 79, against: 3, anxious: 5, excited: 21, sarcastic: 2, postsCount: 1450 },
      { time: '12:00', supportive: 76, against: 5, anxious: 6, excited: 20, sarcastic: 3, postsCount: 2100 },
      { time: '15:00', supportive: 82, against: 3, anxious: 4, excited: 25, sarcastic: 2, postsCount: 2800 },
      { time: '18:00', supportive: 85, against: 2, anxious: 4, excited: 28, sarcastic: 1, postsCount: 3400 },
      { time: '21:00', supportive: 78, against: 4, anxious: 6, excited: 22, sarcastic: 2, postsCount: 2300 }
    ],
    demographics: {
      ageBrackets: [
        { bracket: '18-24', percentage: 22.1, confidence: 0.84 },
        { bracket: '25-34', percentage: 48.9, confidence: 0.91 },
        { bracket: '35-44', percentage: 21.6, confidence: 0.88 },
        { bracket: '45-54', percentage: 5.8, confidence: 0.82 },
        { bracket: '55+', percentage: 1.6, confidence: 0.74 }
      ],
      geography: [
        { region: 'Uttar Pradesh & Bihar Corridor', percentage: 31.4, count: 28000, sentimentBias: '+0.88 (High Support)' },
        { region: 'Delhi NCR (Capital Region)', percentage: 24.2, count: 21600, sentimentBias: '+0.78 (Supportive)' },
        { region: 'Maharashtra (Western Hub)', percentage: 18.5, count: 16500, sentimentBias: '+0.82 (Supportive)' },
        { region: 'Rajasthan & Haryana', percentage: 14.1, count: 12600, sentimentBias: '+0.76 (Supportive)' },
        { region: 'Other States & UTs', percentage: 11.8, count: 10700, sentimentBias: '+0.79 (Supportive)' }
      ],
      languages: [
        { language: 'hi', name: 'Hindi', percentage: 49.5 },
        { language: 'en', name: 'English', percentage: 33.2 },
        { language: 'hi-en', name: 'Hinglish (Code-Mixed)', percentage: 12.8 },
        { language: 'mr', name: 'Marathi', percentage: 4.5 }
      ],
      affinities: [
        { cluster: 'Infrastructure & National Mobility', percentage: 42.1, growth: 21.5 },
        { cluster: 'Competitive Exams & Tech Careers', percentage: 31.4, growth: 14.2 },
        { cluster: 'Cyber Defense & Alerts', percentage: 18.2, growth: 9.8 },
        { cluster: 'General Public Broadcasts', percentage: 8.3, growth: 3.1 }
      ],
      sampleSize: 89400,
      overallConfidence: 0.902,
      complianceStandard: 'Privacy Protection'
    },
    trends: [
      {
        id: 'tg-trend-1',
        keyword: '#NationalHighwayExpansion',
        normalizedKeyword: 'national highway expansion',
        category: 'Expressway & High Speed Rail',
        mentionCount: 38400,
        velocity: 22.4,
        rank: 1,
        predictedNextRank: 1,
        firstDetectedAt: '2026-08-22T08:00:00Z',
        sentimentBreakdown: { supportive: 82, against: 3, anxious: 5, excited: 18, sarcastic: 1 },
        samplePosts: ['Delhi-Varanasi High Speed Rail detailed alignment approved.', 'Greenfield freight corridors cut transit costs.']
      },
      {
        id: 'tg-trend-2',
        keyword: '#CyberSecurityAlerts',
        normalizedKeyword: 'cyber security alerts',
        category: 'CERT-In & Threat Intel',
        mentionCount: 28900,
        velocity: 35.8,
        rank: 2,
        predictedNextRank: 2,
        firstDetectedAt: '2026-08-24T05:00:00Z',
        sentimentBreakdown: { supportive: 72, against: 2, anxious: 22, excited: 10, sarcastic: 1 },
        samplePosts: ['Phishing vectors detected impersonating state utilities.', 'Guidelines for two-factor hardware keys released.']
      }
    ]
  },
  instagram: {
    name: 'Instagram Public',
    totalPosts: '32,100',
    growthRate: '+28.9% growth / 24h',
    polarity: '+0.88',
    polarityDominant: 'Dominant: High Excitement, Visual Innovation & Pride',
    activeClustersCount: 4,
    activeClusterPeak: '#SmartIndiaHackathon2026 (Student Creators)',
    botPercentage: '2.1%',
    botCount: '68',
    botRings: '0 Coordinated Groups Found',
    timeline: [
      { time: '00:00', supportive: 62, against: 3, anxious: 4, excited: 30, sarcastic: 1, postsCount: 180 },
      { time: '03:00', supportive: 59, against: 4, anxious: 5, excited: 28, sarcastic: 2, postsCount: 110 },
      { time: '06:00', supportive: 66, against: 3, anxious: 3, excited: 32, sarcastic: 1, postsCount: 290 },
      { time: '09:00', supportive: 74, against: 2, anxious: 3, excited: 38, sarcastic: 2, postsCount: 780 },
      { time: '12:00', supportive: 72, against: 3, anxious: 4, excited: 36, sarcastic: 3, postsCount: 1200 },
      { time: '15:00', supportive: 80, against: 2, anxious: 2, excited: 44, sarcastic: 1, postsCount: 1650 },
      { time: '18:00', supportive: 86, against: 1, anxious: 2, excited: 50, sarcastic: 1, postsCount: 2200 },
      { time: '21:00', supportive: 79, against: 2, anxious: 3, excited: 42, sarcastic: 2, postsCount: 1540 }
    ],
    demographics: {
      ageBrackets: [
        { bracket: '18-24', percentage: 58.4, confidence: 0.95 },
        { bracket: '25-34', percentage: 32.1, confidence: 0.92 },
        { bracket: '35-44', percentage: 7.2, confidence: 0.81 },
        { bracket: '45-54', percentage: 1.8, confidence: 0.70 },
        { bracket: '55+', percentage: 0.5, confidence: 0.60 }
      ],
      geography: [
        { region: 'Gujarat (Ahmedabad & Surat)', percentage: 24.5, count: 7800, sentimentBias: '+0.92 (High Excitement)' },
        { region: 'Maharashtra (Mumbai & Pune)', percentage: 23.2, count: 7400, sentimentBias: '+0.88 (Supportive)' },
        { region: 'West Bengal (Kolkata Metro)', percentage: 18.1, count: 5800, sentimentBias: '+0.89 (Excited)' },
        { region: 'Karnataka (Bengaluru Tech Hub)', percentage: 17.4, count: 5600, sentimentBias: '+0.91 (Creative Tech)' },
        { region: 'Other States & UTs', percentage: 16.8, count: 5500, sentimentBias: '+0.82 (Supportive)' }
      ],
      languages: [
        { language: 'en', name: 'English', percentage: 46.8 },
        { language: 'hi-en', name: 'Hinglish (Code-Mixed)', percentage: 34.5 },
        { language: 'hi', name: 'Hindi', percentage: 11.2 },
        { language: 'bn', name: 'Bengali', percentage: 4.8 },
        { language: 'gu', name: 'Gujarati', percentage: 2.7 }
      ],
      affinities: [
        { cluster: 'Youth Robotics & Hardware Startups', percentage: 48.6, growth: 36.2 },
        { cluster: 'Smart Mobility & Modern Transit', percentage: 29.4, growth: 19.5 },
        { cluster: 'Campus Hackathons & Coding Life', percentage: 16.2, growth: 12.8 },
        { cluster: 'Digital Creators & Reels Community', percentage: 5.8, growth: 4.2 }
      ],
      sampleSize: 32100,
      overallConfidence: 0.942,
      complianceStandard: 'Privacy Protection'
    },
    trends: [
      {
        id: 'ig-trend-1',
        keyword: '#SmartIndiaHackathon2026',
        normalizedKeyword: 'smart india hackathon 2026',
        category: 'Innovation & Youth',
        mentionCount: 19800,
        velocity: 64.2,
        rank: 1,
        predictedNextRank: 1,
        firstDetectedAt: '2026-08-24T06:00:00Z',
        sentimentBreakdown: { supportive: 68, against: 1, anxious: 3, excited: 46, sarcastic: 1 },
        samplePosts: ['Autonomous rovers built on indigenous RISC-V processors showcase.', 'Over 50,000 teams registered across college labs.']
      },
      {
        id: 'ig-trend-2',
        keyword: '#InnovateIndia',
        normalizedKeyword: 'innovate india',
        category: 'Hardware Startups',
        mentionCount: 11200,
        velocity: 38.4,
        rank: 2,
        predictedNextRank: 2,
        firstDetectedAt: '2026-08-23T14:00:00Z',
        sentimentBreakdown: { supportive: 78, against: 1, anxious: 2, excited: 38, sarcastic: 0 },
        samplePosts: ['High-speed 3D printing labs in tier-2 engineering colleges.', 'Next-gen drone prototypes for precision agriculture.']
      }
    ]
  },
  reddit: {
    name: 'Reddit Discussions',
    totalPosts: '18,900',
    growthRate: '+11.8% growth / 24h',
    polarity: '+0.42',
    polarityDominant: 'Dominant: Analytical, Technical & Nuanced Inquiry',
    activeClustersCount: 4,
    activeClusterPeak: '#DataPrivacy (DPDP Act Technical Architecture)',
    botPercentage: '1.2%',
    botCount: '22',
    botRings: '0 Coordinated Groups Found',
    timeline: [
      { time: '00:00', supportive: 42, against: 12, anxious: 24, excited: 14, sarcastic: 8, postsCount: 120 },
      { time: '03:00', supportive: 40, against: 14, anxious: 26, excited: 12, sarcastic: 8, postsCount: 95 },
      { time: '06:00', supportive: 46, against: 11, anxious: 22, excited: 15, sarcastic: 6, postsCount: 160 },
      { time: '09:00', supportive: 55, against: 8, anxious: 18, excited: 22, sarcastic: 7, postsCount: 380 },
      { time: '12:00', supportive: 52, against: 10, anxious: 19, excited: 20, sarcastic: 9, postsCount: 510 },
      { time: '15:00', supportive: 60, against: 7, anxious: 15, excited: 24, sarcastic: 6, postsCount: 640 },
      { time: '18:00', supportive: 64, against: 6, anxious: 14, excited: 26, sarcastic: 5, postsCount: 820 },
      { time: '21:00', supportive: 58, against: 8, anxious: 17, excited: 22, sarcastic: 6, postsCount: 590 }
    ],
    demographics: {
      ageBrackets: [
        { bracket: '18-24', percentage: 24.5, confidence: 0.88 },
        { bracket: '25-34', percentage: 56.8, confidence: 0.95 },
        { bracket: '35-44', percentage: 15.2, confidence: 0.89 },
        { bracket: '45-54', percentage: 2.9, confidence: 0.76 },
        { bracket: '55+', percentage: 0.6, confidence: 0.65 }
      ],
      geography: [
        { region: 'Karnataka (Bengaluru r/developersIndia)', percentage: 36.2, count: 6800, sentimentBias: '+0.72 (Technical Review)' },
        { region: 'Telangana (Hyderabad Tech Hub)', percentage: 24.1, count: 4500, sentimentBias: '+0.68 (Architecture Debate)' },
        { region: 'Maharashtra (Pune Techies)', percentage: 18.5, count: 3500, sentimentBias: '+0.65 (Constructive)' },
        { region: 'Delhi NCR (Capital Developers)', percentage: 12.4, count: 2300, sentimentBias: '+0.54 (Policy Inquiry)' },
        { region: 'Other States & UTs', percentage: 8.8, count: 1800, sentimentBias: '+0.58 (Mixed)' }
      ],
      languages: [
        { language: 'en', name: 'English', percentage: 88.5 },
        { language: 'hi-en', name: 'Hinglish (Code-Mixed)', percentage: 9.8 },
        { language: 'te', name: 'Telugu', percentage: 1.7 }
      ],
      affinities: [
        { cluster: 'Cloud Architecture & DPDP Compliance', percentage: 46.2, growth: 22.4 },
        { cluster: 'Semiconductor Lithography & Yields', percentage: 32.5, growth: 18.9 },
        { cluster: 'Open-Source AI & Indic LLM Research', percentage: 16.1, growth: 14.5 },
        { cluster: 'Tech Career & Remote Work', percentage: 5.2, growth: 1.2 }
      ],
      sampleSize: 18900,
      overallConfidence: 0.958,
      complianceStandard: 'Privacy Protection'
    },
    trends: [
      {
        id: 'rd-trend-1',
        keyword: '#DataPrivacy',
        normalizedKeyword: 'data privacy and dpdp',
        category: 'Legal Tech & Cloud Boundaries',
        mentionCount: 9400,
        velocity: 19.8,
        rank: 1,
        predictedNextRank: 1,
        firstDetectedAt: '2026-08-24T12:00:00Z',
        sentimentBreakdown: { supportive: 58, against: 8, anxious: 24, excited: 16, sarcastic: 3 },
        samplePosts: ['DPDP Act compliance boundary for local embeddings vs overseas LLMs.', 'Analysis of data sovereignty requirements in cloud tenancy.']
      },
      {
        id: 'rd-trend-2',
        keyword: '#HardwareIndia',
        normalizedKeyword: 'hardware and asic design',
        category: 'Semiconductor Engineering',
        mentionCount: 6800,
        velocity: 26.2,
        rank: 2,
        predictedNextRank: 2,
        firstDetectedAt: '2026-08-24T15:00:00Z',
        sentimentBreakdown: { supportive: 72, against: 4, anxious: 6, excited: 28, sarcastic: 1 },
        samplePosts: ['Reviewing pilot test wafer yields for 28nm legacy automotive node.', 'ASIC layout and verification opportunities in Bengaluru hubs.']
      }
    ]
  },
  youtube: {
    name: 'YouTube Comments',
    totalPosts: '27,400',
    growthRate: '+22.1% growth / 24h',
    polarity: '+0.91',
    polarityDominant: 'Dominant: Highly Supportive, Patriotic & Vernacular Enthusiasm',
    activeClustersCount: 4,
    activeClusterPeak: '#IndicAI (Vernacular AI Demos & National Compute)',
    botPercentage: '1.4%',
    botCount: '38',
    botRings: '0 Coordinated Groups Found',
    timeline: [
      { time: '00:00', supportive: 72, against: 2, anxious: 3, excited: 28, sarcastic: 1, postsCount: 220 },
      { time: '03:00', supportive: 69, against: 3, anxious: 4, excited: 26, sarcastic: 1, postsCount: 150 },
      { time: '06:00', supportive: 75, against: 2, anxious: 3, excited: 30, sarcastic: 1, postsCount: 340 },
      { time: '09:00', supportive: 82, against: 1, anxious: 2, excited: 38, sarcastic: 1, postsCount: 920 },
      { time: '12:00', supportive: 80, against: 2, anxious: 3, excited: 36, sarcastic: 2, postsCount: 1400 },
      { time: '15:00', supportive: 88, against: 1, anxious: 2, excited: 44, sarcastic: 1, postsCount: 1950 },
      { time: '18:00', supportive: 92, against: 1, anxious: 1, excited: 50, sarcastic: 0, postsCount: 2600 },
      { time: '21:00', supportive: 86, against: 1, anxious: 2, excited: 42, sarcastic: 1, postsCount: 1820 }
    ],
    demographics: {
      ageBrackets: [
        { bracket: '18-24', percentage: 32.4, confidence: 0.90 },
        { bracket: '25-34', percentage: 42.1, confidence: 0.93 },
        { bracket: '35-44', percentage: 17.8, confidence: 0.86 },
        { bracket: '45-54', percentage: 5.9, confidence: 0.79 },
        { bracket: '55+', percentage: 1.8, confidence: 0.71 }
      ],
      geography: [
        { region: 'Maharashtra (Pune & Nashik)', percentage: 26.2, count: 7200, sentimentBias: '+0.94 (Extreme Support)' },
        { region: 'Tamil Nadu (Chennai & Madurai)', percentage: 22.4, count: 6100, sentimentBias: '+0.91 (High Tech Pride)' },
        { region: 'Uttar Pradesh (Lucknow & Kanpur)', percentage: 20.1, count: 5500, sentimentBias: '+0.93 (Supportive)' },
        { region: 'Karnataka (Bengaluru Region)', percentage: 18.5, count: 5100, sentimentBias: '+0.90 (Supportive)' },
        { region: 'Other States & UTs', percentage: 12.8, count: 3500, sentimentBias: '+0.88 (Supportive)' }
      ],
      languages: [
        { language: 'hi', name: 'Hindi', percentage: 48.2 },
        { language: 'ta', name: 'Tamil', percentage: 22.5 },
        { language: 'en', name: 'English', percentage: 18.1 },
        { language: 'mr', name: 'Marathi', percentage: 7.2 },
        { language: 'te', name: 'Telugu', percentage: 4.0 }
      ],
      affinities: [
        { cluster: 'Indic AI Models & Vernacular NLP Demos', percentage: 51.4, growth: 32.8 },
        { cluster: 'Mega Infrastructure & Vande Bharat Tech', percentage: 28.2, growth: 16.4 },
        { cluster: 'Defense Tech & Electronic Warfare', percentage: 14.2, growth: 11.2 },
        { cluster: 'Tech Documentary Viewers', percentage: 6.2, growth: 4.5 }
      ],
      sampleSize: 27400,
      overallConfidence: 0.938,
      complianceStandard: 'Privacy Protection'
    },
    trends: [
      {
        id: 'yt-trend-1',
        keyword: '#IndicAI',
        normalizedKeyword: 'indic ai and sovereign compute',
        category: 'Vernacular Artificial Intelligence',
        mentionCount: 16800,
        velocity: 52.4,
        rank: 1,
        predictedNextRank: 1,
        firstDetectedAt: '2026-08-24T10:00:00Z',
        sentimentBreakdown: { supportive: 91, against: 1, anxious: 2, excited: 45, sarcastic: 0 },
        samplePosts: ['Indic AI models and local chip fab will drive huge self-reliance.', 'Watch sovereign compute cluster benchmarks.']
      },
      {
        id: 'yt-trend-2',
        keyword: '#SovereignAI',
        normalizedKeyword: 'sovereign ai cloud corridors',
        category: 'National Compute Corridors',
        mentionCount: 9800,
        velocity: 34.1,
        rank: 2,
        predictedNextRank: 2,
        firstDetectedAt: '2026-08-24T12:30:00Z',
        sentimentBreakdown: { supportive: 86, against: 2, anxious: 3, excited: 39, sarcastic: 1 },
        samplePosts: ['Clean explanation of sovereign cloud data corridors in India.', 'Scaling homegrown AI compute infrastructure.']
      }
    ]
  }
};

/**
 * Derives platform data dynamically scaled for the requested time range window.
 * Supports: '6h' (Rapid Wave), '24h' (Standard Operational), '7d' (Strategic Trend), '30d' (Monthly Baseline).
 */
export function getPlatformData(platform: string = 'all', timeRange: string = '24h'): PlatformSpecificData {
  const base = PLATFORM_DATA_MAP[platform] || PLATFORM_DATA_MAP.all;
  if (timeRange === '24h') {
    return base;
  }

  // Multipliers and configurations per time range window
  const config = {
    '6h': {
      multiplier: 0.255,
      timeBadge: '6h',
      growthMultiplier: 0.35,
      clusterMultiplier: 0.65,
      polarityDelta: 0.03,
      botCountMultiplier: 0.25,
      timelinePoints: [
        { time: 'T-5h' },
        { time: 'T-4h' },
        { time: 'T-3h' },
        { time: 'T-2h' },
        { time: 'T-1h' },
        { time: 'T-0h' }
      ]
    },
    '7d': {
      multiplier: 6.2,
      timeBadge: '7d',
      growthMultiplier: 2.3,
      clusterMultiplier: 2.1,
      polarityDelta: -0.02,
      botCountMultiplier: 5.8,
      timelinePoints: [
        { time: 'Day -6' },
        { time: 'Day -5' },
        { time: 'Day -4' },
        { time: 'Day -3' },
        { time: 'Day -2' },
        { time: 'Yesterday' },
        { time: 'Today' }
      ]
    },
    '30d': {
      multiplier: 24.5,
      timeBadge: '30d',
      growthMultiplier: 4.8,
      clusterMultiplier: 3.7,
      polarityDelta: -0.01,
      botCountMultiplier: 21.0,
      timelinePoints: [
        { time: 'Week 1' },
        { time: 'Week 2' },
        { time: 'Week 3' },
        { time: 'Week 4' },
        { time: 'Week 5' }
      ]
    }
  }[timeRange] || {
    multiplier: 1,
    timeBadge: '24h',
    growthMultiplier: 1,
    clusterMultiplier: 1,
    polarityDelta: 0,
    botCountMultiplier: 1,
    timelinePoints: base.timeline.map((t) => ({ time: t.time }))
  };

  // Parse totalPosts number from string
  const basePostsNum = parseInt(base.totalPosts.replace(/,/g, ''), 10) || 310650;
  const scaledPostsNum = Math.round(basePostsNum * config.multiplier);

  // Extract growth rate number
  const growthMatch = base.growthRate.match(/([+-]?\d+(?:\.\d+)?)/);
  const baseGrowthVal = growthMatch ? parseFloat(growthMatch[1]) : 18.4;
  const scaledGrowthVal = (baseGrowthVal * config.growthMultiplier).toFixed(1);
  const scaledGrowthRate = `+${scaledGrowthVal}% growth / ${config.timeBadge}`;

  // Bot count
  const baseBotNum = parseInt(base.botCount.replace(/,/g, ''), 10) || 1248;
  const scaledBotNum = Math.max(1, Math.round(baseBotNum * config.botCountMultiplier));

  // Polarity
  const basePolarityNum = parseFloat(base.polarity) || 0.74;
  const scaledPolarityVal = Math.min(0.99, Math.max(-0.99, basePolarityNum + config.polarityDelta));
  const formattedPolarity = `${scaledPolarityVal >= 0 ? '+' : ''}${scaledPolarityVal.toFixed(2)}`;

  // Scaled timeline with matching time keys
  const scaledTimeline = config.timelinePoints.map((pt, index) => {
    const basePt = base.timeline[index % base.timeline.length];
    return {
      time: pt.time,
      supportive: Math.min(100, Math.max(0, basePt.supportive + (timeRange === '6h' ? 2 : timeRange === '7d' ? -1 : 0))),
      against: Math.min(100, Math.max(0, basePt.against + (timeRange === '7d' ? 1 : 0))),
      anxious: basePt.anxious,
      excited: basePt.excited,
      sarcastic: basePt.sarcastic,
      postsCount: Math.round((basePt.postsCount * config.multiplier) / (config.timelinePoints.length / base.timeline.length))
    };
  });

  // Scaled demographics (sampleSize and region counts)
  const scaledDemographics: DemographicData = {
    ...base.demographics,
    sampleSize: Math.round(base.demographics.sampleSize * config.multiplier),
    geography: base.demographics.geography.map((geo) => ({
      ...geo,
      count: Math.round(geo.count * config.multiplier)
    }))
  };

  // Scaled trends
  const scaledTrends: TrendTopic[] = base.trends.map((trend) => ({
    ...trend,
    mentionCount: Math.round(trend.mentionCount * config.multiplier),
    velocity: parseFloat((trend.velocity * (timeRange === '6h' ? 1.3 : timeRange === '7d' ? 0.7 : timeRange === '30d' ? 0.4 : 1)).toFixed(1))
  }));

  // Scaled clusters & bot rings
  const scaledClustersCount = Math.max(2, Math.round(base.activeClustersCount * config.clusterMultiplier));
  const scaledBotRings = timeRange === '6h' 
    ? (base.botRings.includes('0') ? '0 Coordinated Groups Found' : '1 Coordinated Group Found')
    : timeRange === '7d'
    ? (base.botRings.includes('0') ? '0 Coordinated Groups Found' : '4 Coordinated Groups Found')
    : timeRange === '30d'
    ? (base.botRings.includes('0') ? '0 Coordinated Groups Found' : '9 Coordinated Groups Found')
    : base.botRings;

  return {
    ...base,
    totalPosts: scaledPostsNum.toLocaleString(),
    growthRate: scaledGrowthRate,
    polarity: formattedPolarity,
    activeClustersCount: scaledClustersCount,
    botCount: scaledBotNum.toLocaleString(),
    botRings: scaledBotRings,
    timeline: scaledTimeline,
    demographics: scaledDemographics,
    trends: scaledTrends
  };
}
