import React, { useState, useEffect, useRef } from 'react';
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
    title: 'V.E.C.T.O.R - Velocity-Enhanced Clustering for Transactional Outlier Recognition',
    status: 'patented',
    description: 'Real-time fraud detection engine that personalizes anomaly detection to each user\'s behavior profile. Continuously learns individual behavior, clusters users into behavioral personas, assigns persona-specific anomaly models, and produces fraud risk scores in under 100ms. Handles cold-start users via XGBoost fallback and manages ambiguous transactions through 2FA verification.',
    features: [
      'Real-time transaction monitoring with <100ms scoring',
      'Dynamic user profiling with behavioral clustering (UMAP + HDBSCAN)',
      'Persona-specific Isolation Forest anomaly models',
      'Cold-start handling via XGBoost fallback (<10 transactions)',
      'Suspicion buffer mechanism for trust-vs-suspicion history',
      'Live monitoring dashboard with real-time charts'
    ],
    tech: ['Redis Streams', 'MongoDB', 'UMAP', 'HDBSCAN', 'Isolation Forest', 'XGBoost']
  },
  {
    id: 'orion',
    title: 'O.R.I.O.N - Omni-Retail Intelligence & Ordering Network',
    status: 'patented',
    description: 'Integrated AI-driven inventory management and demand forecasting platform creating a closed-loop intelligence network between household consumption and retail stock management. Models recipe-based household consumption, depletion prediction, auto-restock triggers, and festive demand forecasting.',
    features: [
      'Bidirectional consumer-retailer intelligence loop',
      'Predictive auto-restock with item-level demand forecasting',
      'Cultural-aware forecasting (festival peak seasonality)',
      'Customer persona segmentation (budget, premium, festival-driven)',
      'Hyper-personalized recommendations via collaborative filtering',
      'Anomaly detection for flash-demand and bulk-buy events'
    ],
    tech: ['Python', 'FastAPI', 'PostgreSQL', 'MongoDB', 'Prophet', 'scikit-learn', 'Docker']
  },
  {
    id: 'genesis',
    title: 'G.E.N.E.S.I.S - Generative Engine for Networked, Embedded, Spatial Infrastructure Synthesis',
    status: 'patented',
    description: 'Rule-aware generative system that automates urban layout planning from scratch. Converts site boundaries into code-compliant city layouts with road networks, blocks, and subdivided plots. Enforces Indian NBC regulations inside the generation loop with multi-domain proxy simulations.',
    features: [
      'Automated boundary-to-layout generation (roads, blocks, plots)',
      'Regulation-by-design with fail-fast compliance engine',
      'Traffic proxy simulation (graph-based routing, LOS metrics)',
      'Drainage proxy simulation (D8 flow accumulation)',
      'Wind/ventilation proxy simulation (Gaussian wake model)',
      'KPI-based scoring engine with Top-K ranking'
    ],
    tech: ['Python', 'Shapely', 'NetworkX', 'NumPy', 'Streamlit', 'pyproj', 'Folium']
  },
  {
    id: 'context-presentation',
    title: 'Context-Aware Adaptive Presentation Automation System with Semantic Navigation',
    status: 'patented',
    description: 'Patented system for context-aware adaptive presentation automation incorporating semantic navigation and dynamic question/text annotation. Enables presentations to intelligently adapt flow and content based on real-time semantic understanding of audience queries.',
    features: [
      'Semantic navigation beyond linear slide indices',
      'Dynamic question/text annotation with semantic mapping',
      'Context-aware adaptation of content order and emphasis',
      'Adaptive content delivery based on cumulative session context'
    ],
    tech: ['AI Presentation', 'Semantic Navigation', 'Context Adaptation']
  },

  // =========================
  // ACTIVE (IN PROGRESS — MASKED)
  // =========================
  {
    id: 'adaptive-pedagogy',
    title: 'Adaptive Pedagogy Recommendation - Psychometric Student Modeling',
    status: 'active',
    description: 'Research-driven adaptive recommendation engine for personalized education. Constructs psychometric models of individual learners using item response theory, mapped onto formal educational ontologies with explainable Bayesian updating.',
    tech: ['Python', 'Pyro', 'PyMC', 'IRT', 'OWL/RDF', 'SHAP'],
    confidential: true
  },
  {
    id: 'aeroweight',
    title: 'AeroWeight - Intelligent Data Gravity Engine for Multi-Cloud Compute Routing',
    status: 'active',
    description: 'Intelligent orchestration engine that routes computational workloads across multiple cloud providers by modeling data gravity. Uses predictive analytics and reinforcement learning to minimize cost and latency while respecting data residency constraints.',
    tech: ['Python', 'Go', 'PyTorch', 'Ray RLlib', 'Kafka', 'Spark', 'Kubernetes'],
    confidential: true
  },
  {
    id: 'deep',
    title: 'DEEP / HARBOR V2 - Distributed eDNA Evaluation Platform',
    status: 'active',
    description: 'Cloud-native evolution of the HARBOR eDNA taxonomy inference system. Re-architected for global availability with serverless multi-cloud deployment: Hugging Face inference, AWS Lambda/SQS/CDN, and Cloudflare DNS.',
    tech: ['Hugging Face', 'AWS Lambda', 'API Gateway', 'SQS', 'CloudFront', 'Cloudflare', 'PyTorch'],
    confidential: true
  },

  // =========================
  // COMPLETED
  // =========================
  {
    id: 'meetingsai',
    title: 'MeetingsAI - On-Prem Meeting Intelligence Platform',
    status: 'completed',
    description: 'End-to-end on-premises meeting intelligence platform deployed at IIFL Samasta. Converts raw meeting recordings into speaker-attributed, context-aware documentation automatically — transcription, diarization, speaker identification, MoM generation, and auto-email distribution.',
    features: [
      'On-premises & privacy-preserving (no external SaaS)',
      'In-UI recording with audio standardization (FFmpeg)',
      'Speaker diarization (pyannote) + real-name identification (ECAPA)',
      'Multi-LLM analysis pipeline (Vicuna, DeepSeek, Llama3)',
      'Automatic MoM generation with speaker-wise action points',
      'Auto-email distribution to all stakeholders'
    ],
    tech: ['Python', 'Flask', 'pyannote', 'faster-whisper', 'SpeechBrain', 'Ollama', 'FFmpeg']
  },
  {
    id: 'verifai',
    title: 'VerifAI - AI-Powered KYC Document Verification',
    status: 'active',
    description: 'High-assurance KYC document verification platform built for IIFL Samasta with a strict downgrade-first fraud logic. Performs document-side detection, multi-class fraud classification, confidence scoring, text extraction with translation, and full audit trails.',
    features: [
      'Document side identification (FRONT/BACK/UNKNOWN)',
      'Multi-class fraud classification (LEGIT/SUSPICIOUS/NOT_LEGIT)',
      'Strict downgrade-first safety policy (no false positives)',
      'OCR + translation pipeline (Gemini Vision API)',
      'Verification checklist with boolean security checks',
      'PDF/CSV/JSON export + audit logging'
    ],
    tech: ['Python', 'Flask', 'Gemini API', 'ReportLab', 'OCR', 'Base64']
  },
  {
    id: 'prometheus',
    title: 'PROMETHEUS - Predictive Reasoning & Omnichannel Modelling for Customer Digital Twins',
    status: 'completed',
    description: 'Customer Futures Intelligence Platform that creates continuously evolving AI Digital Twins for every customer. Ingests omnichannel interactions to predict churn risk, purchase intent, lifetime value, and campaign outcomes before decisions are executed.',
    features: [
      'AI Digital Customer Twins with continuous updating',
      'Omnichannel intelligence (web, CRM, email, support, mobile, social)',
      'Real-time event processing via Kafka',
      'Predictive engine: churn, purchase intent, LTV forecasting',
      'Agent-based Monte Carlo campaign simulation',
      'Semantic customer memory with vector embeddings (Qdrant)'
    ],
    tech: ['Python', 'FastAPI', 'PostgreSQL', 'Redis', 'Kafka', 'Qdrant', 'PyTorch', 'LightGBM']
  },
  {
    id: 'harbor',
    title: 'H.A.R.B.O.R - Hierarchical Analysis for Reference-Guided Biodiversity Organism Recognition',
    status: 'completed',
    description: 'Open-set eDNA taxonomy inference system for large-scale biodiversity recognition. Combines deterministic similarity checks, deep CNN-based sequence embeddings, and statistical novelty detection to produce honest known/NOVEL classifications.',
    features: [
      'Multi-stage hybrid inference (deterministic → neural → statistical)',
      'Marker-specific CNN embeddings with contrastive learning',
      'FAISS high-throughput ANN retrieval (2.8GB+ reference DB)',
      'Statistical novelty detection with explicit NOVEL flags',
      'MLOps: DVC versioning, W&B tracking, Docker containers'
    ],
    tech: ['Python', 'PyTorch', 'FAISS', 'BioPython', 'FastAPI', 'XGBoost', 'DVC', 'W&B']
  },
  {
    id: 'scale',
    title: 'S.C.A.L.E - Structural Causal Analysis of Labor & Education',
    status: 'completed',
    description: 'Causal simulation and policy evaluation framework modeling India\'s engineering education system as a dynamic, feedback-driven system. Links seat capacity, graduate supply, wage compression, brain drain, and GDP through unified SD+SCM+ABM architecture. Accepted for IEEE Access (Early Access: 10 June 2026).',
    features: [
      'Unified System Dynamics + SCM + ABM architecture',
      'Policy boomerang effect modeling (expansion → oversupply feedback)',
      'Historical replay validation (2010-2024) reproducing long-run trends',
      'Counterfactual scenario engine (5 policy regimes, 2025-2035)',
      'Quantified causal effect: ATE = 0.448 (+1pp enrollment → +44.8pp unemployment)'
    ],
    tech: ['Python', 'Pandas', 'Matplotlib', 'System Dynamics', 'SCM', 'ABM', 'Monte Carlo']
  },
  {
    id: 'ihorms',
    title: 'IHORMS / IHORMS-X - Integrated Hospital Operations & Resource Management System',
    status: 'completed',
    description: 'Multi-tenant, 8-role hospital operations platform unifying clinical workflows, resource tracking, billing, insurance, pharmacy, and audit compliance across multiple organizations and branches.',
    features: [
      'Multi-tenant architecture (org + branch isolation)',
      '8-role RBAC (super_admin to patient)',
      'Appointment + clinical workflow management',
      'ICU telemetry monitoring with alerts',
      'Pharmacy inventory + order fulfillment',
      'Billing + insurance claim workflows',
      'Audit and compliance logging'
    ],
    tech: ['FastAPI', 'React', 'PostgreSQL', 'TypeScript', 'TailwindCSS', 'React Query']
  },
  {
    id: 'iqrs',
    title: 'I.Q.R.S - Intelligent Query Retrieval System',
    status: 'completed',
    description: 'End-to-end Retrieval-Augmented Generation platform converting unstructured PDFs into a searchable intelligence layer. Users ask natural-language questions and receive fact-grounded answers with page/line evidence traceability.',
    features: [
      'PDF ingestion with sentence-level smart chunking',
      'SentenceTransformers embeddings (intfloat/e5-small-v2)',
      'FAISS vector similarity search with index persistence',
      'Groq LLM grounded answer generation',
      'Evidence markers (page + line references, similarity scores)'
    ],
    tech: ['Python', 'FastAPI', 'FAISS', 'SentenceTransformers', 'Groq API', 'Uvicorn']
  },
  {
    id: 'wanted',
    title: 'W.A.N.T.E.D - Watch and Analyze Nationwide Trends in Evolving Deviance',
    status: 'completed',
    description: 'Cloud-native crime intelligence system that analyzes, visualizes, and forecasts crime evolution patterns using AI models, geospatial tools, and real-time data pipelines. Introduces Crime Genome — vectorized crime profile modeling.',
    features: [
      'Crime Genome vectorized profiling',
      'Semantic vector-based search (Sentence Transformers)',
      'GPU-accelerated anomaly detection (cuML/cuDF)',
      'Demographic transition models for population-linked analysis',
      'Interactive heatmaps and network graphs (Folium)'
    ],
    tech: ['Python', 'FastAPI', 'MongoDB', 'Firebase', 'Sentence Transformers', 'cuML', 'Folium'],
    link: 'https://youtu.be/OHKePrZGpeg'
  },
  {
    id: 'pathfinding-benchmark',
    title: 'AgeOfEmpire - Pathfinding Benchmark & Analysis Suite',
    status: 'completed',
    description: 'Research-grade benchmarking framework evaluating 35+ pathfinding algorithms across controlled game-realistic environments. Flow Field, ACO, and MMAS emerged as top performers with 100% success in dynamic obstacle scenarios.',
    features: [
      '35+ algorithm evaluation (A*, Flow Field, PSO, GA, ACO, etc.)',
      'Multi-scenario testing (static, fog-of-war, dynamic, hybrid)',
      'Standardized testbed (100×100, 40% blocked, 30% weighted)',
      'Performance metrics (time, memory, success rate, nodes expanded)',
      'Actionable insights: algorithm selection by constraint profile'
    ],
    tech: ['Python', 'NumPy', 'Flow Field', 'A*', 'Metaheuristics', 'PyGame']
  },
  {
    id: 'rescue-run',
    title: 'Project Rescue Run - RTS Tactical Simulation',
    status: 'completed',
    description: 'Full RTS game validating Flow Field vs A* in a live game loop with dynamic terrain, multiple unit types, evolving enemy AI, and real-time hazards. Research validation through interactive gameplay.',
    features: [
      'Algorithm toggle (Flow Field vs A* at game start)',
      'Terrain system with variable movement costs',
      'Multi-unit system (Scout, Tank, Phantom)',
      'Enemy AI evolution (DFS → BFS → A*)',
      'Dynamic hazards forcing real-time replanning'
    ],
    tech: ['Python', 'PyGame', 'Flow Field', 'A*', 'heapq']
  },
  {
    id: 'gesture',
    title: 'Gesture-Controlled Smart Home System',
    status: 'completed',
    description: 'Real-time gesture recognition system using computer vision (OpenCV) to control Arduino-based home automation hardware via serial communication.',
    features: [
      'Real-time gesture recognition via webcam',
      'Arduino-triggered home automation',
      'Multi-gesture support with noise filtering',
      'Low-latency serial communication pipeline'
    ],
    tech: ['Python', 'OpenCV', 'Arduino', 'Serial Communications']
  },
  {
    id: 'hms-c',
    title: 'Hospital Management System (C) - Terminal-Based Operations',
    status: 'completed',
    description: 'Terminal-based integrated hospital management system implemented in C. Manages patient registration, doctor handling, appointment workflows, billing, and record storage. Includes a synthetic data generator for scale testing.',
    features: [
      'Hospital operations core (CRUD, admit, discharge, billing)',
      'Synthetic data generator for realistic patient datasets',
      'File-based persistence (.txt/.csv)',
      'Lightweight CLI menu system',
      'Zero external dependencies — fully portable C implementation'
    ],
    tech: ['C (ANSI/GCC)', 'File I/O', 'CLI']
  }
];

