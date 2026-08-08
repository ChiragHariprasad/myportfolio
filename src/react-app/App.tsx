import React, { lazy, Suspense, useEffect, useState, useCallback } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { ThemeProvider } from './components/ThemeProvider';
import Navigation from './components/Navigation';
import CommandPalette from './components/CommandPalette';
import LoadingScreen from './components/LoadingScreen';
import { AppAnimationContext } from './components/AnimationContext';
import Hero from './components/Hero';
import InnovationMetrics from './components/InnovationMetrics';
import { getSeoForPath } from './data/seo';
import './styles/portfolio.css';

// Route-level code splitting: each page loads its own chunk on navigation.
// (The prerender entry keeps an eager copy of these routes; see prerender.tsx.)
const About = lazy(() => import('./components/About'));
const Patents = lazy(() => import('./components/Patents'));
const Projects = lazy(() => import('./components/Projects'));
const Research = lazy(() => import('./components/Research'));
const TechStackPage = lazy(() => import('./components/TechStackPage'));
const ExperiencePage = lazy(() => import('./components/ExperiencePage'));
const Timeline = lazy(() => import('./components/Timeline'));
const Contact = lazy(() => import('./components/Contact'));
const ProjectDetail = lazy(() => import('./components/ProjectDetail'));

/**
 * Ensures the current route's chunk is loaded before hydration, so
 * React.lazy never suspends during hydrate (avoids hydration mismatch).
 */
export async function preloadRouteForPath(path: string): Promise<void> {
  const p = path.replace(/\/+$/, '') || '/';
  if (p.startsWith('/projects/')) await import('./components/ProjectDetail');
  else if (p === '/projects') await import('./components/Projects');
  else if (p === '/about') await import('./components/About');
  else if (p === '/patents') await import('./components/Patents');
  else if (p === '/research') await import('./components/Research');
  else if (p === '/techstack') await import('./components/TechStackPage');
  else if (p === '/experience') await import('./components/ExperiencePage');
  else if (p === '/timeline') await import('./components/Timeline');
  else if (p === '/contact') await import('./components/Contact');
}

/** Page transition wrapper */
export const PageTransition: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <motion.div
    initial={{ opacity: 0, y: 12 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -12 }}
    transition={{ duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
  >
    {children}
  </motion.div>
);

function AppContent({ routes }: { routes?: React.ReactNode }) {
  const location = useLocation();

  // Scroll to top on route change
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  // Keep <head> metadata in sync for client-side navigation
  useEffect(() => {
    const seo = getSeoForPath(location.pathname);
    document.title = seo.title;

    const ensureMeta = (selector: string, attrs: Record<string, string>, tag = 'meta') => {
      const el = document.head.querySelector(selector);
      if (el) {
        Object.entries(attrs).forEach(([k, v]) => el.setAttribute(k, v));
      } else {
        const created = document.createElement(tag);
        Object.entries(attrs).forEach(([k, v]) => created.setAttribute(k, v));
        document.head.appendChild(created);
      }
    };

    ensureMeta('meta[name="description"]', { name: 'description', content: seo.description });
    ensureMeta('meta[property="og:title"]', { property: 'og:title', content: seo.title });
    ensureMeta('meta[property="og:description"]', { property: 'og:description', content: seo.description });
    ensureMeta('meta[property="og:url"]', { property: 'og:url', content: seo.canonical });
    ensureMeta('meta[name="twitter:title"]', { name: 'twitter:title', content: seo.title });
    ensureMeta('meta[name="twitter:description"]', { name: 'twitter:description', content: seo.description });
    ensureMeta('link[rel="canonical"]', { rel: 'canonical', href: seo.canonical }, 'link');
  }, [location.pathname]);

  return (
    <div className="app-wrapper">
      {/* Navigation */}
      <Navigation />

      {/* Command Palette (global) */}
      <CommandPalette />

      {/* Main Content */}
      <main>
        {routes ?? (
          <Suspense fallback={<div className="route-loading" />}>
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
          </Suspense>
        )}
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

/** Everything that renders inside a router (shared by browser + prerender). */
export function AppShell({ routes }: { routes?: React.ReactNode }) {
  const [loaded, setLoaded] = useState(false);
  const handleLoadComplete = useCallback(() => setLoaded(true), []);

  return (
    <ThemeProvider>
      <AppAnimationContext.Provider value={loaded}>
        {!loaded && <LoadingScreen onComplete={handleLoadComplete} />}
        <AppContent routes={routes} />
      </AppAnimationContext.Provider>
    </ThemeProvider>
  );
}

function App() {
  return (
    <Router>
      <AppShell />
    </Router>
  );
}

export default App;