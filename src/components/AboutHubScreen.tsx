import React, { useState, useEffect } from 'react';
import { HomeScreen } from './HomeScreen';
import { AboutScreen } from './AboutScreen';
import { ArchitectureView } from './ArchitectureView';
import { KnowledgeHubView } from './KnowledgeHubView';
import { ResourcesView } from './ResourcesView';
import { ContactView } from './ContactView';

interface AboutHubScreenProps {
  initialTab?: string;
  onNavigate: (page: string, tab?: string) => void;
  onOpenImageModal?: (src: string, alt: string, caption: string) => void;
  onOpenSandbox?: () => void;
}

export const AboutHubScreen: React.FC<AboutHubScreenProps> = ({
  initialTab = 'home',
  onNavigate,
  onOpenImageModal,
  onOpenSandbox
}) => {
  const [activeTab, setActiveTab] = useState<string>(initialTab);

  useEffect(() => {
    if (initialTab) {
      setActiveTab(initialTab);
    }
  }, [initialTab]);

  const subTabs = [
    { id: 'home', label: 'Home', icon: 'home', description: 'Overview & Highlights' },
    { id: 'about', label: 'About SANKET', icon: 'info', description: 'Problem Statement Dossier' },
    { id: 'architecture', label: 'Architecture', icon: 'account_tree', description: 'Pipeline & Data Flow' },
    { id: 'knowledge', label: 'Knowledge Hub', icon: 'school', description: 'Model Cards & Research' },
    { id: 'resources', label: 'Resources & DPDP', icon: 'folder_open', description: 'Governance & Compliance' },
    { id: 'contact', label: 'Contact', icon: 'support_agent', description: 'Help Desk & Directory' }
  ];

  const handleTabChange = (tabId: string) => {
    setActiveTab(tabId);
    onNavigate('about', tabId);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Internal navigation wrapper to preserve child component onNavigate calls
  const handleInternalNavigate = (page: string, tab?: string) => {
    const subTabIds = ['home', 'about', 'architecture', 'knowledge', 'resources', 'contact'];
    if (subTabIds.includes(page)) {
      handleTabChange(page);
    } else {
      onNavigate(page, tab);
    }
  };

  return (
    <div className="flex-grow flex flex-col w-full bg-[#f9f9f9]" id="main-content">
      {/* Consolidated Sub-Navigation Header Bar */}
      <div className="bg-white border-b border-[#CCCCCC] shadow-2xs sticky top-[48px] lg:top-[44px] z-30">
        <div className="max-w-[1280px] mx-auto px-3 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between py-2 border-b border-[#f0f2f5] hidden md:flex">
            <div className="flex items-center gap-2 text-xs text-[#737780]">
              <span className="material-symbols-outlined text-[16px] text-[#003366]">menu_book</span>
              <span className="font-bold text-[#001e40] uppercase tracking-wide">
                SANKET Information &amp; Reference Hub
              </span>
              <span className="text-[#c3c6d1]">|</span>
              <span className="text-[11px] text-[#555]">
                SIH 2026 Problem Statement #26152 Dossier &amp; Architecture Documentation
              </span>
            </div>
            <div className="text-[11px] text-[#737780] font-mono">
              Section: <span className="font-bold text-[#003366] capitalize">{activeTab}</span>
            </div>
          </div>

          {/* Sub-Tabs Row */}
          <nav
            aria-label="About Sub-sections"
            className="flex overflow-x-auto scrollbar-none gap-1 py-1"
          >
            {subTabs.map((tab) => {
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  id={`about-subtab-${tab.id}`}
                  onClick={() => handleTabChange(tab.id)}
                  className={`py-2.5 px-3.5 sm:px-4 text-xs font-bold uppercase tracking-wider transition-all whitespace-nowrap flex items-center gap-2 border-b-2 rounded-t-xs min-h-[40px] ${
                    isActive
                      ? 'border-[#003366] text-[#003366] bg-[#f0f4fa] shadow-2xs'
                      : 'border-transparent text-[#43474f] hover:text-[#001e40] hover:bg-[#f3f4f6]'
                  }`}
                >
                  <span
                    className={`material-symbols-outlined text-[16px] ${
                      isActive ? 'text-[#fe6500]' : 'text-[#737780]'
                    }`}
                  >
                    {tab.icon}
                  </span>
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </nav>
        </div>
      </div>

      {/* Render active consolidated sub-section content unchanged */}
      <div className="flex-grow flex flex-col w-full">
        {activeTab === 'home' && (
          <HomeScreen
            onNavigate={handleInternalNavigate}
            onOpenImageModal={onOpenImageModal}
            onOpenSandbox={onOpenSandbox}
          />
        )}

        {activeTab === 'about' && (
          <AboutScreen
            onNavigate={handleInternalNavigate}
            onOpenImageModal={onOpenImageModal}
          />
        )}

        {activeTab === 'architecture' && (
          <ArchitectureView
            onNavigate={handleInternalNavigate}
            onOpenImageModal={onOpenImageModal}
          />
        )}

        {activeTab === 'knowledge' && (
          <KnowledgeHubView onNavigate={handleInternalNavigate} />
        )}

        {activeTab === 'resources' && (
          <ResourcesView onNavigate={handleInternalNavigate} />
        )}

        {activeTab === 'contact' && (
          <ContactView onNavigate={handleInternalNavigate} />
        )}
      </div>
    </div>
  );
};
