import React from 'react';

interface FooterProps {
  onNavigate: (page: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  return (
    <footer className="bg-navy text-white w-full py-8 px-4 md:px-12 grid grid-cols-1 md:grid-cols-4 gap-8 border-t-4 border-saffron mt-auto">
      <div className="col-span-1 md:col-span-1 flex flex-col gap-2">
        <h2 className="text-xl font-bold font-serif-headline text-white tracking-wide">SANKET</h2>
        <p className="text-xs text-white/90 leading-relaxed">
          Social Analytics &amp; Network Knowledge Extraction Technology
        </p>
        <p className="text-[11px] text-navy-light mt-2">
          An AI-driven social media analytics prototype developed for Smart India Hackathon 2026 (Problem Statement #26152).
        </p>
      </div>

      <div className="col-span-1 md:col-span-2 flex flex-wrap gap-x-6 gap-y-3 items-center text-xs font-semibold">
        <button
          onClick={() => onNavigate('about')}
          className="text-white hover:text-saffron-light underline transition-all opacity-90 hover:opacity-100 text-left cursor-pointer"
        >
          About SANKET
        </button>
        <span className="text-white/40 hidden sm:inline">|</span>
        <button
          onClick={() => onNavigate('architecture')}
          className="text-white hover:text-saffron-light underline transition-all opacity-90 hover:opacity-100 text-left cursor-pointer"
        >
          System Architecture
        </button>
        <span className="text-white/40 hidden sm:inline">|</span>
        <button
          onClick={() => onNavigate('contact')}
          className="text-white hover:text-saffron-light underline transition-all opacity-90 hover:opacity-100 text-left cursor-pointer"
        >
          Help Desk &amp; Hackathon Inquiries
        </button>
        <span className="text-white/40 hidden sm:inline">|</span>
        <button
          onClick={() => onNavigate('knowledge')}
          className="text-white hover:text-saffron-light underline transition-all opacity-90 hover:opacity-100 text-left cursor-pointer"
        >
          Knowledge Hub
        </button>
      </div>

      <div className="col-span-1 md:col-span-1 flex flex-col justify-end md:items-end text-xs text-white/90">
        <p className="md:text-right leading-normal">
          &copy; 2026 Team SANKET &mdash; SIH 2026 Submission. Prototype developed for Problem Statement #26152.
        </p>
        <div className="flex items-center gap-2 mt-2 text-[10px] text-[#8dfc75]">
          <span className="inline-block w-2 h-2 rounded-full bg-[#71de5c] animate-pulse"></span>
          <span>Prototype Sandbox: SIH 2026</span>
        </div>
      </div>
    </footer>
  );
};
