import React from 'react';
import { BookOpen, BrainCircuit, Dna, LineChart, MessageSquare, Network } from 'lucide-react';
import '../styles/portfolio.css';

interface ResearchField {
  title: string;
  desc: string;
  topics: string[];
  icon: React.ReactNode;
}

const researchFields: ResearchField[] = [
  {
    title: 'Behavioral Anomaly & Fraud ML',
    desc: 'Unsupervised and self-adapting clustering techniques on stream transaction structures to identify short-lived, high-velocity malicious patterns.',
    topics: ['Adaptive HDBSCAN density estimation', 'Persona vector space projection', 'Extreme low-latency inference queues'],
    icon: <BrainCircuit size={28} />
  },
  {
    title: 'eDNA Genomics & Open-Set Classification',
    desc: 'Deep learning embeddings for environmental DNA marker identification, combining deterministic lookup databases with statistical open-set classification.',
    topics: ['Contrastive sequence representations', 'High-throughput FAISS indexing (2.8GB+ ref)', 'Extreme outlier taxonomy inference'],
    icon: <Dna size={28} />
  },
  {
    title: 'Causal Inference & Policy Simulation',
    desc: 'Structural causal modeling combined with System Dynamics and Agent-Based Modeling to simulate economic loops and evaluate long-term policy interventions.',
    topics: ['Structural Causal Models (SCM)', 'Policy Boomerang feedback simulations', 'Historical scenario replay and counterfactuals'],
    icon: <LineChart size={28} />
  },
  {
    title: 'Generative Synthesis in Constraint Spaces',
    desc: 'Applying procedural generation and rule-compliant layout synthesis algorithms to solve high-constraint geometry and network routing problems.',
    topics: ['Procedural municipal code checks', 'Multi-objective site partitioning', 'Drainage/Wind/Traffic network flows'],
    icon: <Network size={28} />
  },
  {
    title: 'Enterprise Audio Diarization & RAG',
    desc: 'Hybrid on-prem speech analytics pipelines focused on speaker separation, transcription alignment, and verifiable question-answering systems.',
    topics: ['ECAPA-TDNN speaker embed comparison', 'SentenceTransformers similarity mappings', 'Grounded line/page traceability verification'],
    icon: <MessageSquare size={28} />
  }
];

const Research: React.FC = () => {
  return (
    <section id="research" className="section-container">
      <div className="section-header">
        <span className="section-tag">Academic & Applied Research</span>
        <h2 className="section-title">Research Investigations</h2>
        <p className="section-subtitle">
          Exploring core problems in high-dimensional representations, causal feedback loops, and real-time streaming architectures.
        </p>
      </div>

      <div className="research-interests-grid">
        {researchFields.map((field, idx) => (
          <div key={idx} className="ivory-card research-card hover-gold-card">
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

      <div className="ivory-card publications-block">
        <BookOpen size={36} style={{ color: 'var(--gold)', marginBottom: '1rem', display: 'inline-block' }} />
        <h3 style={{ fontSize: '1.4rem', color: 'var(--charcoal)' }}>Forthcoming Publications</h3>
        <p className="publications-subtitle">
          Peer-reviewed manuscripts on streaming outlier recognition models and biodiversity classification systems are in preparation. Details on drafts and pre-prints are available upon request.
        </p>
      </div>
    </section>
  );
};

export default Research;
