import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FileCheck, BookOpen, ArrowRight, Lock } from 'lucide-react';
import { getAllProjects, getFeaturedProjects, getNonConfidentialProjects } from '../data/contentLoader';
import type { Project, ProjectCategory } from '../data/types';
import '../styles/portfolio.css';

const CATEGORY_LABELS: Record<string, string> = {
  all: 'All',
  ai: 'AI / ML',
  backend: 'Backend',
  research: 'Research',
  systems: 'Systems',
  iot: 'IoT',
};

const Projects: React.FC = () => {
  const [activeFilter, setActiveFilter] = useState<string>('all');

  const allProjects = useMemo(() => getNonConfidentialProjects(), []);
  const featured = useMemo(() => getFeaturedProjects(6), []);

  // Get category counts for filter buttons
  const categories = useMemo(() => {
    const counts: Record<string, number> = { all: allProjects.length };
    for (const p of allProjects) {
      counts[p.category] = (counts[p.category] || 0) + 1;
    }
    return counts;
  }, [allProjects]);

  // Filter projects
  const displayedProjects = useMemo(() => {
    const source = activeFilter === 'all' ? allProjects : allProjects.filter(p => p.category === activeFilter);
    return source.sort((a, b) => {
      // Featured first, then by date
      if (a.featured !== b.featured) return a.featured ? -1 : 1;
      if (a.year !== b.year) return b.year - a.year;
      return (b.month || 0) - (a.month || 0);
    });
  }, [allProjects, activeFilter]);

  return (
    <section className="section-container" id="projects">
      <motion.div className="section-header"
        initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <span className="section-tag">Work</span>
        <h2 className="section-title">Projects</h2>
        <p className="section-subtitle">
          {allProjects.length} projects spanning AI/ML, backend systems, research, and IoT.
          Each project links to a detailed microsite.
        </p>
      </motion.div>

      {/* Filter Bar */}
      <motion.div className="projects-filter-bar"
        initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.4 }}
      >
        {Object.entries(CATEGORY_LABELS).map(([key, label]) => {
          if (key !== 'all' && !categories[key]) return null;
          return (
            <button
              key={key}
              className={`filter-btn ${activeFilter === key ? 'active' : ''}`}
              onClick={() => setActiveFilter(key)}
            >
              {label}
              <span style={{ marginLeft: '0.4rem', opacity: 0.6 }}>
                {categories[key] || 0}
              </span>
            </button>
          );
        })}
      </motion.div>

      {/* Projects Grid */}
      <motion.div className="projects-grid"
        initial={{ opacity: 0 }} animate={{ opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.5 }}
      >
        {displayedProjects.map((project, index) => (
          <motion.div
            key={project.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05, duration: 0.4 }}
          >
            <Link to={`/projects/${project.id}`} className="project-card">
              <div className="project-card-header">
                <div className="project-card-badges" style={{ display: 'flex', gap: '0.35rem' }}>
                  {project.patent && (
                    <span className="badge badge-patent"><FileCheck size={10} /> Patent</span>
                  )}
                  {project.publication && (
                    <span className="badge badge-publication"><BookOpen size={10} /> {project.publication.journal}</span>
                  )}
                  {project.status === 'in-progress' && (
                    <span className="badge badge-active">Active</span>
                  )}
                  {project.internship && (
                    <span className="badge badge-internship">Internship</span>
                  )}
                </div>
                <span className="project-card-number">{project.year}</span>
              </div>

              <h3 className="project-card-title">{project.title}</h3>
              <p className="project-card-desc">{project.description}</p>

              <div className="project-card-tech">
                {project.tech.slice(0, 5).map((t, i) => (
                  <span key={i} className="mini-tech-pill">{t}</span>
                ))}
                {project.tech.length > 5 && (
                  <span className="mini-tech-pill">+{project.tech.length - 5}</span>
                )}
              </div>

              <div className="project-card-footer">
                <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>
                  {project.domain.split('|')[0].trim()}
                </span>
                <ArrowRight size={14} style={{ color: 'var(--accent)' }} />
              </div>
            </Link>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
};

export default Projects;