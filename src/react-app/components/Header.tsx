import React, { useState, useEffect } from 'react';
import TypingEffect from './TypingEffect';
import styles from '../styles/Header.module.css';

const Header: React.FC = () => {
  const [showPrompt, setShowPrompt] = useState(false);
  const [showName, setShowName] = useState(false);
  const [showTitle, setShowTitle] = useState(false);
  const [showTagline, setShowTagline] = useState(false);
  const [showSocials, setShowSocials] = useState(false);

  useEffect(() => {
    setShowPrompt(true);
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

        {showPrompt && (
          <div className={styles.prompt}>
            <TypingEffect
              text="chirag@portfolio:~$ whoami"
              speed={80}
              onComplete={() => setShowName(true)}
            />
          </div>
        )}

        {showName && (
          <h1 className={styles.name}>
            <TypingEffect
              text="Chirag H"
              speed={100}
              delay={500}
              onComplete={() => setShowTitle(true)}
            />
          </h1>
        )}

        {showTitle && (
          <div className={styles.title}>
            <TypingEffect
              text="AI/ML Developer | Real-Time Systems Architect | Engineering Leader"
              speed={60}
              delay={300}
              onComplete={() => setShowTagline(true)}
            />
          </div>
        )}

        {showTagline && (
          <div className={styles.tagline}>
            <TypingEffect
              text='"Building Intelligent Systems That Evolve"'
              speed={80}
              delay={500}
              onComplete={() => setShowSocials(true)}
            />
          </div>
        )}

        {showSocials && (
          <div className={styles.socials}>
            <div className={styles.prompt}>
              <TypingEffect text="> cat contact.txt" speed={60} delay={300} />
            </div>
            <ul className={styles.socialsList}>
              <li>
                <TypingEffect text="> LinkedIn: " speed={40} delay={800} />
                <a href="https://linkedin.com/in/chirag-hariprasad" target="_blank" rel="noopener noreferrer">
                  linkedin.com/in/chirag-hariprasad
                </a>
              </li>
              <li>
                <TypingEffect text="> GitHub: " speed={40} delay={1200} />
                <a href="https://github.com/ChiragHariprasad" target="_blank" rel="noopener noreferrer">
                  github.com/ChiragHariprasad
                </a>
              </li>
              <li>
                <TypingEffect text="> Email: " speed={40} delay={1600} />
                <a href="mailto:chiragh.0804@gmail.com">chiragh.0804@gmail.com</a>
              </li>
              <li>
                <TypingEffect text="> Website: " speed={40} delay={2000} />
                <a href="https://080405.tech" target="_blank" rel="noopener noreferrer">
                  080405.tech
                </a>
              </li>
            </ul>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;