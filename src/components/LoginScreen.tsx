import React, { useState } from 'react';
import { AnalystUser } from '../types';
import { CURRENT_ANALYST } from '../data/mockData';

interface LoginScreenProps {
  onLoginSuccess: (user: AnalystUser) => void;
  onNavigate: (page: string) => void;
}

export const LoginScreen: React.FC<LoginScreenProps> = ({ onLoginSuccess, onNavigate }) => {
  const [isLoading, setIsLoading] = useState(false);

  const handleDemoLogin = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      onLoginSuccess(CURRENT_ANALYST);
    }, 200);
  };

  return (
    <div className="flex-grow flex flex-col justify-center items-center p-4 md:p-8 bg-page transition-colors duration-200">
      {/* Login Container */}
      <div className="bg-surface border border-main w-full max-w-lg p-6 md:p-10 shadow-sm">
        <div className="mb-6 text-center">
          <h1 className="font-serif-headline text-2xl md:text-3xl font-bold text-brand tracking-tight">
            Analyst Console Login
          </h1>
          <p className="text-xs md:text-sm text-secondary mt-2">
            Sign in to access the SANKET prototype analytics portal.
          </p>
        </div>

        {/* Demo Disclaimer Notice */}
        <div className="mb-6 p-4 bg-subtle border-l-4 border-brand flex items-start gap-3">
          <span className="material-symbols-outlined text-brand text-xl flex-shrink-0" style={{ fontVariationSettings: "'FILL' 1" }}>
            info
          </span>
          <p className="text-xs text-primary leading-relaxed">
            This is a demonstration login for a <strong className="text-primary font-bold">Smart India Hackathon 2026 prototype</strong>. No real personal credentials or confidential government records are required.
          </p>
        </div>

        <div className="pt-2">
          <button
            id="btn-login-submit"
            type="button"
            onClick={handleDemoLogin}
            disabled={isLoading}
            className="w-full py-3.5 bg-brand hover:bg-headline text-white font-bold text-xs uppercase tracking-wider transition-colors flex justify-center items-center gap-2 border border-brand shadow-sm disabled:opacity-75 cursor-pointer"
          >
            {isLoading ? (
              <span>Accessing Demo Console...</span>
            ) : (
              <>
                <span>Continue as Demo Analyst</span>
                <span className="material-symbols-outlined text-sm">login</span>
              </>
            )}
          </button>
        </div>

        <div className="mt-6 pt-4 border-t border-subtle text-center flex flex-col sm:flex-row justify-between items-center text-xs gap-2">
          <a href="#help" onClick={(e) => { e.preventDefault(); onNavigate('contact'); }} className="text-brand hover:underline font-medium">
            Need help or hackathon queries?
          </a>
          <button
            onClick={() => onNavigate('home')}
            className="text-muted hover:text-navy font-semibold cursor-pointer"
          >
            &larr; Return to Public Portal
          </button>
        </div>
      </div>
    </div>
  );
};

