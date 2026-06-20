import React, { useState, useEffect, useRef } from 'react';
import { BookOpen, BrainCircuit, Dna, LineChart, MessageSquare, Network, ShoppingCart, Users, Eye, Stethoscope, Swords, Map, GraduationCap, Cloud, Presentation, X } from 'lucide-react';
import '../styles/portfolio.css';

interface ResearchField {
  title: string;
  desc: string;
  topics: string[];
  icon: React.ReactNode;
  projectIds: string[];
}

interface PanelProject {
  id: string;
  title: string;
  description: string;
  tech: string[];
}

const projectMap: Record<string, PanelProject> = {
  'vector': {
    id: 'vector', title: 'V.E.C.T.O.R - Real-Time Fraud Detection',
    description: 'Behavior-adaptive clustering with persona-specific anomaly models and <100ms streaming architecture.',
    tech: ['Redis Streams', 'UMAP', 'HDBSCAN', 'Isolation Forest']
  },
  'harbor': {
    id: 'harbor', title: 'H.A.R.B.O.R - eDNA Taxonomy Inference',
    description: 'Open-set biodiversity recognition with marker-aware CNN embeddings and statistical novelty detection.',
    tech: ['PyTorch', 'FAISS', 'BioPython', 'Contrastive Learning']
  },
  'deep': {
    id: 'deep', title: 'DEEP / HARBOR V2 - Cloud-Native eDNA',
    description: 'Serverless multi-cloud eDNA platform with Hugging Face, AWS Lambda, SQS, and Cloudflare.',
    tech: ['Hugging Face', 'AWS Lambda', 'SQS', 'Cloudflare']
  },
  'scale': {
    id: 'scale', title: 'S.C.A.L.E - Causal Policy Simulation',
    description: 'Unified SD+SCM+ABM framework analyzing India\'s engineering education policy. IEEE Access published.',
    tech: ['System Dynamics', 'SCM', 'ABM', 'Monte Carlo']
  },
  'genesis': {
    id: 'genesis', title: 'G.E.N.E.S.I.S - Urban Layout Synthesis',
    description: 'Rule-aware generative system for code-compliant city layouts with multi-domain proxy simulations.',
    tech: ['Shapely', 'NetworkX', 'Streamlit', 'NBC Compliance']
  },
  'meetingsai': {
    id: 'meetingsai', title: 'MeetingsAI - On-Prem Meeting Intelligence',
    description: 'Enterprise meeting pipeline with diarization, speaker ID, MoM generation, and auto-email distribution.',
    tech: ['pyannote', 'faster-whisper', 'SpeechBrain', 'Ollama']
  },
  'iqrs': {
    id: 'iqrs', title: 'I.Q.R.S - RAG Document Intelligence',
    description: 'PDF ingestion, FAISS retrieval, and Groq-grounded QA with page/line evidence markers.',
    tech: ['FAISS', 'SentenceTransformers', 'Groq API']
  },
  'orion': {
    id: 'orion', title: 'O.R.I.O.N - Retail Intelligence Network',
    description: 'Bidirectional consumer-retailer demand forecasting with festive seasonality and persona segmentation.',
    tech: ['Prophet', 'FastAPI', 'MongoDB', 'scikit-learn']
  },
  'prometheus': {
    id: 'prometheus', title: 'PROMETHEUS - Customer Digital Twins',
    description: 'AI Digital Twins with omnichannel intelligence, churn prediction, and Monte Carlo campaign simulation.',
    tech: ['Kafka', 'Qdrant', 'LightGBM', 'PyTorch']
  },
  'verifai': {
    id: 'verifai', title: 'VerifAI - KYC Document Verification',
    description: 'High-assurance document verification with downgrade-first fraud logic and Gemini Vision pipeline.',
    tech: ['Gemini API', 'Flask', 'OCR', 'ReportLab']
  },
  'gesture': {
    id: 'gesture', title: 'Gesture-Controlled Smart Home',
    description: 'Real-time gesture recognition via OpenCV controlling Arduino-based home automation.',
    tech: ['OpenCV', 'Arduino', 'Serial Communications']
  },
  'ihorms': {
    id: 'ihorms', title: 'IHORMS - Hospital Operations Platform',
    description: 'Multi-tenant hospital system with 8-role RBAC, clinical workflows, and billing/insurance integration.',
    tech: ['FastAPI', 'React', 'PostgreSQL', 'TypeScript']
  },
  'hms-c': {
    id: 'hms-c', title: 'Hospital Management System (C)',
    description: 'Terminal-based HMS in C with synthetic data generator and file persistence.',
    tech: ['C (ANSI/GCC)', 'File I/O', 'CLI']
  },
  'pathfinding-benchmark': {
    id: 'pathfinding-benchmark', title: 'AgeOfEmpire - Pathfinding Suite',
    description: '35+ algorithm benchmark: A*, Flow Field, PSO, GA, ACO evaluated across 4 scenario types.',
    tech: ['Flow Field', 'A*', 'Metaheuristics', 'NumPy']
  },
  'rescue-run': {
    id: 'rescue-run', title: 'Project Rescue Run - RTS Game',
    description: 'Interactive RTS validating Flow Field vs A* with dynamic hazards and evolving enemy AI.',
    tech: ['PyGame', 'Flow Field', 'A*', 'heapq']
  },
  'wanted': {
    id: 'wanted', title: 'W.A.N.T.E.D - Crime Intelligence',
    description: 'Cloud-native crime analysis with Crime Genome profiling and GPU-accelerated anomaly detection.',
    tech: ['cuML', 'Sentence Transformers', 'Folium', 'FastAPI']
  },
  'adaptive-pedagogy': {
    id: 'adaptive-pedagogy', title: 'Adaptive Pedagogy Recommendation',
    description: 'Psychometric student modeling with IRT, educational ontologies, and Bayesian updating.',
    tech: ['Pyro', 'PyMC', 'IRT', 'OWL/RDF']
  },
  'aeroweight': {
    id: 'aeroweight', title: 'AeroWeight - Multi-Cloud Routing',
    description: 'Data gravity engine routing workloads across clouds using RL and predictive analytics.',
    tech: ['Ray RLlib', 'Kafka', 'Spark', 'Kubernetes']
  },
  'context-presentation': {
    id: 'context-presentation', title: 'Context-Aware Presentation Automation',
    description: 'Patented system for semantic navigation and dynamic question/text annotation in presentations.',
    tech: ['AI Presentation', 'Semantic Navigation', 'Patent']
  }
};

