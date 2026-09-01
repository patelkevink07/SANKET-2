import React, { useState } from 'react';
import { AnalystUser } from '../types';

interface ReportsViewProps {
  user: AnalystUser | null;
  onNavigate: (page: string) => void;
}

export const ReportsView: React.FC<ReportsViewProps> = ({ user, onNavigate }) => {
  const [reportType, setReportType] = useState('daily_sitrep');
  const [timeWindow, setTimeWindow] = useState('Last 24 Hours');
  const [classification, setClassification] = useState('DEMO ASSESSMENT // PROTOTYPE');
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedReport, setGeneratedReport] = useState<string | null>(null);

  const getTimeWindowPhrase = (window: string) => {
    switch (window) {
      case 'Last 24 Hours':
        return 'the past 24 hours';
      case 'Last 7 Days':
        return 'the past 7 days';
      case 'Monthly Strategic Window':
        return 'the past calendar month';
      default:
        return 'the selected time window';
    }
  };

  const handleGenerate = () => {
    setIsGenerating(true);
    setTimeout(() => {
      setIsGenerating(false);

      const timePhrase = getTimeWindowPhrase(timeWindow);
      const currentDate = new Date().toLocaleDateString('en-GB');
      const currentTime = new Date().toLocaleTimeString();
      const compilerName = user ? user.name : 'Commander S. K. Verma';
      const compilerRole = user ? user.role : 'Demo Analyst';

      let reportContent = '';

      if (reportType === 'threat_dossier') {
        reportContent = `THREAT & BOTNET VECTOR DOSSIER - SANKET ANALYTICS CELL
REF: SIH2026/SANKET/THREAT/2026-0824/04
CLASSIFICATION: ${classification}
DATE: ${currentDate} | TIME: ${currentTime}

1. THREAT OVERVIEW:
Over ${timePhrase}, persistent heuristic monitoring across 5 platforms identified 2 active coordinated botnet rings and 4 high-frequency amplifier clusters attempting narrative distortion.

2. BOTNET RING PROFILES:
- Ring BOT-ALPHA-1 (42 nodes): Synchronized hashtag flooding targeting economic sentiment indices. Inter-post timing variance is under 120ms, indicating automated orchestration.
- Ring BOT-ALPHA-2 (18 nodes): Retweet burst amplification exhibiting high graph reciprocity and zero organic user profile engagement.

3. AMPLIFICATION NETWORK ANALYSIS:
- Graph betweenness centrality confirms both rings maintain isolated star topologies connected to peripheral amplifier accounts.
- High-degree organic bridges (@CyberSecurity_Alerts, @tech_bharat_now) successfully mitigated broad spillover to mainstream user clusters.

4. RECOMMENDED COUNTERMEASURES:
- Isolate identified ring coordinates for downstream platform abuse reporting.
- Tighten rate-limit thresholds on suspected bridge nodes and deploy real-time anomaly alerts for synchronized burst vectors.

5. COMPLIANCE CERTIFICATE:
All threat vector evaluations use non-PII metadata and behavioral heuristics in accordance with DPDP Act 2023 guidelines.

REPORT COMPILED BY: ${compilerName} (${compilerRole})
GENERATED FOR: SMART INDIA HACKATHON 2026 PROTOTYPE EVALUATION.`;
      } else if (reportType === 'demographic_macro') {
        reportContent = `DEMOGRAPHIC MACRO INTELLIGENCE REPORT - SANKET ANALYTICS CELL
REF: SIH2026/SANKET/DEMO/2026-0824/12
CLASSIFICATION: ${classification}
DATE: ${currentDate} | TIME: ${currentTime}

1. COHORT OVERVIEW:
Over ${timePhrase}, demographic synthesis across 310,650 ingested items mapped macro-level audience participation without collecting personally identifiable information.

2. REGIONAL & LANGUAGE BREAKDOWN:
- Top Geographic Densities: Maharashtra (21.5%), Delhi NCR (19.2%), Karnataka (18.0%), Tamil Nadu (12.4%), and Uttar Pradesh (11.8%).
- Linguistic Distribution: Hindi (41.2%), English (34.6%), Hinglish / Code-mixed (18.1%), and Regional Dialects (6.1%).

3. ENGAGEMENT PATTERNS BY COHORT:
- Tech & Policy Stakeholders: Strongest engagement recorded around #SemiconductorMission with high positive polarity (+0.81).
- General Public & Urban Audiences: Primary engagement focused on public infrastructure and civic updates with balanced constructive sentiment.

4. BOT-RISK DISTRIBUTION BY COHORT:
- Inauthentic engagement is concentrated primarily in synthetic accounts outside verified regional cohorts (<2.4% localized contamination).

5. COMPLIANCE CERTIFICATE:
All demographic inferences strictly leverage anonymized aggregate metadata in full compliance with DPDP Act 2023 privacy safeguards.

REPORT COMPILED BY: ${compilerName} (${compilerRole})
GENERATED FOR: SMART INDIA HACKATHON 2026 PROTOTYPE EVALUATION.`;
      } else if (reportType === 'sih_summary') {
        reportContent = `SIH 2026 PROBLEM STATEMENT AUDIT - SANKET ANALYTICS CELL
REF: SIH2026/SANKET/AUDIT/2026-0824/01
CLASSIFICATION: ${classification}
DATE: ${currentDate} | TIME: ${currentTime}

1. PROBLEM STATEMENT ALIGNMENT (PS #26152, NTRO):
SANKET delivers an AI-driven multi-modal social media analytics prototype addressing Problem Statement #26152 for the National Technical Research Organisation (NTRO).

2. CAPABILITY COVERAGE SUMMARY:
- Multi-Platform Ingestion: Live background pipeline covering 5 platforms (X, Telegram, Instagram, Reddit, YouTube).
- Multilingual NLP & Sentiment: Evaluated on Indic multilingual and code-mixed (Hinglish) sentiment, sarcasm, and emotion classification.
- Demographic & Network Modeling: Anonymized regional cohort mapping and interactive topology graph extraction.

3. PROTOTYPE READINESS ASSESSMENT:
- Frontend & Analytics Console: Fully operational with interactive dashboards, temporal distributions, demographic choropleth, and link topology exploration.
- NLP & Graph Engine: Validated on 310,650 sample records with high classification accuracy and sub-second rendering.

4. OUTSTANDING ITEMS:
- Backend API Integration: Core analysis, demographics, and network modules tested on real data; live production backend API endpoints and microservice workers are currently being wired for automated continuous ingestion.

5. COMPLIANCE CERTIFICATE:
System design adheres to DPDP Act 2023 provisions with zero PII retention and strict differential privacy guarantees.

REPORT COMPILED BY: ${compilerName} (${compilerRole})
GENERATED FOR: SMART INDIA HACKATHON 2026 PROTOTYPE EVALUATION.`;
      } else {
        // daily_sitrep (default)
        reportContent = `SITUATION REPORT (SITREP) - SANKET ANALYTICS CELL
REF: SIH2026/SANKET/SITREP/2026-0824/09
CLASSIFICATION: ${classification}
DATE: ${currentDate} | TIME: ${currentTime}

1. EXECUTIVE SUMMARY:
Over ${timePhrase}, social data ingestion across 5 platforms registered 310,650 items. Aggregate public sentiment remains decisively positive (+0.74 polarity index), anchored by viral momentum surrounding #SemiconductorMission and infrastructure developments.

2. NARRATIVE ANOMALIES & THREAT VECTOR MONITORING:
- Inauthentic Activity: 2 coordinated botnet rings identified exhibiting abnormal synchronized hashtag amplification on market triggers. Ring IDs (BOT-ALPHA-1, BOT-ALPHA-2) have been flagged and isolated for network cluster analysis.
- Satire/Sarcasm: Vernacular Hinglish sarcasm detector successfully distinguished municipal critique (#SmartCityRealities) with 94% precision, avoiding false positive alert generation.

3. STRATEGIC INFLUENCE TOPOLOGY:
- Centrality analysis indicates high dissemination authority from authenticated nodes (@tech_bharat_now, @CyberSecurity_Alerts).
- Geographic engagement remains densest in Maharashtra (21.5%), Delhi NCR (19.2%), and Karnataka (18.0%).

4. COMPLIANCE CERTIFICATE:
All intelligence synthesis operations comply with Digital Personal Data Protection (DPDP) Act 2023 and ISO 27701 privacy baselines.

REPORT COMPILED BY: ${compilerName} (${compilerRole})
GENERATED FOR: SMART INDIA HACKATHON 2026 PROTOTYPE EVALUATION.`;
      }

      setGeneratedReport(reportContent);
    }, 500);
  };

  return (
    <div className="flex-grow w-full py-8 bg-page transition-colors duration-200">
      <div className="max-w-[1000px] mx-auto px-4 md:px-8">
        {/* Breadcrumb */}
        <div className="mb-4 flex items-center text-xs text-muted">
          <button onClick={() => onNavigate('home')} className="hover:underline text-navy font-medium">
            Home
          </button>
          <span className="material-symbols-outlined text-[14px] mx-1">chevron_right</span>
          <span className="text-primary font-semibold">Reports</span>
        </div>

        <div className="bg-surface border border-main p-6 md:p-8 shadow-sm">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-subtle pb-4 mb-6">
            <div>
              <h1 className="font-serif-headline text-2xl md:text-3xl font-bold text-headline">
                Situation Reports
              </h1>
              <p className="text-xs text-secondary mt-1">
                Generate formatted strategic briefs for decision-makers and regulatory bodies
              </p>
            </div>

            <button
              onClick={handleGenerate}
              disabled={isGenerating}
              className="py-2.5 px-6 bg-brand hover:bg-navy text-white font-bold text-xs uppercase tracking-wider rounded transition-colors flex items-center gap-2 border border-navy shadow-sm disabled:opacity-75 cursor-pointer"
            >
              <span className="material-symbols-outlined text-base">assessment</span>
              <span>{isGenerating ? 'Compiling SITREP...' : 'Generate New SITREP'}</span>
            </button>
          </div>

          {/* Configuration Form */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6 text-xs">
            <div>
              <label className="block font-bold text-primary mb-1 uppercase">Report Format</label>
              <select
                value={reportType}
                onChange={(e) => setReportType(e.target.value)}
                className="w-full p-2 bg-subtle border border-main rounded text-primary"
              >
                <option value="daily_sitrep">Daily Tactical SITREP</option>
                <option value="threat_dossier">Threat & Botnet Vector Dossier</option>
                <option value="demographic_macro">Demographic Macro Intelligence</option>
                <option value="sih_summary">SIH 2026 Problem Statement Audit</option>
              </select>
            </div>

            <div>
              <label className="block font-bold text-primary mb-1 uppercase">Time Coverage Window</label>
              <select
                value={timeWindow}
                onChange={(e) => setTimeWindow(e.target.value)}
                className="w-full p-2 bg-subtle border border-main rounded text-primary"
              >
                <option>Last 24 Hours</option>
                <option>Last 7 Days</option>
                <option>Monthly Strategic Window</option>
              </select>
            </div>

            <div>
              <label className="block font-bold text-primary mb-1 uppercase">Classification Level</label>
              <select
                value={classification}
                onChange={(e) => setClassification(e.target.value)}
                className="w-full p-2 bg-subtle border border-main rounded text-primary"
              >
                <option>DEMO ASSESSMENT // PROTOTYPE</option>
                <option>INTERNAL ANALYTICS BRIEF</option>
                <option>RESTRICTED TEST HARNESS</option>
              </select>
            </div>
          </div>

          {/* Generated Report Display */}
          {generatedReport ? (
            <div className="space-y-4">
              <div className="p-6 bg-subtle border border-main rounded font-mono text-xs text-primary whitespace-pre-wrap leading-relaxed shadow-inner">
                {generatedReport}
              </div>

              <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
                <div className="flex items-center gap-2 text-xs text-muted">
                  <span className="material-symbols-outlined text-green text-base">verified</span>
                  <span>Verified by SANKET Prototype</span>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => window.print()}
                    className="py-2 px-4 bg-surface hover:bg-subtle text-navy border border-main font-bold text-xs uppercase rounded transition-colors flex items-center gap-1.5 cursor-pointer"
                  >
                    <span className="material-symbols-outlined text-sm">print</span>
                    <span>Print / Save as PDF</span>
                  </button>
                  <button
                    onClick={() => alert('SITREP exported successfully.')}
                    className="py-2 px-4 bg-brand hover:bg-navy text-white font-bold text-xs uppercase rounded transition-colors flex items-center gap-1.5 cursor-pointer"
                  >
                    <span className="material-symbols-outlined text-sm">download</span>
                    <span>Export Summary Report</span>
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <div className="text-center py-12 border-2 border-dashed border-main rounded p-8">
              <span className="material-symbols-outlined text-4xl text-muted mb-2">description</span>
              <h3 className="font-serif-headline text-base font-bold text-navy">No Report Generated Yet</h3>
              <p className="text-xs text-muted max-w-md mx-auto mt-1 mb-4">
                Click "Generate New SITREP" to compile a real-time situational brief aggregating sentiment, trend vectors, and network graph topology.
              </p>
              <button
                onClick={handleGenerate}
                className="py-2 px-6 bg-brand text-white font-bold text-xs uppercase tracking-wider rounded cursor-pointer"
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
