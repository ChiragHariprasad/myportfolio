import React from 'react';
import { motion } from 'framer-motion';
import { Mail, Github, Linkedin, ArrowRight, Download } from 'lucide-react';
import { getHeroConfig } from '../data/contentLoader';
import '../styles/portfolio.css';

const Contact: React.FC = () => {
  const config = getHeroConfig();

  return (
    <section id="contact" className="section-container">
      <motion.div className="section-header"
        initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <span className="section-tag">Connect</span>
        <h2 className="section-title">Get In Touch</h2>
        <p className="section-subtitle">
          Open to research collaborations, systems engineering consulting,
          and complex engineering challenges.
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.5 }}
        style={{ maxWidth: '600px', margin: '0 auto', textAlign: 'center' }}
      >
        <div className="card" style={{ padding: '3rem' }}>
          <h3 style={{
            fontSize: '1.5rem', fontWeight: 700, color: 'var(--text-primary)',
            marginBottom: '1rem',
          }}>
            Let's Build the Future Together
          </h3>

          <p style={{
            fontSize: '0.95rem', color: 'var(--text-secondary)', lineHeight: '1.8',
            marginBottom: '2rem',
          }}>
            I am always looking to collaborate on complex system architectures,
            high-assurance AI pipelines, and new technology ventures.
          </p>

          {/* Primary CTA */}
          <a
            href={`mailto:${config.socials.email}?subject=Let's%20build%20something%20amazing`}
            className="btn-primary"
            style={{ marginBottom: '1.5rem', display: 'inline-flex' }}
          >
            <Mail size={18} /> Initialize Connection <ArrowRight size={14} />
          </a>

          {/* Social Links */}
          <div style={{
            display: 'flex', justifyContent: 'center', gap: '1rem',
            marginTop: '1.5rem', paddingTop: '1.5rem',
            borderTop: '1px solid var(--border)',
          }}>
            <a href={config.socials.github} target="_blank" rel="noopener noreferrer" className="social-icon-link" aria-label="GitHub">
              <Github size={18} />
            </a>
            <a href={config.socials.linkedin} target="_blank" rel="noopener noreferrer" className="social-icon-link" aria-label="LinkedIn">
              <Linkedin size={18} />
            </a>
            <a href={`mailto:${config.socials.email}`} className="social-icon-link" aria-label="Email">
              <Mail size={18} />
            </a>
          </div>

          {/* Resume */}
          <div style={{ marginTop: '1.5rem' }}>
            <a href={config.resumePath} target="_blank" rel="noopener noreferrer" className="btn-secondary" style={{ display: 'inline-flex' }}>
              <Download size={16} /> Download Resume
            </a>
          </div>

          <p style={{
            fontSize: '0.78rem', color: 'var(--text-muted)', marginTop: '1.5rem',
            fontFamily: 'var(--font-mono)',
          }}>
            {config.socials.email}
          </p>
        </div>
      </motion.div>
    </section>
  );
};

export default Contact;