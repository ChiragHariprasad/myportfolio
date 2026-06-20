import React, { useState, useEffect, useRef } from 'react';
import { Award, BookOpen, Briefcase, Zap } from 'lucide-react';
import '../styles/portfolio.css';

interface TimelineEntry {
  date: string;
  title: string;
  subtitle: string;
  description: string;
  category: 'patent' | 'research' | 'internship';
}

const timelineData: TimelineEntry[] = [
  {
    date: 'Dec 2024',
    title: 'Hospital Management System (C)',
    subtitle: 'Systems Programmer',
    description: 'Terminal-based integrated hospital management system in C with patient lifecycle management, billing workflows, and synthetic data generation for scale testing.',
    category: 'research'
  },
  {
    date: 'Jan 2025',
    title: 'Gesture-Controlled Smart Home System',
    subtitle: 'Computer Vision & IoT Developer',
    description: 'Real-time gesture recognition via OpenCV controlling Arduino-based home automation hardware through serial communication.',
    category: 'research'
  },
  {
    date: 'Apr 2025',
    title: 'AgeOfEmpire / Pathfinding Suite',
    subtitle: 'Algorithmic Research Developer',
    description: 'Benchmarked 35+ pathfinding algorithms across multi-scenario testbeds. Flow Field and ACO achieved 100% success rate in dynamic obstacle environments.',
    category: 'research'
  },
  {
    date: 'Jul 2025',
    title: 'W.A.N.T.E.D — Crime Pattern Analysis',
    subtitle: 'AI/ML Systems Developer',
    description: 'Cloud-native crime intelligence system introducing Crime Genome vectorized profiling with GPU-accelerated anomaly detection and geospatial visualization.',
    category: 'research'
  },
  {
    date: 'Aug 2025',
    title: 'I.Q.R.S. — RAG Document Intelligence',
    subtitle: 'AI/ML Systems Developer',
    description: 'End-to-end Retrieval-Augmented Generation platform converting unstructured PDFs into searchable intelligence with FAISS retrieval and grounded QA.',
    category: 'research'
  },
  {
    date: '3 Oct 2025',
    title: 'V.E.C.T.O.R — Patent Published',
    subtitle: 'Primary Inventor — Fraud Analytics',
    description: 'Patent published for Velocity-Enhanced Clustering for Transactional Outlier Recognition. Real-time behavioral fraud detection with persona-specific anomaly models.',
    category: 'patent'
  },
  {
    date: 'Feb 2026',
    title: 'IHORMS/IHORMS-X + HARBOR Completed',
    subtitle: 'Full-Stack & ML Developer',
    description: 'Delivered multi-tenant hospital platform (8-role RBAC) and open-set eDNA taxonomy inference system with contrastive CNN embeddings and FAISS retrieval.',
    category: 'research'
  },
  {
    date: 'Mar 2026',
    title: 'VerifAI — Deployed at IIFL Samasta',
    subtitle: 'AI Systems Developer — IIFL Samasta',
    description: 'Designed and deployed high-assurance KYC document verification with strict downgrade-first fraud logic, Gemini Vision OCR, and full audit trail exports.',
    category: 'internship'
  },
  {
    date: '27 Mar 2026',
    title: 'GENESIS — Patent Published',
    subtitle: 'Primary Inventor — Urban AI',
    description: 'Patent published for Generative Engine for Networked, Embedded, Spatial Infrastructure Synthesis. Automated code-compliant urban layout generation.',
    category: 'patent'
  },
  {
    date: 'May 2026',
    title: 'MeetingsAI — On-Prem Meeting Intelligence (IIFL Samasta)',
    subtitle: 'Principal Architect & Developer — IIFL Samasta',
    description: 'Enterprise meeting pipeline: transcription, diarization, speaker identification, MoM generation, and auto-email distribution. Merged prior PresntAI and MeetingsAI projects.',
    category: 'internship'
  },
  {
    date: '29 May 2026',
    title: 'O.R.I.O.N. + Presentation Automation — Patents Published',
    subtitle: 'Co-Inventor',
    description: 'Two patents published: Omni-Retail Intelligence & Ordering Network, and Context-Aware Adaptive Presentation Automation System with Semantic Navigation.',
    category: 'patent'
  },
  {
    date: '10 Jun 2026',
    title: 'S.C.A.L.E. — IEEE Access Published',
    subtitle: 'Lead Researcher',
    description: '"Unbalanced Expansion of Engineering Education in India: A Data-Driven Policy Analysis" published in IEEE Access (Early Access). DOI: 10.1109/ACCESS.2026.3704923.',
    category: 'patent'
  },
  {
    date: 'Jun 2026',
    title: 'PROMETHEUS — Customer Digital Twins Completed',
    subtitle: 'AI/ML Systems Architect',
    description: 'AI Customer Futures platform with real-time omnichannel intelligence, churn/LTV prediction, semantic memory, and Monte Carlo campaign simulation.',
    category: 'research'
  },
  {
    date: 'Jun 2026',
    title: 'DEEP, Adaptive Pedagogy, AeroWeight — In Progress',
    subtitle: 'Active Research & Development',
    description: 'Three active projects: DEEP/HARBOR V2 (cloud-native eDNA), Adaptive Pedagogy (IRT-based EdTech), and AeroWeight (multi-cloud data gravity routing).',
    category: 'research'
  }
];

