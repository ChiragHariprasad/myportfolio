import React, { useState, useMemo, useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Layers, Cpu, Database, Code, Globe, Terminal, Shield } from 'lucide-react';
import { getTechWithCounts, getProjectsByTech } from '../data/contentLoader';
import '../styles/portfolio.css';
import '../styles/gamified-techstack.css';

const TECH_GROUPS: Record<string, { label: string; icon: React.ReactNode; keywords: string[] }> = {
  languages: {
    label: 'Languages',
    icon: <Code size={16} />,
    keywords: ['python', 'javascript', 'typescript', 'c', 'c++', 'java', 'rust', 'go', 'sql', 'html', 'css', 'bash'],
  },
  frameworks: {
    label: 'Frameworks',
    icon: <Globe size={16} />,
    keywords: ['react', 'next.js', 'fastapi', 'flask', 'django', 'express', 'node.js', 'vite', 'tailwind', 'framer motion'],
  },
  ai: {
    label: 'AI / ML',
    icon: <Cpu size={16} />,
    keywords: ['pytorch', 'tensorflow', 'scikit-learn', 'xgboost', 'keras', 'hugging face', 'ollama', 'gemini', 'langchain', 'openai', 'whisper', 'faster-whisper', 'speechbrain', 'pyannote', 'umap', 'hdbscan', 'isolation forest', 'causal inference', 'bayesian', 'monte carlo', 'reinforcement learning', 'agent-based', 'system dynamics'],
  },
  data: {
    label: 'Data',
    icon: <Database size={16} />,
    keywords: ['postgresql', 'mongodb', 'redis', 'supabase', 'firebase', 'sqlite', 'neo4j', 'json', 'csv', 'pandas', 'numpy', 'polars'],
  },
  infrastructure: {
    label: 'Infrastructure',
    icon: <Layers size={16} />,
    keywords: ['docker', 'aws', 'gcp', 'azure', 'cloudflare', 'lambda', 'sqs', 'kafka', 'kubernetes', 'nginx', 'github actions', 'ci/cd', 'vercel'],
  },
  tools: {
    label: 'Tools',
    icon: <Terminal size={16} />,
    keywords: ['git', 'linux', 'figma', 'postman', 'jupyter', 'vs code', 'raspberry pi', 'arduino', 'esp32', 'mqtt'],
  },
};

function categorizeTech(name: string): string {
  const lower = name.toLowerCase();
  for (const [groupId, group] of Object.entries(TECH_GROUPS)) {
    if (group.keywords.some(k => lower.includes(k) || k.includes(lower))) {
      return groupId;
    }
  }
  return 'tools';
}

const DataShard = ({ tech, maxCount, isActive, onClick }: { tech: any; maxCount: number; isActive: boolean; onClick: () => void }) => {
  const categoryId = categorizeTech(tech.name);
  const { icon, label } = TECH_GROUPS[categoryId];
  const level = Math.ceil((tech.count / maxCount) * 5); // 1 to 5 segments

  return (
    <motion.button 
      className={`ts-data-shard ${isActive ? 'active' : ''}`}
      onClick={onClick}
      layoutId={`shard-${tech.name}`}
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      whileHover={{ y: -4 }}
      whileTap={{ scale: 0.95 }}
    >
      <div className="ts-shard-header">
        <span className="ts-shard-icon">{icon}</span>
        <span className="ts-shard-level">LVL {level}</span>
      </div>
      <div className="ts-shard-name">{tech.name}</div>
      <div className="ts-shard-meter">
        {[1, 2, 3, 4, 5].map(i => (
          <div key={i} className={`ts-meter-segment ${i <= level ? 'filled' : ''}`} />
        ))}
      </div>
    </motion.button>
  );
};

