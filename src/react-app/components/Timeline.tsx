import React from 'react';
import '../styles/portfolio.css';

interface TimelineEntry {
  date: string;
  title: string;
  subtitle: string;
  description: string;
  category: 'patent' | 'internship' | 'leadership' | 'research' | 'education';
}

const timelineData: TimelineEntry[] = [
  {
    date: '2024 — Present',
    title: 'Intellectual Property Filing (V.E.C.T.O.R)',
    subtitle: 'Primary Inventor — Fraud Analytics',
    description: 'Designed and filed the patent for V.E.C.T.O.R (Velocity-Enhanced Clustering for Transactional Outlier Recognition), a real-time behavioral fraud clustering system.',
    category: 'patent'
  },
  {
    date: '2024',
    title: 'AI/ML Intern — Strategy Team',
    subtitle: 'IIFL Samasta (3 Months)',
    description: 'Delivered 2 end-to-end production AI platforms (MeetingsAI and VerifAI) as a solo developer. Also contributed core logic support to 2 additional corporate analytics workflows.',
    category: 'internship'
  },
  {
    date: '2024',
    title: 'MeetingsAI / PresntAI System Delivery',
    subtitle: 'Principal Architect & Developer',
    description: 'Built an enterprise-ready meeting intelligence pipeline featuring audio normalization, Whisper-powered transcriptions, pyannote diarization, and LLM minutes extraction.',
    category: 'research'
  },
  {
    date: '2024',
    title: 'VerifAI KYC Deployment',
    subtitle: 'Principal Systems Developer',
    description: 'Designed high-assurance KYC image classification and checklist extraction system for automated loan screening, incorporating strict downgrade-first risk rules.',
    category: 'research'
  },
  {
    date: '2021 — 2024',
    title: 'Class Representative',
    subtitle: 'Student Leadership (3 Consecutive Years)',
    description: 'Elected consistently by peers to represent class interests, coordinate academic schedules with department faculties, and establish collaborative peer study systems.',
    category: 'leadership'
  },
  {
    date: '2023',
    title: 'National Digital Infrastructure Deployment',
    subtitle: 'Volunteer Leadership Coordination',
    description: 'Coordinated technology hardware and software deployment across schools in partnership with Rotary, Infosys, and regional state government bodies.',
    category: 'leadership'
  },
  {
    date: '2023',
    title: 'H.A.R.B.O.R Open-Set eDNA Research',
    subtitle: 'AI/ML Researcher',
    description: 'Authored system to infer bio-taxonomy labels from environmental DNA sequences using contrastive CNN embeddings and FAISS index similarity matching.',
    category: 'research'
  },
  {
    date: '2023',
    title: 'S.C.A.L.E Causal Analysis Research',
    subtitle: 'Causal & Systems Researcher',
    description: 'Engineered causal loop diagrams, System Dynamics, and Structural Causal Models (SCMs) simulating employment dynamics within India\'s higher education system.',
    category: 'research'
  },
  {
    date: '2022',
    title: 'Pathfinding & RTS AI Investigations',
    subtitle: 'Algorithmic Research Developer',
    description: 'Evaluated 35+ pathfinding algorithms (Flow Field, Particle Swarm, A*, Genetic Algorithms) in multi-scenario real-time dynamic pathfinding grids.',
    category: 'research'
  },
  {
    date: '2020 — 2024',
    title: 'B.E. in Computer Science & Engineering',
    subtitle: 'Academic Foundation',
    description: 'Completed engineering coursework in Data Structures, Algorithms, Databases, Operating Systems, distributed networks, and Machine Learning systems.',
    category: 'education'
  }
];

const Timeline: React.FC = () => {
  const getCategoryColor = (cat: string) => {
    switch (cat) {
      case 'patent': return 'var(--gold)';
      case 'internship': return '#34d399'; // green
      case 'research': return '#60a5fa'; // blue
      case 'leadership': return '#fbbf24'; // amber
      default: return 'var(--charcoal-muted)';
    }
  };

  return (
    <section id="timeline" className="section-container">
      <div className="section-header">
        <span className="section-tag">Milestones & History</span>
        <h2 className="section-title">Timeline of Innovation</h2>
        <p className="section-subtitle">
          A chronological trace of engineered architectures, academic research investigations, and organizational leadership positions.
        </p>
      </div>

      <div className="timeline-wrapper">
        <div className="timeline-line"></div>
        
        {timelineData.map((item, idx) => (
          <div key={idx} className="timeline-item">
            <div className="timeline-dot" style={{ borderColor: getCategoryColor(item.category) }}>
              <div className="timeline-dot-inner" style={{ backgroundColor: getCategoryColor(item.category) }}></div>
            </div>
            
            <span className="timeline-date">{item.date}</span>
            
            <div className="ivory-card timeline-card hover-gold-card">
              <h3 className="timeline-item-title">{item.title}</h3>
              <div className="timeline-item-subtitle">{item.subtitle}</div>
              <p className="timeline-item-desc">{item.description}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Timeline;
