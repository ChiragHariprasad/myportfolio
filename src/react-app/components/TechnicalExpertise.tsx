import React, { useState, useEffect, useRef } from 'react';
import '../styles/portfolio.css';

interface SkillCategory {
  title: string;
  skills: string[];
  competency: number; // percentage (approximate level for visualization)
}

const skillsData: SkillCategory[] = [
  {
    title: 'Languages',
    skills: ['Python', 'C', 'JavaScript', 'TypeScript', 'SQL'],
    competency: 92
  },
  {
    title: 'AI / Machine Learning',
    skills: [
      'Machine Learning',
      'Deep Learning',
      'Computer Vision',
      'Anomaly Detection',
      'Time-Series Forecasting',
      'Clustering & Segmentation',
      'Recommender Systems',
      'NLP / Embeddings'
    ],
    competency: 95
  },
  {
    title: 'Frameworks & APIs',
    skills: ['FastAPI', 'Flask', 'React', 'Vite', 'Streamlit'],
    competency: 88
  },
  {
    title: 'ML Stack',
    skills: ['PyTorch', 'scikit-learn', 'XGBoost', 'OpenCV'],
    competency: 94
  },
  {
    title: 'Data & Databases',
    skills: ['PostgreSQL', 'MongoDB', 'SQLite', 'Redis'],
    competency: 85
  },
  {
    title: 'Vector Search & Retrieval',
    skills: ['FAISS', 'SentenceTransformers', 'RAG Pipelines'],
    competency: 90
  },
  {
    title: 'DevOps & Tooling',
    skills: ['Git', 'Docker', 'Linux', 'Cloudflare', 'CI/CD Basics'],
    competency: 82
  },
  {
    title: 'Simulation & Optimization',
    skills: ['NetworkX', 'Graph Algorithms', 'Pathfinding (A*)', 'Metaheuristics (ACO/GA/PSO)'],
    competency: 91
  }
];

const TechnicalExpertise: React.FC = () => {
  const [animate, setAnimate] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setAnimate(true);
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section id="expertise" ref={sectionRef} className="section-container">
      <div className="section-header">
        <span className="section-tag">Engineering Domains</span>
        <h2 className="section-title">Technical Expertise</h2>
        <p className="section-subtitle">
          Core toolkits, database architectures, and analytical systems compiled through practical implementation and research.
        </p>
      </div>

      <div className="expertise-grid">
        {skillsData.map((category) => (
          <div key={category.title} className="ivory-card expertise-card hover-gold-card">
            <div>
              <div className="expertise-header">
                <h3 className="expertise-title">{category.title}</h3>
                <span className="text-mono" style={{ color: 'var(--gold-dark)', fontWeight: '600' }}>
                  {category.competency}%
                </span>
              </div>

              <div className="expertise-tags">
                {category.skills.map((skill) => (
                  <span key={skill} className="tech-tag">
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            <div className="expertise-meter">
              <div
                className="expertise-meter-fill"
                style={{ width: animate ? `${category.competency}%` : '0%' }}
              />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default TechnicalExpertise;
