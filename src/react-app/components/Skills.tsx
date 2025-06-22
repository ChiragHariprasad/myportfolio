import React, { useState, useEffect, useRef } from 'react';
import TypingEffect from './TypingEffect';
import styles from '../styles/Skills.module.css';
import terminalStyles from '../styles/Terminal.module.css';

const Skills: React.FC = () => {
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

  const skillsData = {
    "Languages": ["Python", "C", "JavaScript", "R (Basic)"],
    "AI & ML": ["OpenCV", "Fraud Detection", "Forecasting", "Search Algorithms", "Anomaly Detection"],
    "Frameworks": ["FastAPI", "Firebase", "Redis"],
    "Simulation": ["Pathfinding AI", "ACO", "Gesture Control", "Real-Time Units"],
    "Platforms": ["Arduino", "MongoDB Atlas", "Cloudflare", "Linux"],
    "Dev Tools": ["Git", "Version Control", "API Integration", "PyGame"]
  };

  const jsonString = JSON.stringify(skillsData, null, 2);

  return (
    <section ref={sectionRef} className={styles.skills}>
      <div className={terminalStyles.prompt}>
        {isVisible && (
          <TypingEffect
            text="chirag@portfolio:~$ cat ~/skills.json"
            speed={60}
            onComplete={() => setShowContent(true)}
          />
        )}
      </div>

      {showContent && (
        <div className={styles.terminalOutput}>
          <pre className={styles.skillsJson}>
            <TypingEffect
              text={jsonString}
              speed={20}
              delay={500}
            />
          </pre>
        </div>
      )}

      {showContent && (
        <div style={{ marginTop: '2rem' }}>
          {Object.entries(skillsData).map(([category, skills], index) => (
            <div key={category} className={styles.skillCategory}>
              <h3>{category}</h3>
              <ul className={styles.skillsList}>
                {skills.map((skill, skillIndex) => (
                  <li 
                    key={skill} 
                    className={styles.skillItem}
                    style={{ 
                      animationDelay: `${(index * 0.1) + (skillIndex * 0.05)}s`,
                      opacity: 0,
                      animation: `fadeIn 0.5s ease forwards ${(index * 0.1) + (skillIndex * 0.05)}s`
                    }}
                  >
                    {skill}
                  </li>
                ))}
              </ul>
              <div className={styles.progressBar}>
                <div 
                  className={styles.progressFill}
                  style={{ 
                    '--progress': `${85 + Math.random() * 15}%`,
                    animationDelay: `${index * 0.2}s`
                  } as React.CSSProperties}
                />
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
};

export default Skills;