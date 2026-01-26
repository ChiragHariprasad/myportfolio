import React, { useState, useEffect, useRef } from 'react';
import styles from '../styles/Terminal.module.css';
import TypingEffect from './TypingEffect';

const Leadership: React.FC = () => {
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
            text="chirag@portfolio:~$ cat ~/leadership.md"
            speed={60}
            onComplete={() => setShowContent(true)}
          />
        )}
      </div>

      {showContent && (
        <div className={styles.output}>
          <h2 className={styles.heading}># Internship and Leadership</h2>

          <h3 className={styles.subheading}>## Internship Leadership (IIFL Samasta)</h3>
          <ul>
            <li>
              <strong>AI/ML Intern — Strategy Team</strong> (3 Months)
            </li>
            <li>
              Delivered <strong>2 end-to-end production-grade AI systems</strong> as a <strong>solo developer</strong>
              (architecture → implementation → testing → final delivery)
            </li>
            <li>
              Built and shipped:
              <ul>
                <li>
                  <strong>MeetingsAI / PresntAI</strong> — On-prem meeting intelligence pipeline
                  (transcription + diarization + speaker tagging + MoM + PDF reporting)
                </li>
                <li>
                  <strong>VerifAI</strong> — AI-powered KYC document verification system
                  with strict risk controls, audit logs, and report exports
                </li>
              </ul>
            </li>
            <li>
              Supported <strong>2 additional internal projects</strong> with minor contributions
              (core ownership handled by their respective teams)
            </li>
          </ul>

          <h3 className={styles.subheading}>## Academic Leadership</h3>
          <ul>
            <li>
              <strong>Class Representative</strong> — 3 consecutive years, consistently elected by peers
            </li>
            <li>
              Represented student interests in faculty coordination and academic planning
            </li>
            <li>
              Organized peer study groups and technical coordination activities
            </li>
          </ul>

          <h3 className={styles.subheading}>## Technical Leadership</h3>
          <ul>
            <li>
              <strong>Patent Pending</strong> — V.E.C.T.O.R (real-time fraud detection and behavioral anomaly engine)
            </li>
            <li>
              Led development across multiple system-scale projects spanning AI + backend + deployment workflows
            </li>
            <li>
              Strong focus on <strong>execution ownership</strong>: shipping complete systems, not isolated modules
            </li>
          </ul>

          <h3 className={styles.subheading}>## Community Impact</h3>
          <ul>
            <li>
              <strong>National Digital Infrastructure Project</strong> — Volunteer leadership
              <ul>
                <li>Rotary–Infosys–Government collaboration</li>
                <li>Technology deployment support across educational institutions</li>
                <li>Stakeholder coordination and execution management</li>
              </ul>
            </li>
          </ul>

          <h3 className={styles.subheading}>## Mentorship & Development</h3>
          <ul>
            <li>Mentored juniors in AI/ML fundamentals and engineering workflows</li>
            <li>Conducted technical sessions on real-time systems and automation</li>
            <li>Participated in code reviews and architecture discussions</li>
          </ul>

          <blockquote className={styles.quote}>
            <p>
              "Leadership is not about being in charge. It's about taking care of those in your charge."
            </p>
            <footer className={styles.quoteAuthor} style={{ textAlign: 'right' }}>
              — Simon Sinek
            </footer>
          </blockquote>
        </div>
      )}
    </section>
  );
};

export default Leadership;
