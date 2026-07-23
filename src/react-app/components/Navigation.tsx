import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Palette, Command, Search } from 'lucide-react';
import { getSiteConfig } from '../data/contentLoader';
import { useTheme } from './ThemeProvider';

const Navigation: React.FC = () => {
  const location = useLocation();
  const siteConfig = getSiteConfig();
  const { currentTheme, themes, setTheme, themeId } = useTheme();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [themeMenuOpen, setThemeMenuOpen] = useState(false);

  // Close mobile nav on route change
  useEffect(() => {
    setMobileOpen(false);
  }, [location.pathname]);

  const isActive = (path: string) => {
    if (path === '/') return location.pathname === '/';
    return location.pathname.startsWith(path);
  };

  return (
    <>
      {/* Mobile Toggle */}
      <button
        className="nav-mobile-toggle"
        onClick={() => setMobileOpen(!mobileOpen)}
        aria-label="Toggle navigation"
      >
        {mobileOpen ? <X size={20} /> : <Menu size={20} />}
      </button>

      <nav className={`nav-sidebar ${mobileOpen ? 'open' : ''}`}>
        {/* Logo */}
        <div className="nav-logo">
          <Link to="/" className="nav-logo-text">CH</Link>
        </div>

        {/* Nav Items */}
        <ul className="nav-items">
          {siteConfig.navigation.map(item => (
            <li key={item.id} className="nav-item">
              <Link
                to={item.path}
                className={`nav-link ${isActive(item.path) ? 'active' : ''}`}
              >
                <span className="nav-number">{item.number}</span>
                <span>{item.label}</span>
              </Link>
            </li>
          ))}
        </ul>

        {/* Footer */}
        <div className="nav-footer">
          {/* Theme Selector */}
          <div style={{ position: 'relative' }}>
            <button
              className="nav-theme-btn"
              onClick={() => setThemeMenuOpen(!themeMenuOpen)}
            >
              <Palette size={12} style={{ marginRight: '0.4rem' }} />
              {currentTheme.name}
            </button>

            {themeMenuOpen && (
              <div className="nav-theme-menu">
                {themes.map(t => (
                  <button
                    key={t.id}
                    onClick={() => { setTheme(t.id); setThemeMenuOpen(false); }}
                    className={`nav-theme-option ${t.id === themeId ? 'active' : ''}`}
                  >
                    <span style={{
                      width: '8px', height: '8px', borderRadius: '50%',
                      background: t.colors['--accent'],
                    }} />
                    {t.name}
                  </button>
                ))}
              </div>
            )}
          </div>

          <button 
            className="nav-theme-btn nav-search-btn"
            onClick={() => {
              window.dispatchEvent(new CustomEvent('open-search'));
              setMobileOpen(false);
            }}
          >
            <Search size={12} style={{ marginRight: '0.4rem' }} /> Search
          </button>

          <p className="nav-shortcut-hint">
            <Command size={10} /> Press <kbd>/</kbd> to search
          </p>
        </div>
      </nav>

      {/* Mobile Overlay */}
      {mobileOpen && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            background: 'rgba(0, 0, 0, 0.5)',
            zIndex: 90,
            backdropFilter: 'blur(2px)',
          }}
          onClick={() => setMobileOpen(false)}
        />
      )}
    </>
  );
};

export default Navigation;
