import React from 'react';

interface AboutScreenProps {
  onNavigate: (page: string, tab?: string) => void;
  onOpenImageModal?: (src: string, alt: string, caption: string) => void;
}

export const AboutScreen: React.FC<AboutScreenProps> = ({ onNavigate, onOpenImageModal }) => {
  const SEAL_SRC = "https://lh3.googleusercontent.com/aida-public/AB6AXuDmTmgYlDlvlXpzjlGUGrhDjU1phsLY9XCUdsV3oy6QRzMnj-SY_JXp9hE7Ehlju8mAHwBQLJL9t3dG3wSlrwXowqzKPiaOXZSyeHIaHJnEjliLXxWG4wchNJw955fbpwa0asOnF-ANo9dAlG-19G7wGCMcdfL41uoqCfQVkDNzpRjFu7HGcUue3s75VHXMdt4rJHqGAqfuTWwPUdjXjW5yY4ze5ASTdLFrvP-_WqFAIpDQwCjRL9ZBPVsWm3qvV5LGv_w";

  return (
    <div className="flex-grow w-full py-6 md:py-8 bg-page transition-colors duration-200">
      <div className="max-w-[1040px] mx-auto px-3 sm:px-6 md:px-8 w-full">
        {/* Breadcrumbs */}
        <nav className="mb-4 flex items-center text-xs text-muted">
          <button onClick={() => onNavigate('home')} className="hover:underline text-navy font-medium">
            Home
          </button>
          <span className="material-symbols-outlined text-[14px] mx-1">chevron_right</span>
          <span className="text-primary font-semibold">About SANKET / Problem Statement #26152</span>
        </nav>

        {/* Document Paper Wrapper */}
        <article className="bg-surface border border-main p-5 sm:p-8 md:p-12 shadow-xs">
          {/* Official Header / Seal Area with Interactive Zoom */}
          <div className="flex flex-col items-center justify-center text-center border-b-2 border-brand pb-8 mb-8">
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
              className="cursor-pointer group relative p-2 rounded hover:bg-subtle transition-all duration-300 transform hover:scale-105"
              title="Click to zoom emblem"
            >
              <img
                src={SEAL_SRC}
                alt="SANKET Logo Seal"
                className="h-28 md:h-32 w-auto mb-2 object-contain transition-all duration-300 group-hover:opacity-90"
              />
              <span className="text-[10px] text-brand font-semibold opacity-0 group-hover:opacity-100 transition-opacity block font-mono">
                Click to Expand Insignia
              </span>
            </div>

            <h1 className="text-2xl md:text-3xl lg:text-4xl font-serif-headline font-bold text-headline mb-2 tracking-tight">
              Problem Statement #26152
            </h1>
            <h2 className="text-xs sm:text-sm md:text-base font-bold text-secondary uppercase tracking-widest">
              Smart India Hackathon 2026 &bull; Problem Statement Sponsor: NTRO
            </h2>
            <div className="mt-3 inline-flex items-center gap-2 bg-navy-light/60 text-brand px-3 py-1 text-xs font-semibold rounded-sm">
              <span className="material-symbols-outlined text-[14px]">shield</span>
              <span>AI-Driven Multi-Modal Social Media Analytics Prototype</span>
            </div>
          </div>

          {/* Document Body */}
          <div className="text-sm md:text-base text-primary space-y-8 leading-relaxed">
            {/* Section 1: Overview */}
            <section>
              <h3 className="text-xl md:text-2xl font-serif-headline font-bold text-headline mb-3 border-b border-main pb-2">
                1. Overview
              </h3>
              <p className="text-justify leading-relaxed text-secondary">
                Online activity is growing fast, and understanding it needs better tools — to read public sentiment, spot new trends, and track audience changes in real time. SANKET (Social Analytics &amp; Network Knowledge Extraction Technology) is a prototype that collects and analyzes different types of public data on one platform. It keeps data accurate and traceable, while following strict privacy rules.
              </p>
            </section>

            {/* Section 2: Core Objectives */}
            <section>
              <h3 className="text-xl md:text-2xl font-serif-headline font-bold text-headline mb-3 border-b border-main pb-2">
                2. Core Objectives
              </h3>
              <ol className="list-decimal list-outside ml-6 space-y-3 leading-relaxed text-secondary">
                <li>
                  <strong className="text-primary">Automatic Data Collection:</strong> Build a pipeline that can take in different types of raw data and turn it into clear, useful information.
                </li>
                <li>
                  <strong className="text-primary">Trend &amp; Anomaly Prediction:</strong> Use past trend data to forecast fast-growing narratives or coordinated bot activity.
                </li>
                <li>
                  <strong className="text-primary">Data Protection &amp; Privacy:</strong> Make sure all data processing and storage follows India's DPDP Act 2023.
                </li>
              </ol>
            </section>

            {/* Section 3: The Five-Component Framework */}
            <section>
              <h3 className="text-xl md:text-2xl font-serif-headline font-bold text-headline mb-3 border-b border-main pb-2">
                3. The Five-Component Framework
              </h3>
              <p className="mb-6 leading-relaxed text-secondary">
                This solution brings together five core components to give a complete picture of what's happening online:
              </p>

              <div className="space-y-6 pl-3 sm:pl-4 border-l-2 border-card">
                <div className="bg-subtle p-4 border border-main rounded">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                    <h4 className="text-base font-bold text-brand mb-1 font-serif-headline">
                      3.1 Continuous Data Collection &amp; Timeline Management
                    </h4>
                    <button
                      onClick={() => onNavigate('dashboards', 'timeline')}
                      className="text-xs text-brand hover:underline font-bold"
                    >
                      Open Dashboard &rarr;
                    </button>
                  </div>
                  <p className="text-xs md:text-sm text-secondary leading-relaxed">
                    Constantly collects public data — text, audio, and images — from platforms like X and Telegram (primary), Instagram and Facebook (secondary), and Reddit and YouTube (bonus). Removes duplicates and checks data quality along the way.
                  </p>
                </div>

                <div className="bg-subtle p-4 border border-main rounded">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                    <h4 className="text-base font-bold text-brand mb-1 font-serif-headline">
                      3.2 Multi-Dimensional Sentiment
                    </h4>
                    <button
                      onClick={() => onNavigate('dashboards', 'sentiment')}
                      className="text-xs text-brand hover:underline font-bold"
                    >
                      Open Sentiment &rarr;
                    </button>
                  </div>
                  <p className="text-xs md:text-sm text-secondary leading-relaxed">
                    Uses AI language models built for regional languages and Hinglish to read public mood and intent — like support, opposition, anxiety, excitement, or sarcasm — not just positive or negative.
                  </p>
                </div>

                <div className="bg-subtle p-4 border border-main rounded">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                    <h4 className="text-base font-bold text-brand mb-1 font-serif-headline">
                      3.3 Automated Demographic Profiling (Anonymized)
                    </h4>
                    <button
                      onClick={() => onNavigate('dashboards', 'demographics')}
                      className="text-xs text-brand hover:underline font-bold"
                    >
                      Open Demographics &rarr;
                    </button>
                  </div>
                  <p className="text-xs md:text-sm text-secondary leading-relaxed">
                    Looks at broad audience groups behind specific narratives, using anonymous data, public bios, and behavior patterns — fully in line with DPDP Act 2023 privacy rules.
                  </p>
                </div>

                <div className="bg-subtle p-4 border border-main rounded">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                    <h4 className="text-base font-bold text-brand mb-1 font-serif-headline">
                      3.4 Trending Topics Over Time
                    </h4>
                    <button
                      onClick={() => onNavigate('dashboards', 'trends')}
                      className="text-xs text-brand hover:underline font-bold"
                    >
                      Open Trends &rarr;
                    </button>
                  </div>
                  <p className="text-xs md:text-sm text-secondary leading-relaxed">
                    Tracks trends over time, ranks keywords by when they appear, and predicts when engagement will peak — so teams can plan ahead instead of reacting late.
                  </p>
                </div>

                <div className="bg-subtle p-4 border border-main rounded">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                    <h4 className="text-base font-bold text-brand mb-1 font-serif-headline">
                      3.5 Link Analysis &amp; Network Topology Mapping
                    </h4>
                    <button
                      onClick={() => onNavigate('dashboards', 'network')}
                      className="text-xs text-brand hover:underline font-bold"
                    >
                      Open Network Topology &rarr;
                    </button>
                  </div>
                  <p className="text-xs md:text-sm text-secondary leading-relaxed">
                    Maps how information spreads, showing key opinion leaders, major amplifiers, and signs of coordinated bot activity over time.
                  </p>
                </div>
              </div>
            </section>

            {/* CTA Band */}
            <div className="pt-6 border-t border-main flex flex-wrap items-center justify-between gap-4">
              <button
                onClick={() => onNavigate('architecture')}
                className="py-2.5 px-6 bg-navy hover:bg-headline text-white font-bold text-xs uppercase tracking-wider transition-colors flex items-center gap-2 cursor-pointer"
              >
                <span>View Full System Architecture</span>
                <span className="material-symbols-outlined text-[16px]">account_tree</span>
              </button>
              <button
                onClick={() => onNavigate('dashboards')}
                className="py-2.5 px-6 bg-saffron hover:bg-saffron-hover text-white font-bold text-xs uppercase tracking-wider transition-colors flex items-center gap-2 cursor-pointer"
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

