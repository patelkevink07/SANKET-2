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
import { updatePageSEO } from './utils/seo';

export default function App() {
  const [activePage, setActivePage] = useState<string>('login');
  const [dashboardTab, setDashboardTab] = useState<string>('overview');
  const [aboutSubTab, setAboutSubTab] = useState<string>('home');
  const [user, setUser] = useState<AnalystUser | null>(null);

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
    if ((page === 'dashboards' || page === 'reports') && !user) {
      setActivePage('login');
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    if (['home', 'about', 'architecture', 'knowledge', 'contact'].includes(page)) {
      setActivePage('about');
      setAboutSubTab(tab || (page === 'about' ? 'about' : page));
    } else if (page === 'dashboards') {
      setActivePage('dashboards');
      setDashboardTab(tab || 'overview');
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
    setDashboardTab('overview');
    window.scrollTo({ top: 0, behavior: 'smooth' });
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
          user ? (
            <DashboardScreen
              initialTab={dashboardTab}
              onNavigate={handleNavigate}
              onOpenImageModal={handleOpenImageModal}
            />
          ) : (
            <LoginScreen
              onLoginSuccess={handleLoginSuccess}
              onNavigate={handleNavigate}
            />
          )
        )}

        {activePage === 'reports' && (
          user ? (
            <ReportsView
              user={user}
              onNavigate={handleNavigate}
            />
          ) : (
            <LoginScreen
              onLoginSuccess={handleLoginSuccess}
              onNavigate={handleNavigate}
            />
          )
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

