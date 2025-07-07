import React from 'react';
import styles from '../styles/Header.module.css';

const Header: React.FC = () => {
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

        <div className={styles.prompt}>
          chirag@portfolio:~$ whoami
        </div>

        <h1 className={styles.name}>
          Chirag Hariprasad
        </h1>

        <div className={styles.title}>
          AI/ML Developer | Real-Time Systems Architect | Engineering Leader
        </div>

        <div className={styles.tagline}>
          "Building Intelligent Systems That Evolve"
        </div>

        <div className={styles.socials}>
          <div className={styles.prompt}>
            {'>'} cat contact.txt
          </div>
          <ul className={styles.socialsList}>
            <li>
              {'>'} LinkedIn: 
              <a href="https://linkedin.com/in/chirag-hariprasad/" target="_blank" rel="noopener noreferrer">
                linkedin.com/in/chirag-hariprasad
              </a>
            </li>
            <li>
              {'>'} GitHub: 
              <a href="https://github.com/ChiragHariprasad" target="_blank" rel="noopener noreferrer">
                github.com/ChiragHariprasad
              </a>
            </li>
            <li>
              {'>'} Email: 
              <a href="mailto:chiragh.0804@gmail.com">chiragh.0804@gmail.com</a>
            </li>
            <li>
              {'>'} Website: 
              <a href="https://080405.tech" target="_blank" rel="noopener noreferrer">
                080405.tech
              </a>
            </li>
          </ul>
        </div>
      </div>
    </header>
  );
};

export default Header;