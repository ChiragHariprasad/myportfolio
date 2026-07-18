import React, { useEffect, useState, useCallback } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { ThemeProvider } from './components/ThemeProvider';
import Navigation from './components/Navigation';
import CommandPalette from './components/CommandPalette';
import LoadingScreen from './components/LoadingScreen';
import Hero from './components/Hero';
import About from './components/About';
import InnovationMetrics from './components/InnovationMetrics';
import Patents from './components/Patents';
import Projects from './components/Projects';
import Research from './components/Research';
import TechStackPage from './components/TechStackPage';
import ExperiencePage from './components/ExperiencePage';
import Timeline from './components/Timeline';
import Contact from './components/Contact';
import ProjectDetail from './components/ProjectDetail';
import './styles/portfolio.css';

/** Page transition wrapper */
const PageTransition: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <motion.div
    initial={{ opacity: 0, y: 12 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -12 }}
    transition={{ duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
  >
    {children}
  </motion.div>
);

function AppContent() {
  const location = useLocation();

  // Scroll to top on route change
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  return (
    <div className="app-wrapper">
      {/* Navigation */}
      <Navigation />

      {/* Command Palette (global) */}
      <CommandPalette />

      {/* Main Content */}
      <main>
        <AnimatePresence mode="wait">
          <Routes location={location} key={location.pathname}>
            {/* Home */}
            <Route path="/" element={
              <PageTransition>
                <Hero />
                <div className="section-divider" />
                <InnovationMetrics />
              </PageTransition>
            } />

            {/* About */}
            <Route path="/about" element={
              <PageTransition><About /></PageTransition>
            } />

            {/* Projects List */}
            <Route path="/projects" element={
              <PageTransition><Projects /></PageTransition>
            } />

            {/* Project Detail (microsite) */}
            <Route path="/projects/:id" element={
              <PageTransition><ProjectDetail /></PageTransition>
            } />

            {/* Experience */}
            <Route path="/experience" element={
              <PageTransition><ExperiencePage /></PageTransition>
            } />

            {/* Patents */}
            <Route path="/patents" element={
              <PageTransition><Patents /></PageTransition>
            } />

            {/* Research & Publications */}
            <Route path="/research" element={
              <PageTransition><Research /></PageTransition>
            } />

            {/* Tech Stack */}
            <Route path="/techstack" element={
              <PageTransition><TechStackPage /></PageTransition>
            } />

            {/* Timeline */}
            <Route path="/timeline" element={
              <PageTransition><Timeline /></PageTransition>
            } />

            {/* Contact */}
            <Route path="/contact" element={
              <PageTransition><Contact /></PageTransition>
            } />
          </Routes>
        </AnimatePresence>
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
  const [loaded, setLoaded] = useState(false);
  const handleLoadComplete = useCallback(() => setLoaded(true), []);

  return (
    <ThemeProvider>
      <Router>
        {!loaded && <LoadingScreen onComplete={handleLoadComplete} />}
        <div style={{ opacity: loaded ? 1 : 0, transition: 'opacity 0.3s ease' }}>
          <AppContent />
        </div>
      </Router>
    </ThemeProvider>
  );
}

export default App;