import React from 'react';

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
  return (
    <div className="flex-grow flex flex-col w-full bg-page transition-colors duration-200">
      {/* Breadcrumb */}
      <div className="bg-surface py-2 px-3 sm:px-6 lg:px-8 border-b border-main">
        <div className="max-w-[1280px] mx-auto text-xs text-muted flex items-center gap-1.5">
          <button
            onClick={() => onNavigate('home')}
            className="hover:underline text-navy font-medium"
          >
            Portal
          </button>
          <span>&gt;</span>
          <span className="text-primary font-semibold">Home</span>
        </div>
      </div>

      {/* Hero Band */}
      <section className="bg-banner py-8 md:py-12 px-3 sm:px-6 lg:px-8 border-b border-main">
        <div className="max-w-[1280px] mx-auto flex flex-col items-center text-center">
          <div className="w-full max-w-3xl flex flex-col items-center">
            <div className="inline-flex items-center gap-2 px-2.5 py-1 bg-surface border border-card rounded text-[11px] font-bold text-brand uppercase mb-2">
              <span className="w-2 h-2 rounded-full bg-saffron animate-ping"></span>
              <span>Smart India Hackathon 2026 &bull; Problem Statement #26152</span>
            </div>
            <h1 className="font-serif-headline text-3xl sm:text-4xl lg:text-[42px] font-bold text-headline mb-1 tracking-tight leading-tight">
              SANKET
            </h1>
            <h2 className="font-serif-headline text-lg sm:text-xl font-bold text-saffron mb-4 uppercase tracking-wider">
              Decode. Analyze. Anticipate.
            </h2>
            <p className="text-sm sm:text-base text-secondary text-justify sm:text-center leading-relaxed">
              SANKET uses AI to study posts, images, and videos on social media. It understands what people mean, spots sarcastic Hinglish, groups users by anonymous traits, and shows how people are connected online. Made for NTRO’s Smart India Hackathon 2026 Problem #26152, it gives live updates, predicts trends, and highlights key influencers.
            </p>

            <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
              <button
                id="btn-hero-launch-dashboards"
                onClick={() => onNavigate('dashboards', 'overview')}
                className="py-2.5 px-5 sm:px-6 bg-brand hover:bg-navy text-white font-bold text-xs uppercase tracking-wider transition-all duration-300 flex items-center gap-2 border border-navy shadow-sm active:scale-95 cursor-pointer"
              >
                <span>Launch Dashboard</span>
                <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Core Capabilities Grid (5 Component Framework) */}
      <section className="py-8 md:py-10 px-3 sm:px-6 lg:px-8 bg-surface border-b border-main">
        <div className="max-w-[1280px] mx-auto">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-2 mb-6">
            <div>
              <h3 className="font-serif-headline text-2xl font-bold text-headline border-b-2 border-navy pb-1 inline-block">
                Core Capabilities
              </h3>
              <p className="text-xs text-muted mt-1">
                Integrated Five-Component Framework as specified in Problem Statement #26152
              </p>
            </div>
            <button
              onClick={() => onNavigate('dashboards', 'overview')}
              className="text-xs font-bold text-brand hover:text-saffron transition-colors flex items-center gap-1 cursor-pointer"
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
              className="bg-surface border border-main p-4 rounded hover:border-brand hover:shadow-md transition-all duration-200 cursor-pointer flex flex-col group"
            >
              <div className="flex items-center gap-2 mb-2 bg-subtle p-2.5 border-b border-main group-hover:bg-navy-light/40 transition-colors">
                <span className="material-symbols-outlined text-brand">database</span>
                <h4 className="font-serif-headline text-lg font-bold text-headline">Data Collection</h4>
              </div>
              <p className="text-sm text-secondary leading-relaxed pt-1">
                Aggregates multi-modal data streams across disparate social platforms in real-time, ensuring comprehensive coverage and resilient ingestion pipelines.
              </p>
              <div className="mt-auto pt-3 border-t border-subtle flex items-center justify-between text-xs text-brand font-semibold">
                <span>Dashboard</span>
                <span className="material-symbols-outlined text-[16px] group-hover:translate-x-1 transition-transform">arrow_forward</span>
              </div>
            </div>

            {/* Component 2: Sentiment Analysis */}
            <div
              id="card-cap-sentiment"
              onClick={() => onNavigate('dashboards', 'sentiment')}
              className="bg-surface border border-main p-4 rounded hover:border-brand hover:shadow-md transition-all duration-200 cursor-pointer flex flex-col group"
            >
              <div className="flex items-center gap-2 mb-2 bg-subtle p-2.5 border-b border-main group-hover:bg-navy-light/40 transition-colors">
                <span className="material-symbols-outlined text-brand">psychology</span>
                <h4 className="font-serif-headline text-lg font-bold text-headline">Sentiment Analysis</h4>
              </div>
              <p className="text-sm text-secondary leading-relaxed pt-1">
                Applies advanced NLP models to determine polarity, emotion, and shifting public sentiment across vernacular languages and regional dialects.
              </p>
              <div className="mt-auto pt-3 border-t border-subtle flex items-center justify-between text-xs text-brand font-semibold">
                <span>Sentiment &amp; Emotion</span>
                <span className="material-symbols-outlined text-[16px] group-hover:translate-x-1 transition-transform">arrow_forward</span>
              </div>
            </div>

            {/* Component 3: Demographics */}
            <div
              id="card-cap-demographics"
              onClick={() => onNavigate('dashboards', 'demographics')}
              className="bg-surface border border-main p-4 rounded hover:border-brand hover:shadow-md transition-all duration-200 cursor-pointer flex flex-col group"
            >
              <div className="flex items-center gap-2 mb-2 bg-subtle p-2.5 border-b border-main group-hover:bg-navy-light/40 transition-colors">
                <span className="material-symbols-outlined text-brand">group</span>
                <h4 className="font-serif-headline text-lg font-bold text-headline">Demographics</h4>
              </div>
              <p className="text-sm text-secondary leading-relaxed pt-1">
                Profiles engagement patterns across geographic, age, and affinity clusters to understand the audience composition of specific narratives.
              </p>
              <div className="mt-auto pt-3 border-t border-subtle flex items-center justify-between text-xs text-brand font-semibold">
                <span>Demographics</span>
                <span className="material-symbols-outlined text-[16px] group-hover:translate-x-1 transition-transform">arrow_forward</span>
              </div>
            </div>

            {/* Component 4: Trend Identification */}
            <div
              id="card-cap-trend"
              onClick={() => onNavigate('dashboards', 'trends')}
              className="bg-surface border border-main p-4 rounded hover:border-brand hover:shadow-md transition-all duration-200 cursor-pointer flex flex-col group lg:col-span-1"
            >
              <div className="flex items-center gap-2 mb-2 bg-subtle p-2.5 border-b border-main group-hover:bg-navy-light/40 transition-colors">
                <span className="material-symbols-outlined text-brand">monitoring</span>
                <h4 className="font-serif-headline text-lg font-bold text-headline">Trend Identification</h4>
              </div>
              <p className="text-sm text-secondary leading-relaxed pt-1">
                Detects emerging topics and viral vectors before they reach critical mass, utilizing time-series forecasting and anomaly detection algorithms.
              </p>
              <div className="mt-auto pt-3 border-t border-subtle flex items-center justify-between text-xs text-brand font-semibold">
                <span>Trends</span>
                <span className="material-symbols-outlined text-[16px] group-hover:translate-x-1 transition-transform">arrow_forward</span>
              </div>
            </div>

            {/* Component 5: Network Graphing */}
            <div
              id="card-cap-network"
              onClick={() => onNavigate('dashboards', 'network')}
              className="bg-surface border border-main p-4 rounded hover:border-brand hover:shadow-md transition-all duration-200 cursor-pointer flex flex-col group lg:col-span-2"
            >
              <div className="flex items-center gap-2 mb-2 bg-subtle p-2.5 border-b border-main group-hover:bg-navy-light/40 transition-colors">
                <span className="material-symbols-outlined text-brand">hub</span>
                <h4 className="font-serif-headline text-lg font-bold text-headline">Network Graphing</h4>
              </div>
              <p className="text-sm text-secondary leading-relaxed pt-1">
                Visualizes complex relationships, identifying key influencers, echo chambers, and coordinated inauthentic behavior within the digital ecosystem through intricate topological mapping.
              </p>
              <div className="mt-auto pt-3 border-t border-subtle flex items-center justify-between text-xs text-brand font-semibold">
                <span>Network Topology</span>
                <span className="material-symbols-outlined text-[16px] group-hover:translate-x-1 transition-transform">arrow_forward</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Affiliation Band */}
      <section className="max-w-[1280px] mx-auto w-full grid grid-cols-1 gap-6 py-8 px-3 sm:px-6 lg:px-8">
        {/* Hackathon Problem Statement Presentation Card */}
        <div className="bg-banner border border-main p-6 rounded flex flex-col justify-center shadow-xs">
          <div className="flex flex-col items-center justify-center text-center">
            <div className="flex flex-col items-center text-center p-2">
              <span className="text-[10px] font-bold text-saffron uppercase tracking-widest">
                Problem Statement Organization
              </span>
              <h4 className="font-serif-headline text-base font-bold text-headline mt-0.5">
                National Technical Research Organisation (NTRO)
              </h4>
              <p className="text-xs text-secondary max-w-xs mt-1">
                Authoring agency for Smart India Hackathon 2026 Problem Statement #26152
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

