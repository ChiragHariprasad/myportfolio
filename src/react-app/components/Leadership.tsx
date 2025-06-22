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
          <h2 className={styles.heading}># Leadership & Impact</h2>

          <h3 className={styles.subheading}>## Academic Leadership</h3>
          <ul>
            <li><strong>Class Representative</strong> – 3 consecutive years, consistently elected by peers</li>
            <li>Led academic committees and represented student interests in faculty meetings</li>
            <li>Coordinated technical workshops and study groups for engineering students</li>
          </ul>

          <h3 className={styles.subheading}>## Technical Leadership</h3>
          <ul>
            <li><strong>GDG ML Vertical Lead Candidate</strong> – Selected for machine learning community leadership</li>
            <li><strong>Patent Pending</strong> – V.E.C.T.O.R fraud detection system innovation</li>
            <li>Led development teams in multiple high-impact projects</li>
          </ul>

          <h3 className={styles.subheading}>## Community Impact</h3>
          <ul>
            <li><strong>National Digital Infrastructure Project</strong> – Volunteer leader
              <ul>
                <li>Rotary-Infosys-Government collaboration</li>
                <li>Deployed technology solutions across educational institutions</li>
                <li>Managed cross-functional teams and stakeholder communications</li>
              </ul>
            </li>
          </ul>

          <h3 className={styles.subheading}>## Mentorship & Development</h3>
          <ul>
            <li>Mentored junior developers in AI/ML technologies</li>
            <li>Conducted technical training sessions on real-time systems</li>
            <li>Led code reviews and architectural design discussions</li>
          </ul>

          <blockquote className={styles.quote}>
            "Leadership is not about being in charge. It's about taking care of those in your charge."
          </blockquote>
        </div>
      )}
    </section>
  );
};

export default Leadership;
