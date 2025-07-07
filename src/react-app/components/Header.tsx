import React, { useState, useEffect } from 'react';
import TypingEffect from './TypingEffect';
import styles from '../styles/Header.module.css';

const Header: React.FC = () => {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    // Only enable animations on client-side
    setIsClient(true);
  }, []);

  const floatingSymbols = ['$', '%', '#', '@', '&', '*', '>', '<', '~', '`'];

  return (
    <header className={styles.header}>
      <div className={styles.floatingSymbols}>
        {floatingSymbols.map((symbol, index) => (
          <div
            key={index}
            className={styles.symbol}
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 10}s`,
              animationDuration: `${10 + Math.random() * 5}s`
            }}
          >
            {symbol}
          </div>
        ))}
      </div>

      <div className={styles.terminalWindow}>
        <div className={styles.terminalHeader}>
          <div className={styles.terminalButton}></div>
          <div className={styles.terminalButton}></div>
          <div className={styles.terminalButton}></div>
        </div>

        {/* Always Render Static for SEO */}
        <div className={styles.staticContent}>
          <div className={styles.prompt}>chirag@portfolio:~$ whoami</div>
          <h1 className={styles.name}>Chirag Hariprasad</h1>
          <div className={styles.title}>AI/ML Developer | Real-Time Systems Architect | Engineering Leader</div>
          <div className={styles.tagline}>"Building Intelligent Systems That Evolve"</div>
          <div className={styles.socials}>
            <ul className={styles.socialsList}>
              <li><strong>LinkedIn:</strong> <a href="https://linkedin.com/in/chirag-hariprasad/" target="_blank" rel="noopener noreferrer">linkedin.com/in/chirag-hariprasad</a></li>
              <li><strong>GitHub:</strong> <a href="https://github.com/ChiragHariprasad" target="_blank" rel="noopener noreferrer">github.com/ChiragHariprasad</a></li>
              <li><strong>Email:</strong> <a href="mailto:chiragh.0804@gmail.com">chiragh.0804@gmail.com</a></li>
              <li><strong>Website:</strong> <a href="https://080405.tech" target="_blank" rel="noopener noreferrer">080405.tech</a></li>
            </ul>
          </div>
        </div>

        {/* Animated content for users */}
        {isClient && (
          <>
            <div className={styles.prompt}>
              <TypingEffect
                text="chirag@portfolio:~$ whoami"
                speed={80}
              />
            </div>

            <h1 className={styles.name}>
              <TypingEffect
                text="Chirag Hariprasad"
                speed={100}
                delay={500}
              />
            </h1>

            <div className={styles.title}>
              <TypingEffect
                text="AI/ML Developer | Real-Time Systems Architect | Engineering Leader"
                speed={60}
                delay={1000}
              />
            </div>

            <div className={styles.tagline}>
              <TypingEffect
                text='"Building Intelligent Systems That Evolve"'
                speed={80}
                delay={1600}
              />
            </div>

            <div className={styles.socials}>
              <div className={styles.prompt}>
                <TypingEffect text="> cat contact.txt" speed={60} delay={2000} />
              </div>
              <ul className={styles.socialsList}>
                <li>
                  <TypingEffect text="> LinkedIn: " speed={40} delay={2200} />
                  <a href="https://linkedin.com/in/chirag-hariprasad/" target="_blank" rel="noopener noreferrer">
                    linkedin.com/in/chirag-hariprasad
                  </a>
                </li>
                <li>
                  <TypingEffect text="> GitHub: " speed={40} delay={2400} />
                  <a href="https://github.com/ChiragHariprasad" target="_blank" rel="noopener noreferrer">
                    github.com/ChiragHariprasad
                  </a>
                </li>
                <li>
                  <TypingEffect text="> Email: " speed={40} delay={2600} />
                  <a href="mailto:chiragh.0804@gmail.com">chiragh.0804@gmail.com</a>
                </li>
                <li>
                  <TypingEffect text="> Website: " speed={40} delay={2800} />
                  <a href="https://080405.tech" target="_blank" rel="noopener noreferrer">
                    080405.tech
                  </a>
                </li>
              </ul>
            </div>
          </>
        )}
      </div>
    </header>
  );
};

export default Header;
