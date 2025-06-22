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

  const aboutText = `Mechanical Engineering graduate who discovered a passion for AI/ML and intelligent systems.

My journey spans from traditional engineering to cutting-edge technology:
• Transitioned from Mechanical Engineering to AI/ML specialization
• Built full-stack systems from microcontrollers to predictive models
• Led technical teams and mentored peers in real-world deployments
• Developed patent-pending fraud detection systems
• Specialized in real-time systems, anomaly detection, and intelligent automation

I thrive on solving complex problems that require both technical depth and systems thinking.
From inventory optimization to crime analytics, I build solutions that evolve and adapt.`;

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
          <TypingEffect
            text={aboutText}
            speed={30}
            delay={500}
          />
        </div>
      )}
    </section>
  );
};

export default About;