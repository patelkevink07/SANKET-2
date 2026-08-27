import React from 'react';

interface ContactViewProps {
  onNavigate: (page: string) => void;
}

export const ContactView: React.FC<ContactViewProps> = ({ onNavigate }) => {
  return (
    <div className="flex-grow w-full py-8 bg-page transition-colors duration-200">
      <div className="max-w-[1000px] mx-auto px-4 md:px-8">
        {/* Breadcrumb */}
        <div className="mb-4 flex items-center text-xs text-muted">
          <button onClick={() => onNavigate('home')} className="hover:underline text-navy font-medium">
            Home
          </button>
          <span className="material-symbols-outlined text-[14px] mx-1">chevron_right</span>
          <span className="text-primary font-semibold">Contact & Help Desk</span>
        </div>

        <div className="bg-surface border border-main p-6 md:p-8 shadow-sm space-y-6">
          <div className="border-b border-subtle pb-4">
            <span className="text-[10px] font-bold text-saffron uppercase tracking-widest">
              Hackathon Project Directory
            </span>
            <h1 className="font-serif-headline text-2xl md:text-3xl font-bold text-headline">
              SANKET Team &amp; SIH 2026 Information
            </h1>
            <p className="text-xs text-secondary mt-1">
              Contact and submission details for Smart India Hackathon 2026 (Problem Statement #26152)
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs text-secondary">
            <div className="p-4 bg-subtle border border-main rounded space-y-2">
              <h3 className="font-serif-headline text-base font-bold text-brand">
                Team SANKET (Student Developers)
              </h3>
              <p>Smart India Hackathon 2026 Prototype Submission</p>
              <p><strong>Problem Statement:</strong> #26152 (Sponsored by NTRO)</p>
              <p><strong>Team Repository:</strong> patelkevink07/SANKET-2</p>
              <p><strong>Project Support:</strong> team.sanket.sih2026@gmail.com</p>
            </div>

            <div className="p-4 bg-subtle border border-main rounded space-y-2">
              <h3 className="font-serif-headline text-base font-bold text-brand">
                Smart India Hackathon 2026 Nodal Cell
              </h3>
              <p>AICTE Head Office, Nelson Mandela Marg, Vasant Kunj, New Delhi - 110070</p>
              <p><strong>Problem Statement ID:</strong> #26152</p>
              <p><strong>Organized by:</strong> MoE's Innovation Cell &amp; AICTE</p>
              <p><strong>Official Portal:</strong> sih.gov.in</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