const InspectionPanel = ({ techName, count, projects, onClose }: { techName: string; count: number; projects: any[]; onClose: () => void }) => {
  const categoryId = categorizeTech(techName);
  const { icon, label } = TECH_GROUPS[categoryId];

  return (
    <motion.div 
      className="ts-inspection-overlay"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      <motion.div 
        className="ts-inspection-panel"
        initial={{ x: '100%' }}
        animate={{ x: 0 }}
        exit={{ x: '100%' }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
        onClick={(e) => e.stopPropagation()}
      >
        <button className="ts-panel-close" onClick={onClose}>
          <X size={20} />
        </button>

        <div className="ts-panel-eyebrow">
          {icon} <span>{label} Module</span>
        </div>
        <h2 className="ts-panel-title">{techName}</h2>

        <div className="ts-panel-stats">
          <div className="ts-panel-stat-box">
            <div className="ts-stat-label">Power Level</div>
            <div className="ts-stat-value">{count}</div>
          </div>
          <div className="ts-panel-stat-box">
            <div className="ts-stat-label">Status</div>
            <div className="ts-stat-value" style={{ color: 'var(--accent)' }}>Active</div>
          </div>
        </div>

        <div className="ts-panel-section-title">
          <Shield size={16} /> Equipped In Projects
        </div>
        
        <div className="ts-panel-projects">
          {projects.map((p, i) => (
            <motion.div
              key={p.id}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.1 }}
            >
              <Link to={`/projects/${p.id}`} className="ts-equipped-project">
                <h4>{p.title}</h4>
                <p>{p.description}</p>
              </Link>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </motion.div>
  );
};

const TechStackPage: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const selectedTech = searchParams.get('tech');
  const [activeGroup, setActiveGroup] = useState<string | null>(null);

  const techList = useMemo(() => getTechWithCounts(), []);
  const maxCount = techList.length > 0 ? techList[0].count : 1;

  const filteredTech = useMemo(() => {
    if (!activeGroup) return techList;
    return techList.filter(t => categorizeTech(t.name) === activeGroup);
  }, [techList, activeGroup]);

  const selectedProjects = useMemo(() => {
    if (!selectedTech) return [];
    return getProjectsByTech(selectedTech);
  }, [selectedTech]);

  const selectTech = (name: string) => {
    setSearchParams({ tech: name });
  };

  const clearSelection = () => {
    setSearchParams({});
  };

  useEffect(() => {
    if (selectedTech) document.body.style.overflow = 'hidden';
    else document.body.style.overflow = 'auto';
    return () => { document.body.style.overflow = 'auto'; };
  }, [selectedTech]);

  return (
    <div className="section-container ts-gamified-container">
      <div className="ts-vault-header">
        <div>
          <span className="section-tag">Data Vault</span>
          <h2 className="section-title" style={{ marginBottom: 0 }}>Skill Inventory</h2>
        </div>
        
        <div className="ts-hud-controls">
          <button
            className={`ts-hud-btn ${!activeGroup ? 'active' : ''}`}
            onClick={() => setActiveGroup(null)}
          >
            All Modules
          </button>
          {Object.entries(TECH_GROUPS).map(([id, group]) => {
            const count = techList.filter(t => categorizeTech(t.name) === id).length;
            if (count === 0) return null;
            return (
              <button
                key={id}
                className={`ts-hud-btn ${activeGroup === id ? 'active' : ''}`}
                onClick={() => setActiveGroup(activeGroup === id ? null : id)}
              >
                {group.icon}
                {group.label}
                <span className="ts-hud-count">{count}</span>
              </button>
            );
          })}
        </div>
      </div>

      <motion.div layout className="ts-inventory-grid">
        <AnimatePresence>
          {filteredTech.map((tech) => (
            <DataShard 
              key={tech.name} 
              tech={tech} 
              maxCount={maxCount}
              isActive={selectedTech === tech.name}
              onClick={() => selectTech(tech.name)}
            />
          ))}
        </AnimatePresence>
      </motion.div>

      <AnimatePresence>
        {selectedTech && selectedProjects.length > 0 && (
          <InspectionPanel 
            techName={selectedTech}
            count={techList.find(t => t.name === selectedTech)?.count || 0}
            projects={selectedProjects}
            onClose={clearSelection}
          />
        )}
      </AnimatePresence>
    </div>
  );
};

export default TechStackPage;
