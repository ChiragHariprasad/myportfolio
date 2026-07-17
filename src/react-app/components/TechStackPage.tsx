import React, { useState, useMemo } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { getTechWithCounts, getProjectsByTech } from '../data/contentLoader';

const TechStackPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const selectedTech = searchParams.get('tech');
  const [filter, setFilter] = useState('');

  const techList = useMemo(() => getTechWithCounts(), []);

  const filteredTech = useMemo(() => {
    if (!filter) return techList;
    return techList.filter(t => t.name.toLowerCase().includes(filter.toLowerCase()));
  }, [techList, filter]);

  const selectedProjects = useMemo(() => {
    if (!selectedTech) return [];
    return getProjectsByTech(selectedTech);
  }, [selectedTech]);

  const maxCount = techList.length > 0 ? techList[0].count : 1;

  return (
    <div className="section-container">
      <motion.div className="section-header"
        initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <span className="section-tag">Technology Map</span>
        <h2 className="section-title">Tech Stack</h2>
        <p className="section-subtitle">
          {techList.length} unique technologies across all projects. Click any technology to explore.
        </p>
      </motion.div>

      <motion.div className="techstack-search"
        initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.4 }}
      >
        <input
          type="text"
          value={filter}
          onChange={e => setFilter(e.target.value)}
          placeholder="Filter technologies..."
          className="techstack-filter-input"
        />
      </motion.div>

      <div className="techstack-layout">
        <motion.div className="techstack-grid"
          initial={{ opacity: 0 }} animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.5 }}
        >
          {filteredTech.map((tech, i) => (
            <Link
              key={tech.name}
              to={`/techstack?tech=${encodeURIComponent(tech.name)}`}
              className={`techstack-pill ${selectedTech === tech.name ? 'active' : ''}`}
            >
              <span className="techstack-pill-name">{tech.name}</span>
              <span className="techstack-pill-count">{tech.count}</span>
              <div
                className="techstack-pill-bar"
                style={{ width: `${(tech.count / maxCount) * 100}%` }}
              />
            </Link>
          ))}
        </motion.div>

        {selectedTech && selectedProjects.length > 0 && (
          <motion.div className="techstack-detail"
            initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4 }}
            key={selectedTech}
          >
            <h3 className="techstack-detail-title">{selectedTech}</h3>
            <p className="techstack-detail-count">
              Used in {selectedProjects.length} project{selectedProjects.length > 1 ? 's' : ''}
            </p>

            <div className="techstack-projects-list">
              {selectedProjects.map(p => (
                <Link key={p.id} to={`/projects/${p.id}`} className="techstack-project-card">
                  <h4>{p.title}</h4>
                  <p>{p.description}</p>
                  <span className="techstack-project-year">{p.year}</span>
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default TechStackPage;
