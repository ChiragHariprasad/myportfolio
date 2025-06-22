import React, { useEffect, useRef } from 'react';
import styles from '../styles/Terminal.module.css';

const MatrixBackground: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const characters = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz@#$%^&*()_+-=[]{}|;:,.<>?';
    const columnCount = Math.floor(window.innerWidth / 20);

    for (let i = 0; i < columnCount; i++) {
      const column = document.createElement('div');
      column.className = styles.matrixColumn;
      column.style.left = `${i * 20}px`;
      column.style.animationDelay = `${Math.random() * 2}s`;
      column.style.animationDuration = `${5 + Math.random() * 10}s`;

      let columnText = '';
      for (let j = 0; j < 20; j++) {
        columnText += characters.charAt(Math.floor(Math.random() * characters.length)) + '\n';
      }
      column.textContent = columnText;

      container.appendChild(column);
    }

    return () => {
      container.innerHTML = '';
    };
  }, []);

  return <div ref={containerRef} className={styles.matrixBg} />;
};

export default MatrixBackground;