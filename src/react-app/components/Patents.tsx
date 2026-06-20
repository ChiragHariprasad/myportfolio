import React, { useState, useEffect, useRef } from 'react';
import { Award, BookOpen, Compass, FileCheck, Layers, ExternalLink } from 'lucide-react';
import '../styles/portfolio.css';

const Patents: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section id="patents" ref={sectionRef} className="section-container">
      <div className={isVisible ? 'animate-fade-up' : ''} style={{ animationDelay: isVisible ? '0.1s' : '0s' }}>
        <div className="section-header">
          <span className="section-tag">Intellectual Property</span>
          <h2 className="section-title">Patent Portfolio</h2>
          <p className="section-subtitle">
            Patented architectures and algorithmic workflows designed to solve critical bottlenecks in transactional anomaly detection, urban planning, retail intelligence, and presentation automation.
          </p>
        </div>
      </div>

      <div className={isVisible ? 'animate-fade-up' : ''} style={{ animationDelay: isVisible ? '0.3s' : '0s' }}>
        <div className="patents-container">
          {/* V.E.C.T.O.R */}
          <div className="ivory-card patent-card hover-gold-card">
            <div className="patent-badge-side">
              <div>
                <span className="patent-status-tag">
                  <FileCheck size={14} />
                  Patent Published
                </span>
              </div>
              <div className="patent-number">Published 3 Oct 2025</div>
            </div>

            <div className="patent-content-side">
              <h3 className="patent-title">
                V.E.C.T.O.R - Velocity-Enhanced Clustering for Transactional Outlier Recognition
              </h3>

              <div className="patent-meta">
                <span><strong>Role:</strong> Primary Inventor</span>
                <span><strong>Domain:</strong> Real-Time Fraud Detection</span>
              </div>

              <div>
                <h4 className="patent-section-header">Abstract</h4>
                <p style={{ fontSize: '0.9rem', color: 'var(--charcoal-light)' }}>
                  Traditional transactional fraud detection fails to capture micro-behavioral drifts within individual consumer sessions in real-time. V.E.C.T.O.R solves this by implementing behavior-adaptive clustering combined with persona-specific anomaly detectors inside an ultra-low latency streaming loop (&lt;100ms processing delay).
                </p>
              </div>

              <div>
                <h4 className="patent-section-header">Key Innovations</h4>
                <ul style={{ paddingLeft: '1.25rem', fontSize: '0.9rem', color: 'var(--charcoal-light)', display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
                  <li><strong>Dynamic Persona Adaption:</strong> Self-adjusting spatial density thresholds based on sliding-window transactional velocity.</li>
                  <li><strong>High-Dimensional Reduction:</strong> Online streaming UMAP projections mapped to HDBSCAN micro-clusters.</li>
                  <li><strong>Dual-Engine Validation:</strong> Secondary Isolation Forest scoring for absolute distance validation with XGBoost confidence routing.</li>
                </ul>
              </div>

              <div>
                <h4 className="patent-section-header">Technology Stack</h4>
                <div className="patent-tech-list">
                  {['Redis Streams', 'MongoDB', 'UMAP', 'HDBSCAN', 'Isolation Forest', 'XGBoost'].map((tech) => (
                    <span key={tech} className="tech-tag">{tech}</span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* GENESIS */}
          <div className="ivory-card patent-card hover-gold-card">
            <div className="patent-badge-side">
              <div>
                <span className="patent-status-tag">
                  <FileCheck size={14} />
                  Patent Published
                </span>
              </div>
              <div className="patent-number">Published 27 Mar 2026</div>
            </div>

            <div className="patent-content-side">
              <h3 className="patent-title">
                G.E.N.E.S.I.S - Generative Engine for Networked, Embedded, Spatial Infrastructure Synthesis
              </h3>

              <div className="patent-meta">
                <span><strong>Role:</strong> Primary Inventor</span>
                <span><strong>Domain:</strong> AI Urban Planning</span>
              </div>

              <div>
                <h4 className="patent-section-header">Abstract</h4>
                <p style={{ fontSize: '0.9rem', color: 'var(--charcoal-light)' }}>
                  A rule-aware generative system that automates urban layout planning from site boundaries into complete code-compliant city layouts. Integrates Indian NBC regulation enforcement directly into the generation loop with multi-domain proxy simulations for traffic, drainage, and wind ventilation.
                </p>
              </div>

              <div>
                <h4 className="patent-section-header">Key Innovations</h4>
                <ul style={{ paddingLeft: '1.25rem', fontSize: '0.9rem', color: 'var(--charcoal-light)', display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
                  <li><strong>Regulation-by-Design:</strong> Fail-fast compliance engine enforcing road widths, FAR, setbacks, and land-use rules inside the generation loop.</li>
                  <li><strong>Multi-Domain Proxy Simulation:</strong> Graph-based traffic routing, D8 drainage flow accumulation, and Gaussian wake ventilation scoring.</li>
                  <li><strong>KPI-Based Ranking:</strong> Normalized composite scoring (0-100) with Top-K selection across candidate layouts.</li>
                </ul>
              </div>

              <div>
                <h4 className="patent-section-header">Technology Stack</h4>
                <div className="patent-tech-list">
                  {['Python', 'Shapely', 'NetworkX', 'NumPy', 'Streamlit', 'pyproj', 'Folium'].map((tech) => (
                    <span key={tech} className="tech-tag">{tech}</span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* O.R.I.O.N. */}
          <div className="ivory-card patent-card hover-gold-card">
            <div className="patent-badge-side">
              <div>
                <span className="patent-status-tag">
                  <FileCheck size={14} />
                  Patent Published
                </span>
              </div>
              <div className="patent-number">Published 29 May 2026</div>
            </div>

            <div className="patent-content-side">
              <h3 className="patent-title">
                O.R.I.O.N - Omni-Retail Intelligence & Ordering Network
              </h3>

              <div className="patent-meta">
                <span><strong>Role:</strong> Co-Inventor</span>
                <span><strong>Domain:</strong> AI Retail Intelligence</span>
              </div>

              <div>
                <h4 className="patent-section-header">Abstract</h4>
                <p style={{ fontSize: '0.9rem', color: 'var(--charcoal-light)' }}>
                  An integrated AI-driven inventory management and demand forecasting platform creating a closed-loop intelligence network between household consumption and retail stock management. Models recipe-based consumption, depletion prediction, auto-restock triggers, and festive demand forecasting as a unified system.
                </p>
              </div>

              <div>
                <h4 className="patent-section-header">Key Innovations</h4>
                <ul style={{ paddingLeft: '1.25rem', fontSize: '0.9rem', color: 'var(--charcoal-light)', display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
                  <li><strong>Bidirectional Intelligence:</strong> Household cooking logs inform store-side demand; store patterns improve user-side recommendations.</li>
                  <li><strong>Cultural-Aware Forecasting:</strong> Festival markers treated as structured seasonality (Diwali, Holi, etc.) rather than random anomalies.</li>
                  <li><strong>Containerized Distributed ML:</strong> Fault-tolerant model execution with CI/CD monthly retraining across distributed nodes.</li>
                </ul>
              </div>

              <div>
                <h4 className="patent-section-header">Technology Stack</h4>
                <div className="patent-tech-list">
                  {['Python', 'FastAPI', 'PostgreSQL', 'MongoDB', 'Prophet', 'scikit-learn', 'Docker'].map((tech) => (
                    <span key={tech} className="tech-tag">{tech}</span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Context-Aware Presentation Automation */}
          <div className="ivory-card patent-card hover-gold-card">
            <div className="patent-badge-side">
              <div>
                <span className="patent-status-tag">
                  <FileCheck size={14} />
                  Patent Published
                </span>
              </div>
              <div className="patent-number">Published 29 May 2026</div>
            </div>

            <div className="patent-content-side">
              <h3 className="patent-title">
                Context-Aware Adaptive Presentation Automation System and Method with Semantic Navigation and Dynamic Question/Text Annotation
              </h3>

              <div className="patent-meta">
                <span><strong>Role:</strong> Co-Inventor</span>
                <span><strong>Domain:</strong> AI Presentation Automation</span>
              </div>

              <div>
                <h4 className="patent-section-header">Abstract</h4>
                <p style={{ fontSize: '0.9rem', color: 'var(--charcoal-light)' }}>
                  A patented system for context-aware adaptive presentation automation incorporating semantic navigation and dynamic question/text annotation. Enables presentations to intelligently adapt their flow and content based on real-time semantic understanding of audience queries, annotations, and navigational intent.
                </p>
              </div>

              <div>
                <h4 className="patent-section-header">Key Innovations</h4>
                <ul style={{ paddingLeft: '1.25rem', fontSize: '0.9rem', color: 'var(--charcoal-light)', display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
                  <li><strong>Semantic Navigation:</strong> Non-linear traversal of presentation content based on meaning of queries, not predefined slide indices.</li>
                  <li><strong>Dynamic Annotation:</strong> Real-time processing of audience questions with semantic mapping to relevant content segments.</li>
                  <li><strong>Context-Aware Adaptation:</strong> On-the-fly adjustment of order, depth, and emphasis according to cumulative session context.</li>
                </ul>
              </div>
            </div>
          </div>

          {/* S.C.A.L.E. - IEEE Access Publication */}
          <div className="ivory-card patent-card patent-publication-card hover-gold-card">
            <div className="patent-badge-side">
              <div>
                <span className="patent-status-tag">
                  <BookOpen size={14} />
                  IEEE Access Published
                </span>
              </div>
              <div className="patent-number">10 June 2026</div>
            </div>

            <div className="patent-content-side">
              <h3 className="patent-title">
                S.C.A.L.E - Structural Causal Analysis of Labor & Education
              </h3>

              <div className="patent-meta">
                <span><strong>Role:</strong> Lead Researcher & Author</span>
                <span><strong>Domain:</strong> Causal Policy Simulation</span>
                <span><strong>Journal:</strong> IEEE Access (Early Access)</span>
              </div>

              <div>
                <h4 className="patent-section-header">Publication Abstract</h4>
                <p style={{ fontSize: '0.9rem', color: 'var(--charcoal-light)' }}>
                  "Unbalanced Expansion of Engineering Education in India: A Data-Driven Policy Analysis" — A causal simulation and policy evaluation framework modeling India's engineering education system as a dynamic, feedback-driven system. Links seat capacity expansion, graduate supply and employability, wage compression, underemployment, brain drain, human capital retention, and GDP dynamics through a unified mathematical model.
                </p>
              </div>

              <div>
                <h4 className="patent-section-header">Key Findings</h4>
                <ul style={{ paddingLeft: '1.25rem', fontSize: '0.9rem', color: 'var(--charcoal-light)', display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
                  <li><strong>Quantified Causation:</strong> ATE = 0.448 — +1pp enrollment share → +44.8pp graduate unemployment.</li>
                  <li><strong>Optimal Policy:</strong> Quality-First Reform + Integrated Mix outperforms pure seat-cap regulation by 12% unemployment reduction and 39% higher GDP growth.</li>
                  <li><strong>Identified Mechanisms:</strong> 7-year delayed feedback, wage compression migration trigger at $25K PPP, and unemployment hysteresis with 2-3x recovery time.</li>
                </ul>
              </div>

              <div style={{ marginTop: '1rem' }}>
                <a
                  href="https://doi.org/10.1109/ACCESS.2026.3704923"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="patent-doi-link"
                >
                  <ExternalLink size={14} />
                  DOI: 10.1109/ACCESS.2026.3704923
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Patents;
