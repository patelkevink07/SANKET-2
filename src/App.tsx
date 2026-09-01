import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { TopNavBar } from './components/TopNavBar';
import { Footer } from './components/Footer';
import { LoginScreen } from './components/LoginScreen';
import { DashboardScreen } from './components/DashboardScreen';
import { ReportsView } from './components/ReportsView';
import { AboutHubScreen } from './components/AboutHubScreen';
import { ImageZoomModal } from './components/ImageZoomModal';
import { AnalystUser } from './types';
import { CURRENT_ANALYST } from './data/mockData';
import { updatePageSEO } from './utils/seo';

export default function App() {
  const [theme, setTheme] = useState<'light' | 'dark'>(() => {
    const saved = localStorage.getItem('sanket-theme');
    return saved === 'dark' ? 'dark' : 'light';
  });
  const [activePage, setActivePage] = useState<string>('dashboards');
  const [dashboardTab, setDashboardTab] = useState<string>('overview');
  const [aboutSubTab, setAboutSubTab] = useState<string>('home');
  const [user, setUser] = useState<AnalystUser | null>(CURRENT_ANALYST);

  // Sync theme with localStorage and root HTML attribute
  useEffect(() => {
    localStorage.setItem('sanket-theme', theme);
    if (theme === 'dark') {
      document.documentElement.setAttribute('data-theme', 'dark');
    } else {
      document.documentElement.removeAttribute('data-theme');
    }
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
  };

  // Modal states for interactivity
  const [zoomModal, setZoomModal] = useState<{
    isOpen: boolean;
    src: string;
    alt: string;
    caption?: string;
  }>({
    isOpen: false,
    src: '',
    alt: '',
    caption: ''
  });

  // Dynamic SEO meta tags and page titles on route changes
  useEffect(() => {
    updatePageSEO(activePage, activePage === 'about' ? aboutSubTab : undefined);
  }, [activePage, aboutSubTab]);

  const handleNavigate = (page: string, tab?: string) => {
    if (['home', 'about', 'architecture', 'knowledge', 'resources', 'contact'].includes(page)) {
      setActivePage('about');
      setAboutSubTab(tab || (page === 'about' ? 'about' : page));
    } else if (page === 'dashboards') {
      setActivePage('dashboards');
      if (tab) {
        setDashboardTab(tab);
      }
    } else {
      setActivePage(page);
      if (tab) {
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
    setAboutSubTab('home');
  };

  const handleOpenImageModal = (src: string, alt: string, caption?: string) => {
    setZoomModal({
      isOpen: true,
      src,
      alt,
      caption: caption || ''
    });
  };

  return (
    <div className="min-h-screen flex flex-col bg-page text-primary selection:bg-saffron-bg selection:text-navy transition-colors duration-200">
      {/* Official Government & SANKET Header */}
      <Header
        user={user}
        onLogout={handleLogout}
        onNavigate={handleNavigate}
        onOpenImageModal={handleOpenImageModal}
        theme={theme}
        onToggleTheme={toggleTheme}
      />

      {/* Top Navigation Bar with Tricolor Bottom Border */}
      <TopNavBar
        activePage={activePage}
        onNavigate={handleNavigate}
        user={user}
        onLogout={handleLogout}
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
            initialSubTab={aboutSubTab}
            onNavigate={handleNavigate}
            onOpenImageModal={handleOpenImageModal}
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

      {/* Official Institutional Footer */}
      <Footer onNavigate={handleNavigate} />
    </div>
  );
}

