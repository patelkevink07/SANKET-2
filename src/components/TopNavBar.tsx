import React, { useState } from 'react';
import { AnalystUser } from '../types';
import { InteractiveHoverButton } from './InteractiveHoverButton';

interface TopNavBarProps {
  activePage: string;
  onNavigate: (page: string) => void;
  user: AnalystUser | null;
  onLogout: () => void;
  onOpenSandbox?: () => void;
}

export const TopNavBar: React.FC<TopNavBarProps> = ({
  activePage,
  onNavigate,
  user,
  onLogout,
  onOpenSandbox
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { id: 'dashboards', label: 'DASHBOARD', icon: 'dashboard' },
    { id: 'reports', label: 'REPORTS', icon: 'assessment' },
    { id: 'about', label: 'ABOUT', icon: 'info' }
  ];

  const handleNavClick = (pageId: string) => {
    onNavigate(pageId);
    setMobileMenuOpen(false);
  };

  return (
    <nav className="bg-brand-navy text-white font-semibold text-sm w-full flex flex-col tricolor-border sticky top-0 z-40 shadow-md">
      <div className="max-w-[1280px] mx-auto w-full flex items-center justify-between px-3 sm:px-6 lg:px-8 py-1.5 lg:py-0">
        {/* Mobile / Tablet Header Bar */}
        <div className="flex items-center justify-between w-full lg:w-auto">
          {/* Mobile brand text */}
          <div
            className="flex items-center gap-2 lg:hidden cursor-pointer py-1"
            onClick={() => handleNavClick('dashboards')}
          >
            <span className="font-serif-headline font-bold text-white text-base tracking-wider">
              SANKET
            </span>
            <span className="text-[10px] text-brand-navy-light-text uppercase font-mono px-1.5 py-0.5 bg-white/10 rounded">
              SIH 2026 #26152
            </span>
          </div>

          {/* Mobile Right Controls: Demo Button & Hamburger Toggle */}
          <div className="flex items-center gap-2 lg:hidden">
            <InteractiveHoverButton
              id="btn-mobile-sandbox-trigger"
              label="Live Sandbox"
              icon="smart_toy"
              variant="saffron"
              onClick={() => {
                if (onOpenSandbox) {
                  onOpenSandbox();
                } else {
                  handleNavClick('dashboards');
                }
              }}
              className="py-1.5 px-2.5 text-[11px] min-h-[38px]"
            />

            {/* Hamburger Toggle Button */}
            <button
              id="btn-mobile-menu-toggle"
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="min-h-[44px] min-w-[44px] flex items-center justify-center p-2 rounded text-brand-navy-light-text hover:text-white hover:bg-white/10 focus:outline-none transition-colors"
              aria-label="Toggle Navigation Menu"
              aria-expanded={mobileMenuOpen}
            >
              <span className="material-symbols-outlined text-2xl">
                {mobileMenuOpen ? 'close' : 'menu'}
              </span>
            </button>
          </div>
        </div>

        {/* Desktop Navigation Links */}
        <ul className="hidden lg:flex flex-nowrap items-center space-x-0.5">
          {navItems.map((item) => {
            const isActive = activePage === item.id;
            return (
              <li key={item.id}>
                <button
                  id={`nav-link-${item.id}`}
                  onClick={() => handleNavClick(item.id)}
                  className={`block py-3 px-3.5 text-xs xl:text-sm tracking-wider uppercase transition-all whitespace-nowrap min-h-[44px] flex items-center ${
                    isActive
                      ? 'bg-brand-navy-mid text-white font-bold border-b-4 border-accent-saffron'
                      : 'text-brand-navy-light-text hover:bg-brand-navy-hover/60 hover:text-white font-medium'
                  }`}
                >
                  {item.label}
                </button>
              </li>
            );
          })}
        </ul>

        {/* Desktop Right Action Area */}
        <div className="hidden lg:flex items-center gap-3 py-1.5">
          {/* Interactive Placeholder Button */}
          <InteractiveHoverButton
            id="btn-desktop-sandbox-trigger"
            label="AI Intelligence Sandbox"
            sublabel="live"
            icon="auto_awesome"
            variant="primary"
            onClick={() => {
              if (onOpenSandbox) {
                onOpenSandbox();
              } else {
                handleNavClick('dashboards');
              }
            }}
            className="py-1.5 px-3 text-xs"
          />

          {user ? (
            <div className="flex items-center gap-3">
              <div className="hidden xl:flex flex-col text-right">
                <span className="text-xs font-bold text-white leading-tight">{user.name}</span>
                <span className="text-[10px] text-brand-navy-light-text">{user.badgeId}</span>
              </div>
              <button
                id="btn-nav-logout"
                onClick={onLogout}
                className="min-h-[38px] py-1.5 px-3.5 bg-status-danger hover:bg-status-danger/80 text-white font-bold text-xs uppercase tracking-wider transition-colors flex items-center gap-1.5 border border-white/20 shadow-xs cursor-pointer"
              >
                <span className="material-symbols-outlined text-[14px]">logout</span>
                LOGOUT
              </button>
            </div>
          ) : (
            <button
              id="btn-nav-login"
              onClick={() => handleNavClick('login')}
              className={`min-h-[38px] py-1.5 px-5 font-bold text-xs uppercase tracking-wider transition-colors border shadow-xs flex items-center gap-1.5 cursor-pointer ${
                activePage === 'login'
                  ? 'bg-accent-saffron text-white border-accent-saffron'
                  : 'bg-surface text-text-dark-navy hover:bg-surface-muted border-border-main'
              }`}
            >
              <span className="material-symbols-outlined text-[14px]">lock</span>
              LOGIN
            </button>
          )}
        </div>
      </div>

      {/* Mobile Drawer / Dropdown Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-brand-navy-dark border-t border-white/10 px-4 py-4 space-y-3 transition-all duration-200 animate-in slide-in-from-top-2">
          {/* User Profile info if logged in */}
          {user && (
            <div className="p-3 bg-brand-navy border border-white/10 rounded flex items-center justify-between">
              <div>
                <div className="text-xs font-bold text-white">{user.name}</div>
                <div className="text-[10px] text-brand-navy-light-text">{user.role} &bull; {user.badgeId}</div>
              </div>
              <span className="text-[10px] uppercase font-bold bg-accent-saffron text-white px-2 py-0.5 rounded">
                {user.clearanceLevel}
              </span>
            </div>
          )}

          {/* Navigation Links Grid for Mobile */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5">
            {navItems.map((item) => {
              const isActive = activePage === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`min-h-[44px] w-full px-3 py-2.5 rounded text-left text-xs font-semibold uppercase tracking-wider flex items-center justify-between transition-colors ${
                    isActive
                      ? 'bg-brand-navy-mid text-white border-l-4 border-accent-saffron font-bold shadow-xs'
                      : 'text-brand-navy-light-text hover:bg-white/10 hover:text-white'
                  }`}
                >
                  <span className="flex items-center gap-2.5">
                    <span className="material-symbols-outlined text-base opacity-80">{item.icon}</span>
                    <span>{item.label}</span>
                  </span>
                  {isActive && <span className="material-symbols-outlined text-sm text-accent-saffron">check</span>}
                </button>
              );
            })}
          </div>

          {/* Mobile Login / Logout Action */}
          <div className="pt-2 border-t border-white/10 flex items-center justify-between gap-3">
            {user ? (
              <button
                onClick={() => {
                  onLogout();
                  setMobileMenuOpen(false);
                }}
                className="min-h-[44px] w-full py-2.5 bg-status-danger hover:bg-status-danger/80 text-white font-bold text-xs uppercase tracking-wider rounded transition-colors flex items-center justify-center gap-2 cursor-pointer"
              >
                <span className="material-symbols-outlined text-base">logout</span>
                <span>Sign Out of SANKET Portal</span>
              </button>
            ) : (
              <button
                onClick={() => handleNavClick('login')}
                className="min-h-[44px] w-full py-2.5 bg-accent-saffron hover:bg-accent-saffron-hover text-white font-bold text-xs uppercase tracking-wider rounded transition-colors flex items-center justify-center gap-2 shadow-xs cursor-pointer"
              >
                <span className="material-symbols-outlined text-base">login</span>
                <span>Authorized Personnel Sign In</span>
              </button>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};
