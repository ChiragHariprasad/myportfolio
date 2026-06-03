import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import '../styles/portfolio.css';

interface NavigationProps {
  activeSection: string;
}

const Navigation: React.FC<NavigationProps> = ({ activeSection }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { label: 'Hero', path: '/', id: 'hero' },
    { label: 'About', path: '/about', id: 'about' },
    { label: 'Patents', path: '/patents', id: 'patents' },
    { label: 'Projects', path: '/projects', id: 'projects' },
    { label: 'Research', path: '/research', id: 'research' },
    { label: 'Expertise', path: '/expertise', id: 'expertise' },
    { label: 'Timeline', path: '/timeline', id: 'timeline' },
    { label: 'Contact', path: '/contact', id: 'contact' },
  ];

  return (
    <nav className={`nav-header ${isScrolled ? 'scrolled' : ''}`}>
      <div className="nav-container">
        <Link to="/" className="nav-logo" style={{ cursor: 'pointer', textDecoration: 'none' }}>
          CHIRAG
          <span className="logo-dot"></span>
        </Link>

        {/* Desktop Menu */}
        <ul className="nav-menu">
          {navItems.map((item) => (
            <li key={item.id}>
              <Link
                to={item.path}
                className={`nav-link ${activeSection === item.id ? 'active' : ''}`}
                style={{ textDecoration: 'none' }}
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>

        {/* Mobile Menu Button */}
        <button
          className="mobile-menu-btn"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle menu"
          style={{
            background: 'none',
            border: 'none',
            color: 'var(--charcoal)',
            cursor: 'pointer'
          }}
        >
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Drawer (Basic Overlay) */}
      {mobileMenuOpen && (
        <div
          style={{
            position: 'fixed',
            top: '70px',
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'var(--bg-ivory)',
            zIndex: 99,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            paddingTop: '3rem',
            gap: '2rem'
          }}
        >
          {navItems.map((item) => (
            <Link
              key={item.id}
              to={item.path}
              onClick={() => setMobileMenuOpen(false)}
              className={`nav-link ${activeSection === item.id ? 'active' : ''}`}
              style={{ fontSize: '1.25rem', textDecoration: 'none' }}
            >
              {item.label}
            </Link>
          ))}
        </div>
      )}
    </nav>
  );
};

export default Navigation;
