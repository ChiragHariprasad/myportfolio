import React, { useState } from 'react';
import { ExternalLink, Shield, Zap, Activity, Award, Lock } from 'lucide-react';
import '../styles/portfolio.css';

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
  const [activeFilter, setActiveFilter] = useState<'all' | 'patented' | 'active' | 'completed' | 'confidential'>('all');

  const filteredProjects = activeFilter === 'all'
    ? projects
    : projects.filter(p => p.status === activeFilter);

  const getStatusBadgeClass = (status: string) => {
    switch (status) {
      case 'patented': return 'badge-patented';
      case 'active': return 'badge-active';
      case 'completed': return 'badge-completed';
      case 'confidential': return 'badge-confidential';
      default: return '';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'patented': return <Award size={14} />;
      case 'active': return <Activity size={14} />;
      case 'completed': return <Zap size={14} />;
      case 'confidential': return <Shield size={14} />;
      default: return null;
    }
  };

  return (
    <section id="projects" className="section-container">
      <div className="section-header">
        <span className="section-tag">Engineering Case Studies</span>
        <h2 className="section-title">Technical Systems</h2>
        <p className="section-subtitle">
          An overview of active research, production platforms, and completed systems spanning AI/ML, causal inference, and real-time processing.
        </p>
      </div>

      <div className="projects-filter-bar">
        {(['all', 'patented', 'active', 'completed', 'confidential'] as const).map((filter) => (
          <button
            key={filter}
            className={`filter-btn ${activeFilter === filter ? 'active' : ''}`}
            onClick={() => setActiveFilter(filter)}
          >
            {filter === 'all' ? 'All Systems' : filter === 'patented' ? 'Patented/Published' : `${filter}`}
          </button>
        ))}
      </div>

      <div className="projects-masonry">
        {filteredProjects.map((project) => (
          <div key={project.id} className="ivory-card project-case-study hover-gold-card">
            {project.confidential ? (
              <div className="project-cs-header">
                <div className="project-cs-title-group">
                  <span className="redacted-title">🔒 CLASSIFIED RESOURCE</span>
                  <h3 className="project-cs-title">
                    <span className="redacted-text">{project.title.split(' — ')[0]}</span>
                    {project.title.includes(' — ') && ` — ${project.title.split(' — ')[1]}`}
                  </h3>
                </div>
                <span className={`project-status-badge ${getStatusBadgeClass(project.status)}`}>
                  {getStatusIcon(project.status)}
                  {project.status}
                </span>
              </div>
            ) : (
              <div className="project-cs-header">
                <div className="project-cs-title-group">
                  <h3 className="project-cs-title">{project.title}</h3>
                </div>
                <span className={`project-status-badge ${getStatusBadgeClass(project.status)}`}>
                  {getStatusIcon(project.status)}
                  {project.status}
                </span>
              </div>
            )}

            {project.confidential ? (
              <div className="project-confidential-block">
                <Lock size={32} style={{ color: 'var(--gold)' }} />
                <p style={{ fontSize: '0.9rem', color: 'var(--charcoal-muted)' }}>
                  This asset is subject to strict proprietary validation checks. Underlying methods are patented or under filing.
                </p>
                <div style={{ textAlign: 'left', width: '100%' }}>
                  <strong>Abstract Blueprint:</strong>
                  <p className="redacted-text" style={{ display: 'block', marginTop: '0.5rem', lineHeight: '1.8' }}>
                    {project.description}
                  </p>
                </div>
                <div style={{ width: '100%', marginTop: '1rem' }}>
                  <strong style={{ fontSize: '0.85rem' }}>Encrypted Tech Stack:</strong>
                  <div className="patent-tech-list" style={{ marginTop: '0.5rem' }}>
                    {project.tech.map((tech) => (
                      <span key={tech} className="tech-tag" style={{ filter: 'blur(2px)', userSelect: 'none' }}>{tech}</span>
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              <div className="project-cs-grid">
                <div className="project-cs-body">
                  <div>
                    <h4 className="patent-section-header">Challenge & Objective</h4>
                    <p style={{ fontSize: '0.9rem', color: 'var(--charcoal-light)' }}>
                      {project.description}
                    </p>
                  </div>

                  {project.features && (
                    <div>
                      <h4 className="patent-section-header">Key Architectural Attributes</h4>
                      <ul className="project-cs-features-list">
                        {project.features.map((feature, idx) => (
                          <li key={idx}>{feature}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>

                <div className="project-cs-sidebar">
                  <div>
                    <h4 className="patent-section-header">Tech Stack</h4>
                    <div className="patent-tech-list">
                      {project.tech.map((tech) => (
                        <span key={tech} className="tech-tag">{tech}</span>
                      ))}
                    </div>
                  </div>

                  {project.link && (
                    <div style={{ marginTop: '1rem' }}>
                      <a
                        href={project.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn-secondary"
                        style={{ padding: '0.6rem 1.25rem', fontSize: '0.85rem', width: '100%', justifyContent: 'center' }}
                      >
                        <ExternalLink size={14} />
                        Watch Demo
                      </a>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
};

export default Projects;
