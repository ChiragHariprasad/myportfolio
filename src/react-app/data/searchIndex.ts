// ============================================================
// Search Index - Builds searchable index for Command Palette
// Powered by all content JSON files.
// ============================================================

import type { SearchItem } from './types';
import {
  getAllProjects,
  getAllPatents,
  getAllPublications,
  getSiteConfig,
} from './contentLoader';

/** Build the complete search index from all content */
export function buildSearchIndex(): SearchItem[] {
  const items: SearchItem[] = [];

  // ---- Projects ----
  const projects = getAllProjects();
  for (const project of projects) {
    items.push({
      id: `project-${project.id}`,
      title: project.title,
      subtitle: project.fullTitle,
      type: 'project',
      path: `/projects/${project.id}`,
      keywords: [
        project.title.toLowerCase(),
        project.fullTitle.toLowerCase(),
        project.domain.toLowerCase(),
        ...project.tags,
        ...project.tech.map(t => t.toLowerCase()),
      ],
    });
  }

  // ---- Patents ----
  const patents = getAllPatents();
  for (const patent of patents) {
    items.push({
      id: `patent-${patent.id}`,
      title: `Patent: ${patent.title}`,
      subtitle: patent.domain,
      type: 'patent',
      path: '/patents',
      keywords: [
        patent.title.toLowerCase(),
        patent.domain.toLowerCase(),
        'patent',
        'intellectual property',
      ],
    });
  }

  // ---- Publications ----
  const publications = getAllPublications();
  for (const pub of publications) {
    items.push({
      id: `pub-${pub.id}`,
      title: `Publication: ${pub.journal}`,
      subtitle: pub.title,
      type: 'publication',
      path: '/research',
      keywords: [
        pub.title.toLowerCase(),
        pub.journal.toLowerCase(),
        'publication',
        'research',
        'ieee',
      ],
    });
  }

  // ---- Pages (Navigation) ----
  const siteConfig = getSiteConfig();
  for (const nav of siteConfig.navigation) {
    items.push({
      id: `page-${nav.id}`,
      title: `Go to ${nav.label}`,
      subtitle: `Navigate to ${nav.label} page`,
      type: 'page',
      path: nav.path,
      keywords: [nav.label.toLowerCase(), nav.id, 'navigate', 'go to'],
    });
  }

  // ---- Quick Actions ----
  items.push({
    id: 'action-resume',
    title: 'Download Resume',
    subtitle: 'Download CV as PDF',
    type: 'action',
    path: '/Resume.pdf',
    keywords: ['resume', 'cv', 'download', 'pdf'],
  });

  items.push({
    id: 'action-github',
    title: 'Open GitHub',
    subtitle: 'github.com/ChiragHariprasad',
    type: 'action',
    path: 'https://github.com/ChiragHariprasad',
    keywords: ['github', 'code', 'repository'],
  });

  items.push({
    id: 'action-linkedin',
    title: 'Open LinkedIn',
    subtitle: 'linkedin.com/in/chiraghariprasad',
    type: 'action',
    path: 'https://linkedin.com/in/chiraghariprasad/',
    keywords: ['linkedin', 'profile', 'social'],
  });

  items.push({
    id: 'action-email',
    title: 'Email Me',
    subtitle: 'chiragh.0804@gmail.com',
    type: 'action',
    path: 'mailto:chiragh.0804@gmail.com',
    keywords: ['email', 'contact', 'mail'],
  });

  return items;
}

/** Search the index with a query string */
export function search(query: string, limit: number = 10): SearchItem[] {
  if (!query.trim()) return [];

  const index = buildSearchIndex();
  const q = query.toLowerCase().trim();
  const words = q.split(/\s+/);

  const scored = index.map(item => {
    let score = 0;

    // Title match (highest weight)
    if (item.title.toLowerCase().includes(q)) score += 100;
    if (item.subtitle.toLowerCase().includes(q)) score += 50;

    // Keyword matches
    for (const keyword of item.keywords) {
      if (keyword.includes(q)) score += 30;
      for (const word of words) {
        if (keyword.includes(word)) score += 10;
      }
    }

    return { item, score };
  });

  return scored
    .filter(s => s.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map(s => s.item);
}
