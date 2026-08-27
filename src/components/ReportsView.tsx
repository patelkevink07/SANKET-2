import React, { useState } from 'react';
import { AnalystUser } from '../types';

interface ReportsViewProps {
  user: AnalystUser | null;
  onNavigate: (page: string) => void;
}

export const ReportsView: React.FC<ReportsViewProps> = ({ user, onNavigate }) => {
  const [reportType, setReportType] = useState('daily_sitrep');
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedReport, setGeneratedReport] = useState<string | null>(null);

  const handleGenerate = () => {
    setIsGenerating(true);
    setTimeout(() => {
      setIsGenerating(false);
      setGeneratedReport(`SITUATION REPORT (SITREP) - SANKET ANALYTICS CELL
REF: SIH2026/SANKET/SITREP/2026-0824/09
CLASSIFICATION: DEMO ASSESSMENT // PROTOTYPE
DATE: ${new Date().toLocaleDateString('en-GB')} | TIME: ${new Date().toLocaleTimeString()}

1. EXECUTIVE SUMMARY:
Over the past 24 hours, social data ingestion across 5 platforms registered 310,650 items. Aggregate public sentiment remains decisively positive (+0.74 polarity index), anchored by viral momentum surrounding #SemiconductorMission and infrastructure developments.

2. NARRATIVE ANOMALIES & THREAT VECTOR MONITORING:
- Inauthentic Activity: 2 coordinated botnet rings identified exhibiting abnormal synchronized hashtag amplification on market triggers. Ring IDs (BOT-ALPHA-1, BOT-ALPHA-2) have been flagged and isolated for network cluster analysis.
- Satire/Sarcasm: Vernacular Hinglish sarcasm detector successfully distinguished municipal critique (#SmartCityRealities) with 94% precision, avoiding false positive alert generation.

3. STRATEGIC INFLUENCE TOPOLOGY:
- Centrality analysis indicates high dissemination authority from authenticated nodes (@tech_bharat_now, @CyberSecurity_Alerts).
- Geographic engagement remains densest in Maharashtra (21.5%), Delhi NCR (19.2%), and Karnataka (18.0%).

4. COMPLIANCE CERTIFICATE:
All intelligence synthesis operations comply with Digital Personal Data Protection (DPDP) Act 2023 and ISO 27701 privacy baselines.

REPORT COMPILED BY: ${user ? user.name : 'Commander S. K. Verma'} (${user ? user.role : 'Demo Analyst'})
GENERATED FOR: SMART INDIA HACKATHON 2026 PROTOTYPE EVALUATION.`);
    }, 500);
  };

  return (
    <div className="flex-grow w-full py-8 bg-canvas">
      <div className="max-w-[1000px] mx-auto px-4 md:px-8">
        {/* Breadcrumb */}
        <div className="mb-4 flex items-center text-xs text-text-muted">
          <button onClick={() => onNavigate('home')} className="hover:underline text-text-dark-navy font-medium cursor-pointer">
            Home
          </button>
          <span className="material-symbols-outlined text-[14px] mx-1">chevron_right</span>
          <span className="text-text-primary font-semibold">Strategic Intelligence Reports</span>
        </div>

        <div className="bg-surface border border-border-main p-6 md:p-8 shadow-sm">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-border-subtle pb-4 mb-6">
            <div>
              <span className="text-[10px] font-bold text-accent-saffron uppercase tracking-widest">
                Automated Intelligence Synthesis
              </span>
              <h1 className="font-serif-headline text-2xl md:text-3xl font-bold text-text-headline">
                Situation Reports &amp; Dossier Generator
              </h1>
              <p className="text-xs text-text-secondary mt-1">
                Generate formatted strategic briefs for decision-makers and regulatory bodies
              </p>
            </div>

            <button
              onClick={handleGenerate}
              disabled={isGenerating}
              className="py-2.5 px-6 bg-brand-navy-mid hover:bg-brand-navy text-white font-bold text-xs uppercase tracking-wider rounded transition-colors flex items-center gap-2 border border-brand-navy shadow-sm disabled:opacity-75 cursor-pointer"
            >
              <span className="material-symbols-outlined text-base">assessment</span>
              <span>{isGenerating ? 'Compiling SITREP...' : 'Generate New SITREP'}</span>
            </button>
          </div>

          {/* Configuration Form */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6 text-xs">
            <div>
              <label className="block font-bold text-text-primary mb-1 uppercase">Report Format</label>
              <select
                value={reportType}
                onChange={(e) => setReportType(e.target.value)}
                className="w-full p-2 bg-canvas border border-border-main rounded text-text-primary"
              >
                <option value="daily_sitrep">Daily Tactical SITREP</option>
                <option value="threat_dossier">Threat &amp; Botnet Vector Dossier</option>
                <option value="demographic_macro">Demographic Macro Intelligence</option>
                <option value="sih_summary">SIH 2026 Problem Statement Audit</option>
              </select>
            </div>

            <div>
              <label className="block font-bold text-text-primary mb-1 uppercase">Time Coverage Window</label>
              <select className="w-full p-2 bg-canvas border border-border-main rounded text-text-primary">
                <option>Last 24 Hours</option>
                <option>Last 7 Days</option>
                <option>Monthly Strategic Window</option>
              </select>
            </div>

            <div>
              <label className="block font-bold text-text-primary mb-1 uppercase">Classification Level</label>
              <select className="w-full p-2 bg-canvas border border-border-main rounded text-text-primary">
                <option>DEMO ASSESSMENT // PROTOTYPE</option>
                <option>INTERNAL ANALYTICS BRIEF</option>
                <option>RESTRICTED TEST HARNESS</option>
              </select>
            </div>
          </div>

          {/* Generated Report Display */}
          {generatedReport ? (
            <div className="space-y-4">
              <div className="p-6 bg-surface-muted border border-border-main rounded font-mono text-xs text-text-primary whitespace-pre-wrap leading-relaxed shadow-inner">
                {generatedReport}
              </div>

              <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
                <div className="flex items-center gap-2 text-xs text-text-muted">
                  <span className="material-symbols-outlined text-accent-green text-base">verified</span>
                  <span>Integrity Verified by SANKET Prototype Engine</span>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => window.print()}
                    className="py-2 px-4 bg-surface hover:bg-surface-muted text-text-dark-navy border border-border-main font-bold text-xs uppercase rounded transition-colors flex items-center gap-1.5 cursor-pointer"
                  >
                    <span className="material-symbols-outlined text-sm">print</span>
                    <span>Print / Save as PDF</span>
                  </button>
                  <button
                    onClick={() => alert('SITREP exported successfully.')}
                    className="py-2 px-4 bg-brand-navy-mid hover:bg-brand-navy text-white font-bold text-xs uppercase rounded transition-colors flex items-center gap-1.5 cursor-pointer"
                  >
                    <span className="material-symbols-outlined text-sm">download</span>
                    <span>Export Summary Report</span>
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <div className="text-center py-12 border-2 border-dashed border-border-main rounded p-8">
              <span className="material-symbols-outlined text-4xl text-text-muted mb-2">description</span>
              <h3 className="font-serif-headline text-base font-bold text-text-dark-navy">No Report Generated Yet</h3>
              <p className="text-xs text-text-muted max-w-md mx-auto mt-1 mb-4">
                Click "Generate New SITREP" to compile a real-time situational brief aggregating sentiment, trend vectors, and network graph topology.
              </p>
              <button
                onClick={handleGenerate}
                className="py-2 px-6 bg-brand-navy-mid text-white font-bold text-xs uppercase tracking-wider rounded cursor-pointer"
              >
                Compile Now
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