const categoryIcons: Record<string, React.ReactNode> = {
  patent: <Award size={14} />,
  research: <BookOpen size={14} />,
  internship: <Briefcase size={14} />
};

const getBorderClass = (cat: string) => {
  switch (cat) {
    case 'patent': return 'patent-border';
    case 'research': return 'research-border';
    case 'internship': return 'internship-border';
    default: return '';
  }
};

const Timeline: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [activeFilter, setActiveFilter] = useState<'all' | 'patent' | 'research' | 'internship'>('all');
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const filteredData = activeFilter === 'all'
    ? timelineData
    : timelineData.filter(item => item.category === activeFilter);

  return (
    <section id="timeline" ref={sectionRef} className="section-container">
      <div className={isVisible ? 'animate-fade-up' : ''} style={{ animationDelay: isVisible ? '0.1s' : '0s' }}>
        <div className="section-header">
          <span className="section-tag">Milestones & History</span>
          <h2 className="section-title">Timeline of Innovation</h2>
          <p className="section-subtitle">
            A chronological trace of engineered architectures, published patents, research investigations, and industry deployments.
          </p>
        </div>
      </div>

      <div className={isVisible ? 'animate-fade-up' : ''} style={{ animationDelay: isVisible ? '0.2s' : '0s' }}>
        <div className="timeline-filter-bar">
          {(['all', 'patent', 'research', 'internship'] as const).map((filter) => (
            <button
              key={filter}
              className={`timeline-filter-btn ${activeFilter === filter ? 'active' : ''}`}
              onClick={() => setActiveFilter(filter)}
            >
              {filter === 'all' ? 'All Events' : filter === 'patent' ? 'Patents' : filter === 'research' ? 'Research' : 'Internship'}
            </button>
          ))}
        </div>
      </div>

      <div className={isVisible ? 'animate-fade-up' : ''} style={{ animationDelay: isVisible ? '0.3s' : '0s' }}>
        <div className="timeline-single-col">
          <div className="timeline-line"></div>

          {filteredData.map((item, idx) => (
            <div
              key={idx}
              className="timeline-single-entry timeline-entry-stagger"
              style={{ animationDelay: `${0.1 + idx * 0.06}s` }}
            >
              <div className="timeline-entry-dot" style={{ borderColor: item.category === 'patent' ? 'var(--gold)' : item.category === 'research' ? '#60a5fa' : '#34d399' }}>
                <div className="timeline-entry-dot-inner" style={{ backgroundColor: item.category === 'patent' ? 'var(--gold)' : item.category === 'research' ? '#60a5fa' : '#34d399' }}></div>
              </div>

              <div className={`ivory-card timeline-entry-card hover-gold-card ${getBorderClass(item.category)}`}>
                <span className="timeline-entry-date">{item.date}</span>
                <h3 className="timeline-entry-title">{item.title}</h3>
                <div className="timeline-entry-subtitle">{item.subtitle}</div>
                <p className="timeline-entry-desc">{item.description}</p>
                <span className={`timeline-category-badge ${item.category}`}>
                  {categoryIcons[item.category]}
                  {item.category}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Timeline;
