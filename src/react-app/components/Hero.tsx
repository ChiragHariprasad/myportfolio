import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Download, Github, Linkedin, Mail } from 'lucide-react';
import { getHeroConfig } from '../data/contentLoader';
import { computeStats } from '../data/statsEngine';
import { getRandomTagline, getAdaptivePills, getHeroSubtitle } from '../data/heroEngine';
import '../styles/portfolio.css';

const Hero: React.FC = () => {
  const config = getHeroConfig();
  const stats = computeStats();
  const pills = getAdaptivePills();
  const subtitle = getHeroSubtitle();

  const [tagline, setTagline] = useState(getRandomTagline);
  const [taglineVisible, setTaglineVisible] = useState(true);

  // Rotate taglines every 4 seconds with fade
  useEffect(() => {
    const interval = setInterval(() => {
      setTaglineVisible(false);
      setTimeout(() => {
        setTagline(getRandomTagline());
        setTaglineVisible(true);
      }, 400);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="hero-wrapper" id="hero">
      <motion.div
        className="hero-content"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
      >
        {/* Eyebrow */}
        <motion.p
          className="hero-eyebrow"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.5 }}
        >
          Portfolio OS v3.0
        </motion.p>

        {/* Name */}
        <motion.h1
          className="hero-name"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.6 }}
        >
          {config.name}
        </motion.h1>

        {/* Rotating Tagline */}
        <motion.p
          className="hero-tagline"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.5 }}
        >
          <span style={{
            opacity: taglineVisible ? 1 : 0,
            transition: 'opacity 0.4s ease',
          }}>
            {tagline}
          </span>
        </motion.p>

        {/* Adaptive Title Pills */}
        <motion.div
          className="hero-title-container"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.5 }}
        >
          {pills.map((pill, i) => (
            <span key={i} className="hero-title-pill">{pill}</span>
          ))}
        </motion.div>

        {/* Dynamic Stats */}
        <motion.div
          className="hero-stats-row"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.0, duration: 0.5 }}
        >
          <div className="hero-stat">
            <strong>{stats.totalProjects}</strong> Projects
          </div>
          <div className="hero-stat">
            <strong>{stats.totalPatents}</strong> Patents
          </div>
          <div className="hero-stat">
            <strong>{stats.totalPublications}</strong> IEEE Publication{stats.totalPublications > 1 ? 's' : ''}
          </div>
          <div className="hero-stat">
            <strong>{stats.totalTechnologies}</strong> Technologies
          </div>
        </motion.div>

        {/* Subtitle */}
        <motion.p
          className="hero-subtitle"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.1, duration: 0.5 }}
        >
          {subtitle}
        </motion.p>

        {/* CTAs */}
        <motion.div
          className="hero-cta-group"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.3, duration: 0.5 }}
        >
          <Link to="/projects" className="btn-primary">
            View Projects <ArrowRight size={16} />
          </Link>
          <a href={config.resumePath} download="Resume.pdf" target="_blank" rel="noopener noreferrer" className="btn-secondary">
            <Download size={16} /> Resume
          </a>
        </motion.div>

        {/* Social Links */}
        <motion.div
          className="hero-socials"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 0.5 }}
        >
          <a href={config.socials.github} target="_blank" rel="noopener noreferrer" className="social-icon-link" aria-label="GitHub">
            <Github size={18} />
          </a>
          <a href={config.socials.linkedin} target="_blank" rel="noopener noreferrer" className="social-icon-link" aria-label="LinkedIn">
            <Linkedin size={18} />
          </a>
          <a href={`mailto:${config.socials.email}`} className="social-icon-link" aria-label="Email">
            <Mail size={18} />
          </a>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Hero;
