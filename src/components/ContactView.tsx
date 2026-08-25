import React from 'react';

interface ContactViewProps {
  onNavigate: (page: string) => void;
}

export const ContactView: React.FC<ContactViewProps> = ({ onNavigate }) => {
  return (
    <div className="flex-grow w-full py-8 bg-[#f9f9f9]">
      <div className="max-w-[1000px] mx-auto px-4 md:px-8">
        {/* Breadcrumb */}
        <div className="mb-4 flex items-center text-xs text-[#737780]">
          <button onClick={() => onNavigate('home')} className="hover:underline text-[#001e40] font-medium">
            Home
          </button>
          <span className="material-symbols-outlined text-[14px] mx-1">chevron_right</span>
          <span className="text-[#1a1c1c] font-semibold">Contact & Help Desk</span>
        </div>

        <div className="bg-white border border-[#CCCCCC] p-6 md:p-8 shadow-sm space-y-6">
          <div className="border-b border-[#e2e2e2] pb-4">
            <span className="text-[10px] font-bold text-[#fe6500] uppercase tracking-widest">
              Institutional Contacts
            </span>
            <h1 className="font-serif-headline text-2xl md:text-3xl font-bold text-[#0C0566]">
              NTRO & SIH 2026 Nodal Cell
            </h1>
            <p className="text-xs text-[#43474f] mt-1">
              Help desk for authorized personnel, participating hackathon teams, and regulatory queries
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs text-[#43474f]">
            <div className="p-4 bg-[#f9f9f9] border border-[#CCCCCC] rounded space-y-2">
              <h3 className="font-serif-headline text-base font-bold text-[#003366]">
                National Technical Research Organisation
              </h3>
              <p>Block-III, Old JNU Campus, New Delhi - 110067, India</p>
              <p><strong>OSINT Cyber Cell:</strong> cyber-osint@ntro.gov.in</p>
              <p><strong>Technical Helpdesk:</strong> +91 (11) 2674-XXXX</p>
            </div>

            <div className="p-4 bg-[#f9f9f9] border border-[#CCCCCC] rounded space-y-2">
              <h3 className="font-serif-headline text-base font-bold text-[#003366]">
                Smart India Hackathon 2026 Cell
              </h3>
              <p>AICTE Head Office, Nelson Mandela Marg, Vasant Kunj, New Delhi - 110070</p>
              <p><strong>Problem Statement ID:</strong> #26152</p>
              <p><strong>Nodal Officer:</strong> sih2026-ps26152@aicte-india.org</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
