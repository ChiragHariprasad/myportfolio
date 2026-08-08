#!/usr/bin/env node
// Generates public/sitemap.xml from content JSON files so the sitemap
// always matches the projects/pages that actually exist.
// Runs before `vite build` (which copies public/ -> dist/).
import { readFileSync, writeFileSync, readdirSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const SITE_URL = 'https://chiraghariprasad.qzz.io';
const today = new Date().toISOString().slice(0, 10);

const site = JSON.parse(readFileSync(join(root, 'src/react-app/content/config/site.json'), 'utf8'));
const projectsDir = join(root, 'src/react-app/content/projects');

const navPaths = site.navigation.map(n => n.path);

const projects = readdirSync(projectsDir)
  .filter(f => f.endsWith('.json'))
  .map(f => JSON.parse(readFileSync(join(projectsDir, f), 'utf8')))
  .filter(p => !p.confidential);

const urls = [
  { loc: `${SITE_URL}/`, priority: '1.0', lastmod: today },
  ...navPaths.map(path => ({ loc: `${SITE_URL}${path}`, priority: '0.8', lastmod: today })),
  ...projects.map(p => ({
    loc: `${SITE_URL}/projects/${p.id}`,
    priority: p.featured ? '0.9' : '0.7',
    lastmod: p.completedDate || today,
  })),
];

const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls
  .map(
    u => `  <url>
    <loc>${u.loc}</loc>
    <lastmod>${u.lastmod}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>${u.priority}</priority>
  </url>`
  )
  .join('\n')}
</urlset>
`;

writeFileSync(join(root, 'public/sitemap.xml'), xml);
console.log(`sitemap.xml written with ${urls.length} URLs`);
