import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Linkedin, Github, Mail, Globe, FileText, ArrowRight } from 'lucide-react';
import '../styles/portfolio.css';

const Hero: React.FC = () => {
  const navigate = useNavigate();

  const handleExplore = () => {
    navigate('/about');
  };

  return (
    <section id="hero" className="hero-wrapper">
      <div className="hero-content animate-fade-up">
        <div className="hero-eyebrow">Innovation & Systems Engineering</div>
        
        <h1 className="hero-name">Chirag Hariprasad</h1>
        
        <div className="hero-title-container">
          <span className="hero-title-pill">Inventor</span>
          <span className="hero-title-pill">AI/ML Systems Researcher</span>
          <span className="hero-title-pill">Real-Time Systems Architect</span>
        </div>
        
        <p className="hero-subtitle">
          Building intelligence that operates. Specializing in high-performance anomaly detection, 
          generative urban simulation, MLOps orchestration, and patent-filed transaction intelligence systems.
        </p>
        
        <div className="hero-cta-group">
          <button onClick={handleExplore} className="btn-primary">
            Explore Portfolio
            <ArrowRight size={16} />
          </button>
          
          <a href="/Resume.pdf" target="_blank" rel="noopener noreferrer" className="btn-secondary">
            <FileText size={16} />
            Download Resume
          </a>
        </div>
        
        <div className="hero-socials">
          <a 
            href="https://linkedin.com/in/chirag-hariprasad/" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="social-icon-link"
            aria-label="LinkedIn"
          >
            <Linkedin size={22} />
          </a>
          <a 
            href="https://github.com/ChiragHariprasad" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="social-icon-link"
            aria-label="GitHub"
          >
            <Github size={22} />
          </a>
          <a 
            href="mailto:chiragh.0804@gmail.com" 
            className="social-icon-link"
            aria-label="Email"
          >
            <Mail size={22} />
          </a>
          <a 
            href="https://080405.tech" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="social-icon-link"
            aria-label="Website"
          >
            <Globe size={22} />
          </a>
        </div>
      </div>
    </section>
  );
};

export default Hero;
