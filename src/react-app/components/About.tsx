import React from 'react';
import { motion } from 'framer-motion';
import { computeStats } from '../data/statsEngine';
import { getTechWithCounts } from '../data/contentLoader';
import '../styles/portfolio.css';

const About: React.FC = () => {
  const stats = computeStats();
  const topTech = getTechWithCounts().slice(0, 12);

  return (
    <section className="section-container" id="about">
      <motion.div className="section-header"
        initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <span className="section-tag">Executive Summary</span>
        <h2 className="section-title">About Me</h2>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.5 }}
      >
        <p className="about-statement">
          I'm <span className="accent">Chirag</span>, an AI/ML Systems Engineer
          who builds end-to-end intelligent systems that don't just predict ...
          they <span className="accent">operate</span>.
        </p>

        <p className="about-bio">
          My work sits at the intersection of machine learning, automation, and
          production-grade software engineering. I've shipped {stats.totalProjects} projects
          across fraud detection, urban simulation, healthcare operations,
          biodiversity inference, and meeting intelligence. And always with a focus on
          scalability, reliability, and real-world constraints.
        </p>

        <p className="about-bio">
          I hold {stats.totalPatents} published patents and an IEEE Access publication
          in causal policy analysis, spanning {stats.totalDomains}+ domains
          with {stats.totalTechnologies}+ unique technologies.
        </p>

        <p className="about-bio" style={{ fontStyle: 'italic', opacity: 0.8 }}>
          My edge is execution: I don't just build "models". I build systems, complete
          with data flow orchestration, monitoring metrics, fail-safes, explainability,
          and deployment-ready artifacts.
        </p>
      </motion.div>

      {/* Competency Pills — auto-generated from top tech */}
      <motion.div
        className="about-competencies"
        initial={{ opacity: 0 }} animate={{ opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.5 }}
      >
        {topTech.map((tech, i) => (
          <span key={i} className="about-competency-pill">{tech.name}</span>
        ))}
      </motion.div>
    </section>
  );
};

export default About;