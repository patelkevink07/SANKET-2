import React from 'react';

interface AboutScreenProps {
  onNavigate: (page: string, tab?: string) => void;
  onOpenImageModal?: (src: string, alt: string, caption: string) => void;
}

export const AboutScreen: React.FC<AboutScreenProps> = ({ onNavigate, onOpenImageModal }) => {
  const SEAL_SRC = "https://lh3.googleusercontent.com/aida-public/AB6AXuDmTmgYlDlvlXpzjlGUGrhDjU1phsLY9XCUdsV3oy6QRzMnj-SY_JXp9hE7Ehlju8mAHwBQLJL9t3dG3wSlrwXowqzKPiaOXZSyeHIaHJnEjliLXxWG4wchNJw955fbpwa0asOnF-ANo9dAlG-19G7wGCMcdfL41uoqCfQVkDNzpRjFu7HGcUue3s75VHXMdt4rJHqGAqfuTWwPUdjXjW5yY4ze5ASTdLFrvP-_WqFAIpDQwCjRL9ZBPVsWm3qvV5LGv_w";

  return (
    <div className="flex-grow w-full py-6 md:py-8 bg-canvas">
      <div className="max-w-[1040px] mx-auto px-3 sm:px-6 md:px-8 w-full">
        {/* Breadcrumbs */}
        <nav className="mb-4 flex items-center text-xs text-text-muted">
          <button onClick={() => onNavigate('home')} className="hover:underline text-text-dark-navy font-medium cursor-pointer">
            Home
          </button>
          <span className="material-symbols-outlined text-[14px] mx-1">chevron_right</span>
          <span className="text-text-primary font-semibold">About SANKET / Problem Statement #26152</span>
        </nav>

        {/* Document Paper Wrapper */}
        <article className="bg-surface border border-border-main p-5 sm:p-8 md:p-12 shadow-xs">
          {/* Official Header / Seal Area with Interactive Zoom */}
          <div className="flex flex-col items-center justify-center text-center border-b-2 border-brand-navy-mid pb-8 mb-8">
            <div
              onClick={() => {
                if (onOpenImageModal) {
                  onOpenImageModal(
                    SEAL_SRC,
                    'SANKET Project Emblem',
                    'AI-Driven Multi-Modal Social Media Analytics Framework (SIH 2026 #26152 / NTRO).'
                  );
                }
              }}
              className="cursor-pointer group relative p-2 rounded hover:bg-surface-muted transition-all duration-300 transform hover:scale-105"
              title="Click to zoom emblem"
            >
              <img
                src={SEAL_SRC}
                alt="SANKET Logo Seal"
                className="h-28 md:h-32 w-auto mb-2 object-contain transition-all duration-300 group-hover:opacity-90"
              />
              <span className="text-[10px] text-text-navy font-semibold opacity-0 group-hover:opacity-100 transition-opacity block font-mono">
                Click to Expand Insignia
              </span>
            </div>

            <h1 className="text-2xl md:text-3xl lg:text-4xl font-serif-headline font-bold text-text-headline mb-2 tracking-tight">
              Problem Statement #26152
            </h1>
            <h2 className="text-xs sm:text-sm md:text-base font-bold text-text-secondary uppercase tracking-widest">
              Smart India Hackathon 2026 &bull; Problem Statement Sponsor: NTRO
            </h2>
            <div className="mt-3 inline-flex items-center gap-2 bg-brand-navy-light/60 text-text-dark-navy px-3 py-1 text-xs font-semibold rounded-sm">
              <span className="material-symbols-outlined text-[14px]">shield</span>
              <span>AI-Driven Multi-Modal Social Media Analytics Prototype</span>
            </div>
          </div>

          {/* Document Body */}
          <div className="text-sm md:text-base text-text-primary space-y-8 leading-relaxed">
            {/* Section 1: Overview */}
            <section>
              <h3 className="text-xl md:text-2xl font-serif-headline font-bold text-text-headline mb-3 border-b border-border-main pb-2">
                1. Overview
              </h3>
              <p className="text-justify leading-relaxed text-text-secondary">
                The exponential growth of digital interactions necessitates advanced analytical frameworks to interpret public sentiment, identify emerging trends, and model demographic shifts in real-time. The Social Analytics &amp; Network Knowledge Extraction Technology (SANKET) prototype initiative seeks to develop a robust, scalable platform capable of aggregating and synthesizing open multi-modal data. The system operates with high fidelity, ensuring data provenance while adhering to strict privacy mandates.
              </p>
            </section>

            {/* Section 2: Core Objectives */}
            <section>
              <h3 className="text-xl md:text-2xl font-serif-headline font-bold text-text-headline mb-3 border-b border-border-main pb-2">
                2. Core Objectives
              </h3>
              <ol className="list-decimal list-outside ml-6 space-y-3 leading-relaxed text-text-secondary">
                <li>
                  <strong className="text-text-primary">Automated Extraction &amp; Synthesis:</strong> To architect an automated pipeline capable of ingesting diverse unstructured data formats and synthesizing them into standardized, actionable intelligence.
                </li>
                <li>
                  <strong className="text-text-primary">Predictive Trend &amp; Anomaly Modeling:</strong> To leverage historical trend analysis to forecast emerging narrative velocities or coordinated botnet campaigns.
                </li>
                <li>
                  <strong className="text-text-primary">Data Protection &amp; Privacy Infrastructure:</strong> To ensure all computational and storage methodologies strictly comply with national data protection frameworks (DPDP Act 2023).
                </li>
              </ol>
            </section>

            {/* Section 3: The Five-Component Framework */}
            <section>
              <h3 className="text-xl md:text-2xl font-serif-headline font-bold text-text-headline mb-3 border-b border-border-main pb-2">
                3. The Five-Component Framework
              </h3>
              <p className="mb-6 leading-relaxed text-text-secondary">
                The proposed solution demonstrably integrates the following five core architectural components to ensure comprehensive situational awareness:
              </p>

              <div className="space-y-6 pl-3 sm:pl-4 border-l-2 border-border-strong">
                <div className="bg-canvas p-4 border border-border-main rounded">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                    <h4 className="text-base font-bold text-text-navy mb-1 font-serif-headline">
                      3.1 Continuous Data Collection &amp; Timeline Management
                    </h4>
                    <button
                      onClick={() => onNavigate('dashboards', 'timeline')}
                      className="text-xs text-text-navy hover:underline font-bold cursor-pointer"
                    >
                      Open Live Pipeline &rarr;
                    </button>
                  </div>
                  <p className="text-xs md:text-sm text-text-secondary leading-relaxed">
                    Continuous, high-throughput ingestion of open-source intelligence across text, audio, and visual modalities. Must include robust deduping, verification heuristics, and support for primary (X, Telegram), secondary (Instagram, Facebook), and bonus sources (Reddit, YouTube).
                  </p>
                </div>

                <div className="bg-canvas p-4 border border-border-main rounded">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                    <h4 className="text-base font-bold text-text-navy mb-1 font-serif-headline">
                      3.2 Multi-Dimensional Sentiment Inference
                    </h4>
                    <button
                      onClick={() => onNavigate('dashboards', 'sentiment')}
                      className="text-xs text-text-navy hover:underline font-bold cursor-pointer"
                    >
                      Open Sentiment Module &rarr;
                    </button>
                  </div>
                  <p className="text-xs md:text-sm text-text-secondary leading-relaxed">
                    Deployment of Natural Language Processing (NLP) models specifically tuned for regional dialects, Hinglish, and contextual nuances to accurately gauge public mood and intent (support, oppose, anxiety, excitement, sarcasm), moving beyond basic binary polarity.
                  </p>
                </div>

                <div className="bg-canvas p-4 border border-border-main rounded">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                    <h4 className="text-base font-bold text-text-navy mb-1 font-serif-headline">
                      3.3 Automated Demographic Profiling (Anonymized)
                    </h4>
                    <button
                      onClick={() => onNavigate('dashboards', 'demographics')}
                      className="text-xs text-text-navy hover:underline font-bold cursor-pointer"
                    >
                      Open Demographics Module &rarr;
                    </button>
                  </div>
                  <p className="text-xs md:text-sm text-text-secondary leading-relaxed">
                    Macro-level analysis of population cohorts engaging with specific narratives, strictly utilizing anonymized metadata, public bio text, and behavioral heuristics to maintain full compliance with DPDP Act 2023 privacy statutes.
                  </p>
                </div>

                <div className="bg-canvas p-4 border border-border-main rounded">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                    <h4 className="text-base font-bold text-text-navy mb-1 font-serif-headline">
                      3.4 Temporal Trend &amp; Topic Detection
                    </h4>
                    <button
                      onClick={() => onNavigate('dashboards', 'trends')}
                      className="text-xs text-text-navy hover:underline font-bold cursor-pointer"
                    >
                      Open Trend Forecasting &rarr;
                    </button>
                  </div>
                  <p className="text-xs md:text-sm text-text-secondary leading-relaxed">
                    Time-series analysis to identify narrative velocity, rank trending keywords chronologically, and predict peak engagement periods, facilitating proactive rather than reactive operational planning.
                  </p>
                </div>

                <div className="bg-canvas p-4 border border-border-main rounded">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                    <h4 className="text-base font-bold text-text-navy mb-1 font-serif-headline">
                      3.5 Link Analysis &amp; Network Topology Mapping
                    </h4>
                    <button
                      onClick={() => onNavigate('dashboards', 'network')}
                      className="text-xs text-text-navy hover:underline font-bold cursor-pointer"
                    >
                      Open Force Graph &rarr;
                    </button>
                  </div>
                  <p className="text-xs md:text-sm text-text-secondary leading-relaxed">
                    Graph theory application to visualize information dissemination pathways, identifying key opinion leaders (KOLs), high-betweenness amplification nodes, and coordinated inauthentic botnet activities across time slices.
                  </p>
                </div>
              </div>
            </section>

            {/* CTA Band */}
            <div className="pt-6 border-t border-border-main flex flex-wrap items-center justify-between gap-4">
              <button
                onClick={() => onNavigate('architecture')}
                className="py-2.5 px-6 bg-brand-navy hover:bg-brand-navy-dark text-white font-bold text-xs uppercase tracking-wider transition-colors flex items-center gap-2 cursor-pointer"
              >
                <span>View Full System Architecture</span>
                <span className="material-symbols-outlined text-[16px]">account_tree</span>
              </button>
              <button
                onClick={() => onNavigate('dashboards')}
                className="py-2.5 px-6 bg-accent-saffron hover:bg-accent-saffron-hover text-white font-bold text-xs uppercase tracking-wider transition-colors flex items-center gap-2 cursor-pointer"
              >
                <span>Launch Live Analyst Dashboard</span>
                <span className="material-symbols-outlined text-[16px]">speed</span>
              </button>
            </div>
          </div>
        </article>
      </div>
    </div>
  );
};
