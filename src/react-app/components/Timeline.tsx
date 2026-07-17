import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { generateTimeline, getTimelineByYear } from '../data/timelineGenerator';
import '../styles/portfolio.css';

const Timeline: React.FC = () => {
  const timelineByYear = getTimelineByYear();
  const years = Array.from(timelineByYear.keys()).sort((a, b) => b - a); // newest first

  return (
    <section className="section-container" id="timeline">
      <motion.div className="section-header"
        initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <span className="section-tag">Investigation</span>
        <h2 className="section-title">Case Files</h2>
        <p className="section-subtitle">
          Tracing the timeline of events, projects, and milestones. Follow the thread.
        </p>
      </motion.div>

      <div className="crime-scene-board">
        {years.map((year, yi) => {
          const events = timelineByYear.get(year) || [];
          // Sort events within year: newest month first, then newest day first
          const sorted = [...events].sort((a, b) => {
            if (b.month !== a.month) return b.month - a.month;
            return (b.day || 1) - (a.day || 1);
          });

          return (
            <motion.div key={year} className="timeline-year-group"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: yi * 0.1, duration: 0.4 }}
            >
              <div className="timeline-year-label">{year}</div>

              {sorted.map((event) => (
                <div key={event.id} className="timeline-event">
                  <div className="evidence-card">
                    <div className="masking-tape"></div>
                    <div className="evidence-pin"></div>
                    
                    <div className="evidence-date">
                      {event.date} // CASE: {event.type.toUpperCase()}
                    </div>
                    
                    <div className="evidence-title">{event.title}</div>
                    
                    <div className="evidence-desc">
                      {event.description.length > 250
                        ? event.description.slice(0, 250) + '...'
                        : event.description
                      }
                    </div>

                    {event.image && (
                      <img src={event.image} alt={event.title} className="evidence-image" />
                    )}

                    {event.projectId && (
                      <div style={{ marginTop: '0.5rem' }}>
                        <Link to={`/projects/${event.projectId}`} className="evidence-link">
                          View Project File →
                        </Link>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </motion.div>
          );
        })}
      </div>
    </section>
  );
};

export default Timeline;
