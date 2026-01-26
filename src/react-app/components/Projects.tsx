import React, { useState, useEffect, useRef } from 'react';
import { ExternalLink, Shield, Zap, Activity, Award } from 'lucide-react';
import TypingEffect from './TypingEffect';
import styles from '../styles/Projects.module.css';
import terminalStyles from '../styles/Terminal.module.css';

interface Project {
  id: string;
  title: string;
  status: 'confidential' | 'active' | 'completed' | 'patented';
  description: string;
  features?: string[];
  tech: string[];
  link?: string;
  confidential?: boolean;
}

const projects: Project[] = [
  // =========================
  // PATENTED / PUBLISHED
  // =========================
  {
    id: 'vector',
    title: 'V.E.C.T.O.R — Velocity-Enhanced Clustering for Transactional Outlier Recognition',
    status: 'patented',
    description: 'Real-time fraud detection system with behavior-adaptive clustering, persona-specific anomaly models, and <100ms streaming architecture. Developed a novel approach to clustering which is currently under patent filing.',
    features: [
      'Behavior-adaptive clustering algorithms',
      'Persona-specific anomaly detection models',
      'Ultra-low latency streaming architecture (<100ms)',
      'Novel transactional outlier recognition logic'
    ],
    tech: ['Redis Streams', 'MongoDB', 'UMAP', 'HDBSCAN', 'Isolation Forest', 'XGBoost'],
  },

  // =========================
  // CONFIDENTIAL
  // =========================
  {
    id: 'orion',
    title: 'O.R.I.O.N — Omni Retail Intelligence Ordering Network',
    status: 'confidential',
    description: 'AI-driven bidirectional consumer-retailer intelligence with recipe-based consumption modeling, festive forecasting, persona segmentation, and containerized distributed execution.',
    tech: ['Python', 'FastAPI', 'PostgreSQL', 'MongoDB', 'Prophet', 'Docker', 'scikit-learn'],
    confidential: true
  },
  {
    id: 'genesis',
    title: 'G.E.N.E.S.I.S — Generative Engine for Urban Planning',
    status: 'confidential',
    description: 'Rule-aware generative system converting site boundaries into code-compliant city layouts with multi-domain simulations (traffic, drainage, wind) and KPI-based ranking.',
    tech: ['Python', 'Shapely', 'NetworkX', 'NumPy', 'Streamlit', 'pyproj', 'Folium'],
    confidential: true
  },

  // =========================
  // ACTIVE
  // =========================
  {
    id: 'meetingsai',
    title: 'MeetingsAI — On-Prem Meeting Intelligence Platform',
    status: 'active',
    description: 'Enterprise meeting intelligence with in-UI recording, automated transcription, speaker diarization, MoM generation, and auto-email stakeholder delivery.',
    features: [
      'In-UI recording with audio standardization',
      'Real-time transcription (faster-whisper + VAD)',
      'Speaker diarization + recognition (pyannote + ECAPA)',
      'Multi-LLM analysis pipeline (Vicuna, DeepSeek, Llama3)',
      'Auto-email MoM delivery to participants',
      'Professional PDF report generation'
    ],
    tech: ['Python', 'Flask', 'pyannote', 'faster-whisper', 'SpeechBrain', 'Ollama', 'FFmpeg']
  },
  {
    id: 'verifai',
    title: 'VerifAI — AI-Powered KYC Document Verification',
    status: 'active',
    description: 'High-assurance KYC verification for IIFL Samasta with strict downgrade-first fraud logic, side detection, confidence scoring, and audit-ready exports.',
    features: [
      'Document side detection (FRONT/BACK/UNKNOWN)',
      'Multi-class fraud classification with confidence scoring',
      'Strict "no guessing" downgrade-first validation',
      'OCR + translation pipeline (Gemini Vision)',
      'Verification checklist with boolean checks',
      'PDF/CSV/JSON export + audit logging'
    ],
    tech: ['Python', 'Flask', 'Gemini Vision', 'ReportLab', 'OCR', 'Base64']
  },

  // =========================
  // COMPLETED
  // =========================
  {
    id: 'harbor',
    title: 'H.A.R.B.O.R — Biodiversity DNA Recognition System',
    status: 'completed',
    description: 'Open-set eDNA taxonomy inference with alignment-free processing, marker-aware CNN embeddings, FAISS similarity search, and statistical novelty detection.',
    features: [
      'Multi-stage hybrid inference (deterministic → neural → statistical)',
      'Marker-specific CNN embeddings with contrastive learning',
      'FAISS high-throughput ANN retrieval (2.8GB+ reference DB)',
      'Statistical novelty detection for unknown species',
      'MLOps: DVC versioning, W&B tracking, Docker containers'
    ],
    tech: ['Python', 'PyTorch', 'FAISS', 'BioPython', 'FastAPI', 'XGBoost', 'DVC', 'W&B']
  },
  {
    id: 'scale',
    title: 'S.C.A.L.E — Structural Causal Analysis of Labor & Education',
    status: 'completed',
    description: 'Causal simulation of India\'s engineering education system with unified SD+SCM+ABM architecture, historical replay (2010-2024), and counterfactual policy evaluation.',
    features: [
      'Unified System Dynamics + SCM + ABM architecture',
      'Policy boomerang effect modeling (seat expansion feedback)',
      'Historical replay validation with trend matching',
      'Counterfactual scenario engine (5 policy regimes)',
      'Quantified causal effect: ATE = 0.448'
    ],
    tech: ['Python', 'Pandas', 'Matplotlib', 'System Dynamics', 'SCM', 'Monte Carlo']
  },
  {
    id: 'ihorms',
    title: 'IHORMS — Hospital Operations & Resource Management',
    status: 'completed',
    description: 'Multi-tenant hospital platform with 8-role RBAC, clinical workflows, telemetry monitoring, and billing/insurance/pharmacy integration.',
    features: [
      'Multi-tenant org/branch architecture with isolation',
      '8-role RBAC (super_admin to patient)',
      'Clinical workflow automation (appointments, prescriptions)',
      'ICU telemetry monitoring with alerts',
      'Billing + insurance + pharmacy workflows'
    ],
    tech: ['FastAPI', 'React', 'PostgreSQL', 'TypeScript', 'TailwindCSS', 'React Query']
  },
  {
    id: 'presntai',
    title: 'PresntAI — Meeting Intelligence + Minutes Generator',
    status: 'completed',
    description: 'Audio-to-report automation pipeline for IIFL Samasta with speaker attribution, transcript alignment, and leadership-grade documentation.',
    features: [
      'Large file support (up to 5GB audio uploads)',
      'FFmpeg normalization (16kHz mono standardization)',
      'Speaker diarization (pyannote RTTM export)',
      'Speaker identification via ECAPA embeddings',
      'LLM intelligence (outcomes, decisions, speaker analysis)'
    ],
    tech: ['Python', 'Flask', 'faster-whisper', 'pyannote', 'SpeechBrain', 'Ollama', 'FFmpeg']
  },
  {
    id: 'iqrs',
    title: 'I.Q.R.S — Intelligent Query Retrieval System',
    status: 'completed',
    description: 'RAG platform with semantic search, smart chunking, FAISS indexing, and grounded answer generation with page/line evidence traceability.',
    features: [
      'PDF ingestion with sentence-level chunking',
      'SentenceTransformers embeddings (e5-small-v2)',
      'FAISS vector similarity search',
      'Groq LLM grounded answer generation',
      'Evidence markers (page + line references)'
    ],
    tech: ['Python', 'FastAPI', 'FAISS', 'SentenceTransformers', 'Groq API', 'Uvicorn']
  },
  {
    id: 'wanted',
    title: 'W.A.N.T.E.D — Crime Intelligence & Trend Forecasting',
    status: 'completed',
    description: 'Cloud-native crime analysis with Crime Genome profiling, GPU-accelerated anomaly detection, and cultural-aware forecasting.',
    features: [
      'Crime Genome vector profiling',
      'Semantic vector-based search',
      'GPU-accelerated anomaly detection (cuML/cuDF)',
      'Festival-aware demand forecasting',
      'Interactive heatmaps and network graphs'
    ],
    tech: ['Python', 'FastAPI', 'MongoDB', 'Firebase', 'NLP', 'Folium', 'cuML'],
    link: 'https://youtu.be/OHKePrZGpeg'
  },
  {
    id: 'pathfinding-benchmark',
    title: 'AgeOfEmpire — Pathfinding Benchmark & Analysis',
    status: 'completed',
    description: '35+ algorithm benchmarking ecosystem with controlled testbed and multi-scenario stress testing. Flow Field achieved 100% success rate.',
    features: [
      '35+ algorithm evaluation (A*, Flow Field, PSO, GA, ACO, etc.)',
      'Multi-scenario testing (static, fog-of-war, dynamic, hybrid)',
      'Standardized testbed (100×100, 40% blocked, 30% weighted)',
      'Performance metrics (time, memory, success rate, nodes)',
      'Comparative ranking + scenario insights'
    ],
    tech: ['Python', 'PyGame', 'NumPy', 'Flow Field', 'A*', 'Metaheuristics']
  },
  {
    id: 'rescue-run',
    title: 'PROJECT RESCUE RUN — RTS Tactical Simulation',
    status: 'completed',
    description: 'Full RTS game validating Flow Field vs A* with multi-unit system, dynamic hazards, and evolving enemy AI.',
    features: [
      'Algorithm toggle (Flow Field vs A*)',
      'Multi-unit system (Scout, Tank, Phantom)',
      'Enemy AI evolution (DFS → BFS → A*)',
      'Dynamic hazards forcing real-time replanning',
      'Performance telemetry + HUD monitoring'
    ],
    tech: ['Python', 'PyGame', 'Flow Field', 'A*', 'RTS AI', 'NumPy']
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
      case 'patented':
        return <Award size={16} />;
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
        <>
          {['patented', 'active', 'completed', 'confidential'].map((status) => {
            const statusGroup = projects.filter((p) => p.status === status);
            if (statusGroup.length === 0) return null;

            const displayTitle = status === 'patented' ? 'PATENTED / PUBLISHED' : `${status.toUpperCase()} PROJECTS`;

            return (
              <div key={status} className={styles.projectRow}>
                <h3 className={styles.rowTitle}>{displayTitle}</h3>

                <div className={styles.horizontalScroll}>
                  {statusGroup.map((project, index) => (
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
                        <span className={styles.glitch} data-text={project.title}>
                          {project.title}
                        </span>

                        <div
                          className={`${styles.projectStatus} ${styles[
                            `status${project.status.charAt(0).toUpperCase() + project.status.slice(1)}`
                            ]
                            }`}
                        >
                          {project.status.toUpperCase()}
                        </div>
                      </div>

                      <div className={styles.projectDescription}>
                        {project.confidential ? (
                          <div className={styles.redacted}>{project.description}</div>
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
              </div>
            );
          })}
        </>
      )}
    </section>
  );
};

export default Projects;
