import React, { useState } from 'react';
import { AnalystUser } from '../types';
import { CURRENT_ANALYST } from '../data/mockData';

interface LoginScreenProps {
  onLoginSuccess: (user: AnalystUser) => void;
  onNavigate: (page: string) => void;
}

export const LoginScreen: React.FC<LoginScreenProps> = ({ onLoginSuccess, onNavigate }) => {
  const [govId, setGovId] = useState('GOI/NTRO/2026/0942');
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

  const handleQuickLogin = (role: 'Senior Cyber Analyst' | 'Directorate Supervisor') => {
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
    <div className="flex-grow flex flex-col justify-center items-center p-4 md:p-8 bg-[#f3f3f3]">
      {/* Login Form Container */}
      <div className="bg-white border border-[#CCCCCC] w-full max-w-lg p-6 md:p-10 shadow-sm">
        <div className="mb-6 text-center">
          <h1 className="font-serif-headline text-2xl md:text-3xl font-bold text-[#003366] tracking-tight">
            Authorized Personnel Login
          </h1>
          <p className="text-xs md:text-sm text-[#43474f] mt-2">
            Sign in to access the SANKET intelligence portal.
          </p>
        </div>

        {/* Restricted Access Notice */}
        <div className="mb-6 p-4 bg-[#eeeeee] border-l-4 border-[#E31E2E] flex items-start gap-3">
          <span className="material-symbols-outlined text-[#E31E2E] text-xl flex-shrink-0" style={{ fontVariationSettings: "'FILL' 1" }}>
            warning
          </span>
          <p className="text-xs text-[#1a1c1c] leading-relaxed">
            This is a restricted government system. Unauthorized access is prohibited under the{' '}
            <strong className="text-[#090909]">Information Technology Act, 2000</strong> and{' '}
            <strong className="text-[#090909]">Official Secrets Act, 1923</strong>.
          </p>
        </div>

        {errorMsg && (
          <div className="mb-4 p-3 bg-[#ffdad6] border border-[#ba1a1a] text-[#93000a] text-xs font-semibold">
            {errorMsg}
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="space-y-1.5">
            <label className="block text-xs font-bold text-[#1a1c1c] uppercase tracking-wider" htmlFor="username">
              Gov. ID / Username
            </label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-[#737780] pointer-events-none">
                <span className="material-symbols-outlined text-base">badge</span>
              </span>
              <input
                id="username"
                name="username"
                type="text"
                value={govId}
                onChange={(e) => setGovId(e.target.value)}
                placeholder="Enter your official ID"
                required
                className="w-full pl-10 pr-4 py-2.5 bg-white border border-[#737780] text-[#1a1c1c] text-sm focus:border-2 focus:border-[#003366] focus:outline-none transition-colors"
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="block text-xs font-bold text-[#1a1c1c] uppercase tracking-wider" htmlFor="password">
              Password
            </label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-[#737780] pointer-events-none">
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
                className="w-full pl-10 pr-4 py-2.5 bg-white border border-[#737780] text-[#1a1c1c] text-sm focus:border-2 focus:border-[#003366] focus:outline-none transition-colors"
              />
            </div>
          </div>

          <div className="pt-2">
            <button
              id="btn-login-submit"
              type="submit"
              disabled={isLoading}
              className="w-full py-3.5 bg-[#003366] hover:bg-[#0C0566] text-white font-bold text-xs uppercase tracking-wider transition-colors flex justify-center items-center gap-2 border border-[#001e40] shadow-sm disabled:opacity-75"
            >
              {isLoading ? (
                <span>Authenticating Credentials...</span>
              ) : (
                <>
                  <span>Secure Login</span>
                  <span className="material-symbols-outlined text-sm">login</span>
                </>
              )}
            </button>
          </div>
        </form>

        {/* Quick Demo Access Roles */}
        <div className="mt-6 p-3 bg-[#f9f9f9] border border-[#CCCCCC] rounded-sm">
          <p className="text-[11px] font-bold text-[#003366] uppercase mb-2">
            Demonstration Access Credentials:
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            <button
              type="button"
              onClick={() => handleQuickLogin('Senior Cyber Analyst')}
              className="text-left text-xs bg-white hover:bg-[#d5e3ff]/50 border border-[#c3c6d1] p-2 transition-colors flex flex-col"
            >
              <span className="font-bold text-[#001e40]">Commander S. K. Verma</span>
              <span className="text-[10px] text-[#43474f]">Senior Cyber Analyst (NTRO)</span>
            </button>
            <button
              type="button"
              onClick={() => handleQuickLogin('Directorate Supervisor')}
              className="text-left text-xs bg-white hover:bg-[#d5e3ff]/50 border border-[#c3c6d1] p-2 transition-colors flex flex-col"
            >
              <span className="font-bold text-[#001e40]">Dr. R. K. Nambiar</span>
              <span className="text-[10px] text-[#43474f]">Directorate Supervisor (OSINT)</span>
            </button>
          </div>
        </div>

        <div className="mt-6 pt-4 border-t border-[#e8e8e8] text-center flex flex-col sm:flex-row justify-between items-center text-xs gap-2">
          <a href="#help" onClick={(e) => { e.preventDefault(); onNavigate('contact'); }} className="text-[#003366] hover:underline font-medium">
            Forgot your password or locked out?
          </a>
          <button
            onClick={() => onNavigate('home')}
            className="text-[#737780] hover:text-[#001e40] font-semibold"
          >
            &larr; Return to Public Portal
          </button>
        </div>
      </div>
    </div>
  );
};
