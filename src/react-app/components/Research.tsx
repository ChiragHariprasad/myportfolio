import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { BookOpen, ExternalLink, ArrowRight } from 'lucide-react';
import { getAllPublications, getProjectsByTag } from '../data/contentLoader';
import '../styles/portfolio.css';

const Research: React.FC = () => {
  const publications = getAllPublications();
  const researchProjects = getProjectsByTag('research').concat(
    getProjectsByTag('causal-inference')
  );
  // Deduplicate
  const seen = new Set<string>();
  const uniqueResearchProjects = researchProjects.filter(p => {
    if (seen.has(p.id)) return false;
    seen.add(p.id);
    return true;
  });

  return (
    <section className="section-container" id="research">
      <motion.div className="section-header"
        initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <span className="section-tag">Academic</span>
        <h2 className="section-title">Research & Publications</h2>
        <p className="section-subtitle">
          Peer-reviewed research and research-grade projects.
        </p>
      </motion.div>

      {/* Publications */}
      {publications.length > 0 && (
        <div style={{ marginBottom: '3rem' }}>
          <h3 style={{
            fontSize: '1.1rem', fontWeight: 700, color: 'var(--text-primary)',
            marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem',
          }}>
            <BookOpen size={18} style={{ color: 'var(--accent)' }} /> Peer-Reviewed Publications
          </h3>
          {publications.map((pub, idx) => (
            <motion.div key={pub.id}
              className="patent-card"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1, duration: 0.5 }}
              style={{ marginBottom: '1rem' }}
            >
              <div className="patent-badge-side">
                <span className="badge badge-publication">
                  <BookOpen size={12} /> {pub.journal}
                </span>
                <div className="patent-number">Published {pub.publishedDate}</div>
              </div>

              <h3 className="patent-title">{pub.title}</h3>

              <p className="patent-abstract-text" style={{ marginBottom: '1rem' }}>
                {pub.abstract}
              </p>

              <div style={{ display: 'flex', gap: '1rem', alignItems: 'center', flexWrap: 'wrap' }}>
                <a href={pub.doiUrl} target="_blank" rel="noopener noreferrer" className="doi-link">
                  <ExternalLink size={14} /> DOI: {pub.doi}
                </a>
                <Link to={`/projects/${pub.projectId}`} className="patent-link-btn">
                  View Project <ArrowRight size={12} />
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      )}

      {/* Research Projects */}
      {uniqueResearchProjects.length > 0 && (
        <div>
          <h3 style={{
            fontSize: '1.1rem', fontWeight: 700, color: 'var(--text-primary)',
            marginBottom: '1.5rem',
          }}>
            Research-Grade Projects
          </h3>
          <div className="project-related-grid">
            {uniqueResearchProjects.map(p => (
              <Link key={p.id} to={`/projects/${p.id}`} className="project-related-card">
                <h4>{p.title}</h4>
                <p>{p.description}</p>
                <div className="project-related-tech">
                  {p.tech.slice(0, 4).map((t, i) => (
                    <span key={i} className="mini-tech-pill">{t}</span>
                  ))}
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}
    </section>
  );
};

export default Research;
