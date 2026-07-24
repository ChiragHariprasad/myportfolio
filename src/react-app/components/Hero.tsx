import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { getHeroConfig } from '../data/contentLoader';
import { computeStats } from '../data/statsEngine';
import '../styles/portfolio.css';

const Hero: React.FC = () => {
  const config = getHeroConfig();
  const stats = computeStats();

  return (
    <section className="hero-wrapper editorial-hero" id="hero">
      {/* Background Elements */}
      <div className="hero-editorial-bg">
        <div className="bg-grid"></div>
        <div className="bg-noise"></div>
        <div className="bg-gradient"></div>
        <motion.div 
          className="bg-ghost-letters"
          animate={{ y: [0, -30, 0] }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        >
          CH
        </motion.div>
        <div className="bg-geometric-overlays"></div>
      </div>

      <div className="hero-editorial-content">
        {/* Left Side: Typography & Details */}
        <div className="hero-left-column">
          <motion.div 
            className="hero-typography-container"
            initial="hidden"
            animate="visible"
            variants={{
              hidden: { opacity: 0 },
              visible: { opacity: 1, transition: { staggerChildren: 0.15 } }
            }}
          >
            {/* Layer 3 - Outline (Back) */}
            <div className="hero-layer hero-layer-3">
              <motion.span variants={{ hidden: { y: 100 }, visible: { y: 0 } }}>CHIRAG</motion.span>
              <motion.span variants={{ hidden: { y: 100 }, visible: { y: 0 } }}>HARIPRASAD</motion.span>
            </div>
            
            {/* Layer 2 - Blurred (Middle) */}
            <div className="hero-layer hero-layer-2">
              <motion.span variants={{ hidden: { y: 100 }, visible: { y: 0 } }}>CHIRAG</motion.span>
              <motion.span variants={{ hidden: { y: 100 }, visible: { y: 0 } }}>HARIPRASAD</motion.span>
            </div>

            {/* Layer 1 - Solid (Front) */}
            <div className="hero-layer hero-layer-1">
              <motion.span variants={{ hidden: { y: 100 }, visible: { y: 0 } }}>CHIRAG</motion.span>
              <motion.span variants={{ hidden: { y: 100 }, visible: { y: 0 } }}>HARIPRASAD</motion.span>
            </div>
          </motion.div>

          <motion.div 
            className="hero-subtitle-container"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.8, duration: 0.6 }}
          >
            <span className="hero-accent-line"></span>
            <p className="hero-editorial-subtitle">ENGINEERING INTELLIGENT INFRASTRUCTURE</p>
          </motion.div>

          <motion.div 
            className="hero-editorial-badges"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1, duration: 0.6 }}
          >
            <span className="editorial-badge">Inventor</span>
            <span className="editorial-badge">AI/ML Systems Engineer</span>
            <span className="editorial-badge">Full Stack Engineer</span>
          </motion.div>

          <motion.div 
            className="hero-editorial-stats"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2, duration: 0.6 }}
          >
            <div className="editorial-stat">
              <motion.strong
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 1.3, duration: 0.5, type: "spring" }}
              >{stats.totalProjects}</motion.strong> <span>Projects</span>
            </div>
            <div className="editorial-stat">
              <motion.strong
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 1.4, duration: 0.5, type: "spring" }}
              >{stats.totalPatents}</motion.strong> <span>Patents</span>
            </div>
            <div className="editorial-stat">
              <motion.strong
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 1.5, duration: 0.5, type: "spring" }}
              >{stats.totalPublications}</motion.strong> <span>IEEE Publication{stats.totalPublications > 1 ? 's' : ''}</span>
            </div>
            <div className="editorial-stat">
              <motion.strong
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 1.6, duration: 0.5, type: "spring" }}
              >{stats.totalTechnologies}</motion.strong> <span>Technologies</span>
            </div>
          </motion.div>

          <motion.div 
            className="hero-editorial-cta"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.8, duration: 0.6 }}
          >
            <Link to="/projects" className="btn-editorial-primary">
              View Projects <ArrowRight size={16} />
            </Link>
            <a href={config.resumePath} download="Resume.pdf" target="_blank" rel="noopener noreferrer" className="btn-editorial-secondary">
              Resume
            </a>
          </motion.div>

          <motion.div 
            className="hero-quote-block"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 2, duration: 0.6 }}
          >
            <span className="quote-text">"I BUILD SYSTEMS THAT THINK. PREDICT. TRANSFORM."</span>
          </motion.div>
        </div>

        {/* Right Side: Portrait & Floating Elements */}
        <div className="hero-right-column">
          <motion.div 
            className="hero-portrait-container"
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.8, ease: "easeOut" }}
          >
            <div className="portrait-backdrop-gradient"></div>
            <img src="/assets/chirag-hariprasad.png" alt="Chirag Hariprasad" title="Chirag Hariprasad Portrait" className="hero-portrait" />
          </motion.div>

          <motion.div 
            className="hero-editorial-labels"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 1.2, duration: 0.6 }}
          >
            <div className="bracket-label">ENGINEERING</div>
            <div className="bracket-label">INTELLIGENCE</div>
            <div className="bracket-label">INFRASTRUCTURE</div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
