// ============================================================
// Build-time prerender entry (consumed by vite-prerender-plugin)
// Renders each route to static HTML via react-dom/server and
// injects per-route <head> metadata (title, description,
// canonical, Open Graph, Twitter Card, JSON-LD).
// Never imported by the client bundle.
// ============================================================

import type { ReactElement } from 'react';
import { Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';
import { AppShell, PageTransition } from './App';
import { getSeoForPath, getAllPrerenderRoutes, SITE_URL, type SeoMeta } from './data/seo';

interface PrerenderHeadElement {
  type: string;
  props: Record<string, string>;
  children?: string;
}

interface PrerenderResult {
  html: string;
  links: Set<string>;
  head: {
    lang: string;
    title: string;
    elements: Set<PrerenderHeadElement>;
  };
  data: { url: string };
}

function meta(props: Record<string, string>): PrerenderHeadElement {
  return { type: 'meta', props };
}

function link(props: Record<string, string>): PrerenderHeadElement {
  return { type: 'link', props };
}

function buildHeadElements(seo: SeoMeta, path: string): Set<PrerenderHeadElement> {
  const url = seo.canonical;
  const elements = new Set<PrerenderHeadElement>([
    meta({ name: 'description', content: seo.description }),
    link({ rel: 'canonical', href: url }),
    meta({ property: 'og:url', content: url }),
    meta({ property: 'og:title', content: seo.title }),
    meta({ property: 'og:description', content: seo.description }),
    meta({ property: 'og:type', content: seo.ogType }),
    meta({ name: 'twitter:title', content: seo.title }),
    meta({ name: 'twitter:description', content: seo.description }),
  ]);

  if (seo.keywords && seo.keywords.length > 0) {
    elements.add(meta({ name: 'keywords', content: seo.keywords.slice(0, 10).join(', ') }));
  }

  if (seo.jsonLd) {
    elements.add({
      type: 'script',
      props: { type: 'application/ld+json' },
      children: JSON.stringify(seo.jsonLd),
    });
  }

  void path;
  return elements;
}

// Route components are resolved via dynamic import so the client bundle can
// code-split them (App.tsx uses React.lazy on the same chunks).
async function resolveRouteComponents() {
  const [{ default: Hero }, { default: InnovationMetrics }, { default: About }, { default: Projects }, { default: ProjectDetail }, { default: ExperiencePage }, { default: Patents }, { default: Research }, { default: TechStackPage }, { default: Timeline }, { default: Contact }] = await Promise.all([
    import('./components/Hero'),
    import('./components/InnovationMetrics'),
    import('./components/About'),
    import('./components/Projects'),
    import('./components/ProjectDetail'),
    import('./components/ExperiencePage'),
    import('./components/Patents'),
    import('./components/Research'),
    import('./components/TechStackPage'),
    import('./components/Timeline'),
    import('./components/Contact'),
  ]);
  return { Hero, InnovationMetrics, About, Projects, ProjectDetail, ExperiencePage, Patents, Research, TechStackPage, Timeline, Contact };
}

export async function prerender(data: { url: string }): Promise<PrerenderResult> {
  // Server-only imports are loaded dynamically so they land in a separate
  // chunk that the browser bundle never pulls in.
  const [{ renderToString }, { StaticRouter }, routeComponents] = await Promise.all([
    import('react-dom/server'),
    import('react-router-dom/server'),
    resolveRouteComponents(),
  ]);

  const rawUrl = data.url || '/';
  const parsedUrl = new URL(rawUrl, SITE_URL);
  const path = parsedUrl.pathname || '/';
  const search = parsedUrl.search || '';
  const seo = getSeoForPath(path);

  const { Hero, InnovationMetrics, About, Projects, ProjectDetail, ExperiencePage, Patents, Research, TechStackPage, Timeline, Contact } = routeComponents;

  const app: ReactElement = (
    <StaticRouter location={{ pathname: path, search }}>
      <AppShell
        routes={
          // Must mirror the client's Suspense wrapper exactly: React refuses
          // to hydrate a Suspense boundary missing from the server output.
          <Suspense fallback={<div className="route-loading" />}>
            <Routes>
              <Route path="/" element={<PageTransition><><Hero /><div className="section-divider" /><InnovationMetrics /></></PageTransition>} />
              <Route path="/about" element={<PageTransition><About /></PageTransition>} />
              <Route path="/projects" element={<PageTransition><Projects /></PageTransition>} />
              <Route path="/projects/:id" element={<PageTransition><ProjectDetail /></PageTransition>} />
              <Route path="/experience" element={<PageTransition><ExperiencePage /></PageTransition>} />
              <Route path="/patents" element={<PageTransition><Patents /></PageTransition>} />
              <Route path="/research" element={<PageTransition><Research /></PageTransition>} />
              <Route path="/techstack" element={<PageTransition><TechStackPage /></PageTransition>} />
              <Route path="/timeline" element={<PageTransition><Timeline /></PageTransition>} />
              <Route path="/contact" element={<PageTransition><Contact /></PageTransition>} />
            </Routes>
          </Suspense>
        }
      />
    </StaticRouter>
  );

  const html = renderToString(app);

  return {
    html,
    links: new Set(getAllPrerenderRoutes()),
    head: {
      lang: 'en',
      title: seo.title,
      elements: buildHeadElements(seo, path),
    },
    data: { url: path + search },
  };
}