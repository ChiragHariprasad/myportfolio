import React, { useState, useEffect, useRef } from 'react';
import { Mail, Send } from 'lucide-react';
import TypingEffect from './TypingEffect';
import styles from '../styles/Terminal.module.css';

const Contact: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [showContent, setShowContent] = useState(false);
  const [showForm, setShowForm] = useState(false);
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

  const contactStyle = {
    background: 'rgba(0, 0, 0, 0.8)',
    border: '1px solid var(--terminal-green)',
    borderRadius: '8px',
    padding: '2rem',
    marginTop: '2rem',
    textAlign: 'center' as const
  };

  const buttonStyle = {
    background: 'rgba(0, 255, 65, 0.1)',
    border: '1px solid var(--terminal-green)',
    color: 'var(--terminal-green)',
    padding: '0.8rem 1.5rem',
    borderRadius: '4px',
    fontSize: '1rem',
    fontFamily: 'var(--font-mono)',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    textDecoration: 'none',
    display: 'inline-flex',
    alignItems: 'center',
    gap: '0.5rem',
    marginTop: '1rem'
  };

  return (
    <section ref={sectionRef} className={styles.section}>
      <div className={styles.prompt}>
        {isVisible && (
          <TypingEffect
            text='chirag@portfolio:~$ echo "chiragh.0804@gmail.com" > /dev/connect'
            speed={60}
            onComplete={() => setShowContent(true)}
          />
        )}
      </div>

      {showContent && (
        <div style={contactStyle}>
          <div style={{ marginBottom: '2rem' }}>
            <TypingEffect
              text="Ready to Build Disruptive Systems?"
              speed={80}
              delay={500}
            />
          </div>
          
          <div style={{ marginBottom: '1rem', color: 'var(--terminal-amber)' }}>
            <TypingEffect
              text="Let's collaborate on intelligent solutions that evolve."
              speed={50}
              delay={2000}
            />
          </div>

          <div style={{ marginBottom: '2rem' }}>
            <TypingEffect
              text="> connect --subject 'Let's build something amazing'"
              speed={60}
              delay={3500}
              onComplete={() => setShowForm(true)}
            />
          </div>

          {showForm && (
            <div>
              <a
                href="mailto:chiragh.0804@gmail.com?subject=Let's%20build%20something%20amazing"
                style={buttonStyle}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = 'rgba(255, 222, 89, 0.1)';
                  e.currentTarget.style.borderColor = 'var(--terminal-amber)';
                  e.currentTarget.style.color = 'var(--terminal-amber)';
                  e.currentTarget.style.boxShadow = '0 0 20px rgba(255, 222, 89, 0.3)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = 'rgba(0, 255, 65, 0.1)';
                  e.currentTarget.style.borderColor = 'var(--terminal-green)';
                  e.currentTarget.style.color = 'var(--terminal-green)';
                  e.currentTarget.style.boxShadow = 'none';
                }}
              >
                <Mail size={20} />
                Initialize Connection
              </a>
            </div>
          )}
        </div>
      )}
    </section>
  );
};

export default Contact;