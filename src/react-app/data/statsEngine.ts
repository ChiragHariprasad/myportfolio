// ============================================================
// Stats Engine - Global Statistics Computation
// NOTHING is hardcoded. Everything is computed from data.
// ============================================================

import type { PortfolioStats } from './types';
import {
  getAllProjects,
  getAllPatents,
  getAllPublications,
  getAllExperience,
  getTechWithCounts,
} from './contentLoader';

/** Compute all portfolio statistics from content data */
export function computeStats(): PortfolioStats {
  const projects = getAllProjects();
  const patents = getAllPatents();
  const publications = getAllPublications();
  const experience = getAllExperience();
  const techList = getTechWithCounts();

  // Category distribution
  const categories: Record<string, number> = {};
  for (const p of projects) {
    categories[p.category] = (categories[p.category] || 0) + 1;
  }

  // Unique domains
  const domains = new Set<string>();
  for (const p of projects) {
    // Split domain string on | and trim
    const parts = p.domain.split('|').map(d => d.trim());
    parts.forEach(d => domains.add(d));
  }

  // Years coding: from earliest project year to now
  const earliestYear = Math.min(...projects.map(p => p.year));
  const currentYear = new Date().getFullYear();
  const yearsCoding = currentYear - earliestYear + 1;

  // Internships count
  const internships = experience.filter(e => e.type === 'internship').length;

  return {
    totalProjects: projects.length,
    completedProjects: projects.filter(p => p.status === 'completed').length,
    activeProjects: projects.filter(p => p.status === 'in-progress').length,
    totalPatents: patents.length,
    totalPublications: publications.filter(p => p.status === 'published').length,
    totalTechnologies: techList.length,
    totalDomains: domains.size,
    yearsCoding,
    featuredCount: projects.filter(p => p.featured).length,
    internships,
    categories,
    topTechnologies: techList.slice(0, 15),
  };
}

/** Get the dominant category - for adaptive hero */
export function getDominantCategory(): { category: string; percentage: number } {
  const projects = getAllProjects();
  const categories: Record<string, number> = {};

  for (const p of projects) {
    categories[p.category] = (categories[p.category] || 0) + 1;
  }

  let maxCat = '';
  let maxCount = 0;
  for (const [cat, count] of Object.entries(categories)) {
    if (count > maxCount) {
      maxCat = cat;
      maxCount = count;
    }
  }

  return {
    category: maxCat,
    percentage: Math.round((maxCount / projects.length) * 100),
  };
}

/** Get a human-readable stats summary string */
export function getStatsSummary(): string {
  const stats = computeStats();
  const parts: string[] = [];
  parts.push(`${stats.totalProjects} Projects`);
  parts.push(`${stats.totalPatents} Patents`);
  if (stats.totalPublications > 0) {
    parts.push(`${stats.totalPublications} IEEE Publication${stats.totalPublications > 1 ? 's' : ''}`);
  }
  return parts.join(' · ');
}
