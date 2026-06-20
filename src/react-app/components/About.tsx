import React, { useState, useEffect, useRef } from 'react';
import '../styles/portfolio.css';

const About: React.FC = () => {
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
    <section id="about" ref={sectionRef} className="section-container">
      <div className="section-header">
        <span className="section-tag">Executive Summary</span>
        <h2 className="section-title">About Me</h2>
        <p className="section-subtitle">
          Bridging the gap between mathematical model design and resilient, low-latency systems engineering.
        </p>
      </div>

      <div className="ivory-card hover-gold-card" style={{ padding: '3rem' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '2.5rem' }}>
          <div className={isVisible ? 'animate-fade-up' : ''} style={{ animationDelay: isVisible ? '0.1s' : '0s' }}>
            <p style={{ fontSize: '1.1rem', color: 'var(--charcoal)', marginBottom: '1.5rem', lineHeight: '1.8' }}>
              I’m <strong>Chirag</strong>, an <strong>AI/ML Systems Engineer</strong> who builds end-to-end intelligent systems that don’t just predict, but <strong>operate</strong>. My work sits at the intersection of <strong>machine learning, automation, and production-grade software engineering</strong>.
            </p>
            <p style={{ fontSize: '1rem', color: 'var(--charcoal-light)', marginBottom: '2rem', lineHeight: '1.8' }}>
              I’ve shipped projects across high-impact domains like <strong>fraud detection</strong>, <strong>urban simulation</strong>, <strong>healthcare operations</strong>, <strong>biodiversity inference</strong>, and <strong>meeting intelligence</strong>, always with a focus on scalability, reliability, and real-world constraints. I hold <strong>4 published patents</strong> and an <strong>IEEE Access publication</strong> in causal policy analysis.
            </p>
          </div>

          <div className={isVisible ? 'animate-fade-up' : ''} style={{ animationDelay: isVisible ? '0.3s' : '0s' }}>
            <div style={{ borderTop: '1px solid var(--gold-alpha-10)', paddingTop: '2rem' }}>
              <h3 className="patent-section-header" style={{ marginBottom: '1rem', fontSize: '1rem' }}>Key Competencies & Philosophy</h3>
              <ul style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
                gap: '1rem',
                paddingLeft: '1.25rem',
                color: 'var(--charcoal-light)',
                fontSize: '0.95rem'
              }}>
                <li>
                  <strong>Internship Execution:</strong> Delivered AI automation pipelines and enterprise-ready systems into production at IIFL Samasta.
                </li>
                <li>
                  <strong>Agentic Architectures:</strong> Shipped multi-module flows spanning generation, validation, simulation, and ranking.
                </li>
                <li>
                  <strong>ML & System Design:</strong> Developed anomaly detection, time-series forecasting, clustering, retrieval, and decision engines.
                </li>
                <li>
                  <strong>Full-Stack Ownership:</strong> Implemented backend APIs (FastAPI/Flask), database layers, ML pipelines, and frontend clients.
                </li>
                  <li>
                    <strong>Patent-Published Systems:</strong> 4 published patents in fraud detection, urban AI, retail intelligence, and presentation automation, plus an IEEE Access publication in causal policy analysis.
                  </li>
              </ul>
            </div>
          </div>
        </div>

        <p className={isVisible ? 'animate-fade-up' : ''} style={{ animationDelay: isVisible ? '0.5s' : '0s', fontSize: '1rem', color: 'var(--charcoal-light)', marginTop: '2.5rem', borderTop: '1px solid var(--gold-alpha-10)', paddingTop: '1.5rem', fontStyle: 'italic' }}>
          My edge is execution: I don’t just build "models". I build <strong>systems</strong>, complete with data flow orchestration, monitoring metrics, fail-safes, explainability, and deployment-ready artifacts.
        </p>
      </div>
    </section>
  );
};

export default About;