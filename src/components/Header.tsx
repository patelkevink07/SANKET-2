import React, { useState } from 'react';
import { AnalystUser } from '../types';

interface HeaderProps {
  user: AnalystUser | null;
  onLogout: () => void;
  onNavigate: (page: string) => void;
  onOpenImageModal?: (src: string, alt: string, caption: string) => void;
  theme?: 'light' | 'dark';
  onToggleTheme?: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  user,
  onLogout,
  onNavigate,
  onOpenImageModal,
  theme = 'light',
  onToggleTheme
}) => {
  const [fontSizeOffset, setFontSizeOffset] = useState<number>(0);

  const SANKET_IMG = "https://lh3.googleusercontent.com/aida-public/AB6AXuBUOganULH4yr2KV_rB63OGkh2A8zBTOkiTcNLo0ZAm40PHRe5ueS0_s3mC7ZJO_6eqFdP7ZQW_hoCqHaHC1PYpa2-EVwO0ZMyCCmq4-11vZNVtH4rFh4KT0J__T97Vth6WTiMkdiU166hOxO06hTv_jAj6oWkKdjzz6qcwpyuxhXzaAoyJzDe6i_hnE8TPYAvnGydFgwuu8cutGX4vcdxAFjprIMvGlFGDt9rAQjugDHvKanfBlIjdQ_5EyGQ4t7SjJXI";

  const adjustFontSize = (delta: number) => {
    const newOffset = Math.max(-2, Math.min(3, fontSizeOffset + delta));
    setFontSizeOffset(newOffset);
    document.documentElement.style.fontSize = `${100 + newOffset * 6}%`;
  };

  const resetFontSize = () => {
    setFontSizeOffset(0);
    document.documentElement.style.fontSize = '100%';
  };

  const handleImageClick = (e: React.MouseEvent, src: string, alt: string, caption: string) => {
    e.stopPropagation();
    if (onOpenImageModal) {
      onOpenImageModal(src, alt, caption);
    }
  };

  return (
    <header className="w-full flex-shrink-0 bg-surface">
      {/* Utility Bar */}
      <div className="bg-utility text-text-secondary py-1 px-3 sm:px-6 lg:px-8 text-xs font-semibold flex flex-wrap justify-between items-center gap-2 border-b border-border-main">
        <div className="flex items-center gap-2">
          <span className="font-bold tracking-wide text-text-primary">Smart India Hackathon 2026</span>
          <span className="hidden sm:inline text-text-muted">|</span>
          <span className="hidden sm:inline text-xs text-text-navy font-medium">Problem Statement #26152 (NTRO) &bull; Prototype</span>
        </div>
        <div className="flex items-center gap-2.5 text-xs">
          <a
            href="#main-content"
            className="hover:underline text-text-navy hidden md:inline"
            onClick={(e) => {
              e.preventDefault();
              const el = document.getElementById('main-content');
              if (el) el.scrollIntoView({ behavior: 'smooth' });
            }}
          >
            Skip to main content
          </a>
          <span className="text-border-strong hidden md:inline">|</span>
          
          {/* Font Resizing Controls */}
          <div className="flex items-center gap-1 font-bold bg-surface border border-border-strong rounded px-1 py-0.5">
            <button
              onClick={() => adjustFontSize(-1)}
              className="hover:text-text-dark-navy px-1 text-[11px]"
              title="Decrease font size"
            >
              A-
            </button>
            <button
              onClick={resetFontSize}
              className="hover:text-text-dark-navy px-1 text-[11px] bg-surface-muted rounded-xs"
              title="Default font size"
            >
              A
            </button>
            <button
              onClick={() => adjustFontSize(1)}
              className="hover:text-text-dark-navy px-1 text-[11px]"
              title="Enlarge font size"
            >
              A+
            </button>
          </div>

          {/* Light / Dark Theme Toggle Button */}
          <button
            onClick={onToggleTheme}
            className="px-2 py-0.5 text-[11px] font-bold rounded border border-border-strong bg-surface text-text-primary hover:bg-surface-hover transition-colors flex items-center gap-1.5 cursor-pointer"
            title={`Switch to ${theme === 'dark' ? 'Light' : 'Dark'} Mode`}
            aria-label={`Toggle Theme (current: ${theme})`}
          >
            <span className="material-symbols-outlined text-[13px] text-accent-saffron">
              {theme === 'dark' ? 'light_mode' : 'dark_mode'}
            </span>
            <span className="hidden sm:inline">{theme === 'dark' ? 'Light Mode' : 'Dark Mode'}</span>
          </button>

          {user && (
            <>
              <span className="text-border-strong">|</span>
              <div className="flex items-center gap-1 text-text-navy">
                <span className="material-symbols-outlined text-[14px]">verified_user</span>
                <span className="font-bold text-[11px] uppercase bg-accent-saffron-light text-accent-saffron-text px-1.5 py-0.5 rounded">
                  {user.clearanceLevel}
                </span>
              </div>
            </>
          )}
        </div>
      </div>

      {/* Main Header */}
      <div className="py-3 px-3 sm:px-6 lg:px-8 border-b border-border-main bg-surface">
        <div className="max-w-[1280px] mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3 sm:gap-4 cursor-pointer" onClick={() => onNavigate('home')}>
            {/* SANKET Logo with interactive hover effect */}
            <div
              onClick={(e) => handleImageClick(e, SANKET_IMG, 'SANKET Directorate Crest', 'SANKET Social Analytics & Network Knowledge Extraction Technology Emblem')}
              className="relative overflow-hidden rounded p-1 hover:bg-brand-navy-light/40 transition-all duration-300 transform hover:scale-105"
              title="Click to zoom SANKET Emblem"
            >
              <img
                src={SANKET_IMG}
                alt="SANKET Logo"
                className="h-12 sm:h-16 w-auto object-contain transition-transform duration-300 hover:scale-105"
              />
            </div>
            
            <div className="flex flex-col">
              <span className="font-serif-headline text-xl sm:text-2xl font-bold text-text-headline tracking-tight">
                SANKET
              </span>
              <span className="text-xs text-text-secondary font-semibold hidden md:inline">
                Social Analytics &amp; Network Knowledge Extraction Technology
              </span>
            </div>
          </div>

          <div className="text-center sm:text-right">
            <span className="block font-serif-headline text-sm sm:text-base font-bold text-text-headline tracking-tight">
              Smart India Hackathon 2026
            </span>
            <span className="block text-xs font-bold text-text-muted tracking-wide uppercase">
              Proposed Solution for NTRO Problem Statement #26152
            </span>
            <div className="flex items-center justify-center sm:justify-end gap-2 mt-0.5">
              <span className="text-[11px] text-accent-saffron font-bold">
                SIH 2026 &bull; PS #26152
              </span>
              <span className="text-[10px] text-brand-navy-light-text font-semibold bg-brand-navy-light/70 px-1.5 py-0.5 rounded border border-border-strong">
                Prototype — Smart India Hackathon 2026
              </span>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};