const researchFields: ResearchField[] = [
  {
    title: 'Behavioral Anomaly & Fraud ML',
    desc: 'Unsupervised and self-adapting clustering techniques on stream transaction structures to identify short-lived, high-velocity malicious patterns.',
    topics: ['Adaptive HDBSCAN density estimation', 'Persona vector space projection', 'Extreme low-latency inference queues'],
    icon: <BrainCircuit size={28} />,
    projectIds: ['vector']
  },
  {
    title: 'eDNA Genomics & Open-Set Classification',
    desc: 'Deep learning embeddings for environmental DNA marker identification, combining deterministic lookup databases with statistical open-set classification.',
    topics: ['Contrastive sequence representations', 'High-throughput FAISS indexing (2.8GB+ ref)', 'Extreme outlier taxonomy inference'],
    icon: <Dna size={28} />,
    projectIds: ['harbor', 'deep']
  },
  {
    title: 'Causal Inference & Policy Simulation',
    desc: 'Structural causal modeling combined with System Dynamics and Agent-Based Modeling to simulate economic loops and evaluate long-term policy interventions.',
    topics: ['Structural Causal Models (SCM)', 'Policy Boomerang feedback simulations', 'Historical scenario replay and counterfactuals'],
    icon: <LineChart size={28} />,
    projectIds: ['scale']
  },
  {
    title: 'Generative Synthesis in Constraint Spaces',
    desc: 'Applying procedural generation and rule-compliant layout synthesis algorithms to solve high-constraint geometry and network routing problems.',
    topics: ['Procedural municipal code checks', 'Multi-objective site partitioning', 'Drainage/Wind/Traffic network flows'],
    icon: <Network size={28} />,
    projectIds: ['genesis']
  },
  {
    title: 'Enterprise Audio Diarization & RAG',
    desc: 'Hybrid on-prem speech analytics pipelines focused on speaker separation, transcription alignment, and verifiable question-answering systems.',
    topics: ['ECAPA-TDNN speaker embed comparison', 'SentenceTransformers similarity mappings', 'Grounded line/page traceability verification'],
    icon: <MessageSquare size={28} />,
    projectIds: ['meetingsai', 'iqrs']
  },
  {
    title: 'Retail Intelligence & Demand Forecasting',
    desc: 'Closed-loop intelligence between household consumption and retail stock management with cultural-aware seasonality modeling.',
    topics: ['Recipe-based depletion simulation', 'Festival peak forecasting', 'Containerized distributed ML execution'],
    icon: <ShoppingCart size={28} />,
    projectIds: ['orion']
  },
  {
    title: 'Customer Digital Twins & Simulation',
    desc: 'Continuously evolving AI models that predict churn, purchase intent, LTV, and campaign outcomes through omnichannel intelligence.',
    topics: ['Real-time event processing (Kafka)', 'Agent-based Monte Carlo simulation', 'Semantic memory with vector retrieval'],
    icon: <Users size={28} />,
    projectIds: ['prometheus']
  },
  {
    title: 'Computer Vision & Document AI',
    desc: 'Document-side classification, fraud detection, and text extraction with strict safety guardrails for enterprise KYC workflows.',
    topics: ['Document side identification', 'Gemini Vision OCR + translation', 'Downgrade-first verification policy'],
    icon: <Eye size={28} />,
    projectIds: ['verifai', 'gesture']
  },
  {
    title: 'Healthcare Systems Engineering',
    desc: 'Multi-tenant hospital platforms unifying clinical workflows, telemetry, billing, and compliance with role-based access control.',
    topics: ['8-role RBAC architecture', 'ICU telemetry alerting', 'Pharmacy inventory + insurance workflows'],
    icon: <Stethoscope size={28} />,
    projectIds: ['ihorms', 'hms-c']
  },
  {
    title: 'Game AI & Pathfinding Research',
    desc: 'Comprehensive benchmarking of 35+ pathfinding algorithms with real-time RTS validation through interactive gameplay.',
    topics: ['Flow Field vs A* empirical comparison', 'Metaheuristic optimization (ACO, PSO, GA)', 'Dynamic obstacle replanning'],
    icon: <Swords size={28} />,
    projectIds: ['pathfinding-benchmark', 'rescue-run']
  },
  {
    title: 'Crime Intelligence & Geospatial Analytics',
    desc: 'Vectorized crime profiling with GPU-accelerated anomaly detection and cultural-aware forecasting for law enforcement intelligence.',
    topics: ['Crime Genome vector profiling', 'GPU-accelerated (cuML/cuDF)', 'Interactive heatmap visualization'],
    icon: <Map size={28} />,
    projectIds: ['wanted']
  },
  {
    title: 'EdTech & Adaptive Learning',
    desc: 'Psychometric student modeling using IRT with educational ontologies and explainable Bayesian updating for personalized pedagogy.',
    topics: ['Item Response Theory models', 'OWL/RDF ontology integration', 'Explainable Bayesian recommendation'],
    icon: <GraduationCap size={28} />,
    projectIds: ['adaptive-pedagogy']
  },
  {
    title: 'Multi-Cloud & Distributed Systems',
    desc: 'Data gravity modeling and RL-based orchestration for intelligent compute routing across multi-cloud environments.',
    topics: ['Data gravity quantification', 'Reinforcement learning routing', 'Multi-cloud cost optimization'],
    icon: <Cloud size={28} />,
    projectIds: ['aeroweight', 'deep']
  },
  {
    title: 'Presentation Automation & Semantic Navigation',
    desc: 'Patented system for context-aware adaptive presentations with real-time semantic understanding of audience queries.',
    topics: ['Semantic slide navigation', 'Dynamic content adaptation', 'Real-time question annotation'],
    icon: <Presentation size={28} />,
    projectIds: ['context-presentation']
  }
];

