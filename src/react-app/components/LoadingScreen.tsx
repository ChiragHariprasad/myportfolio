import React, { useState, useEffect } from 'react';
import '../styles/portfolio.css';

interface LoadingScreenProps {
  onComplete: () => void;
}

const LOADING_LINES: { text: string; delay: number; type?: string }[] = [
  { text: '> Initializing Portfolio OS...', delay: 0 },
  { text: '> Loading content modules...', delay: 300 },
  { text: '> Building search index...', delay: 600 },
  { text: '> Computing statistics engine...', delay: 900 },
  { text: '> Rendering timeline generator...', delay: 1200 },
  { text: '> System ready.', delay: 1500, type: 'success' },
];

const SKIP_FLAG = 'portfolio-os-loaded';

const LoadingScreen: React.FC<LoadingScreenProps> = ({ onComplete }) => {
  const [visibleLines, setVisibleLines] = useState(0);
  const [fading, setFading] = useState(false);

  useEffect(() => {
    const timers: NodeJS.Timeout[] = [];

    // Only show the theatrical loader on a visitor's first visit per session.
    if (sessionStorage.getItem(SKIP_FLAG) === '1') {
      setFading(true);
      timers.push(setTimeout(onComplete, 0));
      return () => timers.forEach(clearTimeout);
    }

    LOADING_LINES.forEach((line, i) => {
      timers.push(
        setTimeout(() => setVisibleLines(i + 1), line.delay)
      );
    });

    // Fade out
    timers.push(
      setTimeout(() => setFading(true), 1900)
    );

    // Complete
    timers.push(
      setTimeout(() => {
        sessionStorage.setItem(SKIP_FLAG, '1');
        onComplete();
      }, 2200)
    );

    return () => timers.forEach(clearTimeout);
  }, [onComplete]);

  return (
    <div
      className="loading-screen"
      style={{
        opacity: fading ? 0 : 1,
        transition: 'opacity 0.3s ease',
      }}
      aria-hidden="true"
    >
      <div className="loading-terminal">
        {LOADING_LINES.slice(0, visibleLines).map((line, i) => (
          <div
            key={i}
            className="loading-line"
            style={{ animationDelay: `${line.delay}ms` }}
          >
            {line.type === 'success' ? (
              <span className="success">{line.text}</span>
            ) : (
              <span className="accent">{line.text}</span>
            )}
          </div>
        ))}
        {visibleLines < LOADING_LINES.length && (
          <span className="loading-cursor" />
        )}
      </div>
    </div>
  );
};

export default LoadingScreen;
