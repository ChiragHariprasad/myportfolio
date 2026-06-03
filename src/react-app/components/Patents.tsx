import React from 'react';
import { Award, Compass, FileCheck, Layers } from 'lucide-react';
import '../styles/portfolio.css';

const Patents: React.FC = () => {
  return (
    <section id="patents" className="section-container">
      <div className="section-header">
        <span className="section-tag">Intellectual Property</span>
        <h2 className="section-title">Patent Portfolio</h2>
        <p className="section-subtitle">
          Patented architectures and algorithmic workflows designed to solve critical bottlenecks in transactional anomaly detection and distributed state estimation.
        </p>
      </div>

      <div className="patents-container">
        {/* Flagship Patent */}
        <div className="ivory-card patent-card hover-gold-card">
          <div className="patent-badge-side">
            <div>
              <span className="patent-status-tag">
                <FileCheck size={14} />
                Patent Filed
              </span>
            </div>
            <div className="patent-number">IN 2024 / PCT PENDING</div>
          </div>
          
          <div className="patent-content-side">
            <h3 className="patent-title">
              V.E.C.T.O.R — Velocity-Enhanced Clustering for Transactional Outlier Recognition
            </h3>
            
            <div className="patent-meta">
              <span><strong>Role:</strong> Primary Inventor</span>
              <span><strong>Jurisdiction:</strong> International (PCT) & India</span>
              <span><strong>Filed:</strong> 2024</span>
            </div>

            <div>
              <h4 className="patent-section-header">Abstract & Problem Statement</h4>
              <p style={{ fontSize: '0.9rem', color: 'var(--charcoal-light)' }}>
                Traditional transactional fraud detection fails to capture micro-behavioral drifts within individual consumer sessions in real-time. V.E.C.T.O.R solves this by implementing behavior-adaptive clustering combined with persona-specific anomaly detectors inside an ultra-low latency streaming loop (&lt;100ms processing delay).
              </p>
            </div>

            <div>
              <h4 className="patent-section-header">Key Architectural Innovations</h4>
              <ul style={{ paddingLeft: '1.25rem', fontSize: '0.9rem', color: 'var(--charcoal-light)', display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
                <li><strong>Dynamic Persona Adaption:</strong> Self-adjusting spatial density thresholds based on sliding-window transactional velocity.</li>
                <li><strong>High-Dimensional Reduction:</strong> Online streaming UMAP projections mapped to HDBSCAN micro-clusters.</li>
                <li><strong>Dual-Engine Validation:</strong> Secondary Isolation Forest scoring for absolute distance validation with XGBoost confidence routing.</li>
              </ul>
            </div>

            <div>
              <h4 className="patent-section-header">Underlying Technology Stack</h4>
              <div className="patent-tech-list">
                {['Redis Streams', 'MongoDB', 'UMAP', 'HDBSCAN', 'Isolation Forest', 'XGBoost'].map((tech) => (
                  <span key={tech} className="tech-tag">{tech}</span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Future Patents Placeholders */}
        <div className="patent-placeholder-grid">
          <div className="ivory-card placeholder-card">
            <Award className="placeholder-icon" size={32} />
            <h3 className="placeholder-title">Patent Asset II</h3>
            <p className="placeholder-desc">Automated Rule-Aware Generative System for Code-Compliant Urban Site Partitioning.</p>
            <span className="patent-status-tag" style={{ marginTop: '1rem' }}>
              <Compass size={12} /> Status: Preparing Filing
            </span>
          </div>

          <div className="ivory-card placeholder-card">
            <Layers className="placeholder-icon" size={32} />
            <h3 className="placeholder-title">Patent Asset III</h3>
            <p className="placeholder-desc">Bidirectional Consumer-Retailer intelligence and forecasting models.</p>
            <span className="patent-status-tag" style={{ marginTop: '1rem' }}>
              <Compass size={12} /> Status: Preparing Filing
            </span>
          </div>

          <div className="ivory-card placeholder-card">
            <Award className="placeholder-icon" size={32} />
            <h3 className="placeholder-title">Patent Asset IV</h3>
            <p className="placeholder-desc">Deep open-set similarity search & taxonomy classification for environmental genetics.</p>
            <span className="patent-status-tag" style={{ marginTop: '1rem' }}>
              <Compass size={12} /> Status: Internal Review
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Patents;
