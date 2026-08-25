import React, { useState, useEffect } from 'react';
import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell
} from 'recharts';
import {
  MOCK_POSTS,
  MOCK_DEMOGRAPHICS,
  MOCK_TRENDS,
  MOCK_SENTIMENT_TIMELINE,
  MOCK_INGESTION_JOBS
} from '../data/mockData';
import { SocialPost, PlatformType } from '../types';
import { NetworkGraphView } from './NetworkGraphView';

interface DashboardScreenProps {
  initialTab?: string;
  onNavigate: (page: string, tab?: string) => void;
  onOpenImageModal?: (src: string, alt: string, caption: string) => void;
}

export const DashboardScreen: React.FC<DashboardScreenProps> = ({
  initialTab = 'overview',
  onNavigate,
  onOpenImageModal
}) => {
  const [activeTab, setActiveTab] = useState<string>(initialTab);
  const [selectedPlatform, setSelectedPlatform] = useState<string>('all');
  const [timeRange, setTimeRange] = useState<string>('24h');
  const [filterBotSuspected, setFilterBotSuspected] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedPost, setSelectedPost] = useState<SocialPost | null>(MOCK_POSTS[0]);
  const [isLiveStreaming, setIsLiveStreaming] = useState<boolean>(true);
  const [postsList, setPostsList] = useState<SocialPost[]>(MOCK_POSTS);

  // Sync initialTab when changed from parent
  useEffect(() => {
    if (initialTab) {
      setActiveTab(initialTab);
    }
  }, [initialTab]);

  // Live streaming simulation: inject fresh item periodically
  useEffect(() => {
    let timer: any;
    if (isLiveStreaming) {
      timer = setInterval(() => {
        const sampleKeywords = ['#SemiconductorMission', '#CyberSecurity2026', '#DigitalIndia', '#TechInnovation'];
        const randomKw = sampleKeywords[Math.floor(Math.random() * sampleKeywords.length)];
        const randomPlatforms: PlatformType[] = ['x', 'telegram', 'reddit', 'youtube'];
        const randomPlat = randomPlatforms[Math.floor(Math.random() * randomPlatforms.length)];

        const newPost: SocialPost = {
          id: `post-stream-${Date.now()}`,
          platform: randomPlat,
          platformPostId: `st_${Date.now()}`,
          account: {
            id: `acc-str-${Date.now()}`,
            platform: randomPlat,
            platformUserId: `usr_${Math.floor(Math.random() * 9000)}`,
            username: `cyber_watch_${Math.floor(Math.random() * 900)}`,
            displayName: `Public Observer ${Math.floor(Math.random() * 90)}`,
            avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80',
            bio: 'Monitoring public social streams.',
            followerCount: Math.floor(Math.random() * 15000),
            followingCount: 200,
            isProtected: false,
            isBotSuspected: Math.random() < 0.15,
            botScore: Math.random() < 0.15 ? 0.88 : 0.05,
            centralityScore: 0.45
          },
          content: `Real-time intelligence trace on ${randomKw}: Regional node transmission verified. Ingestion timestamp ${new Date().toLocaleTimeString()}.`,
          language: 'en',
          postedAt: new Date().toISOString(),
          ingestedAt: new Date().toISOString(),
          likeCount: Math.floor(Math.random() * 120),
          shareCount: Math.floor(Math.random() * 40),
          commentCount: Math.floor(Math.random() * 15),
          sentiment: {
            primaryLabel: Math.random() > 0.4 ? 'supportive' : 'anxious',
            polarityScore: (Math.random() * 1.6) - 0.8,
            sarcasmScore: Math.random() < 0.2 ? 0.75 : 0.05,
            anxietyScore: Math.random(),
            excitementScore: Math.random(),
            supportScore: Math.random(),
            oppositionScore: Math.random(),
            confidence: 0.92,
            modelVersion: 'sanket-indic-roberta-v3.2'
          },
          topics: [randomKw]
        };

        setPostsList((prev) => [newPost, ...prev.slice(0, 25)]);
      }, 7000);
    }
    return () => clearInterval(timer);
  }, [isLiveStreaming]);

  // Filter posts based on global toolbar
  const filteredPosts = postsList.filter((post) => {
    if (selectedPlatform !== 'all' && post.platform !== selectedPlatform) return false;
    if (filterBotSuspected && !post.account.isBotSuspected) return false;
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const matchContent = post.content.toLowerCase().includes(q);
      const matchUser = post.account.username.toLowerCase().includes(q) || post.account.displayName.toLowerCase().includes(q);
      const matchTopic = post.topics.some((t) => t.toLowerCase().includes(q));
      if (!matchContent && !matchUser && !matchTopic) return false;
    }
    return true;
  });

  const emotionPieData = [
    { name: 'Supportive / Trust', value: 64, color: '#003366' },
    { name: 'Excitement / Pride', value: 18, color: '#fe6500' },
    { name: 'Anxiety / Concern', value: 10, color: '#b91c1c' },
    { name: 'Opposition / Critique', value: 5, color: '#E31E2E' },
    { name: 'Sarcasm / Satire', value: 3, color: '#7c3aed' }
  ];

  return (
    <div className="flex-grow w-full py-4 md:py-6 bg-[#f9f9f9]" id="main-content">
      <div className="max-w-[1280px] mx-auto px-3 sm:px-6 lg:px-8 space-y-4">
        {/* Breadcrumb & Live Status Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs border-b border-[#CCCCCC] pb-3">
          <div className="flex items-center gap-1.5 text-[#737780]">
            <button onClick={() => onNavigate('home')} className="hover:underline text-[#001e40] font-medium">
              Home
            </button>
            <span className="material-symbols-outlined text-[14px]">chevron_right</span>
            <span className="text-[#1a1c1c] font-bold">Analyst Operations Center (SANKET)</span>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsLiveStreaming(!isLiveStreaming)}
              className={`flex items-center gap-1.5 px-2.5 py-1 text-xs font-bold rounded border transition-colors ${
                isLiveStreaming
                  ? 'bg-[#e6f4ea] text-[#138808] border-[#a8dab5]'
                  : 'bg-[#f3f3f3] text-[#737780] border-[#CCCCCC]'
              }`}
            >
              <span className={`w-2 h-2 rounded-full ${isLiveStreaming ? 'bg-[#138808] animate-pulse' : 'bg-[#737780]'}`}></span>
              <span>{isLiveStreaming ? 'Live Stream Active' : 'Stream Paused'}</span>
            </button>
            <span className="text-[#737780] hidden md:inline">|</span>
            <span className="text-[11px] text-[#43474f] font-mono hidden md:inline">
              Active Model: <strong className="text-[#001e40]">sanket-indic-roberta-v3.2</strong>
            </span>
          </div>
        </div>

        {/* Global Filter Toolbar */}
        <div className="bg-white border border-[#CCCCCC] p-3 shadow-xs">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3 items-center">
            {/* Search Input */}
            <div className="relative lg:col-span-2">
              <span className="absolute inset-y-0 left-0 flex items-center pl-2.5 text-[#737780] pointer-events-none">
                <span className="material-symbols-outlined text-base">search</span>
              </span>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search hashtag, topic (#SemiconductorMission), or handle..."
                className="w-full pl-9 pr-3 py-1.5 bg-[#f9f9f9] border border-[#c3c6d1] text-xs focus:bg-white focus:border-[#003366] focus:outline-none transition-colors"
              />
            </div>

            {/* Platform Filter */}
            <div>
              <select
                value={selectedPlatform}
                onChange={(e) => setSelectedPlatform(e.target.value)}
                className="w-full py-1.5 px-2.5 bg-[#f9f9f9] border border-[#c3c6d1] text-xs font-medium text-[#1a1c1c] focus:bg-white focus:border-[#003366] focus:outline-none"
              >
                <option value="all">All Ingested Channels (5 Platforms)</option>
                <option value="x">X (formerly Twitter)</option>
                <option value="telegram">Telegram Broadcasts</option>
                <option value="instagram">Instagram Public</option>
                <option value="reddit">Reddit Discussions</option>
                <option value="youtube">YouTube Comments</option>
              </select>
            </div>

            {/* Time Window */}
            <div>
              <select
                value={timeRange}
                onChange={(e) => setTimeRange(e.target.value)}
                className="w-full py-1.5 px-2.5 bg-[#f9f9f9] border border-[#c3c6d1] text-xs font-medium text-[#1a1c1c] focus:bg-white focus:border-[#003366] focus:outline-none"
              >
                <option value="6h">Last 6 Hours (Rapid Wave)</option>
                <option value="24h">Last 24 Hours (Standard Operational)</option>
                <option value="7d">Last 7 Days (Strategic Trend)</option>
                <option value="30d">Last 30 Days (Monthly Baseline)</option>
              </select>
            </div>

            {/* Inauthentic / Bot Filter Toggle */}
            <div className="flex items-center gap-2 justify-end">
              <label className="flex items-center gap-1.5 text-xs text-[#1a1c1c] font-medium cursor-pointer">
                <input
                  type="checkbox"
                  checked={filterBotSuspected}
                  onChange={(e) => setFilterBotSuspected(e.target.checked)}
                  className="rounded text-[#ba1a1a] focus:ring-[#ba1a1a]"
                />
                <span className={filterBotSuspected ? 'text-[#ba1a1a] font-bold' : ''}>
                  Bot Clusters Only
                </span>
              </label>
            </div>
          </div>
        </div>

        {/* 5 Core Components + Overview Tabs Bar */}
        <div className="border-b border-[#CCCCCC] bg-white flex overflow-x-auto scrollbar-none">
          <button
            onClick={() => setActiveTab('overview')}
            className={`py-3 px-4 text-xs font-bold uppercase tracking-wider transition-colors whitespace-nowrap flex items-center gap-1.5 border-b-2 ${
              activeTab === 'overview'
                ? 'border-[#003366] text-[#003366] bg-[#f3f3f3]'
                : 'border-transparent text-[#43474f] hover:text-[#001e40] hover:bg-[#f9f9f9]'
            }`}
          >
            <span className="material-symbols-outlined text-[16px]">dashboard</span>
            <span>Command Overview</span>
          </button>

          <button
            onClick={() => setActiveTab('sentiment')}
            className={`py-3 px-4 text-xs font-bold uppercase tracking-wider transition-colors whitespace-nowrap flex items-center gap-1.5 border-b-2 ${
              activeTab === 'sentiment'
                ? 'border-[#003366] text-[#003366] bg-[#f3f3f3]'
                : 'border-transparent text-[#43474f] hover:text-[#001e40] hover:bg-[#f9f9f9]'
            }`}
          >
            <span className="material-symbols-outlined text-[16px]">psychology</span>
            <span>Sentiment & Emotion (3.2)</span>
          </button>

          <button
            onClick={() => setActiveTab('demographics')}
            className={`py-3 px-4 text-xs font-bold uppercase tracking-wider transition-colors whitespace-nowrap flex items-center gap-1.5 border-b-2 ${
              activeTab === 'demographics'
                ? 'border-[#003366] text-[#003366] bg-[#f3f3f3]'
                : 'border-transparent text-[#43474f] hover:text-[#001e40] hover:bg-[#f9f9f9]'
            }`}
          >
            <span className="material-symbols-outlined text-[16px]">group</span>
            <span>Demographics (3.3)</span>
          </button>

          <button
            onClick={() => setActiveTab('trends')}
            className={`py-3 px-4 text-xs font-bold uppercase tracking-wider transition-colors whitespace-nowrap flex items-center gap-1.5 border-b-2 ${
              activeTab === 'trends'
                ? 'border-[#003366] text-[#003366] bg-[#f3f3f3]'
                : 'border-transparent text-[#43474f] hover:text-[#001e40] hover:bg-[#f9f9f9]'
            }`}
          >
            <span className="material-symbols-outlined text-[16px]">monitoring</span>
            <span>Trends & Velocity (3.4)</span>
          </button>

          <button
            onClick={() => setActiveTab('network')}
            className={`py-3 px-4 text-xs font-bold uppercase tracking-wider transition-colors whitespace-nowrap flex items-center gap-1.5 border-b-2 ${
              activeTab === 'network'
                ? 'border-[#003366] text-[#003366] bg-[#f3f3f3]'
                : 'border-transparent text-[#43474f] hover:text-[#001e40] hover:bg-[#f9f9f9]'
            }`}
          >
            <span className="material-symbols-outlined text-[16px]">hub</span>
            <span>Network Topology (3.5)</span>
          </button>

          <button
            onClick={() => setActiveTab('timeline')}
            className={`py-3 px-4 text-xs font-bold uppercase tracking-wider transition-colors whitespace-nowrap flex items-center gap-1.5 border-b-2 ${
              activeTab === 'timeline'
                ? 'border-[#003366] text-[#003366] bg-[#f3f3f3]'
                : 'border-transparent text-[#43474f] hover:text-[#001e40] hover:bg-[#f9f9f9]'
            }`}
          >
            <span className="material-symbols-outlined text-[16px]">database</span>
            <span>Data Ingestion & Feed (3.1)</span>
          </button>
        </div>

        {/* TAB 1: COMMAND OVERVIEW */}
        {activeTab === 'overview' && (
          <div className="space-y-4">
            {/* 4 KPI Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="bg-white border border-[#CCCCCC] p-4 rounded shadow-xs">
                <div className="flex justify-between items-start">
                  <span className="text-xs text-[#737780] font-semibold uppercase">Total Monitored Posts</span>
                  <span className="material-symbols-outlined text-[#003366] text-xl">database</span>
                </div>
                <div className="text-2xl font-bold text-[#001e40] font-mono mt-1">310,650</div>
                <div className="text-[11px] text-[#138808] flex items-center gap-1 mt-1 font-semibold">
                  <span className="material-symbols-outlined text-[14px]">trending_up</span>
                  <span>+18.4% velocity / 24h</span>
                </div>
              </div>

              <div className="bg-white border border-[#CCCCCC] p-4 rounded shadow-xs">
                <div className="flex justify-between items-start">
                  <span className="text-xs text-[#737780] font-semibold uppercase">Aggregated Polarity</span>
                  <span className="material-symbols-outlined text-[#138808] text-xl">thumb_up</span>
                </div>
                <div className="text-2xl font-bold text-[#138808] font-mono mt-1">+0.74 <span className="text-xs text-[#43474f] font-normal">/ 1.0</span></div>
                <div className="text-[11px] text-[#43474f] flex items-center gap-1 mt-1">
                  <span>Dominant: Supportive & Optimistic</span>
                </div>
              </div>

              <div className="bg-white border border-[#CCCCCC] p-4 rounded shadow-xs">
                <div className="flex justify-between items-start">
                  <span className="text-xs text-[#737780] font-semibold uppercase">Active Viral Clusters</span>
                  <span className="material-symbols-outlined text-[#fe6500] text-xl">bubble_chart</span>
                </div>
                <div className="text-2xl font-bold text-[#fe6500] font-mono mt-1">14 Clusters</div>
                <div className="text-[11px] text-[#003366] flex items-center gap-1 mt-1 font-semibold">
                  <span>#SemiconductorMission (#1 Peak)</span>
                </div>
              </div>

              <div className="bg-white border border-[#CCCCCC] p-4 rounded shadow-xs">
                <div className="flex justify-between items-start">
                  <span className="text-xs text-[#737780] font-semibold uppercase">Inauthentic Bots Flagged</span>
                  <span className="material-symbols-outlined text-[#E31E2E] text-xl">smart_toy</span>
                </div>
                <div className="text-2xl font-bold text-[#ba1a1a] font-mono mt-1">4.2% <span className="text-xs text-[#737780] font-normal">(1,248)</span></div>
                <div className="text-[11px] text-[#ba1a1a] flex items-center gap-1 mt-1 font-semibold">
                  <span>2 Botnet Rings Isolated</span>
                </div>
              </div>
            </div>

            {/* Fusion Timeline Chart & Emotion Donut */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
              <div className="lg:col-span-2 bg-white border border-[#CCCCCC] p-4 rounded shadow-xs">
                <div className="flex justify-between items-center mb-3">
                  <div>
                    <h3 className="font-serif-headline text-base font-bold text-[#0C0566]">
                      Temporal Emotion Dynamics & Volume
                    </h3>
                    <p className="text-xs text-[#737780]">Real-time sentiment trajectory over 24-hour window</p>
                  </div>
                  <div className="text-xs font-mono text-[#003366] font-bold">T-24h to T-0h</div>
                </div>

                <div className="h-64 w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={MOCK_SENTIMENT_TIMELINE} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                      <defs>
                        <linearGradient id="colorSupport" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#003366" stopOpacity={0.8}/>
                          <stop offset="95%" stopColor="#003366" stopOpacity={0.1}/>
                        </linearGradient>
                        <linearGradient id="colorExcited" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#fe6500" stopOpacity={0.8}/>
                          <stop offset="95%" stopColor="#fe6500" stopOpacity={0.1}/>
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" stroke="#eeeeee" />
                      <XAxis dataKey="time" textAnchor="end" tick={{ fontSize: 11, fill: '#737780' }} />
                      <YAxis tick={{ fontSize: 11, fill: '#737780' }} />
                      <Tooltip
                        contentStyle={{ backgroundColor: '#ffffff', borderColor: '#CCCCCC', fontSize: '12px' }}
                      />
                      <Area type="monotone" dataKey="supportive" stackId="1" stroke="#003366" fill="url(#colorSupport)" name="Supportive %" />
                      <Area type="monotone" dataKey="excited" stackId="1" stroke="#fe6500" fill="url(#colorExcited)" name="Excited %" />
                      <Area type="monotone" dataKey="anxious" stackId="1" stroke="#b91c1c" fill="#fca5a5" name="Anxious %" />
                      <Area type="monotone" dataKey="sarcastic" stackId="1" stroke="#7c3aed" fill="#d8b4fe" name="Sarcastic %" />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </div>

              {/* Emotion Classification Donut */}
              <div className="bg-white border border-[#CCCCCC] p-4 rounded shadow-xs flex flex-col justify-between">
                <div>
                  <h3 className="font-serif-headline text-base font-bold text-[#0C0566] mb-1">
                    Multi-Dimensional Emotion Taxonomy
                  </h3>
                  <p className="text-xs text-[#737780] mb-2">Fine-grained nuance classification</p>
                </div>

                <div className="h-44 w-full flex items-center justify-center">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={emotionPieData}
                        cx="50%"
                        cy="50%"
                        innerRadius={45}
                        outerRadius={70}
                        paddingAngle={3}
                        dataKey="value"
                      >
                        {emotionPieData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip contentStyle={{ fontSize: '11px' }} />
                    </PieChart>
                  </ResponsiveContainer>
                </div>

                <div className="space-y-1 text-xs">
                  {emotionPieData.map((d) => (
                    <div key={d.name} className="flex justify-between items-center">
                      <div className="flex items-center gap-1.5">
                        <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: d.color }}></span>
                        <span className="text-[#43474f] font-medium">{d.name}</span>
                      </div>
                      <span className="font-bold text-[#1a1c1c]">{d.value}%</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Quick Preview: Trending Topics & Force Graph Snapshot */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              {/* Trends Table */}
              <div className="bg-white border border-[#CCCCCC] p-4 rounded shadow-xs">
                <div className="flex justify-between items-center mb-3">
                  <h3 className="font-serif-headline text-base font-bold text-[#0C0566]">
                    Top Emerging Narratives
                  </h3>
                  <button
                    onClick={() => setActiveTab('trends')}
                    className="text-xs font-bold text-[#003366] hover:underline"
                  >
                    View All &rarr;
                  </button>
                </div>

                <div className="divide-y divide-[#eeeeee]">
                  {MOCK_TRENDS.slice(0, 4).map((trend) => (
                    <div key={trend.id} className="py-2.5 flex items-center justify-between text-xs">
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-mono font-bold text-[#003366]">#{trend.rank}</span>
                          <span className="font-bold text-[#1a1c1c]">{trend.keyword}</span>
                          <span className="text-[10px] bg-[#f3f3f3] text-[#737780] px-1.5 py-0.5 rounded">
                            {trend.category}
                          </span>
                        </div>
                        <p className="text-[11px] text-[#737780] mt-0.5">
                          {trend.mentionCount.toLocaleString()} mentions &bull; {trend.samplePosts[0]}
                        </p>
                      </div>

                      <div className="text-right">
                        <span className="text-[#138808] font-bold font-mono">+{trend.velocity}%/h</span>
                        <span className="block text-[10px] text-[#737780]">Predicted: #{trend.predictedNextRank}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Force Topology Snapshot */}
              <div className="bg-white border border-[#CCCCCC] p-4 rounded shadow-xs flex flex-col justify-between">
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <h3 className="font-serif-headline text-base font-bold text-[#0C0566]">
                      Link Topology & Key Opinion Leaders
                    </h3>
                    <button
                      onClick={() => setActiveTab('network')}
                      className="text-xs font-bold text-[#003366] hover:underline"
                    >
                      Open Full Graph &rarr;
                    </button>
                  </div>
                  <p className="text-xs text-[#737780] mb-3">
                    Centrality analysis mapping influence propagation across sovereign nodes
                  </p>
                </div>

                <div className="p-4 bg-[#f9f9f9] border border-[#e2e2e2] rounded flex flex-col gap-2.5">
                  <div className="flex justify-between text-xs items-center">
                    <span className="font-bold text-[#001e40]">High-Betweenness Influencers</span>
                    <span className="text-xs text-[#003366] font-mono font-bold">5 Nodes Active</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs">
                    <span className="w-2 h-2 rounded-full bg-[#fe6500]"></span>
                    <span className="font-semibold text-[#1a1c1c]">@tech_bharat_now</span>
                    <span className="text-[#737780]">(Centrality 94%, Reach 248k)</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs">
                    <span className="w-2 h-2 rounded-full bg-[#001e40]"></span>
                    <span className="font-semibold text-[#1a1c1c]">@NTRO_CyberAlerts</span>
                    <span className="text-[#737780]">(Official Sovereign Node)</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs">
                    <span className="w-2 h-2 rounded-full bg-[#fe6500]"></span>
                    <span className="font-semibold text-[#1a1c1c]">@BharatInfraPulse</span>
                    <span className="text-[#737780]">(Telegram Broadcast Hub)</span>
                  </div>
                </div>

                <button
                  onClick={() => setActiveTab('network')}
                  className="mt-3 py-2 bg-[#003366] hover:bg-[#001e40] text-white font-bold text-xs uppercase tracking-wider rounded transition-colors text-center"
                >
                  Inspect Interactive Network Force Graph
                </button>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: SENTIMENT & EMOTION */}
        {activeTab === 'sentiment' && (
          <div className="space-y-4">
            <div className="bg-white border border-[#CCCCCC] p-4 rounded shadow-xs">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-[#e2e2e2] pb-3 mb-4">
                <div>
                  <h3 className="font-serif-headline text-lg font-bold text-[#0C0566] flex items-center gap-2">
                    <span className="material-symbols-outlined text-[#003366]">psychology</span>
                    <span>Multi-Dimensional Sentiment & Nuance Inference</span>
                  </h3>
                  <p className="text-xs text-[#737780]">
                    Component 3.2 &bull; Contextual Emotion Taxonomy, Sarcasm Detection & Vernacular NLP
                  </p>
                </div>
                <div className="text-xs font-mono text-[#138808] font-bold bg-[#e6f4ea] px-2 py-1 rounded">
                  Inference Accuracy: 94.2%
                </div>
              </div>

              {/* Sentiment Area Chart */}
              <div className="h-72 w-full mb-6">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={MOCK_SENTIMENT_TIMELINE} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#eeeeee" />
                    <XAxis dataKey="time" tick={{ fontSize: 11, fill: '#737780' }} />
                    <YAxis tick={{ fontSize: 11, fill: '#737780' }} />
                    <Tooltip contentStyle={{ backgroundColor: '#ffffff', borderColor: '#CCCCCC', fontSize: '12px' }} />
                    <Area type="monotone" dataKey="supportive" stackId="1" stroke="#003366" fill="#003366" fillOpacity={0.8} name="Supportive" />
                    <Area type="monotone" dataKey="excited" stackId="1" stroke="#fe6500" fill="#fe6500" fillOpacity={0.8} name="Excited" />
                    <Area type="monotone" dataKey="anxious" stackId="1" stroke="#b91c1c" fill="#b91c1c" fillOpacity={0.8} name="Anxious" />
                    <Area type="monotone" dataKey="sarcastic" stackId="1" stroke="#7c3aed" fill="#7c3aed" fillOpacity={0.8} name="Sarcastic" />
                    <Area type="monotone" dataKey="against" stackId="1" stroke="#E31E2E" fill="#E31E2E" fillOpacity={0.8} name="Opposition" />
                  </AreaChart>
                </ResponsiveContainer>
              </div>

              {/* Vernacular NLP & Sarcasm Breakdown */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
                <div className="bg-[#f9f9f9] border border-[#e2e2e2] p-4 rounded">
                  <h4 className="font-bold text-xs text-[#003366] uppercase mb-2">
                    Vernacular & Code-Mixed (Hinglish) Distribution
                  </h4>
                  <div className="space-y-2 text-xs">
                    {MOCK_DEMOGRAPHICS.languages.map((l) => (
                      <div key={l.language} className="flex items-center justify-between">
                        <span className="text-[#1a1c1c] font-medium">{l.name}</span>
                        <div className="flex items-center gap-2">
                          <div className="w-24 bg-[#e2e2e2] h-2 rounded-full overflow-hidden">
                            <div className="bg-[#003366] h-full" style={{ width: `${l.percentage * 2}%` }}></div>
                          </div>
                          <span className="font-mono font-bold w-12 text-right">{l.percentage}%</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="bg-[#f9f9f9] border border-[#e2e2e2] p-4 rounded">
                  <h4 className="font-bold text-xs text-[#003366] uppercase mb-2">
                    Sarcasm & Inversion Detection Heuristics
                  </h4>
                  <p className="text-xs text-[#43474f] leading-relaxed mb-3">
                    Standard sentiment analysis classifies "Haan bhai, potholes are just natural speed breakers! 👏👏" as positive due to applause emojis. SANKET’s Indic sarcasm classifier accurately flags irony (-0.68 polarity, 94% sarcasm confidence).
                  </p>
                  <div className="p-3 bg-white border border-[#CCCCCC] rounded text-xs">
                    <span className="text-[10px] font-mono text-[#ba1a1a] uppercase font-bold">
                      Flagged Sample (Hinglish Irony)
                    </span>
                    <p className="font-medium text-[#1a1c1c] mt-1">
                      "Haan bhai, potholes are just “natural speed breakers” provided free of charge by municipal corporation. Peak smart city innovation! 👏👏"
                    </p>
                    <div className="mt-2 flex items-center gap-2 text-[10px]">
                      <span className="bg-[#ffdad6] text-[#ba1a1a] px-2 py-0.5 rounded font-bold">Sarcasm: 94%</span>
                      <span className="bg-[#e2e2e2] text-[#43474f] px-2 py-0.5 rounded font-mono">True Polarity: Negative (-0.68)</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 3: DEMOGRAPHICS */}
        {activeTab === 'demographics' && (
          <div className="space-y-4">
            <div className="bg-white border border-[#CCCCCC] p-4 rounded shadow-xs">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-[#e2e2e2] pb-3 mb-4">
                <div>
                  <h3 className="font-serif-headline text-lg font-bold text-[#0C0566] flex items-center gap-2">
                    <span className="material-symbols-outlined text-[#003366]">group</span>
                    <span>Automated Demographic Profiling (Anonymized)</span>
                  </h3>
                  <p className="text-xs text-[#737780]">
                    Component 3.3 &bull; Cohort Aggregation, Age Pyramids, Geographic Dispersion & Affinity Clusters
                  </p>
                </div>
                <div className="text-xs font-mono text-[#003366] bg-[#d5e3ff] px-2 py-1 rounded font-bold">
                  Sample Size: 224,000 Users
                </div>
              </div>

              {/* Demographics Grid */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                {/* Age Brackets */}
                <div className="bg-[#f9f9f9] border border-[#e2e2e2] p-4 rounded">
                  <h4 className="font-bold text-xs text-[#003366] uppercase mb-3">
                    Age Cohort Distribution
                  </h4>
                  <div className="h-56 w-full">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={MOCK_DEMOGRAPHICS.ageBrackets} layout="vertical" margin={{ left: 10, right: 20 }}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#eeeeee" />
                        <XAxis type="number" tick={{ fontSize: 11 }} />
                        <YAxis dataKey="bracket" type="category" tick={{ fontSize: 11 }} />
                        <Tooltip />
                        <Bar dataKey="percentage" fill="#003366" name="Percentage %" />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </div>

                {/* Geographic Dispersion */}
                <div className="bg-[#f9f9f9] border border-[#e2e2e2] p-4 rounded lg:col-span-2">
                  <h4 className="font-bold text-xs text-[#003366] uppercase mb-3">
                    Geographic Dispersion (States & UTs)
                  </h4>
                  <div className="divide-y divide-[#e2e2e2] text-xs">
                    {MOCK_DEMOGRAPHICS.geography.map((geo) => (
                      <div key={geo.region} className="py-2 flex items-center justify-between">
                        <div>
                          <span className="font-bold text-[#1a1c1c]">{geo.region}</span>
                          <span className="text-[11px] text-[#737780] ml-2">({geo.count.toLocaleString()} posts)</span>
                        </div>
                        <div className="flex items-center gap-3">
                          <span className="text-[11px] font-mono text-[#003366]">{geo.sentimentBias}</span>
                          <span className="font-bold font-mono">{geo.percentage}%</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Privacy Compliance Banner */}
              <div className="mt-4 p-3 bg-[#e6f4ea] border border-[#a8dab5] rounded text-xs flex items-center gap-3">
                <span className="material-symbols-outlined text-[#138808] text-xl" style={{ fontVariationSettings: "'FILL' 1" }}>
                  verified_user
                </span>
                <div>
                  <strong className="text-[#023d00]">{MOCK_DEMOGRAPHICS.complianceStandard}</strong>
                  <p className="text-[#43474f] text-[11px] mt-0.5">
                    Zero Personally Identifiable Information (PII) is recorded. All demographic profiling runs via k-anonymity heuristics with epsilon differential noise.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 4: TRENDS & VELOCITY */}
        {activeTab === 'trends' && (
          <div className="space-y-4">
            <div className="bg-white border border-[#CCCCCC] p-4 rounded shadow-xs">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-[#e2e2e2] pb-3 mb-4">
                <div>
                  <h3 className="font-serif-headline text-lg font-bold text-[#0C0566] flex items-center gap-2">
                    <span className="material-symbols-outlined text-[#003366]">monitoring</span>
                    <span>Temporal Trend & Velocity Detection</span>
                  </h3>
                  <p className="text-xs text-[#737780]">
                    Component 3.4 &bull; Real-Time Narrative Velocity, Predictive Trajectories & Anomaly Spikes
                  </p>
                </div>
                <span className="text-xs text-[#003366] font-bold">Updated every 60 seconds</span>
              </div>

              {/* Trends List */}
              <div className="space-y-3">
                {MOCK_TRENDS.map((trend) => (
                  <div key={trend.id} className="p-4 bg-[#f9f9f9] border border-[#CCCCCC] rounded hover:border-[#003366] transition-colors">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                      <div className="flex items-center gap-3">
                        <span className="w-8 h-8 rounded bg-[#001e40] text-white flex items-center justify-center font-bold font-mono text-sm">
                          #{trend.rank}
                        </span>
                        <div>
                          <div className="flex items-center gap-2">
                            <h4 className="font-bold text-sm text-[#001e40]">{trend.keyword}</h4>
                            <span className="text-[10px] bg-[#d5e3ff] text-[#001b3c] font-bold px-2 py-0.5 rounded">
                              {trend.category}
                            </span>
                          </div>
                          <p className="text-xs text-[#737780] mt-0.5">
                            {trend.mentionCount.toLocaleString()} total mentions &bull; First detected {new Date(trend.firstDetectedAt).toLocaleDateString()}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center gap-4 text-xs font-mono">
                        <div className="text-right">
                          <span className="text-[#737780] text-[10px] block">VELOCITY</span>
                          <span className="text-sm font-bold text-[#138808]">+{trend.velocity}% / hr</span>
                        </div>
                        <div className="text-right">
                          <span className="text-[#737780] text-[10px] block">AI PREDICTED</span>
                          <span className="text-sm font-bold text-[#fe6500]">Rank #{trend.predictedNextRank}</span>
                        </div>
                      </div>
                    </div>

                    {/* Mini Sentiment Bar for this trend */}
                    <div className="mt-3 pt-3 border-t border-[#e2e2e2] flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs">
                      <div className="flex items-center gap-2 text-[11px]">
                        <span className="text-[#43474f]">Stance:</span>
                        <span className="text-[#003366] font-bold">{trend.sentimentBreakdown.supportive}% Support</span>
                        <span className="text-[#737780]">|</span>
                        <span className="text-[#fe6500] font-bold">{trend.sentimentBreakdown.excited}% Excited</span>
                        <span className="text-[#737780]">|</span>
                        <span className="text-[#ba1a1a] font-bold">{trend.sentimentBreakdown.against}% Oppose</span>
                      </div>
                      <span className="text-[11px] text-[#737780] italic">
                        Sample: "{trend.samplePosts[0]}"
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* TAB 5: NETWORK TOPOLOGY */}
        {activeTab === 'network' && (
          <NetworkGraphView />
        )}

        {/* TAB 6: DATA INGESTION & FEED */}
        {activeTab === 'timeline' && (
          <div className="space-y-4">
            <div className="bg-white border border-[#CCCCCC] p-4 rounded shadow-xs">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-[#e2e2e2] pb-3 mb-4">
                <div>
                  <h3 className="font-serif-headline text-lg font-bold text-[#0C0566] flex items-center gap-2">
                    <span className="material-symbols-outlined text-[#003366]">database</span>
                    <span>Continuous Data Collection & Timeline Explorer</span>
                  </h3>
                  <p className="text-xs text-[#737780]">
                    Component 3.1 &bull; Chronological Raw Post Stream, Multi-Platform Ingestion Feed & Ground Truth Metadata
                  </p>
                </div>
                <span className="text-xs font-mono font-bold text-[#003366]">
                  {filteredPosts.length} Items Streamed
                </span>
              </div>

              {/* Feed Grid */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                {/* Posts Feed Column */}
                <div className="lg:col-span-2 space-y-3 max-h-[600px] overflow-y-auto pr-1">
                  {filteredPosts.map((post) => (
                    <div
                      key={post.id}
                      onClick={() => setSelectedPost(post)}
                      className={`p-3.5 border rounded cursor-pointer transition-all ${
                        selectedPost?.id === post.id
                          ? 'border-[#003366] bg-[#d5e3ff]/20 shadow-xs'
                          : 'border-[#CCCCCC] bg-white hover:border-[#737780]'
                      }`}
                    >
                      <div className="flex items-start justify-between gap-2 mb-1.5">
                        <div className="flex items-center gap-2">
                          <img
                            src={post.account.avatarUrl}
                            alt=""
                            className="w-8 h-8 rounded-full object-cover border border-[#c3c6d1]"
                          />
                          <div>
                            <div className="flex items-center gap-1.5">
                              <span className="font-bold text-xs text-[#1a1c1c]">{post.account.displayName}</span>
                              <span className="text-[10px] text-[#737780] font-mono">@{post.account.username}</span>
                              {post.account.isBotSuspected && (
                                <span className="bg-[#ffdad6] text-[#ba1a1a] text-[9px] font-bold px-1.5 py-0.2 rounded">
                                  BOT
                                </span>
                              )}
                            </div>
                            <span className="text-[10px] text-[#737780] font-mono">
                              {post.platform.toUpperCase()} &bull; {new Date(post.postedAt).toLocaleTimeString()}
                            </span>
                          </div>
                        </div>

                        <span className={`text-[10px] font-bold px-2 py-0.5 rounded uppercase ${
                          post.sentiment.primaryLabel === 'supportive' || post.sentiment.primaryLabel === 'excited'
                            ? 'bg-[#e6f4ea] text-[#138808]'
                            : post.sentiment.primaryLabel === 'sarcastic'
                            ? 'bg-[#ffdbcd] text-[#7c2e00]'
                            : 'bg-[#ffdad6] text-[#ba1a1a]'
                        }`}>
                          {post.sentiment.primaryLabel}
                        </span>
                      </div>

                      <p className="text-xs text-[#1a1c1c] leading-relaxed my-2">
                        {post.content}
                      </p>

                      <div className="flex items-center justify-between text-[11px] text-[#737780] pt-1 border-t border-[#f3f3f3]">
                        <div className="flex items-center gap-3">
                          <span>❤️ {post.likeCount.toLocaleString()}</span>
                          <span>🔄 {post.shareCount.toLocaleString()}</span>
                          <span>💬 {post.commentCount.toLocaleString()}</span>
                        </div>
                        <span className="text-[#003366] font-mono font-bold">
                          Confidence: {(post.sentiment.confidence * 100).toFixed(0)}%
                        </span>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Raw Inspector Column */}
                <div className="bg-[#f9f9f9] border border-[#CCCCCC] p-4 rounded text-xs flex flex-col justify-between">
                  {selectedPost ? (
                    <div className="space-y-3">
                      <div className="border-b border-[#e2e2e2] pb-2">
                        <span className="text-[10px] text-[#737780] uppercase font-mono">Metadata Inspector</span>
                        <h4 className="font-bold text-sm text-[#001e40]">Post ID: {selectedPost.id}</h4>
                      </div>

                      <div className="space-y-1.5 text-[11px]">
                        <div><strong className="text-[#43474f]">Platform:</strong> <span className="uppercase font-mono">{selectedPost.platform}</span></div>
                        <div><strong className="text-[#43474f]">Language Code:</strong> <span className="font-mono">{selectedPost.language}</span></div>
                        <div><strong className="text-[#43474f]">Polarity Score:</strong> <span className="font-mono font-bold">{selectedPost.sentiment.polarityScore}</span></div>
                        <div><strong className="text-[#43474f]">Sarcasm Index:</strong> <span className="font-mono font-bold">{selectedPost.sentiment.sarcasmScore}</span></div>
                        <div><strong className="text-[#43474f]">Bot Probability:</strong> <span className="font-mono font-bold">{selectedPost.account.botScore}</span></div>
                        <div><strong className="text-[#43474f]">Model Version:</strong> <span className="font-mono text-[#003366]">{selectedPost.sentiment.modelVersion}</span></div>
                      </div>

                      <div className="pt-2 border-t border-[#e2e2e2]">
                        <span className="text-[10px] font-bold text-[#003366] uppercase block mb-1">Raw JSON Payload</span>
                        <pre className="bg-[#1e1e1e] text-[#d4d4d4] p-2.5 rounded text-[10px] overflow-x-auto max-h-48 font-mono">
                          {JSON.stringify(selectedPost, null, 2)}
                        </pre>
                      </div>
                    </div>
                  ) : (
                    <div className="text-center py-12 text-[#737780]">Select a post to inspect JSON metadata.</div>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
