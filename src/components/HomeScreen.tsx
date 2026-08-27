import React from 'react';
import { MOCK_NOTICES } from '../data/mockData';
import { InteractiveHoverButton } from './InteractiveHoverButton';

interface HomeScreenProps {
  onNavigate: (page: string, tab?: string) => void;
  onOpenImageModal?: (src: string, alt: string, caption: string) => void;
  onOpenSandbox?: () => void;
}

export const HomeScreen: React.FC<HomeScreenProps> = ({
  onNavigate,
  onOpenImageModal,
  onOpenSandbox
}) => {
  const PREVIEW_IMG = "https://lh3.googleusercontent.com/aida-public/AB6AXuDadJtV_zVpm8MRWZAIs1UOLFdjQCDAQfXRzhHtDzN8gpHiRkmatv1i7_HXPFM_sH0cZewR4n5bBDqLbC6gNHlMFhdO8XRGQ20Ivexl-YDGaUv5SKVH5i7IO0SKr7kzL90Ri090fsWKedfz9lObDeqTpt4Aap6z0V-Dx9EK9Tqyqiyitg7Z-aITUi0DWU7MIM42pz4QMO-KBXC_REroPSsrIVGDvwjA9vv44q0wIAfXYgqU3ZmISH7z_Q";
  const SIH_BADGE = "https://lh3.googleusercontent.com/aida-public/AB6AXuCFNVU64LZftn07wriZj1h6IS98I6itrIRBvfw0nD3qhRVhXx_MCFawJHwE_y18SVuR5q1zRf5n_GB3GW7dyxIMxsh2P4mjcq6enCUWy5dcyS165YXzFS4GFRZtY8yCGE7LdIctmWJYNlN6q9ioH7k3dKBMZg9J0gRsVQTSGPJGMYTAbFfMP0_tqS96mYnr-n86JqRV8gWsj04ifm8cxTqjDeVo9hb-iabNsvK2IbzI6MXCgrFjSi52-w";

  const handleImageClick = (src: string, alt: string, caption: string) => {
    if (onOpenImageModal) {
      onOpenImageModal(src, alt, caption);
    }
  };

  return (
    <div className="flex-grow flex flex-col w-full bg-canvas text-text-primary">
      {/* Breadcrumb */}
      <div className="bg-surface py-2 px-3 sm:px-6 lg:px-8 border-b border-border-main">
        <div className="max-w-[1280px] mx-auto text-xs text-text-muted flex items-center gap-1.5">
          <button
            onClick={() => onNavigate('home')}
            className="hover:underline text-text-dark-navy font-medium cursor-pointer"
          >
            Portal
          </button>
          <span>&gt;</span>
          <span className="text-text-primary font-semibold">Home</span>
        </div>
      </div>

      {/* Hero Band */}
      <section className="bg-hero py-8 md:py-12 px-3 sm:px-6 lg:px-8 border-b border-border-main">
        <div className="max-w-[1280px] mx-auto flex flex-col lg:flex-row gap-8 items-center">
          <div className="w-full lg:w-3/5">
            <div className="inline-flex items-center gap-2 px-2.5 py-1 bg-surface border border-border-strong rounded text-[11px] font-bold text-text-navy uppercase mb-2">
              <span className="w-2 h-2 rounded-full bg-accent-saffron animate-ping"></span>
              <span>Smart India Hackathon 2026 &bull; Problem Statement #26152</span>
            </div>
            <h1 className="font-serif-headline text-3xl sm:text-4xl lg:text-[42px] font-bold text-text-headline mb-1 tracking-tight leading-tight">
              SANKET
            </h1>
            <h2 className="font-serif-headline text-lg sm:text-xl font-bold text-accent-saffron mb-4 uppercase tracking-wider">
              Decode. Analyze. Anticipate.
            </h2>
            <p className="text-sm sm:text-base text-text-secondary text-justify leading-relaxed">
              SANKET (Social Analytics &amp; Network Knowledge Extraction Technology) is an AI-driven social media analytics framework engineered for deep semantic analysis of multi-modal social media content. It leverages advanced transformer NLP, vernacular Hinglish sarcasm detection, anonymized demographic cohort modeling, and force-directed network topology analysis. Proposed as a solution for NTRO's Smart India Hackathon 2026 Problem Statement #26152, SANKET delivers real-time situational awareness, trend forecasting, and influence network mapping.
            </p>

            <div className="mt-6 flex flex-wrap items-center gap-3">
              <button
                id="btn-hero-launch-dashboards"
                onClick={() => onNavigate('dashboards')}
                className="py-2.5 px-5 sm:px-6 bg-brand-navy-mid hover:bg-brand-navy text-white font-bold text-xs uppercase tracking-wider transition-all duration-300 flex items-center gap-2 border border-brand-navy shadow-sm active:scale-95 cursor-pointer"
              >
                <span>Launch Analytics Console</span>
                <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
              </button>

              {/* Interactive Color-Shifting Button */}
              <InteractiveHoverButton
                id="btn-hero-interactive-sandbox"
                label="Launch AI Inference Sandbox"
                sublabel="try demo"
                icon="bolt"
                variant="saffron"
                onClick={() => {
                  if (onOpenSandbox) {
                    onOpenSandbox();
                  } else {
                    onNavigate('dashboards', 'sentiment');
                  }
                }}
              />

              <button
                id="btn-hero-view-ps"
                onClick={() => onNavigate('about')}
                className="py-2.5 px-4 sm:px-5 bg-surface hover:bg-surface-muted text-text-dark-navy font-bold text-xs uppercase tracking-wider transition-colors border border-border-main flex items-center gap-2 cursor-pointer"
              >
                <span>Read Problem Dossier</span>
                <span className="material-symbols-outlined text-[16px]">description</span>
              </button>
            </div>
          </div>

          {/* Interactive Image Preview with hover enlargement & zoom trigger */}
          <div className="w-full lg:w-2/5 flex justify-center">
            <div
              onClick={() => handleImageClick(PREVIEW_IMG, 'SANKET Operational Intelligence Dashboard', 'Isometric high-fidelity interface preview showing multi-dimensional sentiment metrics, viral trend velocity charts, and demographic distribution maps.')}
              className="relative group cursor-pointer overflow-hidden rounded border border-border-main bg-surface p-2 shadow-sm hover:shadow-xl transition-all duration-300 transform hover:scale-[1.03]"
              title="Click to expand high-resolution preview"
            >
              <img
                src={PREVIEW_IMG}
                alt="SANKET Isometric Dashboard Preview"
                className="w-full max-w-md rounded object-cover transition-all duration-300 group-hover:opacity-90 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-brand-navy-mid/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded flex flex-col items-center justify-center p-4">
                <span className="bg-brand-navy text-white text-xs font-bold px-3 py-1.5 rounded shadow flex items-center gap-1.5">
                  <span className="material-symbols-outlined text-sm">zoom_in</span>
                  <span>Click to Inspect High-Res Diagram</span>
                </span>
                <span className="text-[11px] text-white font-medium mt-1 bg-black/60 px-2 py-0.5 rounded">
                  Hover to enlarge &bull; Full-screen zoom
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Core Capabilities Grid (5 Component Framework) */}
      <section className="py-8 md:py-10 px-3 sm:px-6 lg:px-8 bg-surface border-b border-border-main">
        <div className="max-w-[1280px] mx-auto">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-2 mb-6">
            <div>
              <h3 className="font-serif-headline text-2xl font-bold text-text-headline border-b-2 border-brand-navy pb-1 inline-block">
                Core Capabilities
              </h3>
              <p className="text-xs text-text-muted mt-1">
                Integrated Five-Component Framework as specified in Problem Statement #26152
              </p>
            </div>
            <button
              onClick={() => onNavigate('dashboards')}
              className="text-xs font-bold text-text-navy hover:text-accent-saffron transition-colors flex items-center gap-1 cursor-pointer"
            >
              <span>Explore All 5 Modules</span>
              <span className="material-symbols-outlined text-[16px]">chevron_right</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {/* Component 1: Data Collection */}
            <div
              id="card-cap-data-collection"
              onClick={() => onNavigate('dashboards', 'timeline')}
              className="bg-surface border border-border-main p-4 rounded hover:border-brand-navy-mid hover:shadow-md transition-all duration-200 cursor-pointer flex flex-col group"
            >
              <div className="flex items-center gap-2 mb-2 bg-surface-muted p-2.5 border-b border-border-main group-hover:bg-brand-navy-light/40 transition-colors">
                <span className="material-symbols-outlined text-text-navy">database</span>
                <h4 className="font-serif-headline text-lg font-bold text-text-headline">Data Collection</h4>
              </div>
              <p className="text-sm text-text-secondary leading-relaxed pt-1">
                Aggregates multi-modal data streams across disparate social platforms in real-time, ensuring comprehensive coverage and resilient ingestion pipelines.
              </p>
              <div className="mt-auto pt-3 border-t border-border-subtle flex items-center justify-between text-xs text-text-navy font-semibold">
                <span>Multi-Platform Ingestion</span>
                <span className="material-symbols-outlined text-[16px] group-hover:translate-x-1 transition-transform">arrow_forward</span>
              </div>
            </div>

            {/* Component 2: Sentiment Analysis */}
            <div
              id="card-cap-sentiment"
              onClick={() => onNavigate('dashboards', 'sentiment')}
              className="bg-surface border border-border-main p-4 rounded hover:border-brand-navy-mid hover:shadow-md transition-all duration-200 cursor-pointer flex flex-col group"
            >
              <div className="flex items-center gap-2 mb-2 bg-surface-muted p-2.5 border-b border-border-main group-hover:bg-brand-navy-light/40 transition-colors">
                <span className="material-symbols-outlined text-text-navy">psychology</span>
                <h4 className="font-serif-headline text-lg font-bold text-text-headline">Sentiment Analysis</h4>
              </div>
              <p className="text-sm text-text-secondary leading-relaxed pt-1">
                Applies advanced NLP models to determine polarity, emotion, and shifting public sentiment across vernacular languages and regional dialects.
              </p>
              <div className="mt-auto pt-3 border-t border-border-subtle flex items-center justify-between text-xs text-text-navy font-semibold">
                <span>Multi-Dimensional Emotion NLP</span>
                <span className="material-symbols-outlined text-[16px] group-hover:translate-x-1 transition-transform">arrow_forward</span>
              </div>
            </div>

            {/* Component 3: Demographics */}
            <div
              id="card-cap-demographics"
              onClick={() => onNavigate('dashboards', 'demographics')}
              className="bg-surface border border-border-main p-4 rounded hover:border-brand-navy-mid hover:shadow-md transition-all duration-200 cursor-pointer flex flex-col group"
            >
              <div className="flex items-center gap-2 mb-2 bg-surface-muted p-2.5 border-b border-border-main group-hover:bg-brand-navy-light/40 transition-colors">
                <span className="material-symbols-outlined text-text-navy">group</span>
                <h4 className="font-serif-headline text-lg font-bold text-text-headline">Demographics</h4>
              </div>
              <p className="text-sm text-text-secondary leading-relaxed pt-1">
                Profiles engagement patterns across geographic, age, and affinity clusters to understand the audience composition of specific narratives.
              </p>
              <div className="mt-auto pt-3 border-t border-border-subtle flex items-center justify-between text-xs text-text-navy font-semibold">
                <span>Anonymized Cohort Profiling</span>
                <span className="material-symbols-outlined text-[16px] group-hover:translate-x-1 transition-transform">arrow_forward</span>
              </div>
            </div>

            {/* Component 4: Trend Identification */}
            <div
              id="card-cap-trend"
              onClick={() => onNavigate('dashboards', 'trends')}
              className="bg-surface border border-border-main p-4 rounded hover:border-brand-navy-mid hover:shadow-md transition-all duration-200 cursor-pointer flex flex-col group lg:col-span-1"
            >
              <div className="flex items-center gap-2 mb-2 bg-surface-muted p-2.5 border-b border-border-main group-hover:bg-brand-navy-light/40 transition-colors">
                <span className="material-symbols-outlined text-text-navy">monitoring</span>
                <h4 className="font-serif-headline text-lg font-bold text-text-headline">Trend Identification</h4>
              </div>
              <p className="text-sm text-text-secondary leading-relaxed pt-1">
                Detects emerging topics and viral vectors before they reach critical mass, utilizing time-series forecasting and anomaly detection algorithms.
              </p>
              <div className="mt-auto pt-3 border-t border-border-subtle flex items-center justify-between text-xs text-text-navy font-semibold">
                <span>Chronological &amp; Velocity Prediction</span>
                <span className="material-symbols-outlined text-[16px] group-hover:translate-x-1 transition-transform">arrow_forward</span>
              </div>
            </div>

            {/* Component 5: Network Graphing */}
            <div
              id="card-cap-network"
              onClick={() => onNavigate('dashboards', 'network')}
              className="bg-surface border border-border-main p-4 rounded hover:border-brand-navy-mid hover:shadow-md transition-all duration-200 cursor-pointer flex flex-col group lg:col-span-2"
            >
              <div className="flex items-center gap-2 mb-2 bg-surface-muted p-2.5 border-b border-border-main group-hover:bg-brand-navy-light/40 transition-colors">
                <span className="material-symbols-outlined text-text-navy">hub</span>
                <h4 className="font-serif-headline text-lg font-bold text-text-headline">Network Graphing</h4>
              </div>
              <p className="text-sm text-text-secondary leading-relaxed pt-1">
                Visualizes complex relationships, identifying key influencers, echo chambers, and coordinated inauthentic behavior within the digital ecosystem through intricate topological mapping.
              </p>
              <div className="mt-auto pt-3 border-t border-border-subtle flex items-center justify-between text-xs text-text-navy font-semibold">
                <span>Force-Directed Influence Topology &amp; KOL Mapping</span>
                <span className="material-symbols-outlined text-[16px] group-hover:translate-x-1 transition-transform">arrow_forward</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Affiliation & Notices Band */}
      <section className="max-w-[1280px] mx-auto w-full grid grid-cols-1 lg:grid-cols-3 gap-6 py-8 px-3 sm:px-6 lg:px-8">
        {/* Hackathon Problem Statement Presentation Card */}
        <div className="lg:col-span-2 bg-hero border border-border-main p-6 rounded flex flex-col justify-center shadow-xs">
          <div className="flex flex-col sm:flex-row items-center gap-6 justify-around">
            <div className="flex flex-col items-center text-center p-2">
              <span className="text-[10px] font-bold text-accent-saffron uppercase tracking-widest">
                Problem Statement Organization
              </span>
              <h4 className="font-serif-headline text-base font-bold text-text-headline mt-0.5">
                National Technical Research Organisation (NTRO)
              </h4>
              <p className="text-xs text-text-secondary max-w-xs mt-1">
                Authoring agency for Smart India Hackathon 2026 Problem Statement #26152
              </p>
            </div>

            <div className="h-[1px] w-full sm:w-[1px] sm:h-24 bg-border-main"></div>

            <div
              onClick={() => handleImageClick(SIH_BADGE, 'Smart India Hackathon 2026 Problem Statement #26152', 'Ministry of Education & AICTE national innovation initiative.')}
              className="text-center flex flex-col items-center cursor-pointer p-2 rounded hover:bg-surface/60 transition-all duration-300 transform hover:scale-105"
              title="Click to zoom SIH 2026 Badge"
            >
              <img
                src={SIH_BADGE}
                alt="SIH 2026 Badge"
                className="h-16 w-auto mx-auto mb-2 object-contain transition-transform duration-300 hover:scale-105"
              />
              <p className="font-bold text-sm text-text-headline">
                Problem Statement #26152
              </p>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onNavigate('about');
                }}
                className="text-xs text-text-navy hover:underline font-semibold mt-1 cursor-pointer"
              >
                View Full Specifications &rarr;
              </button>
            </div>
          </div>
        </div>

        {/* Notices & Updates Card */}
        <div className="bg-surface border border-border-main rounded flex flex-col shadow-xs">
          <div className="bg-surface-muted p-3 border-b border-border-main flex items-center justify-between">
            <h4 className="font-serif-headline text-base font-bold text-text-headline">
              Notices &amp; Updates
            </h4>
            <button
              onClick={() => onNavigate('knowledge')}
              className="text-xs font-bold text-text-navy hover:underline cursor-pointer"
            >
              View All
            </button>
          </div>
          <ul className="p-3 flex flex-col gap-2.5">
            {MOCK_NOTICES.map((notice) => (
              <li
                key={notice.id}
                className="border-b border-border-subtle pb-2.5 last:border-0 last:pb-0"
              >
                <div className="flex items-start gap-2">
                  {notice.isNew && (
                    <span className="bg-status-danger text-white font-bold px-1.5 py-0.5 rounded-sm text-[9px] mt-0.5 tracking-wider">
                      NEW
                    </span>
                  )}
                  <div>
                    <p
                      onClick={() => onNavigate('knowledge')}
                      className="text-xs font-medium text-text-primary hover:text-text-navy cursor-pointer underline decoration-border-strong leading-snug"
                    >
                      {notice.title}
                    </p>
                    <p className="text-[11px] text-text-muted mt-0.5 font-mono">
                      {notice.date}
                    </p>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </div>
  );
};
