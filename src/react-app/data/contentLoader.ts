// ============================================================
// Content Loader - Central Data Access Layer
// Imports all JSON content and provides typed, queryable access.
// Adding a new JSON file here automatically propagates everywhere.
// ============================================================

import type { Project, Patent, Publication, Experience, HeroConfig, SiteConfig, Milestone } from './types';

// ---- Import All Projects ----
import vectorData from '../content/projects/vector.json';
import genesisData from '../content/projects/genesis.json';
import harborData from '../content/projects/harbor.json';
import scaleData from '../content/projects/scale.json';
import ihormsData from '../content/projects/ihorms.json';
import verifaiData from '../content/projects/verifai.json';
import presntaiData from '../content/projects/presntai.json';
import orionData from '../content/projects/orion.json';
import prometheusData from '../content/projects/prometheus.json';
import contextPresentationData from '../content/projects/context-presentation.json';
import pathfindingData from '../content/projects/pathfinding.json';
import iqrsData from '../content/projects/iqrs.json';
import hmsCData from '../content/projects/hms-c.json';
import wantedData from '../content/projects/wanted.json';
import gestureHomeData from '../content/projects/gesture-home.json';
import adaptivePedagogyData from '../content/projects/adaptive-pedagogy.json';
import aeroweightData from '../content/projects/aeroweight.json';
import deepData from '../content/projects/deep.json';
import lifestyleIndexData from '../content/projects/lifestyle-index.json';

// ---- Import Patents ----
import vectorPatentData from '../content/patents/vector-patent.json';
import genesisPatentData from '../content/patents/genesis-patent.json';
import orionPatentData from '../content/patents/orion-patent.json';
import presentationPatentData from '../content/patents/presentation-patent.json';

// ---- Import Publications ----
import scaleIeeeData from '../content/publications/scale-ieee.json';

// ---- Import Experience ----
import iiflData from '../content/experience/iifl-samasta.json';
import globTechData from '../content/experience/glob-tech.json';

// ---- Import Milestones ----
import milestonesData from '../content/milestones/milestones-list.json';

// ---- Import Config ----
import heroConfigData from '../content/config/hero.json';
import siteConfigData from '../content/config/site.json';

// ============================================================
// Cast imported JSON to typed arrays
// ============================================================

const allProjects: Project[] = [
  vectorData,
  genesisData,
  harborData,
  scaleData,
  ihormsData,
  verifaiData,
  presntaiData,
  orionData,
  prometheusData,
  contextPresentationData,
  pathfindingData,
  iqrsData,
  hmsCData,
  wantedData,
  gestureHomeData,
  adaptivePedagogyData,
  aeroweightData,
  deepData,
  lifestyleIndexData,
] as Project[];

const allPatents: Patent[] = [
  vectorPatentData,
  genesisPatentData,
  orionPatentData,
  presentationPatentData,
] as Patent[];

const allPublications: Publication[] = [
  scaleIeeeData,
] as Publication[];

const allExperience: Experience[] = [
  iiflData,
  globTechData,
] as Experience[];

const allMilestones: Milestone[] = milestonesData as Milestone[];

// ============================================================
// Project Queries
// ============================================================

export function getAllProjects(): Project[] {
  return allProjects;
}

export function getProject(id: string): Project | undefined {
  return allProjects.find(p => p.id === id);
}

export function getCompletedProjects(): Project[] {
  return allProjects.filter(p => p.status === 'completed');
}

export function getActiveProjects(): Project[] {
  return allProjects.filter(p => p.status === 'in-progress');
}

export function getPatentedProjects(): Project[] {
  return allProjects.filter(p => p.patent != null);
}

export function getProjectsByCategory(category: string): Project[] {
  return allProjects.filter(p => p.category === category);
}

export function getProjectsByTag(tag: string): Project[] {
  return allProjects.filter(p => p.tags.includes(tag));
}

export function getProjectsByTech(tech: string): Project[] {
  return allProjects.filter(p =>
    p.tech.some(t => t.toLowerCase() === tech.toLowerCase())
  );
}

export function getInternshipProjects(internshipId: string): Project[] {
  return allProjects.filter(p => p.internship === internshipId);
}

export function getNonConfidentialProjects(): Project[] {
  return allProjects.filter(p => !p.confidential);
}

/** Smart Featured Projects Algorithm:
 * Picks top N projects by: featured flag, has patent, has publication, then by date.
 */
export function getFeaturedProjects(count: number = 6): Project[] {
  const scored = allProjects
    .filter(p => !p.confidential)
    .map(p => {
      let score = 0;
      if (p.featured) score += 100;
      if (p.patent) score += 50;
      if (p.publication) score += 40;
      if (p.status === 'completed') score += 10;
      if (p.complexity === 'high') score += 5;
      // Newer projects score higher
      score += (p.year - 2020) * 3;
      if (p.month) score += p.month * 0.2;
      return { project: p, score };
    })
    .sort((a, b) => b.score - a.score);

  return scored.slice(0, count).map(s => s.project);
}

