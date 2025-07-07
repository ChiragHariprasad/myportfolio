import React, { useState, useEffect, useRef } from 'react';
import { ExternalLink, Shield, Zap, Activity } from 'lucide-react';
import TypingEffect from './TypingEffect';
import styles from '../styles/Projects.module.css';
import terminalStyles from '../styles/Terminal.module.css';

interface Project {
  id: string;
  title: string;
  status: 'confidential' | 'active' | 'completed';
  description: string;
  features?: string[];
  tech: string[];
  link?: string;
  confidential?: boolean;
}

const projects: Project[] = [
  {
    id: 'vector',
    title: 'V.E.C.T.O.R – Real-Time Fraud Detection System',
    status: 'confidential',
    description: 'Advanced fraud detection system with patent-pending technology.',
    tech: ['Redis', 'MongoDB', 'Python', 'JavaScript'],
    confidential: true
  },
  {
    id: 'inventory',
    title: 'O.R.I.O.N - Omni Retail Intelligence Ordering Network',
    status: 'completed',
    description: 'End-to-end inventory optimization for grocery chains using AI. ML models forecast demand, classify customer behavior, and detect anomalies. Predictive assistant fetches recipes, syncs user inventory, triggers proactive store orders.',
    features: [
      'Demand forecasting with ML models',
      'Customer behavior classification',
      'Anomaly detection for inventory spikes',
      'Context-aware logic for festivals and trends',
      'Recipe-based inventory recommendations'
    ],
    tech: ['Python', 'ML', 'REST APIs', 'Analytics Pipeline']
  },
  {
    id: 'wanted',
    title: 'W.A.N.T.E.D – Crime Analytics & Simulation Platform',
    status: 'completed',
    description: 'An AI platform to simulate how crimes evolve across demographics with advanced vector-based analysis.',
    features: [
      'Crime Genome (vectorized crime profile modeling)',
      'Demographic Transition Models',
      'Semantic Vector-Based Search using Sentence Transformers',
      'GPU-accelerated Anomaly Detection using cuML/cuDF',
      'Interactive heatmaps and network graphs'
    ],
    tech: ['MongoDB Atlas', 'FastAPI', 'Firebase Hosting', 'Plotly', 'NetworkX', 'cuML'],
    link: 'https://youtu.be/OHKePrZGpeg'
  },
  {
  id: 'pathfinding',
  title: 'Pathfinding Benchmark & AI Simulation – RTS-Inspired Tactical Engine',
  status: 'completed',
  description: 'Real-time game environment to benchmark 35+ pathfinding algorithms under fog-of-war, dynamic obstacles, and agent evolution. Flow Field and A* embedded into gameplay to evaluate efficiency, adaptability, and responsiveness.',
  features: [
    'Benchmarking suite for 35+ algorithms (A*, Dijkstra, Flow Field, ACO, PSO, etc.)',
    'Real-time game: PROJECT RESCUE RUN with enemy AI evolving from DFS → BFS → A*',
    'Multi-agent navigation with terrain-aware path selection and live strategy switching',
    'Fog-of-war simulation, dynamic obstacles, and player-NPC rescue mechanics',
    'Comparative success rate, memory usage, and decision latency analysis'
  ],
  tech: ['Python', 'PyGame', 'Flow Field', 'A*', 'DFS', 'NumPy', 'RTS AI']
},
  {
    id: 'traffic',
    title: 'Urban Traffic Swarm Intelligence System',
    status: 'active',
    description: 'Uses Ant Colony Optimization to dynamically control traffic lights and react to real-time congestion.',
    features: [
      'Real-time traffic light optimization',
      'Emergency vehicle priority routing',
      'Dynamic congestion response',
      'Live traffic monitoring dashboard'
    ],
    tech: ['ACO Algorithms', 'Live Dashboards', 'Real-Time Routing', 'Web APIs']
  },
  {
    id: 'gesture',
    title: 'Gesture-Controlled Smart Home System',
    status: 'completed',
    description: 'Real-time gesture recognition system using computer vision to control Arduino-based home automation.',
    features: [
      'Real-time gesture recognition via webcam',
      'Arduino-triggered automation',
      'Multi-gesture support with noise filtering',
      'Optimized for low latency response'
    ],
    tech: ['Python', 'OpenCV', 'Arduino', 'Serial Communications']
  },
  {
    id: 'hospital',
    title: 'Emergency Hospital Resource Management System',
    status: 'completed',
    description: 'Intelligent triage system using priority queues and patient condition scoring for optimal resource allocation.',
    features: [
      'Intelligent patient triage with priority scoring',
      'Specialist mapping based on urgency',
      'Resource rebalancing algorithms',
      'Concurrency-safe processing'
    ],
    tech: ['C', 'Data Structures & Algorithms', 'Multithreaded Simulation']
  }
];

const Projects: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [showContent, setShowContent] = useState(false);
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

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'confidential':
        return <Shield size={16} />;
      case 'active':
        return <Activity size={16} />;
      case 'completed':
        return <Zap size={16} />;
      default:
        return null;
    }
  };

  return (
    <section ref={sectionRef} className={styles.projects}>
      <div className={terminalStyles.prompt}>
        {isVisible && (
          <TypingEffect
            text="chirag@portfolio:~$ ls ~/projects/ -l"
            speed={60}
            onComplete={() => setShowContent(true)}
          />
        )}
      </div>

      {showContent && (
        <div className={styles.projectsGrid}>
          {projects.map((project, index) => (
            <div
              key={project.id}
              className={styles.projectCard}
              style={{ animationDelay: `${index * 0.2}s` }}
            >
              {project.confidential && (
                <div className={styles.confidentialOverlay}>
                  <div>🔒 SYSTEM STATUS: CONFIDENTIAL</div>
                  <div>ACCESS: DENIED</div>
                  <div>PATENT PENDING...</div>
                </div>
              )}

              <div className={styles.projectTitle}>
                {getStatusIcon(project.status)}
                <span 
                  className={styles.glitch}
                  data-text={project.title}
                >
                  {project.title}
                </span>
                <div className={`${styles.projectStatus} ${styles[`status${project.status.charAt(0).toUpperCase() + project.status.slice(1)}`]}`}>
                  {project.status.toUpperCase()}
                </div>
              </div>

              <div className={styles.projectDescription}>
                {project.confidential ? (
                  <div className={styles.redacted}>
                    {project.description}
                  </div>
                ) : (
                  project.description
                )}
              </div>

              {project.features && !project.confidential && (
                <ul className={styles.projectFeatures}>
                  {project.features.map((feature, idx) => (
                    <li key={idx}>{feature}</li>
                  ))}
                </ul>
              )}

              <div className={styles.projectTech}>
                {project.tech.map((tech, idx) => (
                  <span key={idx} className={styles.techTag}>
                    {tech}
                  </span>
                ))}
              </div>

              {project.link && !project.confidential && (
                <a 
                  href={project.link} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className={styles.projectLink}
                >
                  <ExternalLink size={16} />
                  Watch Demo
                </a>
              )}
            </div>
          ))}
        </div>
      )}
    </section>
  );
};

export default Projects;
