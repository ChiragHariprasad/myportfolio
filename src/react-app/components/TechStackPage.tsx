import React, { useState, useMemo } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, ArrowRight, X, Layers } from 'lucide-react';
import { getTechWithCounts, getProjectsByTech } from '../data/contentLoader';
import '../styles/portfolio.css';

/** Categorize technologies into groups for visual organization */
const TECH_GROUPS: Record<string, { label: string; keywords: string[] }> = {
  languages: {
    label: 'Languages',
    keywords: ['python', 'javascript', 'typescript', 'c', 'c++', 'java', 'rust', 'go', 'sql', 'html', 'css', 'bash'],
  },
  frameworks: {
    label: 'Frameworks & Libraries',
    keywords: ['react', 'next.js', 'fastapi', 'flask', 'django', 'express', 'node.js', 'vite', 'tailwind', 'framer motion'],
  },
  ai: {
    label: 'AI / ML',
    keywords: ['pytorch', 'tensorflow', 'scikit-learn', 'xgboost', 'keras', 'hugging face', 'ollama', 'gemini', 'langchain', 'openai', 'whisper', 'faster-whisper', 'speechbrain', 'pyannote', 'umap', 'hdbscan', 'isolation forest', 'causal inference', 'bayesian', 'monte carlo', 'reinforcement learning', 'agent-based', 'system dynamics'],
  },
  data: {
    label: 'Data & Databases',
    keywords: ['postgresql', 'mongodb', 'redis', 'supabase', 'firebase', 'sqlite', 'neo4j', 'json', 'csv', 'pandas', 'numpy', 'polars'],
  },
  infrastructure: {
    label: 'Infrastructure & Cloud',
    keywords: ['docker', 'aws', 'gcp', 'azure', 'cloudflare', 'lambda', 'sqs', 'kafka', 'kubernetes', 'nginx', 'github actions', 'ci/cd', 'vercel'],
  },
  tools: {
    label: 'Tools & Platforms',
    keywords: ['git', 'linux', 'figma', 'postman', 'jupyter', 'vs code', 'raspberry pi', 'arduino', 'esp32', 'mqtt'],
  },
};

function categorizeTech(name: string): string {
  const lower = name.toLowerCase();
  for (const [groupId, group] of Object.entries(TECH_GROUPS)) {
    if (group.keywords.some(k => lower.includes(k) || k.includes(lower))) {
      return groupId;
    }
  }
  return 'tools'; // default
}

