import React from 'react';

interface ResourcesViewProps {
  onNavigate: (page: string) => void;
}

export const ResourcesView: React.FC<ResourcesViewProps> = ({ onNavigate }) => {
  return (
    <div className="flex-grow w-full py-8 bg-page transition-colors duration-200">
      <div className="max-w-[1000px] mx-auto px-4 md:px-8">
        {/* Breadcrumb */}
        <div className="mb-4 flex items-center text-xs text-muted">
          <button onClick={() => onNavigate('home')} className="hover:underline text-navy font-medium">
            Home
          </button>
          <span className="material-symbols-outlined text-[14px] mx-1">chevron_right</span>
          <span className="text-primary font-semibold">Resources & Compliance Frameworks</span>
        </div>

        <div className="bg-surface border border-main p-6 md:p-8 shadow-sm space-y-6">
          <div className="border-b border-subtle pb-4">
            <span className="text-[10px] font-bold text-saffron uppercase tracking-widest">
              Governance & Compliance
            </span>
            <h1 className="font-serif-headline text-2xl md:text-3xl font-bold text-headline">
              Resources & Privacy Standards
            </h1>
            <p className="text-xs text-secondary mt-1">
              Data Dictionary, DPDP Act 2023 differential privacy guidelines, and API specs
            </p>
          </div>

          <div className="space-y-4">
            <div className="p-4 bg-subtle border border-main rounded">
              <h3 className="font-serif-headline text-base font-bold text-brand mb-2 flex items-center gap-2">
                <span className="material-symbols-outlined text-base">gavel</span>
                <span>DPDP Act 2023 &amp; ISO 27701 Privacy Compliance</span>
              </h3>
              <p className="text-xs text-secondary leading-relaxed">
                The SANKET framework processes exclusively public social data streams. It enforces algorithmic redaction of personal identifiers (PII) at the ingestion boundary, applying Differential Privacy (&epsilon;=0.5) to all demographic aggregations.
              </p>
            </div>

            <div className="p-4 bg-subtle border border-main rounded">
              <h3 className="font-serif-headline text-base font-bold text-brand mb-2 flex items-center gap-2">
                <span className="material-symbols-outlined text-base">code</span>
                <span>REST API &amp; WebSocket Integration Docs</span>
              </h3>
              <p className="text-xs text-secondary leading-relaxed mb-3">
                Client applications can subscribe to real-time trend alert feeds via WebSockets and query historical sentiment indices via authenticated demo tokens.
              </p>
              <div className="p-3 bg-[#1e1e1e] text-[#d4d4d4] rounded font-mono text-xs overflow-x-auto">
                curl -X GET "https://api.sanket.internal/api/v1/sentiment/temporal-distribution?range=24h" \<br />
                &nbsp;&nbsp;-H "Authorization: Bearer DEMO_JWT_TOKEN"
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
