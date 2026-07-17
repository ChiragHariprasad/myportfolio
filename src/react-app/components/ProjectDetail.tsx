 import React from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, ExternalLink, FileCheck, BookOpen, Cpu, Layers, Target, GitBranch, Lock } from 'lucide-react';
import { getProject, getRelatedProjects, getPatentForProject, getPublicationForProject } from '../data/contentLoader';

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1, y: 0,
    transition: { delay: i * 0.08, duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] },
  }),
};

const ProjectDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const project = getProject(id || '');

  if (!project) {
    return (
      <div className="section-container" style={{ textAlign: 'center', paddingTop: '8rem' }}>
        <h2 style={{ color: 'var(--text-primary)', marginBottom: '1rem' }}>Project Not Found</h2>
        <button onClick={() => navigate('/projects')} className="btn-primary">
          <ArrowLeft size={16} /> Back to Projects
        </button>
      </div>
    );
  }

  const patent = getPatentForProject(project.id);
  const publication = getPublicationForProject(project.id);
  const related = getRelatedProjects(project.id, 4);

  return (
    <div className="project-detail">
      {/* Hero Section */}
      <motion.section className="project-detail-hero" initial="hidden" animate="visible">
        <motion.button
          onClick={() => navigate('/projects')}
          className="project-detail-back"
          variants={fadeUp} custom={0}
        >
          <ArrowLeft size={16} /> All Projects
        </motion.button>

        <motion.div className="project-detail-badges" variants={fadeUp} custom={1}>
          {project.patent && (
            <span className="badge badge-patent"><FileCheck size={12} /> Patent Published</span>
          )}
          {project.publication && (
            <span className="badge badge-publication"><BookOpen size={12} /> {project.publication.journal}</span>
          )}
          {project.status === 'in-progress' && (
            <span className="badge badge-active">In Progress</span>
          )}
          {project.confidential && (
            <span className="badge badge-confidential"><Lock size={12} /> Confidential</span>
          )}
          {project.internship && (
            <span className="badge badge-internship">Built at IIFL Samasta</span>
          )}
        </motion.div>

        <motion.h1 className="project-detail-title" variants={fadeUp} custom={2}>
          {project.title}
        </motion.h1>

        <motion.p className="project-detail-full-title" variants={fadeUp} custom={3}>
          {project.fullTitle}
        </motion.p>

        <motion.p className="project-detail-domain" variants={fadeUp} custom={4}>
          {project.domain}
        </motion.p>

        <motion.div className="project-detail-stats-row" variants={fadeUp} custom={5}>
          <span>{project.tech.length} Technologies</span>
          <span className="stat-dot">·</span>
          <span>{project.features.length} Key Features</span>
          <span className="stat-dot">·</span>
          <span>{project.year}</span>
          {project.complexity && (
            <>
              <span className="stat-dot">·</span>
              <span className={`complexity-tag complexity-${project.complexity}`}>{project.complexity} complexity</span>
            </>
          )}
        </motion.div>
      </motion.section>

      {/* Overview */}
      <motion.section className="project-detail-section"
        initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }} transition={{ duration: 0.5 }}
      >
        <h2 className="project-section-title"><Target size={20} /> Overview</h2>
        <p className="project-overview-text">{project.overview}</p>
      </motion.section>

      {/* Features */}
      {project.features.length > 0 && (
        <motion.section className="project-detail-section"
          initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ duration: 0.5 }}
        >
          <h2 className="project-section-title"><Layers size={20} /> Key Features</h2>
          <div className="project-features-grid">
            {project.features.map((f, i) => (
              <motion.div key={i} className="project-feature-card"
                initial={{ opacity: 0, y: 15 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }} transition={{ delay: i * 0.05, duration: 0.4 }}
              >
                <h3>{f.label}</h3>
                <p>{f.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.section>
      )}

      {/* Tech Stack */}
      <motion.section className="project-detail-section"
        initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }} transition={{ duration: 0.5 }}
      >
        <h2 className="project-section-title"><Cpu size={20} /> Technology Stack</h2>
        <div className="project-tech-pills">
          {project.tech.map((t, i) => (
            <Link key={i} to={`/techstack?tech=${encodeURIComponent(t)}`} className="tech-pill-link">
              {t}
            </Link>
          ))}
        </div>
      </motion.section>

      {/* Algorithms */}
      {project.algorithms.length > 0 && (
        <motion.section className="project-detail-section"
          initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ duration: 0.5 }}
        >
          <h2 className="project-section-title"><GitBranch size={20} /> Algorithms & Methods</h2>
          <div className="project-algorithms-list">
            {project.algorithms.map((a, i) => (
              <div key={i} className="project-algorithm-item">
                <h3>{a.name}</h3>
                <p>{a.description}</p>
              </div>
            ))}
          </div>
        </motion.section>
      )}

      {/* Modules */}
      {project.modules.length > 0 && (
        <motion.section className="project-detail-section"
          initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ duration: 0.5 }}
        >
          <h2 className="project-section-title"><Layers size={20} /> System Architecture</h2>
          <div className="project-modules-grid">
            {project.modules.map((m, i) => (
              <div key={i} className="project-module-card">
                <h4>{m.name}</h4>
                <p>{m.responsibility}</p>
              </div>
            ))}
          </div>
        </motion.section>
      )}

      {/* Results */}
      {project.results.length > 0 && (
        <motion.section className="project-detail-section"
          initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ duration: 0.5 }}
        >
          <h2 className="project-section-title"><Target size={20} /> Results & Outcomes</h2>
          <ul className="project-results-list">
            {project.results.map((r, i) => (
              <li key={i}>{r}</li>
            ))}
          </ul>
        </motion.section>
      )}

      {/* Patent */}
      {patent && (
        <motion.section className="project-detail-section"
          initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ duration: 0.5 }}
        >
          <h2 className="project-section-title"><FileCheck size={20} /> Patent</h2>
          <div className="project-patent-card">
            <h3>{patent.fullTitle}</h3>
            {patent.applicationNo && <p><strong>Application No:</strong> {patent.applicationNo}</p>}
            <p><strong>Published:</strong> {patent.publishedDate}</p>
            <p><strong>Role:</strong> {patent.role}</p>
            <p className="patent-abstract">{patent.abstract}</p>
          </div>
        </motion.section>
      )}

      {/* Publication */}
      {publication && (
        <motion.section className="project-detail-section"
          initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ duration: 0.5 }}
        >
          <h2 className="project-section-title"><BookOpen size={20} /> Publication</h2>
          <div className="project-publication-card">
            <h3>{publication.title}</h3>
            <p><strong>Journal:</strong> {publication.journal}</p>
            <a href={publication.doiUrl} target="_blank" rel="noopener noreferrer" className="doi-link">
              <ExternalLink size={14} /> DOI: {publication.doi}
            </a>
          </div>
        </motion.section>
      )}

      {/* Related Projects */}
      {related.length > 0 && (
        <motion.section className="project-detail-section"
          initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ duration: 0.5 }}
        >
          <h2 className="project-section-title">Related Projects</h2>
          <div className="project-related-grid">
            {related.map(rp => (
              <Link key={rp.id} to={`/projects/${rp.id}`} className="project-related-card">
                <h4>{rp.title}</h4>
                <p>{rp.description}</p>
                <div className="project-related-tech">
                  {rp.tech.slice(0, 4).map((t, i) => (
                    <span key={i} className="mini-tech-pill">{t}</span>
                  ))}
                </div>
              </Link>
            ))}
          </div>
        </motion.section>
      )}
    </div>
  );
};

export default ProjectDetail;
