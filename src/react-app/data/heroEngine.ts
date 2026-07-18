// ============================================================
// Hero Engine - Adaptive hero logic
// Rotating taglines, adaptive title, auto-detected focus areas.
// ============================================================

import { getHeroConfig } from './contentLoader';
import { computeStats, getDominantCategory, getStatsSummary } from './statsEngine';

const CATEGORY_TITLES: Record<string, string> = {
  ai: 'AI Engineer',
  backend: 'Backend Engineer',
  research: 'Research Engineer',
  systems: 'Systems Engineer',
  'open-source': 'Open Source Engineer',
  iot: 'IoT Engineer',
};

/**
 * Get a random tagline from the configured set.
 * Changes every page refresh as specified.
 */
export function getRandomTagline(): string {
  const config = getHeroConfig();
  const index = Math.floor(Math.random() * config.taglines.length);
  return config.taglines[index];
}

/**
 * Adaptive title: if 70%+ of projects are one category, adapt title.
 * Otherwise use default "AI/ML Systems Engineer".
 */
export function getAdaptiveTitle(): string {
  const { category, percentage } = getDominantCategory();

  if (percentage >= 70 && CATEGORY_TITLES[category]) {
    return CATEGORY_TITLES[category];
  }

  // Default titles based on dominant but not overwhelming category
  if (percentage >= 50 && category === 'ai') {
    return 'AI/ML Systems Engineer';
  }

  return 'AI/ML Systems Engineer';
}

/**
 * Get title pills (roles) - adaptive based on work distribution.
 */
export function getAdaptivePills(): string[] {
  const stats = computeStats();
  const pills: string[] = [];

  if (stats.totalPatents > 0) pills.push('Inventor');
  pills.push('AI/ML Systems Engineer');

  if (stats.categories['backend'] && stats.categories['backend'] >= 2) {
    pills.push('Full-Stack Engineer');
  }
  if (stats.categories['research'] && stats.categories['research'] >= 1) {
    pills.push('Research Engineer');
  }

  return pills.slice(0, 3); // Max 3 pills
}

/**
 * Auto-generate focus areas from the latest projects' domains.
 */
export function getCurrentFocusAreas(): string[] {
  const config = getHeroConfig();
  return config.focusAreas;
}

/**
 * Get the hero subtitle with auto-computed stats.
 */
export function getHeroSubtitle(): string {
  return getStatsSummary();
}