const Projects: React.FC = () => {
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
    <section id="projects" ref={sectionRef} className="section-container">
      <div className={isVisible ? 'animate-fade-up' : ''} style={{ animationDelay: isVisible ? '0.1s' : '0s' }}>
        <div className="section-header">
          <span className="section-tag">Engineering Case Studies</span>
          <h2 className="section-title">Technical Systems</h2>
          <p className="section-subtitle">
            An overview of active research, production platforms, and completed systems spanning AI/ML, causal inference, and real-time processing.
          </p>
        </div>
      </div>

      <div className={isVisible ? 'animate-fade-up' : ''} style={{ animationDelay: isVisible ? '0.3s' : '0s' }}>
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
      </div>

      <div className={isVisible ? 'animate-fade-up' : ''} style={{ animationDelay: isVisible ? '0.5s' : '0s' }}>
        <div className="projects-grid">
          {filteredProjects.map((project) => (
            <div key={project.id} className="ivory-card project-card hover-gold-card">
              {project.confidential ? (
                <>
                  <div className="project-card-header">
                    <div>
                      <span className="redacted-title">🔒 CLASSIFIED RESOURCE</span>
                      <h3 className="project-card-title" style={{ marginTop: '0.25rem' }}>
                        <span className="redacted-text">{project.title.split(' - ')[0]}</span>
                        {project.title.includes(' - ') && ` - ${project.title.split(' - ')[1]}`}
                      </h3>
                    </div>
                    <span className={`project-status-badge ${getStatusBadgeClass(project.status)}`}>
                      {getStatusIcon(project.status)}
                      {project.status}
                    </span>
                  </div>
                  <div className="project-confidential-block">
                    <Lock size={20} style={{ color: 'var(--gold)' }} />
                    <p style={{ fontSize: '0.75rem', color: 'var(--charcoal-muted)' }}>
                      This asset is subject to proprietary validation. Underlying methods are patented or under filing.
                    </p>
                    <div style={{ width: '100%' }}>
                      <p className="redacted-text" style={{ display: 'block', lineHeight: '1.6', fontSize: '0.75rem' }}>
                        {project.description}
                      </p>
                    </div>
                    <div style={{ width: '100%' }}>
                      <div className="project-card-tech">
                        {project.tech.map((tech) => (
                          <span key={tech} className="tech-tag" style={{ filter: 'blur(2px)', userSelect: 'none' }}>{tech}</span>
                        ))}
                      </div>
                    </div>
                  </div>
                </>
              ) : (
                <>
                  <div className="project-card-header">
                    <h3 className="project-card-title">{project.title}</h3>
                    <span className={`project-status-badge ${getStatusBadgeClass(project.status)}`}>
                      {getStatusIcon(project.status)}
                      {project.status}
                    </span>
                  </div>

                  <p className="project-card-desc">{project.description}</p>

                  {project.features && (
                    <div className="project-card-features">
                      {project.features.slice(0, 3).map((f, idx) => (
                        <span key={idx} className="project-card-feature">{f}</span>
                      ))}
                      {project.features.length > 3 && (
                        <span className="project-card-feature">+{project.features.length - 3} more</span>
                      )}
                    </div>
                  )}

                  <div className="project-card-tech">
                    {project.tech.map((tech) => (
                      <span key={tech} className="tech-tag">{tech}</span>
                    ))}
                  </div>

                  {project.link && (
                    <a href={project.link} target="_blank" rel="noopener noreferrer" className="project-card-link">
                      <ExternalLink size={12} />
                      Watch Demo
                    </a>
                  )}
                </>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;