const Research: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [selectedField, setSelectedField] = useState<ResearchField | null>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);

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

  useEffect(() => {
    if (selectedField && panelRef.current) {
      panelRef.current.focus();
    }
  }, [selectedField]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setSelectedField(null);
    };
    if (selectedField) {
      document.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [selectedField]);

  const handleOverlayClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) setSelectedField(null);
  };

  return (
    <section id="research" ref={sectionRef} className="section-container">
      <div className={isVisible ? 'animate-fade-up' : ''} style={{ animationDelay: isVisible ? '0.1s' : '0s' }}>
        <div className="section-header">
          <span className="section-tag">Academic & Applied Research</span>
          <h2 className="section-title">Research Investigations</h2>
          <p className="section-subtitle">
            Exploring core problems in high-dimensional representations, causal feedback loops, and real-time streaming architectures. Click any area to see related projects.
          </p>
        </div>
      </div>

      <div className={isVisible ? 'animate-fade-up' : ''} style={{ animationDelay: isVisible ? '0.3s' : '0s' }}>
        <div className="research-interests-grid">
          {researchFields.map((field, idx) => (
            <div
              key={idx}
              className="ivory-card research-card clickable hover-gold-card"
              onClick={() => setSelectedField(field)}
            >
              <div className="research-icon">{field.icon}</div>
              <h3 className="research-title">{field.title}</h3>
              <p className="research-desc">{field.desc}</p>
              <ul className="research-sub-list">
                {field.topics.map((topic, index) => (
                  <li key={index}>{topic}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {selectedField && (
        <div className="research-projects-overlay" onClick={handleOverlayClick}>
          <div className="research-projects-panel" ref={panelRef} tabIndex={-1}>
            <div className="research-panel-header">
              <div>
                <span className="section-tag" style={{ textAlign: 'left', marginBottom: '0.5rem' }}>Related Projects</span>
                <h3>{selectedField.title}</h3>
              </div>
              <button className="research-panel-close" onClick={() => setSelectedField(null)} aria-label="Close panel">
                <X size={20} />
              </button>
            </div>

            <div className="research-panel-projects">
              {selectedField.projectIds.map((pid) => {
                const proj = projectMap[pid];
                if (!proj) return null;
                return (
                  <div key={proj.id} className="research-panel-project">
                    <h4>{proj.title}</h4>
                    <p>{proj.description}</p>
                    <div className="research-panel-tech">
                      {proj.tech.map((t) => (
                        <span key={t} className="tech-tag">{t}</span>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      <div className={isVisible ? 'animate-fade-up' : ''} style={{ animationDelay: isVisible ? '0.5s' : '0s' }}>
        <div className="ivory-card publications-block">
          <BookOpen size={36} style={{ color: 'var(--gold)', marginBottom: '1rem', display: 'inline-block' }} />
          <h3 style={{ fontSize: '1.4rem', color: 'var(--charcoal)' }}>Published Research</h3>
          <p className="publications-subtitle">
            <strong>S.C.A.L.E.</strong> — "Unbalanced Expansion of Engineering Education in India: A Data-Driven Policy Analysis"
          </p>
          <p style={{ fontSize: '0.85rem', color: 'var(--charcoal-muted)', marginTop: '0.5rem' }}>
            IEEE Access (Early Access), 10 June 2026
          </p>
          <a
            href="https://doi.org/10.1109/ACCESS.2026.3704923"
            target="_blank"
            rel="noopener noreferrer"
            className="patent-doi-link"
            style={{ marginTop: '0.75rem', display: 'inline-flex' }}
          >
            <BookOpen size={14} />
            DOI: 10.1109/ACCESS.2026.3704923
          </a>
        </div>
      </div>
    </section>
  );
};

export default Research;
