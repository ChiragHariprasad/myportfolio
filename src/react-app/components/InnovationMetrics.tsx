import React from 'react';
import { motion } from 'framer-motion';
import { computeStats } from '../data/statsEngine';
import '../styles/portfolio.css';

/** Animated counter hook */
function useCounter(target: number, duration: number = 1500) {
  const [count, setCount] = React.useState(0);
  const [started, setStarted] = React.useState(false);
  const ref = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started) {
          setStarted(true);
        }
      },
      { threshold: 0.3 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [started]);

  React.useEffect(() => {
    if (!started) return;
    let start = 0;
    const increment = target / (duration / 16);
    const timer = setInterval(() => {
      start += increment;
      if (start >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 16);
    return () => clearInterval(timer);
  }, [started, target, duration]);

  return { count, ref };
}

const InnovationMetrics: React.FC = () => {
  const stats = computeStats();

  const metrics = [
    { label: 'Projects', value: stats.totalProjects, desc: 'Shipped across AI, Backend, Research' },
    { label: 'Patents', value: stats.totalPatents, desc: 'Published patent applications' },
    { label: 'Publications', value: stats.totalPublications, desc: 'IEEE Access journal paper' },
    { label: 'Technologies', value: stats.totalTechnologies, desc: 'Unique tools & frameworks used' },
    { label: 'Domains', value: stats.totalDomains, desc: 'Cross-domain expertise areas' },
    { label: 'Internships', value: stats.internships, desc: 'Production deployments' },
  ];

  return (
    <section className="section-container" id="metrics">
      <motion.div className="section-header"
        initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }} transition={{ duration: 0.5 }}
      >
        <span className="section-tag">By The Numbers</span>
        <h2 className="section-title">Innovation Metrics</h2>
        <p className="section-subtitle">
          Every number computed live from project data. Nothing hardcoded.
        </p>
      </motion.div>

      <div className="metrics-grid">
        {metrics.map((m, i) => (
          <MetricCounter key={m.label} metric={m} delay={i * 0.1} />
        ))}
      </div>
    </section>
  );
};

interface MetricProps {
  metric: { label: string; value: number; desc: string };
  delay: number;
}

const MetricCounter: React.FC<MetricProps> = ({ metric, delay }) => {
  const { count, ref } = useCounter(metric.value);

  return (
    <motion.div
      ref={ref}
      className="metric-card"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay, duration: 0.4 }}
    >
      <div className="metric-num">{count}</div>
      <div className="metric-label">{metric.label}</div>
      <div className="metric-desc">{metric.desc}</div>
    </motion.div>
  );
};

export default InnovationMetrics;
