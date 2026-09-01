import React, { useState } from 'react';
import { MOCK_INGESTION_JOBS } from '../data/mockData';

interface ArchitectureViewProps {
  onNavigate: (page: string, tab?: string) => void;
  onOpenImageModal?: (src: string, alt: string, caption: string) => void;
}

export const ArchitectureView: React.FC<ArchitectureViewProps> = ({ onNavigate, onOpenImageModal }) => {
  const [selectedComponent, setSelectedComponent] = useState<string>('platforms');

  return (
    <div className="flex-grow w-full py-6 md:py-8 bg-page transition-colors duration-200">
      <div className="max-w-[1280px] mx-auto px-3 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <div className="mb-4 flex items-center text-xs text-muted">
          <button onClick={() => onNavigate('home')} className="hover:underline text-navy font-medium">
            Home
          </button>
          <span className="material-symbols-outlined text-[14px] mx-1">chevron_right</span>
          <span className="text-primary font-semibold">System Architecture (SIH 2026 #26152)</span>
        </div>

        {/* Header */}
        <div className="bg-surface border border-main p-4 sm:p-6 mb-6 shadow-xs">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-subtle pb-4">
            <div>
              <span className="text-[10px] font-bold text-saffron uppercase tracking-widest">
                Technical Specification
              </span>
              <h1 className="font-serif-headline text-2xl md:text-3xl font-bold text-headline">
                End-to-End Analytics Pipeline Architecture
              </h1>
              <p className="text-xs text-secondary mt-1">
                Collects data fast, analyzes it with AI, and maps how people are connected
              </p>
            </div>
            <div className="flex items-center gap-2">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-navy-light text-brand text-xs font-bold rounded">
                <span className="w-2 h-2 rounded-full bg-brand animate-pulse"></span>
                <span>Prototype Pipeline Active</span>
              </span>
            </div>
          </div>

          {/* Interactive Tier Flow */}
          <div className="mt-6 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
            {/* Tier 1: Platform Ingestion */}
            <div
              onClick={() => setSelectedComponent('platforms')}
              className={`p-3 border rounded cursor-pointer transition-all ${
                selectedComponent === 'platforms'
                  ? 'border-brand bg-navy-light/30 shadow-xs ring-2 ring-brand/20'
                  : 'border-main bg-subtle hover:bg-surface'
              }`}
            >
              <div className="flex items-center gap-1.5 text-brand mb-1">
                <span className="material-symbols-outlined text-base">cloud_download</span>
                <h4 className="font-bold text-xs">1. Platform APIs</h4>
              </div>
              <p className="text-[11px] text-muted">X, Telegram, IG, Reddit, YouTube</p>
            </div>

            {/* Tier 2: Background Workers */}
            <div
              onClick={() => setSelectedComponent('workers')}
              className={`p-3 border rounded cursor-pointer transition-all ${
                selectedComponent === 'workers'
                  ? 'border-brand bg-navy-light/30 shadow-xs ring-2 ring-brand/20'
                  : 'border-main bg-subtle hover:bg-surface'
              }`}
            >
              <div className="flex items-center gap-1.5 text-brand mb-1">
                <span className="material-symbols-outlined text-base">memory</span>
                <h4 className="font-bold text-xs">2. Workers &amp; NLP</h4>
              </div>
              <p className="text-[11px] text-muted">RoBERTa, Hinglish, Demographics</p>
            </div>

            {/* Tier 3: PostgreSQL Database */}
            <div
              onClick={() => setSelectedComponent('db')}
              className={`p-3 border rounded cursor-pointer transition-all ${
                selectedComponent === 'db'
                  ? 'border-brand bg-navy-light/30 shadow-xs ring-2 ring-brand/20'
                  : 'border-main bg-subtle hover:bg-surface'
              }`}
            >
              <div className="flex items-center gap-1.5 text-brand mb-1">
                <span className="material-symbols-outlined text-base">database</span>
                <h4 className="font-bold text-xs">3. PostgreSQL DB</h4>
              </div>
              <p className="text-[11px] text-muted">Structured data, search, and graphs</p>
            </div>

            {/* Tier 4: FastAPI Gateway */}
            <div
              onClick={() => setSelectedComponent('fastapi')}
              className={`p-3 border rounded cursor-pointer transition-all ${
                selectedComponent === 'fastapi'
                  ? 'border-brand bg-navy-light/30 shadow-xs ring-2 ring-brand/20'
                  : 'border-main bg-subtle hover:bg-surface'
              }`}
            >
              <div className="flex items-center gap-1.5 text-brand mb-1">
                <span className="material-symbols-outlined text-base">api</span>
                <h4 className="font-bold text-xs">4. FastAPI Gateway</h4>
              </div>
              <p className="text-[11px] text-muted">REST, JWT Auth, WebSockets</p>
            </div>

            {/* Tier 5: React Dashboard */}
            <div
              onClick={() => setSelectedComponent('frontend')}
              className={`p-3 border rounded cursor-pointer transition-all col-span-2 sm:col-span-1 ${
                selectedComponent === 'frontend'
                  ? 'border-brand bg-navy-light/30 shadow-xs ring-2 ring-brand/20'
                  : 'border-main bg-subtle hover:bg-surface'
              }`}
            >
              <div className="flex items-center gap-1.5 text-brand mb-1">
                <span className="material-symbols-outlined text-base">dashboard</span>
                <h4 className="font-bold text-xs">5. React Console</h4>
              </div>
              <p className="text-[11px] text-muted">5 Core AI Components</p>
            </div>
          </div>
        </div>

        {/* Detail Panel based on selection */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 bg-surface border border-main p-5 sm:p-6 shadow-xs">
            {selectedComponent === 'platforms' && (
              <div className="space-y-4">
                <h3 className="font-serif-headline text-xl font-bold text-headline flex items-center gap-2">
                  <span className="material-symbols-outlined text-brand">cloud_download</span>
                  <span>Tier 1: Collecting Data from Multiple Platforms</span>
                </h3>
                <p className="text-sm text-secondary leading-relaxed">
                  SANKET uses background workers to collect public posts from five platforms, without going over each platform's usage limits.
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                  <div className="border border-subtle p-3 rounded bg-subtle">
                    <div className="flex items-center justify-between font-bold text-xs text-brand">
                      <span>X (formerly Twitter)</span>
                      <span className="text-[10px] text-green font-mono">ACTIVE (124/s)</span>
                    </div>
                    <p className="text-xs text-muted mt-1">
                      Uses X's live search to catch keywords, hashtags, and older posts.
                    </p>
                  </div>

                  <div className="border border-subtle p-3 rounded bg-subtle">
                    <div className="flex items-center justify-between font-bold text-xs text-brand">
                      <span>Telegram (Channels)</span>
                      <span className="text-[10px] text-green font-mono">ACTIVE (68/s)</span>
                    </div>
                    <p className="text-xs text-muted mt-1">
                      Reads public Telegram channels, forwarded posts, and group discussions.
                    </p>
                  </div>

                  <div className="border border-subtle p-3 rounded bg-subtle">
                    <div className="flex items-center justify-between font-bold text-xs text-brand">
                      <span>Instagram (Public Posts)</span>
                      <span className="text-[10px] text-brand font-mono">SCHEDULED BATCH</span>
                    </div>
                    <p className="text-xs text-muted mt-1">
                      Finds posts by hashtag and reads text from images.
                    </p>
                  </div>

                  <div className="border border-subtle p-3 rounded bg-subtle">
                    <div className="flex items-center justify-between font-bold text-xs text-brand">
                      <span>Reddit &amp; YouTube (Bonus)</span>
                      <span className="text-[10px] text-green font-mono">ACTIVE (63/s)</span>
                    </div>
                    <p className="text-xs text-muted mt-1">
                      Watches chosen subreddits and YouTube comment threads.
                    </p>
                  </div>
                </div>
              </div>
            )}

            {selectedComponent === 'workers' && (
              <div className="space-y-4">
                <h3 className="font-serif-headline text-xl font-bold text-headline flex items-center gap-2">
                  <span className="material-symbols-outlined text-brand">memory</span>
                  <span>Tier 2: AI Workers That Process the Data</span>
                </h3>
                <p className="text-sm text-secondary leading-relaxed">
                  Background workers run each post through several AI steps, built to handle Hindi, English, and mixed-language text.
                </p>

                <div className="bg-subtle border border-main p-4 rounded font-mono text-xs space-y-2 text-primary">
                  <div className="text-brand font-bold">Pipeline Execution Stages:</div>
                  <div>1. Detect the language, including Hinglish</div>
                  <div>2. Clean up the text and remove emojis</div>
                  <div>3. Detect emotion and sarcasm using AI models</div>
                  <div>4. Estimate general audience details, kept anonymous</div>
                  <div>5. Track trends over time and spot sudden spikes</div>
                  <div>6. Map who mentions or shares whose posts</div>
                </div>
              </div>
            )}

            {selectedComponent === 'db' && (
              <div className="space-y-4">
                <h3 className="font-serif-headline text-xl font-bold text-headline flex items-center gap-2">
                  <span className="material-symbols-outlined text-brand">database</span>
                  <span>Tier 3: Secure Database Storage</span>
                </h3>
                <p className="text-sm text-secondary leading-relaxed">
                  We don't save any information that could identify a person. We only look at group patterns, not individuals.
                </p>

                <div className="bg-[#1e1e1e] text-[#d4d4d4] p-4 rounded text-xs font-mono overflow-x-auto leading-relaxed">
                  <span className="text-[#6a9955]">-- SANKET Core Relational Schema</span>
                  <br />
                  <span className="text-[#569cd6]">CREATE TABLE</span> social_posts (
                  <br />
                  &nbsp;&nbsp;id <span className="text-[#4ec9b0]">UUID PRIMARY KEY</span>,
                  <br />
                  &nbsp;&nbsp;platform <span className="text-[#4ec9b0]">VARCHAR(32)</span>,
                  <br />
                  &nbsp;&nbsp;content_text <span className="text-[#4ec9b0]">TEXT</span>,
                  <br />
                  &nbsp;&nbsp;language_code <span className="text-[#4ec9b0]">VARCHAR(16)</span>,
                  <br />
                  &nbsp;&nbsp;sentiment_polarity <span className="text-[#4ec9b0]">FLOAT</span>,
                  <br />
                  &nbsp;&nbsp;sarcasm_score <span className="text-[#4ec9b0]">FLOAT</span>,
                  <br />
                  &nbsp;&nbsp;emotion_label <span className="text-[#4ec9b0]">VARCHAR(32)</span>,
                  <br />
                  &nbsp;&nbsp;embedding <span className="text-[#4ec9b0]">vector(768)</span>,
                  <br />
                  &nbsp;&nbsp;posted_at <span className="text-[#4ec9b0]">TIMESTAMPTZ NOT NULL</span>
                  <br />
                  );
                </div>
              </div>
            )}

            {selectedComponent === 'fastapi' && (
              <div className="space-y-4">
                <h3 className="font-serif-headline text-xl font-bold text-headline flex items-center gap-2">
                  <span className="material-symbols-outlined text-brand">api</span>
                  <span>Tier 4: The API That Connects Everything</span>
                </h3>
                <p className="text-sm text-secondary leading-relaxed">
                  A fast Python backend that sends data to the dashboard and keeps access secure.
                </p>

                <div className="space-y-2 text-xs">
                  <div className="p-2.5 bg-subtle border border-subtle rounded flex items-center justify-between">
                    <span className="font-mono font-bold text-brand">GET /api/v1/sentiment/temporal-distribution</span>
                    <span className="text-muted">Emotion over time</span>
                  </div>
                  <div className="p-2.5 bg-subtle border border-subtle rounded flex items-center justify-between">
                    <span className="font-mono font-bold text-brand">GET /api/v1/trends/rankings</span>
                    <span className="text-muted">Trending topics right now</span>
                  </div>
                  <div className="p-2.5 bg-subtle border border-subtle rounded flex items-center justify-between">
                    <span className="font-mono font-bold text-brand">GET /api/v1/network/topology-graph</span>
                    <span className="text-muted">Who's connected to whom</span>
                  </div>
                  <div className="p-2.5 bg-subtle border border-subtle rounded flex items-center justify-between">
                    <span className="font-mono font-bold text-brand">WS /ws/stream/live-intelligence</span>
                    <span className="text-green font-bold">Live updates feed</span>
                  </div>
                </div>
              </div>
            )}

            {selectedComponent === 'frontend' && (
              <div className="space-y-4">
                <h3 className="font-serif-headline text-xl font-bold text-headline flex items-center gap-2">
                  <span className="material-symbols-outlined text-brand">dashboard</span>
                  <span>Tier 5: The Dashboard Analysts Use</span>
                </h3>
                <p className="text-sm text-secondary leading-relaxed">
                  An easy-to-use dashboard that shows what's happening, checks sentiment closely, maps audience regions, and shows how people are connected.
                </p>

                <div className="pt-2">
                  <button
                    onClick={() => onNavigate('dashboards')}
                    className="py-2.5 px-6 bg-brand hover:bg-navy-dark text-white font-bold text-xs uppercase tracking-wider rounded transition-colors flex items-center gap-2 cursor-pointer"
                  >
                    <span>Open the Dashboard</span>
                    <span className="material-symbols-outlined text-base">arrow_forward</span>
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Live Ingestion Workers Status (1 Column) */}
          <div className="bg-surface border border-main p-5 shadow-xs rounded">
            <h4 className="font-serif-headline text-base font-bold text-headline mb-3 flex items-center justify-between border-b border-subtle pb-2">
              <span>Data Collection Status</span>
              <span className="text-xs text-green font-bold">All Healthy</span>
            </h4>

            <div className="space-y-3">
              {MOCK_INGESTION_JOBS.map((job) => (
                <div key={job.id} className="p-3 bg-subtle border border-subtle rounded text-xs space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="font-bold uppercase text-brand">{job.platform} Worker</span>
                    <span className={`px-1.5 py-0.5 text-[9px] font-bold uppercase rounded ${
                      job.status === 'running'
                        ? 'bg-navy-light text-brand'
                        : 'bg-green-bg text-green'
                    }`}>
                      {job.status}
                    </span>
                  </div>
                  <div className="text-[11px] text-secondary truncate">{job.workerId}</div>
                  <div className="flex justify-between text-[11px] text-muted pt-1">
                    <span>{job.recordsIngested.toLocaleString()} items</span>
                    <span className="font-mono font-bold text-navy">{job.throughputPerSec} /sec</span>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-4 pt-3 border-t border-subtle text-center">
              <button
                onClick={() => onNavigate('dashboards', 'timeline')}
                className="text-xs font-bold text-brand hover:underline cursor-pointer"
              >
                See the Live Data Feed &rarr;
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

