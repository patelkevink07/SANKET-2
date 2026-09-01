import React, { useState } from 'react';
import { AnalystUser } from '../types';

interface HeaderProps {
  user: AnalystUser | null;
  onLogout: () => void;
  onNavigate: (page: string) => void;
  onOpenImageModal?: (src: string, alt: string, caption?: string) => void;
}

export const Header: React.FC<HeaderProps> = ({
  user,
  onLogout,
  onNavigate,
  onOpenImageModal
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

  const handleImageClick = (e: React.MouseEvent, src: string, alt: string, caption?: string) => {
    e.stopPropagation();
    if (onOpenImageModal) {
      onOpenImageModal(src, alt, caption);
    }
  };

  return (
    <header className="w-full flex-shrink-0 bg-surface transition-colors duration-200">
      {/* Utility Bar */}
      <div className="bg-utility text-secondary py-1 px-3 sm:px-6 lg:px-8 text-xs font-semibold flex flex-wrap justify-between items-center gap-2 border-b border-main">
        <div className="flex items-center gap-2">
          <span className="font-bold tracking-wide text-primary">Smart India Hackathon 2026</span>
          <span className="hidden sm:inline text-muted">|</span>
          <span className="hidden sm:inline text-xs text-brand font-medium">Problem Statement #26152 (NTRO) &bull; Prototype</span>
        </div>
        <div className="flex items-center gap-2.5 text-xs">
          <a
            href="#main-content"
            className="hover:underline text-brand hidden md:inline"
            onClick={(e) => {
              e.preventDefault();
              const el = document.getElementById('main-content');
              if (el) el.scrollIntoView({ behavior: 'smooth' });
            }}
          >
            Skip to main content
          </a>
          <span className="text-muted/40 hidden md:inline">|</span>
          
          {/* Font Resizing Controls */}
          <div className="flex items-center gap-1 font-bold bg-surface border border-card rounded px-1 py-0.5">
            <button
              onClick={() => adjustFontSize(-1)}
              className="hover:text-navy text-primary px-1 text-[11px]"
              title="Decrease font size"
            >
              A-
            </button>
            <button
              onClick={resetFontSize}
              className="hover:text-navy text-primary px-1 text-[11px] bg-subtle rounded-xs"
              title="Default font size"
            >
              A
            </button>
            <button
              onClick={() => adjustFontSize(1)}
              className="hover:text-navy text-primary px-1 text-[11px]"
              title="Enlarge font size"
            >
              A+
            </button>
          </div>

          {user && (
            <>
              <span className="text-muted/40">|</span>
              <div className="flex items-center gap-1 text-brand">
                <span className="material-symbols-outlined text-[14px]">verified_user</span>
                <span className="font-bold text-[11px] uppercase bg-saffron-bg text-saffron-text px-1.5 py-0.5 rounded">
                  {user.clearanceLevel}
                </span>
              </div>
            </>
          )}
        </div>
      </div>

      {/* Main Header */}
      <div className="py-3 px-3 sm:px-6 lg:px-8 border-b border-main bg-surface">
        <div className="max-w-[1280px] mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3 sm:gap-4 cursor-pointer" onClick={() => onNavigate('home')}>
            {/* SANKET Logo with interactive hover effect */}
            <div
              onClick={(e) => handleImageClick(e, SANKET_IMG, 'SANKET Logo')}
              className="relative overflow-hidden rounded p-1 hover:bg-navy-light/40 transition-all duration-300 transform hover:scale-105"
              title="Click to zoom SANKET logo"
            >
              <img
                src={SANKET_IMG}
                alt="SANKET Logo"
                className="h-12 sm:h-16 w-auto object-contain transition-transform duration-300 hover:scale-105"
              />
            </div>
            
            <div className="flex flex-col">
              <span className="font-serif-headline text-xl sm:text-2xl font-bold text-headline tracking-tight">
                SANKET
              </span>
              <span className="text-xs text-secondary font-semibold hidden md:inline">
                Social Analytics &amp; Network Knowledge Extraction Technology
              </span>
            </div>
          </div>

          <div className="text-center sm:text-right">
            <span className="block font-serif-headline text-sm sm:text-base font-bold text-headline tracking-tight">
              Smart India Hackathon 2026
            </span>
            <span className="block text-xs font-bold text-muted tracking-wide uppercase">
              Proposed Solution for NTRO Problem Statement #26152
            </span>
            <div className="flex items-center justify-center sm:justify-end gap-2 mt-0.5">
              <span className="text-[11px] text-saffron font-bold">
                SIH 2026 &bull; PS #26152
              </span>
              <span className="text-[10px] text-brand font-semibold bg-navy-light/70 px-1.5 py-0.5 rounded border border-card">
                Prototype — Smart India Hackathon 2026
              </span>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};
