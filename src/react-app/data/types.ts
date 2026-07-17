// ============================================================
// Portfolio OS — Core Type Definitions
// All content is typed and driven by JSON data files.
// ============================================================

// ---- Project ----

export type ProjectStatus = 'completed' | 'active' | 'in-progress' | 'patented';
export type ProjectCategory = 'ai' | 'backend' | 'research' | 'open-source' | 'systems' | 'iot';

export interface ProjectPatentRef {
  applicationNo?: string;
  filedDate?: string;
  publishedDate: string;
}

export interface ProjectPublicationRef {
  journal: string;
  doi: string;
  publishedDate: string;
  title: string;
}

export interface ProjectMetrics {
  [key: string]: string;
}

export interface ProjectFeature {
  label: string;
  description: string;
}

export interface ProjectAlgorithm {
  name: string;
  description: string;
}

export interface ProjectModule {
  name: string;
  responsibility: string;
}

export interface Project {
  id: string;
  title: string;
  fullTitle: string;
  domain: string;
  status: ProjectStatus;
  category: ProjectCategory;
  year: number;
  month?: number;
  completedDate?: string;
  description: string;
  overview: string;
  features: ProjectFeature[];
  tech: string[];
  techStack?: Record<string, Record<string, string>>;
  algorithms: ProjectAlgorithm[];
  modules: ProjectModule[];
  results: string[];
  patent?: ProjectPatentRef | null;
  publication?: ProjectPublicationRef | null;
  github?: string | null;
  metrics?: ProjectMetrics;
  featured: boolean;
  tags: string[];
  complexity: 'low' | 'medium' | 'high';
  internship?: string | null;
  relatedProjects?: string[];
  confidential?: boolean;
}

// ---- Patent ----

export interface Patent {
  id: string;
  title: string;
  fullTitle: string;
  applicationNo?: string;
  filedDate?: string;
  publishedDate: string;
  domain: string;
  projectId: string;
  role: string;
  abstract: string;
  claims: string[];
}

// ---- Publication ----

export interface Publication {
  id: string;
  title: string;
  journal: string;
  doi: string;
  doiUrl: string;
  publishedDate: string;
  projectId: string;
  authors: string[];
  abstract: string;
  status: 'published' | 'accepted' | 'submitted';
}

// ---- Experience ----

export type ExperienceType = 'internship' | 'job' | 'education' | 'leadership';

export interface Experience {
  id: string;
  organization: string;
  role: string;
  type: ExperienceType;
  startDate: string;
  endDate?: string;
  location?: string;
  description: string;
  projects: string[];
  technologies: string[];
  achievements: string[];
}

// ---- Timeline ----

export interface TimelineEvent {
  id: string;
  date: string;
  year: number;
  month: number;
  title: string;
  description: string;
  type: 'project' | 'patent' | 'publication' | 'experience' | 'education' | 'milestone';
  projectId?: string;
  icon?: string;
}

// ---- Tech Stack ----

export interface TechStackItem {
  name: string;
  category: string;
  projectIds: string[];
  projectCount: number;
  firstUsed: number;
  lastUsed: number;
  yearsUsed: number;
}

// ---- Hero Config ----

export interface HeroConfig {
  name: string;
  taglines: string[];
  focusAreas: string[];
  subtitleTemplate: string;
  socials: {
    linkedin: string;
    github: string;
    email: string;
    website?: string;
  };
  resumePath: string;
}

// ---- Site Config ----

export interface ThemeDefinition {
  id: string;
  name: string;
  colors: Record<string, string>;
}

export interface NavItem {
  id: string;
  label: string;
  path: string;
  number: string;
}

export interface SiteConfig {
  title: string;
  description: string;
  author: string;
  navigation: NavItem[];
  themes: ThemeDefinition[];
  defaultTheme: string;
}

// ---- Search ----

export interface SearchItem {
  id: string;
  title: string;
  subtitle: string;
  type: 'project' | 'patent' | 'publication' | 'page' | 'action';
  path: string;
  keywords: string[];
}

// ---- Stats ----

export interface PortfolioStats {
  totalProjects: number;
  completedProjects: number;
  activeProjects: number;
  totalPatents: number;
  totalPublications: number;
  totalTechnologies: number;
  totalDomains: number;
  yearsCoding: number;
  featuredCount: number;
  internships: number;
  categories: Record<string, number>;
  topTechnologies: { name: string; count: number }[];
}
