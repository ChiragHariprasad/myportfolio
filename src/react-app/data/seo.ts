// ============================================================
// SEO Metadata Layer
// Derives per-route <title>, description, canonical URL and
// structured data (JSON-LD) from the content JSON files so the
// site stays correct as projects/patents are added.
// Used by the build-time prerennder and by client-side
// navigation in App.tsx.
// ============================================================

import { getAllProjects, getHeroConfig, getSiteConfig } from './contentLoader';
import type { Project } from './types';

export const SITE_URL = 'https://chiraghariprasad.qzz.io';

export interface SeoMeta {
  title: string;
  description: string;
  canonical: string;
  ogType: 'website' | 'article';
  keywords?: string[];
  jsonLd?: object | object[];
}

function projectJsonLd(project: Project): object {
  const canonical = `${SITE_URL}/projects/${project.id}`;
  return {
    '@context': 'https://schema.org',
    '@type': 'Project',
    name: project.title,
    alternateName: project.fullTitle,
    description: project.description,
    url: canonical,
    genre: project.domain,
    keywords: project.tags.join(', '),
    dateCreated: project.completedDate || `${project.year}-${String(project.month || 1).padStart(2, '0')}`,
    ...(project.patent
      ? { award: `Patent Published ${project.patent.publishedDate}` }
      : {}),
    ...(project.publication
      ? { citation: { '@type': 'ScholarlyArticle', name: project.publication.title } }
      : {}),
  };
}

const navPages: Record<string, { title: string; description: string; keywords?: string[] }> = {
  '/about': {
    title: 'About Chirag Hariprasad — AI/ML Systems Engineer',
    description: 'AI/ML Systems Engineer building end-to-end intelligent systems. Agentic AI, distributed systems, backend engineering, and digital twins.',
    keywords: ['Chirag Hariprasad', 'AI Engineer', 'Machine Learning'],
  },
  '/projects': {
    title: 'Projects — AI/ML Systems Engineering Portfolio',
    description: '19 major projects spanning AI urban planning, eDNA biodiversity AI, causal policy simulation, real-time fraud detection, smart retail, and more.',
    keywords: ['AI projects', 'Machine Learning projects', 'portfolio'],
  },
  '/experience': {
    title: 'Experience — Chirag Hariprasad',
    description: 'Internships and engineering experience in AI/ML systems, eDNAcology informatics, fintech, and intelligent infrastructure.',
  },
  '/patents': {
    title: 'Patents — Chirag Hariprasad',
    description: '4 published patents: GENESIS (AI urban planning), VECTOR (fraud detection), O.R.I.O.N. (smart retail), and adaptive presentation automation.',
    keywords: ['patents', 'inventor'],
  },
  '/research': {
    title: 'Research & Publications — Chirag Hariprasad',
    description: 'Published IEEE Access research on causal policy simulation (S.C.A.L.E.) and ongoing work in agentic AI and digital twins.',
    keywords: ['research', 'publications', 'IEEE', 'AI research'],
  },
  '/techstack': {
    title: 'Tech Stack — Chirag Hariprasad',
    description: 'Technologies and tools used across projects: Python, TypeScript, C++, cloud, distributed systems, agentic AI, and data engineering.',
  },
  '/timeline': {
    title: 'Timeline — Chirag Hariprasad Engineering Journey',
    description: 'A chronological journey from hackathons and internships to patents, IEEE publication, and 19 shipped projects.',
  },
  '/contact': {
    title: 'Contact — Chirag Hariprasad',
    description: 'Get in touch with Chirag Hariprasad for AI engineering, research, and innovation opportunities.',
  },
};

export function getSeoForPath(path: string): SeoMeta {
  const site = getSiteConfig();
  const hero = getHeroConfig();

  const normalized = path.length > 1 ? path.replace(/\/+$/, '') : path;

  // Home
  if (normalized === '/') {
    return {
      title: site.title,
      description: site.description,
      canonical: SITE_URL,
      ogType: 'website',
      keywords: ['Chirag Hariprasad', 'AI Engineer', 'Portfolio', 'Inventor', 'Researcher', 'Software Engineer'],
      jsonLd: [
        {
          '@context': 'https://schema.org',
          '@type': 'WebSite',
          name: 'Chirag Hariprasad',
          alternateName: ['Chirag Hariprasad Portfolio', 'chiraghariprasad.qzz.io'],
          url: `${SITE_URL}/`,
        },
        {
          '@context': 'https://schema.org',
          '@type': 'Person',
          name: 'Chirag Hariprasad',
          url: SITE_URL,
          image: `${SITE_URL}/assets/chirag-hariprasad.webp`,
          email: hero.socials.email,
          jobTitle: 'AI/ML Systems Engineer, Inventor & Researcher',
          description: site.description,
          sameAs: [hero.socials.linkedin, hero.socials.github],
        },
      ],
    };
  }

  // Project detail pages
  if (normalized.startsWith('/projects/')) {
    const id = normalized.split('/')[2];
    const project = getAllProjects().find(p => p.id === id);
    if (project) {
      return {
        title: `${project.title} — ${project.domain}`,
        description: project.description,
        canonical: `${SITE_URL}/projects/${project.id}`,
        ogType: 'article',
        keywords: project.tags,
        jsonLd: projectJsonLd(project),
      };
    }
  }

  const nav = navPages[normalized];
  if (nav) {
    return {
      title: nav.title,
      description: nav.description,
      canonical: `${SITE_URL}${normalized}`,
      ogType: 'website',
      keywords: nav.keywords,
    };
  }

  // Fallback: unknowable route (e.g. 404 / SPA fallback)
  return {
    title: site.title,
    description: site.description,
    canonical: `${SITE_URL}${normalized}`,
    ogType: 'website',
  };
}

export function getPublicProjects(): Project[] {
  return getAllProjects().filter(p => !p.confidential);
}

export function getAllPrerenderRoutes(): string[] {
  const site = getSiteConfig();
  const projectRoutes = getPublicProjects().map(p => `/projects/${p.id}`);
  return [...site.navigation.map(n => n.path), ...projectRoutes];
}

export function getSitemapUrls(): { loc: string; priority: string; lastmod: string }[] {
  const today = new Date().toISOString().slice(0, 10);
  const site = getSiteConfig();
  const urls: { loc: string; priority: string; lastmod: string }[] = [
    { loc: `${SITE_URL}/`, priority: '1.0', lastmod: today },
    ...site.navigation.map(n => ({ loc: `${SITE_URL}${n.path}`, priority: '0.8', lastmod: today })),
    ...getPublicProjects().map(p => ({
      loc: `${SITE_URL}/projects/${p.id}`,
      priority: p.featured ? '0.9' : '0.7',
      lastmod: p.completedDate || today,
    })),
  ];
  return urls;
}