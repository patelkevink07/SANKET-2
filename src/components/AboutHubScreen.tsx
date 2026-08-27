import React, { useState, useEffect } from 'react';
import { HomeScreen } from './HomeScreen';
import { AboutScreen } from './AboutScreen';
import { ArchitectureView } from './ArchitectureView';
import { KnowledgeHubView } from './KnowledgeHubView';
import { ResourcesView } from './ResourcesView';
import { ContactView } from './ContactView';

interface AboutHubScreenProps {
  initialSubTab?: string;
  onNavigate: (page: string, tab?: string) => void;
  onOpenImageModal?: (src: string, alt: string, caption: string) => void;
  onOpenSandbox?: () => void;
}

export const AboutHubScreen: React.FC<AboutHubScreenProps> = ({
  initialSubTab = 'home',
  onNavigate,
  onOpenImageModal,
  onOpenSandbox
}) => {
  const [activeSubTab, setActiveSubTab] = useState<string>(initialSubTab);

  // Sync initialSubTab if changed by parent
  useEffect(() => {
    if (initialSubTab) {
      setActiveSubTab(initialSubTab);
    }
  }, [initialSubTab]);

  const subTabs = [
    { id: 'home', label: 'Home', icon: 'home' },
    { id: 'about', label: 'About SANKET', icon: 'info' },
    { id: 'architecture', label: 'Architecture', icon: 'account_tree' },
    { id: 'knowledge', label: 'Knowledge Hub', icon: 'school' },
    { id: 'resources', label: 'Resources & DPDP', icon: 'folder_open' },
    { id: 'contact', label: 'Contact & Help', icon: 'support_agent' }
  ];

  const handleTabChange = (tabId: string) => {
    setActiveSubTab(tabId);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="flex-grow flex flex-col w-full bg-page transition-colors duration-200">
      {/* Consolidated Sub-Navigation Header Bar */}
      <div className="bg-surface border-b border-main sticky top-0 z-30 shadow-xs">
        <div className="max-w-[1280px] mx-auto px-3 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between py-1.5 border-b border-subtle text-xs">
            <div className="flex items-center gap-1.5 text-muted">
              <span className="font-bold text-navy uppercase tracking-wider text-[11px] flex items-center gap-1">
                <span className="material-symbols-outlined text-[15px] text-saffron">folder_special</span>
                <span>Information &amp; Reference Hub</span>
              </span>
              <span className="text-muted/40">|</span>
              <span className="text-secondary font-medium hidden sm:inline">
                Smart India Hackathon 2026 Problem Statement #26152
              </span>
            </div>
            <div className="text-[11px] text-muted font-mono hidden md:flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-green"></span>
              <span>NTRO Framework Documentation</span>
            </div>
          </div>

          {/* Sub-navigation Tabs */}
          <div className="flex overflow-x-auto scrollbar-none space-x-1 py-1">
            {subTabs.map((tab) => {
              const isActive = activeSubTab === tab.id;
              return (
                <button
                  key={tab.id}
                  id={`about-subtab-${tab.id}`}
                  onClick={() => handleTabChange(tab.id)}
                  className={`py-2 px-3 sm:px-4 text-xs font-bold uppercase tracking-wider transition-all whitespace-nowrap flex items-center gap-1.5 border-b-2 min-h-[40px] rounded-t-xs cursor-pointer ${
                    isActive
                      ? 'border-saffron text-brand bg-elevated font-bold shadow-xs'
                      : 'border-transparent text-secondary hover:text-navy hover:bg-subtle font-medium'
                  }`}
                  aria-selected={isActive}
                  role="tab"
                >
                  <span className={`material-symbols-outlined text-[16px] ${isActive ? 'text-saffron' : 'text-muted'}`}>
                    {tab.icon}
                  </span>
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Sub-Section Content (Render existing components directly and unchanged) */}
      <div className="flex-grow flex flex-col w-full">
        {activeSubTab === 'home' && (
          <HomeScreen
            onNavigate={onNavigate}
            onOpenImageModal={onOpenImageModal}
            onOpenSandbox={onOpenSandbox}
          />
        )}

        {activeSubTab === 'about' && (
          <AboutScreen
            onNavigate={onNavigate}
            onOpenImageModal={onOpenImageModal}
          />
        )}

        {activeSubTab === 'architecture' && (
          <ArchitectureView
            onNavigate={onNavigate}
            onOpenImageModal={onOpenImageModal}
          />
        )}

        {activeSubTab === 'knowledge' && (
          <KnowledgeHubView
            onNavigate={onNavigate}
          />
        )}

        {activeSubTab === 'resources' && (
          <ResourcesView
            onNavigate={onNavigate}
          />
        )}

        {activeSubTab === 'contact' && (
          <ContactView
            onNavigate={onNavigate}
          />
        )}
      </div>
    </div>
  );
};
