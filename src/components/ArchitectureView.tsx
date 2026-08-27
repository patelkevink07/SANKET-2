import React, { useState } from 'react';
import { MOCK_INGESTION_JOBS } from '../data/mockData';

interface ArchitectureViewProps {
  onNavigate: (page: string, tab?: string) => void;
  onOpenImageModal?: (src: string, alt: string, caption: string) => void;
}

export const ArchitectureView: React.FC<ArchitectureViewProps> = ({ onNavigate, onOpenImageModal }) => {
  const [selectedComponent, setSelectedComponent] = useState<string>('workers');
  const PREVIEW_IMG = "https://lh3.googleusercontent.com/aida-public/AB6AXuDadJtV_zVpm8MRWZAIs1UOLFdjQCDAQfXRzhHtDzN8gpHiRkmatv1i7_HXPFM_sH0cZewR4n5bBDqLbC6gNHlMFhdO8XRGQ20Ivexl-YDGaUv5SKVH5i7IO0SKr7kzL90Ri090fsWKedfz9lObDeqTpt4Aap6z0V-Dx9EK9Tqyqiyitg7Z-aITUi0DWU7MIM42pz4QMO-KBXC_REroPSsrIVGDvwjA9vv44q0wIAfXYgqU3ZmISH7z_Q";

  return (
    <div className="flex-grow w-full py-6 md:py-8 bg-canvas">
      <div className="max-w-[1280px] mx-auto px-3 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <div className="mb-4 flex items-center text-xs text-text-muted">
          <button onClick={() => onNavigate('home')} className="hover:underline text-text-dark-navy font-medium cursor-pointer">
            Home
          </button>
          <span className="material-symbols-outlined text-[14px] mx-1">chevron_right</span>
          <span className="text-text-primary font-semibold">System Architecture (SIH 2026 #26152)</span>
        </div>

        {/* Header */}
        <div className="bg-surface border border-border-main p-4 sm:p-6 mb-6 shadow-xs">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-border-subtle pb-4">
            <div>
              <span className="text-[10px] font-bold text-accent-saffron uppercase tracking-widest">
                Technical Specification
              </span>
              <h1 className="font-serif-headline text-2xl md:text-3xl font-bold text-text-headline">
                End-to-End Analytics Pipeline Architecture
              </h1>
              <p className="text-xs text-text-secondary mt-1">
                High-throughput distributed ingestion, transformer NLP inference, and real-time link topology
              </p>
            </div>
            <div className="flex items-center gap-2">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-brand-navy-light text-text-dark-navy text-xs font-bold rounded">
                <span className="w-2 h-2 rounded-full bg-brand-navy-mid animate-pulse"></span>
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
                  ? 'border-brand-navy-mid bg-brand-navy-light/30 shadow-xs ring-2 ring-brand-navy-mid/20'
                  : 'border-border-main bg-canvas hover:bg-surface'
              }`}
            >
              <div className="flex items-center gap-1.5 text-text-navy mb-1">
                <span className="material-symbols-outlined text-base">cloud_download</span>
                <h4 className="font-bold text-xs">1. Platform APIs</h4>
              </div>
              <p className="text-[11px] text-text-muted">X, Telegram, IG, Reddit, YouTube</p>
            </div>

            {/* Tier 2: Background Workers */}
            <div
              onClick={() => setSelectedComponent('workers')}
              className={`p-3 border rounded cursor-pointer transition-all ${
                selectedComponent === 'workers'
                  ? 'border-brand-navy-mid bg-brand-navy-light/30 shadow-xs ring-2 ring-brand-navy-mid/20'
                  : 'border-border-main bg-canvas hover:bg-surface'
              }`}
            >
              <div className="flex items-center gap-1.5 text-text-navy mb-1">
                <span className="material-symbols-outlined text-base">memory</span>
                <h4 className="font-bold text-xs">2. Workers &amp; NLP</h4>
              </div>
              <p className="text-[11px] text-text-muted">RoBERTa, Hinglish, Demographics</p>
            </div>

            {/* Tier 3: PostgreSQL Database */}
            <div
              onClick={() => setSelectedComponent('db')}
              className={`p-3 border rounded cursor-pointer transition-all ${
                selectedComponent === 'db'
                  ? 'border-brand-navy-mid bg-brand-navy-light/30 shadow-xs ring-2 ring-brand-navy-mid/20'
                  : 'border-border-main bg-canvas hover:bg-surface'
              }`}
            >
              <div className="flex items-center gap-1.5 text-text-navy mb-1">
                <span className="material-symbols-outlined text-base">database</span>
                <h4 className="font-bold text-xs">3. PostgreSQL DB</h4>
              </div>
              <p className="text-[11px] text-text-muted">Relational + pgvector + Graph</p>
            </div>

            {/* Tier 4: FastAPI Gateway */}
            <div
              onClick={() => setSelectedComponent('fastapi')}
              className={`p-3 border rounded cursor-pointer transition-all ${
                selectedComponent === 'fastapi'
                  ? 'border-brand-navy-mid bg-brand-navy-light/30 shadow-xs ring-2 ring-brand-navy-mid/20'
                  : 'border-border-main bg-canvas hover:bg-surface'
              }`}
            >
              <div className="flex items-center gap-1.5 text-text-navy mb-1">
                <span className="material-symbols-outlined text-base">api</span>
                <h4 className="font-bold text-xs">4. FastAPI Gateway</h4>
              </div>
              <p className="text-[11px] text-text-muted">REST, JWT Auth, WebSockets</p>
            </div>

            {/* Tier 5: React Dashboard */}
            <div
              onClick={() => setSelectedComponent('frontend')}
              className={`p-3 border rounded cursor-pointer transition-all col-span-2 sm:col-span-1 ${
                selectedComponent === 'frontend'
                  ? 'border-brand-navy-mid bg-brand-navy-light/30 shadow-xs ring-2 ring-brand-navy-mid/20'
                  : 'border-border-main bg-canvas hover:bg-surface'
              }`}
            >
              <div className="flex items-center gap-1.5 text-text-navy mb-1">
                <span className="material-symbols-outlined text-base">dashboard</span>
                <h4 className="font-bold text-xs">5. React Console</h4>
              </div>
              <p className="text-[11px] text-text-muted">5 Core AI Components</p>
            </div>
          </div>
        </div>

        {/* Detail Panel based on selection */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 bg-surface border border-border-main p-5 sm:p-6 shadow-xs">
            {selectedComponent === 'platforms' && (
              <div className="space-y-4">
                <h3 className="font-serif-headline text-xl font-bold text-text-headline flex items-center gap-2">
                  <span className="material-symbols-outlined text-text-navy">cloud_download</span>
                  <span>Tier 1: Multi-Platform Ingestion Engine</span>
                </h3>
                <p className="text-sm text-text-secondary leading-relaxed">
                  SANKET orchestrates resilient, asynchronous workers to stream and batch-ingest public data across five major social channels without exceeding platform quotas.
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                  <div className="border border-border-subtle p-3 rounded bg-surface-muted">
                    <div className="flex items-center justify-between font-bold text-xs text-text-navy">
                      <span>X (formerly Twitter)</span>
                      <span className="text-[10px] text-accent-green font-mono">ACTIVE (124/s)</span>
                    </div>
                    <p className="text-xs text-text-muted mt-1">
                      Streaming filter API with keyword expansion, hashtag listeners, and user timeline backtracking.
                    </p>
                  </div>

                  <div className="border border-border-subtle p-3 rounded bg-surface-muted">
                    <div className="flex items-center justify-between font-bold text-xs text-text-navy">
                      <span>Telegram (Channels)</span>
                      <span className="text-[10px] text-accent-green font-mono">ACTIVE (68/s)</span>
                    </div>
                    <p className="text-xs text-text-muted mt-1">
                      MTProto Client listening to public broadcast channels, forwarding chains, and discussion hubs.
                    </p>
                  </div>

                  <div className="border border-border-subtle p-3 rounded bg-surface-muted">
                    <div className="flex items-center justify-between font-bold text-xs text-text-navy">
                      <span>Instagram (Public Posts)</span>
                      <span className="text-[10px] text-text-navy font-mono">SCHEDULED BATCH</span>
                    </div>
                    <p className="text-xs text-text-muted mt-1">
                      Hashtag discovery and media carousel ingestion with OCR extraction for infographic text.
                    </p>
                  </div>

                  <div className="border border-border-subtle p-3 rounded bg-surface-muted">
                    <div className="flex items-center justify-between font-bold text-xs text-text-navy">
                      <span>Reddit &amp; YouTube (Bonus)</span>
                      <span className="text-[10px] text-accent-green font-mono">ACTIVE (63/s)</span>
                    </div>
                    <p className="text-xs text-text-muted mt-1">
                      PRAW subreddit stream monitoring r/india, r/developersIndia and YouTube comment threads.
                    </p>
                  </div>
                </div>
              </div>
            )}

            {selectedComponent === 'workers' && (
              <div className="space-y-4">
                <h3 className="font-serif-headline text-xl font-bold text-text-headline flex items-center gap-2">
                  <span className="material-symbols-outlined text-text-navy">memory</span>
                  <span>Tier 2: Asynchronous AI &amp; Transformer Workers</span>
                </h3>
                <p className="text-sm text-text-secondary leading-relaxed">
                  Celery and Redis task queue workers process posts through a multi-stage NLP pipeline tailored for Indic multilingual and code-mixed scripts.
                </p>

                <div className="bg-canvas border border-border-main p-4 rounded font-mono text-xs space-y-2 text-text-primary">
                  <div className="text-text-navy font-bold">Pipeline Execution Stages:</div>
                  <div>1. Language Identification (fastText lid.176.bin with Hinglish detector)</div>
                  <div>2. Text Normalization &amp; De-emojification</div>
                  <div>3. Emotion &amp; Sarcasm Classification (Fine-tuned IndicRoBERTa / MuRIL)</div>
                  <div>4. Anonymized Demographic Cohort Inference</div>
                  <div>5. Temporal Trend Velocity Calculation &amp; Anomaly Spike Detection</div>
                  <div>6. Graph Edge Generation (Author -&gt; Mentioned / Retweeted Author)</div>
                </div>
              </div>
            )}

            {selectedComponent === 'db' && (
              <div className="space-y-4">
                <h3 className="font-serif-headline text-xl font-bold text-text-headline flex items-center gap-2">
                  <span className="material-symbols-outlined text-text-navy">database</span>
                  <span>Tier 3: Secure PostgreSQL + pgvector Storage</span>
                </h3>
                <p className="text-sm text-text-secondary leading-relaxed">
                  Relational data persistence with strict DPDP Act 2023 differential privacy safeguards, time-partitioned tables, and vector indexes for semantic search.
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
                <h3 className="font-serif-headline text-xl font-bold text-text-headline flex items-center gap-2">
                  <span className="material-symbols-outlined text-text-navy">api</span>
                  <span>Tier 4: FastAPI Gateway &amp; REST Intelligence Endpoints</span>
                </h3>
                <p className="text-sm text-text-secondary leading-relaxed">
                  High-performance Python backend serving analytical query results, real-time WebSocket feeds, and secure JWT authentication.
                </p>

                <div className="space-y-2 text-xs">
                  <div className="p-2.5 bg-canvas border border-border-subtle rounded flex items-center justify-between">
                    <span className="font-mono font-bold text-text-navy">GET /api/v1/sentiment/temporal-distribution</span>
                    <span className="text-text-muted">Time-series emotion breakdown</span>
                  </div>
                  <div className="p-2.5 bg-canvas border border-border-subtle rounded flex items-center justify-between">
                    <span className="font-mono font-bold text-text-navy">GET /api/v1/trends/velocity-rankings</span>
                    <span className="text-text-muted">Real-time viral topics</span>
                  </div>
                  <div className="p-2.5 bg-canvas border border-border-subtle rounded flex items-center justify-between">
                    <span className="font-mono font-bold text-text-navy">GET /api/v1/network/topology-graph</span>
                    <span className="text-text-muted">Nodes, centrality &amp; edge weights</span>
                  </div>
                  <div className="p-2.5 bg-canvas border border-border-subtle rounded flex items-center justify-between">
                    <span className="font-mono font-bold text-text-navy">WS /ws/stream/live-intelligence</span>
                    <span className="text-accent-green font-bold">WebSocket Real-time Feed</span>
                  </div>
                </div>
              </div>
            )}

            {selectedComponent === 'frontend' && (
              <div className="space-y-4">
                <h3 className="font-serif-headline text-xl font-bold text-text-headline flex items-center gap-2">
                  <span className="material-symbols-outlined text-text-navy">dashboard</span>
                  <span>Tier 5: React + Tailwind Analyst Operations Center</span>
                </h3>
                <p className="text-sm text-text-secondary leading-relaxed">
                  Intuitive, mission-critical operations dashboard providing instant situational awareness, deep sentiment inspection, demographic choropleth maps, and force-directed graph exploration.
                </p>

                {/* Interactive Diagram Preview */}
                <div
                  onClick={() => {
                    if (onOpenImageModal) {
                      onOpenImageModal(
                        PREVIEW_IMG,
                        'SANKET High-Resolution Blueprint',
                        'Modular architectural layers spanning multi-modal ingestion, transformer workers, and React analytics console.'
                      );
                    }
                  }}
                  className="cursor-pointer group relative p-2 bg-canvas border border-border-subtle rounded overflow-hidden hover:shadow-md transition-all"
                  title="Click to view full architecture diagram"
                >
                  <img
                    src={PREVIEW_IMG}
                    alt="SANKET System Preview"
                    className="w-full max-h-48 object-cover rounded transition-transform duration-300 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-brand-navy-mid/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <span className="bg-brand-navy text-white text-xs font-bold px-3 py-1.5 rounded flex items-center gap-1">
                      <span className="material-symbols-outlined text-sm">zoom_in</span>
                      <span>Zoom System Architecture Preview</span>
                    </span>
                  </div>
                </div>

                <div className="pt-2">
                  <button
                    onClick={() => onNavigate('dashboards')}
                    className="py-2.5 px-6 bg-brand-navy-mid hover:bg-brand-navy text-white font-bold text-xs uppercase tracking-wider rounded transition-colors flex items-center gap-2 cursor-pointer"
                  >
                    <span>Launch Live Operations Center</span>
                    <span className="material-symbols-outlined text-base">arrow_forward</span>
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Live Ingestion Workers Status (1 Column) */}
          <div className="bg-surface border border-border-main p-5 shadow-xs rounded">
            <h4 className="font-serif-headline text-base font-bold text-text-headline mb-3 flex items-center justify-between border-b border-border-subtle pb-2">
              <span>Ingestion Worker Fleet</span>
              <span className="text-xs text-accent-green font-bold">All Healthy</span>
            </h4>

            <div className="space-y-3">
              {MOCK_INGESTION_JOBS.map((job) => (
                <div key={job.id} className="p-3 bg-canvas border border-border-subtle rounded text-xs space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="font-bold uppercase text-text-navy">{job.platform} Worker</span>
                    <span className={`px-1.5 py-0.5 text-[9px] font-bold uppercase rounded ${
                      job.status === 'running'
                        ? 'bg-brand-navy-light text-text-dark-navy'
                        : 'bg-accent-green-light text-accent-green-text'
                    }`}>
                      {job.status}
                    </span>
                  </div>
                  <div className="text-[11px] text-text-secondary truncate">{job.workerId}</div>
                  <div className="flex justify-between text-[11px] text-text-muted pt-1">
                    <span>{job.recordsIngested.toLocaleString()} items</span>
                    <span className="font-mono font-bold text-text-dark-navy">{job.throughputPerSec} /sec</span>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-4 pt-3 border-t border-border-subtle text-center">
              <button
                onClick={() => onNavigate('dashboards', 'timeline')}
                className="text-xs font-bold text-text-navy hover:underline cursor-pointer"
              >
                Inspect Live Stream Feed &rarr;
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
