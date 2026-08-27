import React, { useState } from 'react';
import { AnalystUser } from '../types';
import { CURRENT_ANALYST } from '../data/mockData';

interface LoginScreenProps {
  onLoginSuccess: (user: AnalystUser) => void;
  onNavigate: (page: string) => void;
}

export const LoginScreen: React.FC<LoginScreenProps> = ({ onLoginSuccess, onNavigate }) => {
  const [govId, setGovId] = useState('DEMO-ANALYST-001');
  const [password, setPassword] = useState('••••••••••••');
  const [errorMsg, setErrorMsg] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMsg('');

    setTimeout(() => {
      setIsLoading(false);
      onLoginSuccess(CURRENT_ANALYST);
      onNavigate('dashboards');
    }, 600);
  };

  const handleQuickLogin = (role: 'Demo Analyst' | 'Demo Supervisor') => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      const userToLogin: AnalystUser = {
        ...CURRENT_ANALYST,
        role: role
      };
      onLoginSuccess(userToLogin);
      onNavigate('dashboards');
    }, 400);
  };

  return (
    <div className="flex-grow flex flex-col justify-center items-center p-4 md:p-8 bg-canvas">
      {/* Login Form Container */}
      <div className="bg-surface border border-border-main w-full max-w-lg p-6 md:p-10 shadow-sm">
        <div className="mb-6 text-center">
          <h1 className="font-serif-headline text-2xl md:text-3xl font-bold text-text-navy tracking-tight">
            Analyst Console Login
          </h1>
          <p className="text-xs md:text-sm text-text-secondary mt-2">
            Sign in to access the SANKET prototype analytics portal.
          </p>
        </div>

        {/* Demo Disclaimer Notice */}
        <div className="mb-6 p-4 bg-surface-muted border-l-4 border-brand-navy-mid flex items-start gap-3">
          <span className="material-symbols-outlined text-text-navy text-xl flex-shrink-0" style={{ fontVariationSettings: "'FILL' 1" }}>
            info
          </span>
          <p className="text-xs text-text-primary leading-relaxed">
            This is a demonstration login for a <strong className="text-text-primary">Smart India Hackathon 2026 prototype</strong>. No real personal credentials or confidential government records are required.
          </p>
        </div>

        {errorMsg && (
          <div className="mb-4 p-3 bg-status-danger-light border border-status-danger text-status-danger-text text-xs font-semibold">
            {errorMsg}
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="space-y-1.5">
            <label className="block text-xs font-bold text-text-primary uppercase tracking-wider" htmlFor="username">
              Demo ID / Username
            </label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-text-muted pointer-events-none">
                <span className="material-symbols-outlined text-base">badge</span>
              </span>
              <input
                id="username"
                name="username"
                type="text"
                value={govId}
                onChange={(e) => setGovId(e.target.value)}
                placeholder="Enter your demo ID"
                required
                className="w-full pl-10 pr-4 py-2.5 bg-surface border border-border-strong text-text-primary text-sm focus:border-2 focus:border-brand-navy-mid focus:outline-none transition-colors"
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="block text-xs font-bold text-text-primary uppercase tracking-wider" htmlFor="password">
              Password
            </label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-text-muted pointer-events-none">
                <span className="material-symbols-outlined text-base">lock</span>
              </span>
              <input
                id="password"
                name="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                required
                className="w-full pl-10 pr-4 py-2.5 bg-surface border border-border-strong text-text-primary text-sm focus:border-2 focus:border-brand-navy-mid focus:outline-none transition-colors"
              />
            </div>
          </div>

          <div className="pt-2">
            <button
              id="btn-login-submit"
              type="submit"
              disabled={isLoading}
              className="w-full py-3.5 bg-brand-navy-mid hover:bg-brand-navy text-white font-bold text-xs uppercase tracking-wider transition-colors flex justify-center items-center gap-2 border border-brand-navy shadow-sm disabled:opacity-75 cursor-pointer"
            >
              {isLoading ? (
                <span>Accessing Demo Console...</span>
              ) : (
                <>
                  <span>Launch Demo Console</span>
                  <span className="material-symbols-outlined text-sm">login</span>
                </>
              )}
            </button>
          </div>
        </form>

        {/* Quick Demo Access Roles */}
        <div className="mt-6 p-3 bg-surface-muted border border-border-main rounded-sm">
          <p className="text-[11px] font-bold text-text-navy uppercase mb-2">
            One-Click Demonstration Personas:
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            <button
              type="button"
              onClick={() => handleQuickLogin('Demo Analyst')}
              className="text-left text-xs bg-surface hover:bg-brand-navy-light/50 border border-border-strong p-2 transition-colors flex flex-col cursor-pointer"
            >
              <span className="font-bold text-text-dark-navy">Commander S. K. Verma</span>
              <span className="text-[10px] text-text-secondary">Demo Analyst (OSINT Cell)</span>
            </button>
            <button
              type="button"
              onClick={() => handleQuickLogin('Demo Supervisor')}
              className="text-left text-xs bg-surface hover:bg-brand-navy-light/50 border border-border-strong p-2 transition-colors flex flex-col cursor-pointer"
            >
              <span className="font-bold text-text-dark-navy">Dr. R. K. Nambiar</span>
              <span className="text-[10px] text-text-secondary">Demo Supervisor (Research Lead)</span>
            </button>
          </div>
        </div>

        <div className="mt-6 pt-4 border-t border-border-subtle text-center flex flex-col sm:flex-row justify-between items-center text-xs gap-2">
          <a href="#help" onClick={(e) => { e.preventDefault(); onNavigate('contact'); }} className="text-text-navy hover:underline font-medium">
            Need help or hackathon queries?
          </a>
          <button
            onClick={() => onNavigate('home')}
            className="text-text-muted hover:text-text-dark-navy font-semibold cursor-pointer"
          >
            &larr; Return to Public Portal
          </button>
        </div>
      </div>
    </div>
  );
};
