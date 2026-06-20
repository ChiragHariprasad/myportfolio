import React, { useState, useEffect, useRef } from 'react';
import { Award, Briefcase, Code, FileSpreadsheet, GitBranch, Layers } from 'lucide-react';
import '../styles/portfolio.css';

interface MetricItem {
  label: string;
  value: number;
  suffix: string;
  desc: string;
  icon: React.ReactNode;
}

const metricsData: MetricItem[] = [
  {
    label: 'Published Patents',
    value: 4,
    suffix: '',
    desc: 'Fraud detection, urban AI, retail, presentation automation',
    icon: <Award size={24} />
  },
  {
    label: 'Research Areas',
    value: 14,
    suffix: '',
    desc: 'Fraud ML, eDNA, causal inference, urban synthesis, audio AI, retail, digital twins, CV, healthcare, game AI, crime intel, edtech, cloud infra, presentation AI',
    icon: <FileSpreadsheet size={24} />
  },
  {
    label: 'Major Projects',
    value: 17,
    suffix: '',
    desc: 'End-to-end deployed systems',
    icon: <Briefcase size={24} />
  },
  {
    label: 'Open Source Repos',
    value: 10,
    suffix: '+',
    desc: 'GitHub codebases & utilities',
    icon: <GitBranch size={24} />
  },
  {
    label: 'Technical Domains',
    value: 9,
    suffix: '',
    desc: 'Languages, ML, backend, vector search, DevOps, simulation, cloud, audio AI, CV',
    icon: <Layers size={24} />
  },
  {
    label: 'Major Milestones',
    value: 14,
    suffix: '',
    desc: 'Patents, IEEE publication, deployments, leadership',
    icon: <Code size={24} />
  }
];

const MetricCard: React.FC<{ metric: MetricItem; isVisible: boolean }> = ({ metric, isVisible }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!isVisible) return;
    
    let start = 0;
    const end = metric.value;
    const duration = 1500; // ms
    const stepTime = Math.abs(Math.floor(duration / end));
    
    const timer = setInterval(() => {
      start += 1;
      if (start >= end) {
        setCount(end);
        clearInterval(timer);
      } else {
        setCount(start);
      }
    }, Math.max(stepTime, 20));

    return () => clearInterval(timer);
  }, [isVisible, metric.value]);

  return (
    <div className="metric-card">
      <div style={{ color: 'var(--gold)', marginBottom: '0.75rem', display: 'flex', justifyContent: 'center' }}>
        {metric.icon}
      </div>
      <div className="metric-num">
        {count}
        {metric.suffix}
      </div>
      <div className="metric-label">{metric.label}</div>
      <div className="metric-desc">{metric.desc}</div>
    </div>
  );
};

const InnovationMetrics: React.FC = () => {
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

  return (
    <section id="metrics" ref={sectionRef} className="section-container">
      <div className="section-header">
        <span className="section-tag">Key Statistics</span>
        <h2 className="section-title">Impact Metrics</h2>
        <p className="section-subtitle">
          Quantifiable indicators of research throughput, codebase complexity, and shipped software assets.
        </p>
      </div>

      <div className="metrics-grid">
        {metricsData.map((metric, idx) => (
          <MetricCard key={idx} metric={metric} isVisible={isVisible} />
        ))}
      </div>
    </section>
  );
};

export default InnovationMetrics;
