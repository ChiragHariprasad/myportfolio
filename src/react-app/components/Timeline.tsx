import React, { useMemo, useRef, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { TransformWrapper, TransformComponent } from 'react-zoom-pan-pinch';
import { getTimelineByYear } from '../data/timelineGenerator';
import '../styles/portfolio.css';

const Timeline: React.FC = () => {
  const timelineByYear = useMemo(() => getTimelineByYear(), []);
  const years = useMemo(() => Array.from(timelineByYear.keys()).sort((a, b) => b - a), [timelineByYear]);

  // Horizontal layout sizing
  const BOARD_HEIGHT = 1600;
  const BOARD_WIDTH = Math.max(2000, years.length * 1100 + 800);

  const wrapperRef = useRef<HTMLDivElement>(null);
  const [minScale, setMinScale] = useState(0.2);

  // Hover state
  const [hoveredEvent, setHoveredEvent] = useState<any>(null);
  const hoverTimeout = useRef<any>(null);

  const handleMouseEnter = (event: any, year: number) => {
    clearTimeout(hoverTimeout.current);
    setHoveredEvent({ event, year });
  };

  const handleMouseLeave = () => {
    hoverTimeout.current = setTimeout(() => {
      setHoveredEvent(null);
    }, 400); // Wait 400ms to allow mouse to travel to modal
  };

  useEffect(() => {
    const updateScale = () => {
      if (wrapperRef.current) {
        const { width, height } = wrapperRef.current.getBoundingClientRect();
        const scaleX = width / BOARD_WIDTH;
        const scaleY = height / BOARD_HEIGHT;
        setMinScale(Math.min(scaleX, scaleY));
      }
    };
    updateScale();
    setTimeout(updateScale, 100);
    window.addEventListener('resize', updateScale);
    return () => window.removeEventListener('resize', updateScale);
  }, [BOARD_WIDTH, BOARD_HEIGHT]);

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
    return colors[year] || '#fbbf24'; 
  };

  const positions = useMemo(() => {
    const posMap = new Map();
    const yearPosMap = new Map();

    years.forEach((year, yi) => {
      const events = timelineByYear.get(year) || [];
      events.sort((a, b) => {
        if (a.month !== b.month) return a.month - b.month;
        return (a.day || 1) - (b.day || 1);
      });

      // Horizontal layout: move right per year, zig-zag up/down
      const isTop = yi % 2 === 0;
      const centerY = isTop ? BOARD_HEIGHT * 0.35 : BOARD_HEIGHT * 0.65;
      const centerX = 600 + yi * 1100;
      
      yearPosMap.set(year, { x: centerX, y: centerY });

      const totalInYear = events.length;
      const localCols = Math.max(1, Math.ceil(Math.sqrt(totalInYear)));

      events.forEach((event, ei) => {
        const lr = Math.floor(ei / localCols);
        const lc = ei % localCols;
        
        const offsetX = (lc - (localCols - 1) / 2) * 450;
        const offsetY = (lr - Math.ceil(totalInYear / localCols) / 2) * 350;

        const hash = Math.sin(year * 100 + ei) * 10000;
        const jitterX = (hash - Math.floor(hash)) * 100 - 50;
        const jitterY = (hash * 1.3 - Math.floor(hash * 1.3)) * 100 - 50;
        const rot = (hash * 1.7 - Math.floor(hash * 1.7)) * 10 - 5; 

        posMap.set(event.id, {
          x: centerX + offsetX + jitterX,
          y: centerY + offsetY + jitterY,
          rot,
          event,
          year,
          isLast: ei === totalInYear - 1,
          globalIndex: yi * 100 + ei
        });
      });
    });
    return { posMap, yearPosMap };
  }, [years, timelineByYear, BOARD_WIDTH, BOARD_HEIGHT]);

  const allPositionedEvents = Array.from(positions.posMap.values()).sort((a, b) => a.globalIndex - b.globalIndex);

  return (
    <section className="section-container" id="timeline" style={{ padding: '0 1rem', maxWidth: '100%', boxSizing: 'border-box' }}>
      <motion.div className="section-header" style={{ padding: '2rem 1rem 0' }}
        initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <span className="section-tag">Investigation</span>
        <h2 className="section-title">Case Files</h2>
        <p className="section-subtitle">
          Tracing the timeline of events. Scroll to zoom, drag to pan. Follow the thread.
        </p>
      </motion.div>

      <div className="evidence-board-wrapper" ref={wrapperRef}>
        <TransformWrapper
          initialScale={minScale}
          minScale={minScale}
          maxScale={3}
          centerOnInit={true}
          wheel={{ step: 0.1 }}
          panning={{ velocityDisabled: false }}
          limitToBounds={true}
        >
          <TransformComponent wrapperClass="zoom-wrapper" contentClass="zoom-content">
            <div 
              className="crime-scene-board"
              style={{ width: BOARD_WIDTH, height: BOARD_HEIGHT }}
            >
              {/* SVG Strings connecting events within the same year */}
              <svg className="evidence-strings" style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', pointerEvents: 'none', zIndex: 0 }}>
                {allPositionedEvents.map((pos, i) => {
                  if (i === allPositionedEvents.length - 1) return null;
                  const p1 = pos;
                  const p2 = allPositionedEvents[i + 1];
                  
                  if (p1.year !== p2.year) return null;
                  
                  const cx = (p1.x + p2.x) / 2;
                  const cy = (p1.y + p2.y) / 2 + 50; 
                  
                  const color = getYearColor(p1.year);
                  
                  return (
                    <path
                      key={`line-${i}`}
                      d={`M ${p1.x} ${p1.y} Q ${cx} ${cy} ${p2.x} ${p2.y}`}
                      stroke={color}
                      strokeWidth="3"
                      fill="none"
                      strokeLinecap="round"
                      style={{ filter: 'drop-shadow(2px 4px 6px rgba(0,0,0,0.5))' }}
                    />
                  );
                })}
              </svg>

              {/* Year Labels */}
              {years.map(year => {
                const yp = positions.yearPosMap.get(year);
                if (!yp) return null;
                const color = getYearColor(year);
                return (
                  <div key={`year-${year}`} style={{
                    position: 'absolute',
                    left: yp.x,
                    top: yp.y - 250, 
                    transform: 'translate(-50%, -50%) rotate(-3deg)',
                    zIndex: 1,
                  }}>
                    <div className="timeline-year-label" style={{ backgroundColor: color, color: '#1a2035', margin: 0, boxShadow: '2px 4px 10px rgba(0,0,0,0.5)' }}>
                      {year}
                    </div>
                  </div>
                );
              })}

              {/* Event Cards */}
              {allPositionedEvents.map(({ x, y, rot, event, year }) => {
                const hasImage = !!event.image;

                return (
                  <div
                    key={event.id}
                    className={`evidence-card-wrapper ${hasImage ? 'has-image' : 'text-only'}`}
                    style={{
                      left: x,
                      top: y,
                      transform: `translate(-50%, -50%) rotate(${rot}deg)`,
                      position: 'absolute',
                      zIndex: 2,
                    }}
                    onMouseEnter={() => handleMouseEnter(event, year)}
                    onMouseLeave={handleMouseLeave}
                  >
                    <div className="evidence-card">
                      <div className="masking-tape"></div>
                      <div className="evidence-pin" style={{ backgroundColor: getYearColor(year) }}></div>
                      
                      {hasImage ? (
                        <>
                          <img src={event.image} alt={event.title} className="evidence-image" />
                          <div className="evidence-card-details">
                            <div className="evidence-date" style={{ color: getYearColor(year) }}>
                              {event.date} // CASE: {event.type.toUpperCase()}
                            </div>
                            <div className="evidence-title">{event.title}</div>
                            <div className="evidence-desc">{event.description}</div>
                          </div>
                        </>
                      ) : (
                        <>
                          <div className="evidence-title text-header">{event.title}</div>
                          <div className="evidence-card-details">
                            <div className="evidence-date" style={{ color: getYearColor(year) }}>
                              {event.date} // CASE: {event.type.toUpperCase()}
                            </div>
                            <div className="evidence-desc">{event.description}</div>
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

        {/* Modal Overlay rendered completely outside the TransformWrapper to guarantee fixed size! */}
        {hoveredEvent && (
          <div 
            className="hovered-card-modal-container"
            onMouseEnter={() => clearTimeout(hoverTimeout.current)}
            onMouseLeave={handleMouseLeave}
          >
            <div className={`evidence-card ${hoveredEvent.event.image ? 'has-image' : 'text-only'}`}>
              <div className="masking-tape"></div>
              <div className="evidence-pin" style={{ backgroundColor: getYearColor(hoveredEvent.year) }}></div>
              
              {hoveredEvent.event.image ? (
                <>
                  <img src={hoveredEvent.event.image} alt={hoveredEvent.event.title} className="evidence-image" />
                  <div className="evidence-card-details">
                    <div className="evidence-date" style={{ color: getYearColor(hoveredEvent.year) }}>
                      {hoveredEvent.event.date} // CASE: {hoveredEvent.event.type.toUpperCase()}
                    </div>
                    <div className="evidence-title">{hoveredEvent.event.title}</div>
                    <div className="evidence-desc">{hoveredEvent.event.description}</div>
                    {hoveredEvent.event.projectId && (
                      <div style={{ marginTop: '0.5rem' }}>
                        <Link to={`/projects/${hoveredEvent.event.projectId}`} className="evidence-link">
                          View Project File →
                        </Link>
                      </div>
                    )}
                  </div>
                </>
              ) : (
                <>
                  <div className="evidence-title text-header">{hoveredEvent.event.title}</div>
                  <div className="evidence-card-details">
                    <div className="evidence-date" style={{ color: getYearColor(hoveredEvent.year) }}>
                      {hoveredEvent.event.date} // CASE: {hoveredEvent.event.type.toUpperCase()}
                    </div>
                    <div className="evidence-desc">{hoveredEvent.event.description}</div>
                    {hoveredEvent.event.projectId && (
                      <div style={{ marginTop: '0.5rem' }}>
                        <Link to={`/projects/${hoveredEvent.event.projectId}`} className="evidence-link">
                          View Project File →
                        </Link>
                      </div>
                    )}
                  </div>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default Timeline;
