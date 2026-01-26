import React, { useState, useEffect, useRef } from 'react';
import TypingEffect from './TypingEffect';
import styles from '../styles/Terminal.module.css';

const About: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [showContent, setShowContent] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.3 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className={styles.section}>
      <div className={styles.prompt}>
        {isVisible && (
          <TypingEffect
            text="chirag@portfolio:~$ cat about.txt"
            speed={60}
            onComplete={() => setShowContent(true)}
          />
        )}
      </div>

      {showContent && (
  <div className={styles.output}>
    <h2 className={styles.heading}># About Me</h2>

    <p>
      I’m <strong>Chirag</strong> — an <strong>AI/ML Engineer</strong> who builds end-to-end intelligent systems that don’t just predict, but <strong>operate</strong>.
      My work sits at the intersection of <strong>machine learning, automation, and production-grade engineering</strong>.
    </p>

    <p>
      I’ve shipped projects across high-impact domains like <strong>fraud detection</strong>, <strong>urban simulation</strong>, <strong>healthcare operations</strong>,
      <strong>biodiversity inference</strong>, and <strong>meeting intelligence</strong> — with a focus on scalability, reliability, and real-world constraints.
    </p>

    <ul>
      <li>
        <strong>Internship experience</strong> delivering AI automation pipelines and enterprise-ready systems
      </li>
      <li>
        Built <strong>agentic + multi-module architectures</strong> (generation → validation → simulation → ranking → export)
      </li>
      <li>
        Strong in <strong>ML + system design</strong>: anomaly detection, forecasting, clustering, retrieval, and decision engines
      </li>
      <li>
        Delivered <strong>full-stack implementations</strong> (FastAPI/Flask + React + DB + model pipelines)
      </li>
      <li>
        Worked on <strong>patent-driven systems</strong> including fraud intelligence and large-scale automation frameworks
      </li>
    </ul>

    <p>
      My edge is execution: I don’t build “models”. I build <strong>systems</strong> — with data flow, monitoring logic, fail-safes,
      explainability, and deployment-ready outputs.
    </p>

    <p>
      If the problem demands <strong>engineering discipline + AI leverage</strong>, I’m the one who can take it from concept to a working product.
    </p>
  </div>
)}

    </section>
  );
};

export default About;
