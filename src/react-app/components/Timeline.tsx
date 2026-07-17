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
        <span className="section-tag">Journey</span>
        <h2 className="section-title">Timeline</h2>
        <p className="section-subtitle">
          Auto-generated from all projects, patents, publications, and experience.
          Add a JSON file → it appears here.
        </p>
      </motion.div>

      <div className="timeline-container">
        {years.map((year, yi) => {
          const events = timelineByYear.get(year) || [];
          // Sort events within year: newest month first
          const sorted = [...events].sort((a, b) => b.month - a.month);

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
                  <div className="timeline-event-date">{event.date}</div>
                  <div className="timeline-event-title">{event.title}</div>
                  <div className="timeline-event-desc">
                    {event.description.length > 150
                      ? event.description.slice(0, 150) + '...'
                      : event.description
                    }
                  </div>
                  {event.projectId && (
                    <Link to={`/projects/${event.projectId}`}>View Project →</Link>
                  )}
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
