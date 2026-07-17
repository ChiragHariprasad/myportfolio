import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FileCheck, ArrowRight } from 'lucide-react';
import { getAllPatents } from '../data/contentLoader';
import '../styles/portfolio.css';

const Patents: React.FC = () => {
  const patents = getAllPatents();

  return (
    <section className="section-container" id="patents">
      <motion.div className="section-header"
        initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <span className="section-tag">Intellectual Property</span>
        <h2 className="section-title">Patent Portfolio</h2>
        <p className="section-subtitle">
          {patents.length} published patents in fraud detection, urban planning,
          retail intelligence, and presentation automation.
        </p>
      </motion.div>

      <div className="patents-container">
        {patents.map((patent, idx) => (
          <motion.div key={patent.id} className="patent-card"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.12, duration: 0.5 }}
          >
            <div className="patent-badge-side">
              <span className="patent-status-tag">
                <FileCheck size={12} /> Patent Published
              </span>
              <div className="patent-number">
                Published {patent.publishedDate}
                {patent.applicationNo && ` · App No: ${patent.applicationNo}`}
              </div>
            </div>

            <h3 className="patent-title">{patent.fullTitle}</h3>

            <div className="patent-meta">
              <span><strong>Role:</strong> {patent.role}</span>
              <span><strong>Domain:</strong> {patent.domain}</span>
            </div>

            <p className="patent-abstract-text">{patent.abstract}</p>

            {patent.claims.length > 0 && (
              <ul className="patent-claims-list">
                {patent.claims.slice(0, 4).map((claim, i) => (
                  <li key={i}>{claim}</li>
                ))}
              </ul>
            )}

            <Link to={`/projects/${patent.projectId}`} className="patent-link-btn">
              View Project <ArrowRight size={12} />
            </Link>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default Patents;