/** Related projects by shared technologies or explicit references */
export function getRelatedProjects(projectId: string, count: number = 4): Project[] {
  const project = getProject(projectId);
  if (!project) return [];

  // Start with explicitly listed related projects
  const explicitIds = new Set(project.relatedProjects || []);

  const scored = allProjects
    .filter(p => p.id !== projectId)
    .map(p => {
      let score = 0;
      if (explicitIds.has(p.id)) score += 100;

      // Shared technologies
      const sharedTech = p.tech.filter(t =>
        project.tech.some(pt => pt.toLowerCase() === t.toLowerCase())
      );
      score += sharedTech.length * 10;

      // Same category
      if (p.category === project.category) score += 5;

      // Shared tags
      const sharedTags = p.tags.filter(t => project.tags.includes(t));
      score += sharedTags.length * 3;

      return { project: p, score };
    })
    .filter(s => s.score > 0)
    .sort((a, b) => b.score - a.score);

  return scored.slice(0, count).map(s => s.project);
}

// ============================================================
// Patent Queries
// ============================================================

export function getAllPatents(): Patent[] {
  return allPatents;
}

export function getPatent(id: string): Patent | undefined {
  return allPatents.find(p => p.id === id);
}

export function getPatentForProject(projectId: string): Patent | undefined {
  return allPatents.find(p => p.projectId === projectId);
}

// ============================================================
// Publication Queries
// ============================================================

export function getAllPublications(): Publication[] {
  return allPublications;
}

export function getPublicationForProject(projectId: string): Publication | undefined {
  return allPublications.find(p => p.projectId === projectId);
}

// ============================================================
// Experience Queries
// ============================================================

export function getAllExperience(): Experience[] {
  return allExperience;
}

export function getExperience(id: string): Experience | undefined {
  return allExperience.find(e => e.id === id);
}

// ============================================================
// Milestone Queries
// ============================================================

export function getAllMilestones(): Milestone[] {
  return allMilestones;
}

// ============================================================
// Technology Queries (Relationship Engine)
// ============================================================

export interface TechUsage {
  name: string;
  projectIds: string[];
  projectCount: number;
  categories: string[];
}

export function getAllTechnologies(): TechUsage[] {
  const techMap = new Map<string, { projectIds: Set<string>; categories: Set<string> }>();

  for (const project of allProjects) {
    for (const tech of project.tech) {
      const key = tech.toLowerCase();
      if (!techMap.has(key)) {
        techMap.set(key, { projectIds: new Set(), categories: new Set() });
      }
      const entry = techMap.get(key)!;
      entry.projectIds.add(project.id);
      entry.categories.add(project.category);
    }
  }

  return Array.from(techMap.entries())
    .map(([, value]) => {
      const firstProject = allProjects.find(p =>
        p.tech.some(t => t.toLowerCase() === Array.from(value.projectIds)[0] ? true : false) // Fallback
      );
      // Find original casing
      let originalName = '';
      for (const pid of value.projectIds) {
        const proj = getProject(pid);
        if (proj) {
          const found = proj.tech.find(t => t.toLowerCase() === Array.from(techMap.keys()).find(k => techMap.get(k) === value));
          if (found) { originalName = found; break; }
        }
      }
      if (!originalName) {
        // Just use the first project's tech name
        const pid = Array.from(value.projectIds)[0];
        const proj = getProject(pid);
        if (proj) {
          originalName = proj.tech.find(t => techMap.has(t.toLowerCase())) || pid;
        }
      }

      return {
        name: originalName,
        projectIds: Array.from(value.projectIds),
        projectCount: value.projectIds.size,
        categories: Array.from(value.categories),
      };
    })
    .sort((a, b) => b.projectCount - a.projectCount);
}

/** Simpler: get unique tech names with counts */
export function getTechWithCounts(): { name: string; count: number }[] {
  const techCount = new Map<string, { name: string; count: number }>();

  for (const project of allProjects) {
    for (const tech of project.tech) {
      const key = tech.toLowerCase();
      if (!techCount.has(key)) {
        techCount.set(key, { name: tech, count: 0 });
      }
      techCount.get(key)!.count++;
    }
  }

  return Array.from(techCount.values()).sort((a, b) => b.count - a.count);
}

// ============================================================
// Config Access
// ============================================================

export function getHeroConfig(): HeroConfig {
  return heroConfigData as HeroConfig;
}

export function getSiteConfig(): SiteConfig {
  return siteConfigData as SiteConfig;
}
