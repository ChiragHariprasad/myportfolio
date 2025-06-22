import React, { useState, useEffect, useRef } from 'react';
import { Award, Users, Code, Zap } from 'lucide-react';
import TypingEffect from './TypingEffect';
import styles from '../styles/Terminal.module.css';

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

  const leadershipContent = `# Leadership & Impact

## Academic Leadership
• **Class Representative** - 3 consecutive years, consistently elected by peers
• Led academic committees and represented student interests in faculty meetings
• Coordinated technical workshops and study groups for engineering students

## Technical Leadership
• **GDG ML Vertical Lead Candidate** - Selected for machine learning community leadership
• **Patent Pending** - V.E.C.T.O.R fraud detection system innovation
• Led development teams in multiple high-impact projects

## Community Impact
• **National Digital Infrastructure Project** - Volunteer leader
  - Rotary-Infosys-Government collaboration
  - Deployed technology solutions across educational institutions
  - Managed cross-functional teams and stakeholder communications

## Mentorship & Development
• Mentored junior developers in AI/ML technologies
• Conducted technical training sessions on real-time systems
• Led code reviews and architectural design discussions

---
*"Leadership is not about being in charge. It's about taking care of those in your charge."*`;

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
          <TypingEffect
            text={leadershipContent}
            speed={20}
            delay={500}
          />
        </div>
      )}
    </section>
  );
};

export default Leadership;