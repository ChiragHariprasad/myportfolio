import React, { useMemo } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { TransformWrapper, TransformComponent } from 'react-zoom-pan-pinch';
import { generateTimeline } from '../data/timelineGenerator';
import '../styles/portfolio.css';

const Timeline: React.FC = () => {
  const events = useMemo(() => {
    // generateTimeline is already oldest first
    return generateTimeline();
  }, []);

  const BOARD_WIDTH = 3000;
  const BOARD_HEIGHT = Math.max(2000, Math.ceil(events.length / 4) * 600);
  const COLS = 4;

  const getPos = (i: number) => {
    const r = Math.floor(i / COLS);
    let c = i % COLS;
    if (r % 2 !== 0) {
      c = COLS - 1 - c; // Snake pattern
    }
    
    // Pseudo-random jitter based on index
    const hash = Math.sin(i + 1) * 10000;
    const randX = (hash - Math.floor(hash)) * 120 - 60;
    const randY = (hash * 1.3 - Math.floor(hash * 1.3)) * 120 - 60;

    const cellWidth = BOARD_WIDTH / COLS;
    const cellHeight = BOARD_HEIGHT / Math.ceil(events.length / COLS);

    return {
      x: c * cellWidth + cellWidth / 2 + randX,
      y: r * cellHeight + cellHeight / 2 + randY,
    };
  };

  const getYearColor = (year: number) => {
    const colors: Record<number, string> = {
      2021: '#fca5a5',
      2022: '#fdba74',
      2023: '#fcd34d',
      2024: '#86efac',
      2025: '#93c5fd',
      2026: '#c4b5fd',
      2027: '#f9a8d4',
    };
    return colors[year] || '#fbbf24'; // default accent
  };

  return (
    <section className="section-container" id="timeline" style={{ padding: 0, maxWidth: '100%' }}>
      <motion.div className="section-header" style={{ padding: '2rem 2rem 0' }}
        initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <span className="section-tag">Investigation</span>
        <h2 className="section-title">Case Files</h2>
        <p className="section-subtitle">
          Tracing the timeline of events. Scroll to zoom, drag to pan. Follow the thread.
        </p>
      </motion.div>

      <div className="evidence-board-wrapper">
        <TransformWrapper
          initialScale={0.5}
          minScale={0.2}
          maxScale={2}
          centerOnInit={true}
          wheel={{ step: 0.1 }}
          panning={{ velocityDisabled: false }}
        >
          <TransformComponent wrapperClass="zoom-wrapper" contentClass="zoom-content">
            <div 
              className="crime-scene-board"
              style={{ width: BOARD_WIDTH, height: BOARD_HEIGHT }}
            >
              {/* SVG Strings connecting events */}
              <svg className="evidence-strings" style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', pointerEvents: 'none', zIndex: 0 }}>
                {events.map((ev, i) => {
                  if (i === events.length - 1) return null;
                  const p1 = getPos(i);
                  const p2 = getPos(i + 1);
                  // Curve the line slightly for a realistic hanging string effect
                  const cx = (p1.x + p2.x) / 2;
                  const cy = (p1.y + p2.y) / 2 + 80; // Sag downwards
                  const color = getYearColor(events[i + 1].year);
                  return (
                    <path
                      key={`line-${i}`}
                      d={`M ${p1.x} ${p1.y} Q ${cx} ${cy} ${p2.x} ${p2.y}`}
                      stroke={color}
                      strokeWidth="4"
                      fill="none"
                      strokeLinecap="round"
                      style={{ filter: 'drop-shadow(2px 4px 6px rgba(0,0,0,0.5))' }}
                    />
                  );
                })}
              </svg>

              {/* Event Cards */}
              {events.map((event, i) => {
                const pos = getPos(i);
                // Rotate randomly between -4 and 4 degrees
                const hash = Math.sin(i + 42) * 10000;
                const rot = (hash - Math.floor(hash)) * 8 - 4;
                const hasImage = !!event.image;

                return (
                  <div
                    key={event.id}
                    className={`evidence-card-wrapper ${hasImage ? 'has-image' : 'text-only'}`}
                    style={{
                      left: pos.x,
                      top: pos.y,
                      transform: `translate(-50%, -50%) rotate(${rot}deg)`,
                      position: 'absolute',
                      zIndex: 2,
                    }}
                  >
                    <div className="evidence-card">
                      <div className="masking-tape"></div>
                      <div className="evidence-pin" style={{ backgroundColor: getYearColor(event.year) }}></div>
                      
                      {hasImage ? (
                        <>
                          <img src={event.image} alt={event.title} className="evidence-image" />
                          <div className="evidence-card-details">
                            <div className="evidence-date" style={{ color: getYearColor(event.year) }}>
                              {event.date} // CASE: {event.type.toUpperCase()}
                            </div>
                            <div className="evidence-title">{event.title}</div>
                            <div className="evidence-desc">{event.description}</div>
                            {event.projectId && (
                              <div style={{ marginTop: '0.5rem' }}>
                                <Link to={`/projects/${event.projectId}`} className="evidence-link">
                                  View Project File →
                                </Link>
                              </div>
                            )}
                          </div>
                        </>
                      ) : (
                        <>
                          <div className="evidence-title text-header">{event.title}</div>
                          <div className="evidence-card-details">
                            <div className="evidence-date" style={{ color: getYearColor(event.year) }}>
                              {event.date} // CASE: {event.type.toUpperCase()}
                            </div>
                            <div className="evidence-desc">{event.description}</div>
                            {event.projectId && (
                              <div style={{ marginTop: '0.5rem' }}>
                                <Link to={`/projects/${event.projectId}`} className="evidence-link">
                                  View Project File →
                                </Link>
                              </div>
                            )}
                          </div>
                        </>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </TransformComponent>
        </TransformWrapper>
      </div>
    </section>
  );
};

export default Timeline;
