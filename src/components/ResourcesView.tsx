import React from 'react';

interface ResourcesViewProps {
  onNavigate: (page: string) => void;
}

export const ResourcesView: React.FC<ResourcesViewProps> = ({ onNavigate }) => {
  return (
    <div className="flex-grow w-full py-8 bg-[#f9f9f9]">
      <div className="max-w-[1000px] mx-auto px-4 md:px-8">
        {/* Breadcrumb */}
        <div className="mb-4 flex items-center text-xs text-[#737780]">
          <button onClick={() => onNavigate('home')} className="hover:underline text-[#001e40] font-medium">
            Home
          </button>
          <span className="material-symbols-outlined text-[14px] mx-1">chevron_right</span>
          <span className="text-[#1a1c1c] font-semibold">Resources & Compliance Frameworks</span>
        </div>

        <div className="bg-white border border-[#CCCCCC] p-6 md:p-8 shadow-sm space-y-6">
          <div className="border-b border-[#e2e2e2] pb-4">
            <span className="text-[10px] font-bold text-[#fe6500] uppercase tracking-widest">
              Governance & Compliance
            </span>
            <h1 className="font-serif-headline text-2xl md:text-3xl font-bold text-[#0C0566]">
              Resources & Privacy Standards
            </h1>
            <p className="text-xs text-[#43474f] mt-1">
              Data Dictionary, DPDP Act 2023 differential privacy guidelines, and API specs
            </p>
          </div>

          <div className="space-y-4">
            <div className="p-4 bg-[#f9f9f9] border border-[#CCCCCC] rounded">
              <h3 className="font-serif-headline text-base font-bold text-[#003366] mb-2 flex items-center gap-2">
                <span className="material-symbols-outlined text-base">gavel</span>
                <span>DPDP Act 2023 & ISO 27701 Sovereign Compliance</span>
              </h3>
              <p className="text-xs text-[#43474f] leading-relaxed">
                The SANKET framework processes exclusively public social data streams. It enforces algorithmic redaction of personal identifiers (PII) at the ingestion boundary, applying Differential Privacy (ε=0.5) to all demographic aggregations.
              </p>
            </div>

            <div className="p-4 bg-[#f9f9f9] border border-[#CCCCCC] rounded">
              <h3 className="font-serif-headline text-base font-bold text-[#003366] mb-2 flex items-center gap-2">
                <span className="material-symbols-outlined text-base">code</span>
                <span>REST API & WebSocket Integration Docs</span>
              </h3>
              <p className="text-xs text-[#43474f] leading-relaxed mb-3">
                Authorized government applications can subscribe to real-time trend alert feeds via secure WebSockets and query historical sentiment indices via authenticated JWT tokens.
              </p>
              <div className="p-3 bg-[#1e1e1e] text-[#d4d4d4] rounded font-mono text-xs overflow-x-auto">
                curl -X GET "https://sanket.ntro.gov.in/api/v1/sentiment/temporal-distribution?range=24h" \<br />
                &nbsp;&nbsp;-H "Authorization: Bearer NTRO_SEC_JWT_TOKEN"
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
