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
            Mechatronics graduate turned AI/ML engineer, driven by a passion for intelligent systems and adaptive technologies.
          </p>

          <p>
            My journey bridges the gap between physical systems and digital intelligence:
          </p>

          <ul>
            <li>Transitioned from a <strong>Mechatronics background</strong> to AI/ML specialization</li>
            <li>Engineered full-stack solutions – from <strong>microcontrollers to predictive ML models</strong></li>
            <li>Led high-impact technical teams and mentored peers in <strong>production-grade deployments</strong></li>
            <li>Designed and developed a <strong>patent-pending fraud detection system</strong></li>
            <li>Specialized in <strong>real-time systems, anomaly detection, and intelligent automation</strong></li>
          </ul>

          <p>
            I excel at tackling complex, system-level challenges that demand deep technical insight and strategic thinking.
            From <strong>inventory optimization</strong> to <strong>crime analytics</strong>, I architect solutions that learn, scale, and evolve.
          </p>
        </div>
      )}
    </section>
  );
};

export default About;