const TechStackPage: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const selectedTech = searchParams.get('tech');
  const [filter, setFilter] = useState('');
  const [activeGroup, setActiveGroup] = useState<string | null>(null);

  const techList = useMemo(() => getTechWithCounts(), []);
  const maxCount = techList.length > 0 ? techList[0].count : 1;

  // Group technologies
  const groupedTech = useMemo(() => {
    const groups: Record<string, typeof techList> = {};
    for (const tech of techList) {
      const group = categorizeTech(tech.name);
      if (!groups[group]) groups[group] = [];
      groups[group].push(tech);
    }
    return groups;
  }, [techList]);

  // Filtered tech
  const filteredTech = useMemo(() => {
    let techs = techList;
    if (filter) {
      techs = techs.filter(t => t.name.toLowerCase().includes(filter.toLowerCase()));
    }
    if (activeGroup) {
      techs = techs.filter(t => categorizeTech(t.name) === activeGroup);
    }
    return techs;
  }, [techList, filter, activeGroup]);

  // Selected tech projects
  const selectedProjects = useMemo(() => {
    if (!selectedTech) return [];
    return getProjectsByTech(selectedTech);
  }, [selectedTech]);

  const selectTech = (name: string) => {
    setSearchParams({ tech: name });
  };

  const clearSelection = () => {
    setSearchParams({});
  };

  return (
    <div className="section-container">
      {/* Header */}
      <motion.div className="section-header"
        initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <span className="section-tag">Technology Map</span>
        <h2 className="section-title">Tech Stack</h2>
        <p className="section-subtitle">
          {techList.length} technologies across {Object.keys(groupedTech).length} categories.
          Every technology links to the projects it powers.
        </p>
      </motion.div>

      {/* Stats Bar */}
      <motion.div className="ts-stats-bar"
        initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.15, duration: 0.4 }}
      >
        <div className="ts-stat-item">
          <strong>{techList.length}</strong>
          <span>Unique Technologies</span>
        </div>
        <div className="ts-stat-item">
          <strong>{Object.keys(groupedTech).length}</strong>
          <span>Categories</span>
        </div>
        <div className="ts-stat-item">
          <strong>{techList[0]?.name || '—'}</strong>
          <span>Most Used ({techList[0]?.count || 0} projects)</span>
        </div>
      </motion.div>

      {/* Search + Group Filter */}
      <motion.div className="ts-controls"
        initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.25, duration: 0.4 }}
      >
        <div className="ts-search-wrapper">
          <Search size={16} className="ts-search-icon" />
          <input
            type="text"
            value={filter}
            onChange={e => setFilter(e.target.value)}
            placeholder="Search technologies..."
            className="ts-search-input"
          />
          {filter && (
            <button className="ts-search-clear" onClick={() => setFilter('')}>
              <X size={14} />
            </button>
          )}
        </div>

        <div className="ts-group-filters">
          <button
            className={`ts-group-btn ${!activeGroup ? 'active' : ''}`}
            onClick={() => setActiveGroup(null)}
          >
            All
          </button>
          {Object.entries(TECH_GROUPS).map(([id, group]) => (
            groupedTech[id] && (
              <button
                key={id}
                className={`ts-group-btn ${activeGroup === id ? 'active' : ''}`}
                onClick={() => setActiveGroup(activeGroup === id ? null : id)}
              >
                {group.label}
                <span className="ts-group-count">{groupedTech[id]?.length || 0}</span>
              </button>
            )
          ))}
        </div>
      </motion.div>

      {/* Main Content */}
      <div className="ts-main-layout">
        {/* Tech Grid — Bento-style cards */}
        <motion.div className="ts-bento-grid"
          initial={{ opacity: 0 }} animate={{ opacity: 1 }}
          transition={{ delay: 0.35, duration: 0.5 }}
        >
          {activeGroup ? (
            // Single group view
            <div className="ts-group-section">
              <div className="ts-tech-tiles">
                {filteredTech.map((tech, i) => (
                  <motion.button
                    key={tech.name}
                    className={`ts-tech-tile ${selectedTech === tech.name ? 'active' : ''}`}
                    onClick={() => selectTech(tech.name)}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: i * 0.02, duration: 0.3 }}
                    whileHover={{ scale: 1.03, y: -2 }}
                    whileTap={{ scale: 0.97 }}
                  >
                    <div className="ts-tile-bar" style={{ width: `${(tech.count / maxCount) * 100}%` }} />
                    <span className="ts-tile-name">{tech.name}</span>
                    <span className="ts-tile-count">{tech.count}</span>
                  </motion.button>
                ))}
              </div>
            </div>
          ) : (
            // Grouped view
            Object.entries(TECH_GROUPS).map(([groupId, group]) => {
              const techs = (groupedTech[groupId] || []).filter(t =>
                !filter || t.name.toLowerCase().includes(filter.toLowerCase())
              );
              if (techs.length === 0) return null;

              return (
                <div key={groupId} className="ts-group-section">
                  <div className="ts-group-header">
                    <Layers size={14} />
                    <h3>{group.label}</h3>
                    <span className="ts-group-header-count">{techs.length}</span>
                  </div>
                  <div className="ts-tech-tiles">
                    {techs.map((tech, i) => (
                      <motion.button
                        key={tech.name}
                        className={`ts-tech-tile ${selectedTech === tech.name ? 'active' : ''}`}
                        onClick={() => selectTech(tech.name)}
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: i * 0.02, duration: 0.3 }}
                        whileHover={{ scale: 1.04, y: -3 }}
                        whileTap={{ scale: 0.97 }}
                      >
                        <div className="ts-tile-bar" style={{ width: `${(tech.count / maxCount) * 100}%` }} />
                        <span className="ts-tile-name">{tech.name}</span>
                        <span className="ts-tile-count">{tech.count}</span>
                      </motion.button>
                    ))}
                  </div>
                </div>
              );
            })
          )}
        </motion.div>

        {/* Detail Panel — shows on tech selection */}
        <AnimatePresence>
          {selectedTech && selectedProjects.length > 0 && (
            <motion.div
              className="ts-detail-panel"
              initial={{ opacity: 0, x: 30, scale: 0.95 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, x: 30, scale: 0.95 }}
              transition={{ duration: 0.35, ease: [0.25, 0.46, 0.45, 0.94] }}
              key={selectedTech}
            >
              <div className="ts-detail-header">
                <div>
                  <h3 className="ts-detail-title">{selectedTech}</h3>
                  <p className="ts-detail-count">
                    Powering {selectedProjects.length} project{selectedProjects.length > 1 ? 's' : ''}
                  </p>
                </div>
                <button className="ts-detail-close" onClick={clearSelection}>
                  <X size={16} />
                </button>
              </div>

              {/* Usage bar */}
              <div className="ts-detail-usage">
                <div className="ts-detail-usage-label">
                  Usage intensity
                </div>
                <div className="ts-detail-usage-bar-track">
                  <motion.div
                    className="ts-detail-usage-bar-fill"
                    initial={{ width: 0 }}
                    animate={{ width: `${(selectedProjects.length / maxCount) * 100}%` }}
                    transition={{ delay: 0.2, duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
                  />
                </div>
              </div>

              {/* Projects list */}
              <div className="ts-detail-projects">
                {selectedProjects.map((p, i) => (
                  <motion.div
                    key={p.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 + i * 0.06, duration: 0.3 }}
                  >
                    <Link to={`/projects/${p.id}`} className="ts-detail-project-card">
                      <div className="ts-detail-project-info">
                        <h4>{p.title}</h4>
                        <p>{p.description}</p>
                      </div>
                      <div className="ts-detail-project-footer">
                        <span className="ts-detail-project-year">{p.year}</span>
                        <ArrowRight size={14} />
                      </div>
                    </Link>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Bottom: Full tech spectrum visualization */}
      <motion.div className="ts-spectrum"
        initial={{ opacity: 0 }} whileInView={{ opacity: 1 }}
        viewport={{ once: true }} transition={{ delay: 0.2, duration: 0.6 }}
      >
        <h3 className="ts-spectrum-title">Technology Spectrum</h3>
        <div className="ts-spectrum-bar">
          {techList.slice(0, 30).map((tech, i) => (
            <motion.div
              key={tech.name}
              className={`ts-spectrum-segment ${selectedTech === tech.name ? 'active' : ''}`}
              style={{
                flex: tech.count,
                opacity: 0.4 + (tech.count / maxCount) * 0.6,
              }}
              onClick={() => selectTech(tech.name)}
              whileHover={{ opacity: 1, scaleY: 1.5 }}
              title={`${tech.name} (${tech.count})`}
            />
          ))}
        </div>
        <div className="ts-spectrum-labels">
          <span>Most Used</span>
          <span>Specialized</span>
        </div>
      </motion.div>
    </div>
  );
};

export default TechStackPage;
