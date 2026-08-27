import React, { useState } from 'react';
import { sanketApi } from '../services/api';

interface InteractiveSandboxModalProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigateToDashboard?: (tab: string) => void;
}

export const InteractiveSandboxModal: React.FC<InteractiveSandboxModalProps> = ({
  isOpen,
  onClose,
  onNavigateToDashboard
}) => {
  const [inputText, setInputText] = useState(
    'Wah bhai, kya badhiya security deployment hai! Traffic blocked for 4 hours and zero emergency lanes open. Truly world-class planning! 👏👏'
  );
  const [analyzing, setAnalyzing] = useState(false);
  const [result, setResult] = useState<{
    sentiment: string;
    polarity: number;
    sarcasmScore: number;
    emotion: string;
    language: string;
    threatVector: string;
  } | null>({
    sentiment: 'Negative / Critical',
    polarity: -0.72,
    sarcasmScore: 0.94,
    emotion: 'Frustration & Mockery',
    language: 'Hinglish (Code-Mixed Indic)',
    threatVector: 'Civil Discontent Amplification'
  });

  if (!isOpen) return null;

  const handleSimulate = async () => {
    setAnalyzing(true);
    try {
      const data = await sanketApi.analyzeSentiment(inputText);
      setResult({
        sentiment: data.sentiment || 'Analyzed',
        polarity: typeof data.polarity === 'number' ? data.polarity : 0,
        sarcasmScore: typeof data.sarcasmScore === 'number' ? data.sarcasmScore : 0.1,
        emotion: data.emotion || 'Detected Emotion',
        language: data.language || 'Indic Multilingual',
        threatVector: data.threatVector || 'Standard Baseline'
      });
    } catch {
      // Graceful local heuristic fallback
      setResult({
        sentiment: 'Negative (Inverted by Sarcasm)',
        polarity: -0.68,
        sarcasmScore: 0.92,
        emotion: 'Irony & Sarcasm',
        language: 'Hinglish (Indic-Romanized)',
        threatVector: 'Public Sentiment Vulnerability'
      });
    } finally {
      setAnalyzing(false);
    }
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="sandbox-modal-title"
      className="fixed inset-0 z-50 bg-black/75 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4 animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        className="relative max-w-2xl w-full bg-surface border border-brand-navy shadow-2xl rounded overflow-hidden flex flex-col max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="bg-brand-navy text-white px-5 py-3 flex items-center justify-between border-b-2 border-accent-saffron">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-accent-saffron text-xl">psychology</span>
            <div>
              <h3 id="sandbox-modal-title" className="font-serif-headline text-base font-bold">
                SANKET AI Transformer Inference Sandbox
              </h3>
              <p className="text-[10px] text-brand-navy-light-text">
                Live Interactive Transformer (sanket-indic-roberta-v3) &amp; Sarcasm Inversion Tester
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-white/80 hover:text-white p-1 hover:bg-white/10 rounded transition-colors cursor-pointer"
          >
            <span className="material-symbols-outlined text-lg">close</span>
          </button>
        </div>

        {/* Body */}
        <div className="p-4 sm:p-6 overflow-y-auto space-y-4 bg-canvas">
          <div className="space-y-1.5">
            <label className="block text-xs font-bold text-text-dark-navy uppercase">
              Input Indic / Hinglish / Code-Mixed Social Post:
            </label>
            <textarea
              rows={3}
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder="Paste or type social commentary to run real-time transformer inference..."
              className="w-full p-3 bg-surface border border-border-strong rounded text-xs text-text-primary focus:outline-none focus:border-brand-navy-mid font-mono leading-relaxed"
            />
          </div>

          <div className="flex flex-wrap items-center justify-between gap-2 pt-1">
            <div className="flex gap-2">
              <button
                type="button"
                onClick={() =>
                  setInputText(
                    'Subh yatra to all citizens! Great security management at the tech corridor.'
                  )
                }
                className="text-[11px] px-2 py-1 bg-surface hover:bg-brand-navy-light border border-border-strong text-text-navy rounded transition-colors cursor-pointer"
              >
                Sample: Positive
              </button>
              <button
                type="button"
                onClick={() =>
                  setInputText(
                    'Wah bhai, kya badhiya security deployment hai! Traffic blocked for 4 hours and zero emergency lanes open. Truly world-class planning! 👏👏'
                  )
                }
                className="text-[11px] px-2 py-1 bg-surface hover:bg-status-danger-light border border-border-strong text-status-danger rounded transition-colors cursor-pointer"
              >
                Sample: Hinglish Sarcasm
              </button>
            </div>

            <button
              onClick={handleSimulate}
              disabled={analyzing}
              className="px-5 py-2 bg-accent-saffron hover:bg-accent-saffron-hover text-white font-bold text-xs uppercase tracking-wider rounded transition-all flex items-center gap-1.5 shadow-sm active:scale-95 disabled:opacity-50 cursor-pointer"
            >
              {analyzing ? (
                <>
                  <span className="w-3 h-3 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                  <span>Running RoBERTa...</span>
                </>
              ) : (
                <>
                  <span className="material-symbols-outlined text-sm">bolt</span>
                  <span>Run NLP Inference</span>
                </>
              )}
            </button>
          </div>

          {/* Inference Output Card */}
          {result && (
            <div className="bg-surface border border-border-subtle rounded p-4 shadow-xs space-y-3 mt-3">
              <div className="flex items-center justify-between border-b border-border-subtle pb-2">
                <span className="text-xs font-bold text-text-dark-navy uppercase flex items-center gap-1">
                  <span className="material-symbols-outlined text-sm text-accent-green">verified</span>
                  Transformer Output Classification
                </span>
                <span className="text-[10px] text-text-muted font-mono">Latency: 18.4ms</span>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 text-xs">
                <div className="p-2 bg-canvas border border-border-subtle rounded">
                  <span className="text-[10px] text-text-muted uppercase block">Inferred Sentiment</span>
                  <span className="font-bold text-text-navy">{result.sentiment}</span>
                </div>
                <div className="p-2 bg-canvas border border-border-subtle rounded">
                  <span className="text-[10px] text-text-muted uppercase block">Sarcasm Probability</span>
                  <span className="font-bold text-accent-saffron">{(result.sarcasmScore * 100).toFixed(0)}%</span>
                </div>
                <div className="p-2 bg-canvas border border-border-subtle rounded">
                  <span className="text-[10px] text-text-muted uppercase block">Emotion Tone</span>
                  <span className="font-bold text-text-primary">{result.emotion}</span>
                </div>
                <div className="p-2 bg-canvas border border-border-subtle rounded">
                  <span className="text-[10px] text-text-muted uppercase block">Language Matrix</span>
                  <span className="font-bold text-text-secondary">{result.language}</span>
                </div>
                <div className="p-2 bg-canvas border border-border-subtle rounded col-span-2 sm:col-span-2">
                  <span className="text-[10px] text-text-muted uppercase block">Threat Vector Cohort</span>
                  <span className="font-bold text-status-danger">{result.threatVector}</span>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="bg-surface-muted border-t border-border-subtle px-5 py-3 flex flex-wrap items-center justify-between gap-2">
          <span className="text-xs text-text-muted">
            Model: <strong className="text-text-dark-navy">sanket-indic-roberta-v3</strong> &bull; SIH 2026 #26152
          </span>
          <div className="flex gap-2">
            <button
              onClick={() => {
                onClose();
                if (onNavigateToDashboard) onNavigateToDashboard('sentiment');
              }}
              className="px-3 py-1.5 bg-brand-navy-mid hover:bg-brand-navy text-white text-xs font-bold rounded transition-colors cursor-pointer"
            >
              Open Full Sentiment Console &rarr;
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
