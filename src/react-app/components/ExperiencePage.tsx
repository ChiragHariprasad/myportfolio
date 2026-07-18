import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Briefcase, Calendar, MapPin, ArrowRight } from 'lucide-react';
import { getAllExperience, getInternshipProjects } from '../data/contentLoader';

const ExperiencePage: React.FC = () => {
  const experiences = getAllExperience();

  return (
    <div className="section-container">
      <motion.div className="section-header"
        initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <span className="section-tag">Career</span>
        <h2 className="section-title">Experience</h2>
        <p className="section-subtitle">
          Professional experience and internships with linked project deliverables.
        </p>
      </motion.div>

      <div className="experience-timeline">
        {experiences.map((exp, idx) => {
          const projects = getInternshipProjects(exp.id);

          return (
            <motion.div key={exp.id} className="experience-card"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.15, duration: 0.5 }}
            >
              <div className="experience-header">
                <div className="experience-icon">
                  <Briefcase size={24} />
                </div>
                <div className="experience-meta">
                  <h3 className="experience-company">{exp.organization}</h3>
                  <p className="experience-role">{exp.role}</p>
                  <div className="experience-details">
                    <span><Calendar size={14} /> {exp.startDate} - {exp.endDate || 'Present'}</span>
                    {exp.location && <span><MapPin size={14} /> {exp.location}</span>}
                  </div>
                </div>
                <span className="experience-type-badge">{exp.type}</span>
              </div>

              <p className="experience-description">{exp.description}</p>

              {/* Achievements */}
              {exp.achievements.length > 0 && (
                <div className="experience-achievements">
                  <h4>Key Achievements</h4>
                  <ul>
                    {exp.achievements.map((a, i) => (
                      <li key={i}>{a}</li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Linked Projects */}
              {projects.length > 0 && (
                <div className="experience-projects">
                  <h4>Projects Delivered</h4>
                  <div className="experience-projects-grid">
                    {projects.map(p => (
                      <Link key={p.id} to={`/projects/${p.id}`} className="experience-project-link">
                        <span className="experience-project-title">{p.title}</span>
                        <span className="experience-project-desc">{p.description}</span>
                        <ArrowRight size={14} />
                      </Link>
                    ))}
                  </div>
                </div>
              )}

              {/* Technologies */}
              <div className="experience-tech">
                {exp.technologies.map((t, i) => (
                  <span key={i} className="mini-tech-pill">{t}</span>
                ))}
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};

export default ExperiencePage;
