import React, { useState, useEffect, useRef } from 'react';
import { Award, BookOpen, Briefcase, GraduationCap } from 'lucide-react';
import '../styles/portfolio.css';

interface TimelineEntry {
  date: string;
  title: string;
  subtitle: string;
  description: string;
  category: 'patent' | 'internship' | 'leadership' | 'research' | 'education';
  major: boolean;
}

const timelineData: TimelineEntry[] = [
  {
    date: '31 Aug 2021 - May 2024',
    title: 'SJP — Sri Jayachamarajendra Government Polytechnic, Bengaluru',
    subtitle: 'Diploma in Engineering',
    description: 'Completed polytechnic education forming the engineering foundation.',
    category: 'education',
    major: false
  },
  {
    date: '15 Jan 2024 - 4 Feb 2024',
    title: 'Globle Tech Fortune Industries Pvt. Ltd.',
    subtitle: 'Quality Assurance Intern',
    description: 'Quality assurance engineering internship gaining industrial experience in manufacturing quality processes.',
    category: 'internship',
    major: false
  },
  {
    date: '23 Jul 2024',
    title: 'RVCE — Rashtreeya Vidyalaya College of Engineering',
    subtitle: 'B.E. in Computer Science & Engineering',
    description: 'Admission into the undergraduate engineering program at RV College of Engineering, Bengaluru.',
    category: 'education',
    major: false
  },
  {
    date: '2024 - Present',
    title: 'Intellectual Property Filing (V.E.C.T.O.R)',
    subtitle: 'Primary Inventor — Fraud Analytics',
    description: 'Designed and filed the patent for V.E.C.T.O.R (Velocity-Enhanced Clustering for Transactional Outlier Recognition), a real-time behavioral fraud clustering system.',
    category: 'patent',
    major: true
  },
  {
    date: '2024',
    title: 'AI/ML Intern — Strategy Team',
    subtitle: 'IIFL Samasta (3 Months)',
    description: 'Delivered 2 end-to-end production AI platforms (MeetingsAI and VerifAI) as a solo developer. Also contributed core logic support to 2 additional corporate analytics workflows.',
    category: 'internship',
    major: false
  },
  {
    date: '2024',
    title: 'MeetingsAI / VerifAI System Delivery',
    subtitle: 'Principal Architect & Developer — IIFL Samasta',
    description: 'Built enterprise meeting intelligence pipeline (transcription, diarization, MoM) and high-assurance KYC document verification system with strict fraud guardrails.',
    category: 'research',
    major: false
  },
  {
    date: '2021 - 2024',
    title: 'Class Representative',
    subtitle: 'Student Leadership (3 Consecutive Years)',
    description: 'Elected consistently by peers to represent class interests, coordinate academic schedules with department faculties, and establish collaborative peer study systems.',
    category: 'leadership',
    major: false
  },
  {
    date: '3 Oct 2025',
    title: 'V.E.C.T.O.R — Patent Published',
    subtitle: 'Primary Inventor — Fraud Analytics',
    description: 'Patent published for Velocity-Enhanced Clustering for Transactional Outlier Recognition. Real-time behavioral fraud detection with persona-specific anomaly models.',
    category: 'patent',
    major: true
  },
  {
    date: '19 Nov 2025 - 13 May 2026',
    title: 'IIFL Samasta — AIML Development Intern',
    subtitle: 'Strategy Department',
    description: 'Extended AIML development internship focused on deploying production AI systems for financial services.',
    category: 'internship',
    major: false
  },
  {
    date: '27 Mar 2026',
    title: 'GENESIS — Patent Published',
    subtitle: 'Primary Inventor — Urban AI',
    description: 'Patent published for Generative Engine for Networked, Embedded, Spatial Infrastructure Synthesis. Automated code-compliant urban layout generation.',
    category: 'patent',
    major: true
  },
  {
    date: '29 May 2026',
    title: 'O.R.I.O.N. + Presentation Automation — Patents Published',
    subtitle: 'Co-Inventor',
    description: 'Two patents published: Omni-Retail Intelligence & Ordering Network, and Context-Aware Adaptive Presentation Automation System with Semantic Navigation.',
    category: 'patent',
    major: true
  },
  {
    date: '10 Jun 2026',
    title: 'S.C.A.L.E. — IEEE Access Published',
    subtitle: 'Lead Researcher',
    description: '"Unbalanced Expansion of Engineering Education in India: A Data-Driven Policy Analysis" published in IEEE Access (Early Access). DOI: 10.1109/ACCESS.2026.3704923.',
    category: 'patent',
    major: true
  },
  {
    date: 'Jun 2026',
    title: 'PROMETHEUS — Customer Digital Twins Completed',
    subtitle: 'AI/ML Systems Architect',
    description: 'AI Customer Futures platform with real-time omnichannel intelligence, churn/LTV prediction, semantic memory, and Monte Carlo campaign simulation.',
    category: 'research',
    major: false
  }
];

const Timeline: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
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

  const getCategoryColor = (cat: string) => {
    switch (cat) {
      case 'patent': return 'var(--gold)';
      case 'internship': return '#34d399';
      case 'research': return '#60a5fa';
      case 'leadership': return '#fbbf24';
      case 'education': return '#a78bfa';
      default: return 'var(--charcoal-muted)';
    }
  };

  return (
    <section id="timeline" ref={sectionRef} className="section-container">
      <div className={isVisible ? 'animate-fade-up' : ''} style={{ animationDelay: isVisible ? '0.1s' : '0s' }}>
        <div className="section-header">
          <span className="section-tag">Milestones & History</span>
          <h2 className="section-title">Timeline of Innovation</h2>
          <p className="section-subtitle">
            A chronological trace of engineered architectures, published patents, research investigations, academic milestones, and professional experience.
          </p>
        </div>
      </div>

      <div className={isVisible ? 'animate-fade-up' : ''} style={{ animationDelay: isVisible ? '0.3s' : '0s' }}>
        <div className="timeline-wrapper">
          <div className="timeline-line"></div>

          {timelineData.map((item, idx) => (
            <div key={idx} className={`timeline-item ${item.major ? 'timeline-item-major' : ''}`}>
              <div className="timeline-dot" style={{ borderColor: getCategoryColor(item.category) }}>
                <div className="timeline-dot-inner" style={{ backgroundColor: getCategoryColor(item.category) }}></div>
              </div>

              <span className="timeline-date">
                {item.major && <Award size={12} style={{ display: 'inline', marginRight: '0.3rem', verticalAlign: 'middle' }} />}
                {item.date}
              </span>

              <div className={`ivory-card timeline-card hover-gold-card ${item.major ? 'timeline-card-major' : ''}`}>
                <h3 className="timeline-item-title">{item.title}</h3>
                <div className="timeline-item-subtitle">{item.subtitle}</div>
                <p className="timeline-item-desc">{item.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Timeline;
