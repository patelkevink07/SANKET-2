import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { TopNavBar } from './components/TopNavBar';
import { Footer } from './components/Footer';
import { LoginScreen } from './components/LoginScreen';
import { DashboardScreen } from './components/DashboardScreen';
import { ReportsView } from './components/ReportsView';
import { AboutHubScreen } from './components/AboutHubScreen';
import { ImageZoomModal } from './components/ImageZoomModal';
import { InteractiveSandboxModal } from './components/InteractiveSandboxModal';
import { AnalystUser } from './types';
import { CURRENT_ANALYST } from './data/mockData';
import { updatePageSEO } from './utils/seo';

export default function App() {
  const [activePage, setActivePage] = useState<string>('dashboards');
  const [dashboardTab, setDashboardTab] = useState<string>('overview');
  const [aboutTab, setAboutTab] = useState<string>('home');
  const [user, setUser] = useState<AnalystUser | null>(CURRENT_ANALYST);

  // Modal states for interactivity
  const [zoomModal, setZoomModal] = useState<{
    isOpen: boolean;
    src: string;
    alt: string;
    caption: string;
  }>({
    isOpen: false,
    src: '',
    alt: '',
    caption: ''
  });

  const [isSandboxOpen, setIsSandboxOpen] = useState<boolean>(false);

  // Dynamic SEO meta tags and page titles on route changes
  useEffect(() => {
    if (activePage === 'about') {
      updatePageSEO(aboutTab || 'about');
    } else {
      updatePageSEO(activePage);
    }
  }, [activePage, aboutTab]);

  const handleNavigate = (page: string, tab?: string) => {
    const aboutSubTabs = ['home', 'about', 'architecture', 'knowledge', 'resources', 'contact'];
    
    if (aboutSubTabs.includes(page)) {
      setActivePage('about');
      setAboutTab(tab || page);
    } else if (page === 'about') {
      setActivePage('about');
      if (tab) {
        setAboutTab(tab);
      }
    } else {
      setActivePage(page);
      if (tab && page === 'dashboards') {
        setDashboardTab(tab);
      }
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleLoginSuccess = (loggedInUser: AnalystUser) => {
    setUser(loggedInUser);
    setActivePage('dashboards');
  };

  const handleLogout = () => {
    setUser(null);
    setActivePage('about');
    setAboutTab('home');
  };

  const handleOpenImageModal = (src: string, alt: string, caption: string) => {
    setZoomModal({
      isOpen: true,
      src,
      alt,
      caption
    });
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#f9f9f9] text-[#1a1c1c] selection:bg-[#ffdbcd] selection:text-[#001e40]">
      {/* Official Government & SANKET Header */}
      <Header
        user={user}
        onLogout={handleLogout}
        onNavigate={handleNavigate}
        onOpenImageModal={handleOpenImageModal}
      />

      {/* Top Navigation Bar with Tricolor Bottom Border */}
      <TopNavBar
        activePage={activePage}
        onNavigate={handleNavigate}
        user={user}
        onLogout={handleLogout}
        onOpenSandbox={() => setIsSandboxOpen(true)}
      />

      {/* Main Content Router */}
      <main className="flex-grow flex flex-col w-full" id="main-content">
        {activePage === 'dashboards' && (
          <DashboardScreen
            initialTab={dashboardTab}
            onNavigate={handleNavigate}
            onOpenImageModal={handleOpenImageModal}
          />
        )}

        {activePage === 'reports' && (
          <ReportsView
            user={user}
            onNavigate={handleNavigate}
          />
        )}

        {activePage === 'about' && (
          <AboutHubScreen
            initialTab={aboutTab}
            onNavigate={handleNavigate}
            onOpenImageModal={handleOpenImageModal}
            onOpenSandbox={() => setIsSandboxOpen(true)}
          />
        )}

        {activePage === 'login' && (
          <LoginScreen
            onLoginSuccess={handleLoginSuccess}
            onNavigate={handleNavigate}
          />
        )}
      </main>

      {/* Global Interactive Image Zoom / Lightbox Modal */}
      <ImageZoomModal
        isOpen={zoomModal.isOpen}
        onClose={() => setZoomModal((prev) => ({ ...prev, isOpen: false }))}
        imageSrc={zoomModal.src}
        imageAlt={zoomModal.alt}
        caption={zoomModal.caption}
      />

      {/* Global Interactive AI Sandbox Simulator Modal */}
      <InteractiveSandboxModal
        isOpen={isSandboxOpen}
        onClose={() => setIsSandboxOpen(false)}
        onNavigateToDashboard={(tab) => {
          setIsSandboxOpen(false);
          handleNavigate('dashboards', tab);
        }}
      />

      {/* Official Institutional Footer */}
      <Footer onNavigate={handleNavigate} />
    </div>
  );
}

