import React from 'react';

interface KnowledgeHubViewProps {
  onNavigate: (page: string) => void;
}

export const KnowledgeHubView: React.FC<KnowledgeHubViewProps> = ({ onNavigate }) => {
  return (
    <div className="flex-grow w-full py-8 bg-page transition-colors duration-200">
      <div className="max-w-[1000px] mx-auto px-4 md:px-8">
        {/* Breadcrumb */}
        <div className="mb-4 flex items-center text-xs text-muted">
          <button onClick={() => onNavigate('home')} className="hover:underline text-navy font-medium">
            Home
          </button>
          <span className="material-symbols-outlined text-[14px] mx-1">chevron_right</span>
          <span className="text-primary font-semibold">Evaluation Criteria</span>
        </div>

        <div className="bg-surface border border-main p-6 md:p-8 shadow-sm space-y-6">
          <div className="border-b border-subtle pb-4">
            <h1 className="font-serif-headline text-2xl md:text-3xl font-bold text-headline">
              Smart India Hackathon 2026 #26152 Evaluation Criteria
            </h1>
          </div>

          {/* Hackathon Evaluation Criteria */}
          <div className="space-y-3">
            <div className="space-y-2 text-xs text-secondary">
              <div className="p-3 bg-subtle border border-subtle rounded flex justify-between items-center">
                <span><strong>Multi-Platform Ingestion:</strong> Ingestion across X, Telegram, IG, Reddit, YouTube</span>
              </div>
              <div className="p-3 bg-subtle border border-subtle rounded flex justify-between items-center">
                <span><strong>Multi-Dimensional Sentiment:</strong> Moving beyond binary to emotion and sarcasm</span>
              </div>
              <div className="p-3 bg-subtle border border-subtle rounded flex justify-between items-center">
                <span><strong>Demographics:</strong> Anonymized age, geography, language affinity clustering</span>
              </div>
              <div className="p-3 bg-subtle border border-subtle rounded flex justify-between items-center">
                <span><strong>Trends:</strong> Chronological progression and predictive trajectory forecasting</span>
              </div>
              <div className="p-3 bg-subtle border border-subtle rounded flex justify-between items-center">
                <span><strong>Network Graphing:</strong> Force-directed topology, KOL mapping and bot detection</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
