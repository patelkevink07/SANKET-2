import React from 'react';

interface FooterProps {
  onNavigate: (page: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  return (
    <footer className="bg-[#001e40] text-white w-full py-8 px-4 md:px-12 grid grid-cols-1 md:grid-cols-4 gap-8 border-t-4 border-[#fe6500] mt-auto">
      <div className="col-span-1 md:col-span-1 flex flex-col gap-2">
        <h2 className="text-xl font-bold font-serif-headline text-white tracking-wide">SANKET</h2>
        <p className="text-xs text-white/90 leading-relaxed">
          Social Analytics & Network Knowledge Extraction Technology
        </p>
        <p className="text-[11px] text-[#a7c8ff] mt-2">
          An AI-driven strategic intelligence system built under Smart India Hackathon 2026 (Problem Statement #26152).
        </p>
      </div>

      <div className="col-span-1 md:col-span-2 flex flex-wrap gap-x-6 gap-y-3 items-center text-xs font-semibold">
        <button
          onClick={() => onNavigate('about')}
          className="text-white hover:text-[#ffb596] underline transition-all opacity-90 hover:opacity-100 text-left"
        >
          About SANKET
        </button>
        <span className="text-white/40 hidden sm:inline">|</span>
        <button
          onClick={() => onNavigate('architecture')}
          className="text-white hover:text-[#ffb596] underline transition-all opacity-90 hover:opacity-100 text-left"
        >
          System Architecture
        </button>
        <span className="text-white/40 hidden sm:inline">|</span>
        <button
          onClick={() => onNavigate('resources')}
          className="text-white hover:text-[#ffb596] underline transition-all opacity-90 hover:opacity-100 text-left"
        >
          Privacy Policy & DPDP Act
        </button>
        <span className="text-white/40 hidden sm:inline">|</span>
        <button
          onClick={() => onNavigate('resources')}
          className="text-white hover:text-[#ffb596] underline transition-all opacity-90 hover:opacity-100 text-left"
        >
          Terms of Service
        </button>
        <span className="text-white/40 hidden sm:inline">|</span>
        <button
          onClick={() => onNavigate('contact')}
          className="text-white hover:text-[#ffb596] underline transition-all opacity-90 hover:opacity-100 text-left"
        >
          Help Desk & Nodal Officers
        </button>
        <span className="text-white/40 hidden sm:inline">|</span>
        <button
          onClick={() => onNavigate('knowledge')}
          className="text-white hover:text-[#ffb596] underline transition-all opacity-90 hover:opacity-100 text-left"
        >
          Sitemap
        </button>
      </div>

      <div className="col-span-1 md:col-span-1 flex flex-col justify-end md:items-end text-xs text-white/90">
        <p className="md:text-right leading-normal">
          © 2024–2026 National Technical Research Organisation (NTRO), Government of India. All rights reserved.
        </p>
        <div className="flex items-center gap-2 mt-2 text-[10px] text-[#8dfc75]">
          <span className="inline-block w-2 h-2 rounded-full bg-[#71de5c] animate-pulse"></span>
          <span>Sovereign Secure Node: NTRO-DEL-SEC-01</span>
        </div>
      </div>
    </footer>
  );
};
