import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import InnovationBackground from './components/InnovationBackground';
import Navigation from './components/Navigation';
import Hero from './components/Hero';
import About from './components/About';
import InnovationMetrics from './components/InnovationMetrics';
import Patents from './components/Patents';
import Projects from './components/Projects';
import Research from './components/Research';
import TechnicalExpertise from './components/TechnicalExpertise';
import Timeline from './components/Timeline';
import Contact from './components/Contact';
import './styles/portfolio.css';

function AppContent() {
  const location = useLocation();

  // Extract active section name from route path
  const activeSection = location.pathname === '/' ? 'hero' : location.pathname.substring(1);

  // Automatically scroll back to top of page on route change
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  return (
    <div style={{ position: 'relative', minHeight: '100vh', display: 'flex', flexDirection: 'column', backgroundColor: 'var(--bg-cream)' }}>
      {/* Dynamic Background System */}
      <InnovationBackground activeSection={activeSection} />

      {/* Header & Navigation */}
      <Navigation activeSection={activeSection} />

      {/* Page Sections */}
      <main key={location.pathname} className="animate-fade-up" style={{ flex: 1, position: 'relative', zIndex: 2 }}>
        <Routes>
          <Route path="/" element={
            <>
              <Hero />
              <div className="section-divider"></div>
              <InnovationMetrics />
            </>
          } />
          <Route path="/about" element={<About />} />
          <Route path="/patents" element={<Patents />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/research" element={<Research />} />
          <Route path="/expertise" element={<TechnicalExpertise />} />
          <Route path="/timeline" element={<Timeline />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </main>

      {/* Footer */}
      <footer className="footer-bar">
        <div className="footer-content">
          <span className="footer-text">Designed & Engineered by Chirag Hariprasad</span>
          <span className="footer-copyright">© {new Date().getFullYear()} - All Rights Reserved.</span>
        </div>
      </footer>
    </div>
  );
}

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;