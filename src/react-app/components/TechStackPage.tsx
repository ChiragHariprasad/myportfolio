import React, { useState, useMemo, useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Layers, Cpu, Database, Code, Globe, Terminal, Shield, Zap, ChevronRight } from 'lucide-react';
import { getTechWithCounts, getProjectsByTech } from '../data/contentLoader';
import '../styles/portfolio.css';
import '../styles/gamified-techstack.css';

const MIN_PROJECT_COUNT = 2;

const TECH_GROUPS: Record<string, { label: string; icon: React.ReactNode; keywords: string[]; color: string }> = {
  languages: {
    label: 'Languages',
    icon: <Code size={16} />,
    keywords: ['python', 'javascript', 'typescript', 'c', 'c++', 'java', 'rust', 'go', 'sql', 'html', 'css', 'bash'],
    color: '#c8a961',
  },
  frameworks: {
    label: 'Frameworks',
    icon: <Globe size={16} />,
    keywords: ['react', 'next.js', 'fastapi', 'flask', 'django', 'express', 'node.js', 'vite', 'tailwind', 'tailwindcss', 'framer motion'],
    color: '#61c8d1',
  },
  ai: {
    label: 'AI / ML',
    icon: <Cpu size={16} />,
    keywords: ['pytorch', 'tensorflow', 'scikit-learn', 'xgboost', 'keras', 'hugging face', 'ollama', 'gemini', 'langchain', 'openai', 'whisper', 'faster-whisper', 'speechbrain', 'pyannote', 'umap', 'hdbscan', 'isolation forest', 'causal inference', 'bayesian', 'monte carlo', 'reinforcement learning', 'agent-based', 'system dynamics', 'faiss', 'sentence transformers', 'prophet', 'lightgbm'],
    color: '#d161c8',
  },
  data: {
    label: 'Data & Storage',
    icon: <Database size={16} />,
    keywords: ['postgresql', 'mongodb', 'redis', 'supabase', 'firebase', 'sqlite', 'neo4j', 'json', 'csv', 'pandas', 'numpy', 'polars'],
    color: '#61d189',
  },
  infrastructure: {
    label: 'Infrastructure',
    icon: <Layers size={16} />,
    keywords: ['docker', 'aws', 'gcp', 'azure', 'cloudflare', 'lambda', 'sqs', 'kafka', 'kubernetes', 'nginx', 'github actions', 'ci/cd', 'vercel', 'prometheus', 'grafana'],
    color: '#d19961',
  },
  tools: {
    label: 'Tools & Libs',
    icon: <Terminal size={16} />,
    keywords: ['git', 'linux', 'figma', 'postman', 'jupyter', 'vs code', 'raspberry pi', 'arduino', 'esp32', 'mqtt', 'matplotlib', 'folium', 'flask'],
    color: '#6181d1',
  },
};

function categorizeTech(name: string): string {
  const lower = name.toLowerCase();
  for (const [groupId, group] of Object.entries(TECH_GROUPS)) {
    if (group.keywords.some(k => lower === k || k === lower)) {
      return groupId;
    }
  }
  return 'tools';
}

const SkillNode = ({ 
  tech, maxCount, isActive, onClick, categoryColor, index 
}: { 
  tech: any; maxCount: number; isActive: boolean; onClick: () => void; categoryColor: string; index: number 
}) => {
  const level = Math.ceil((tech.count / maxCount) * 5);
  const percentage = Math.round((tech.count / maxCount) * 100);

  return (
    <motion.button 
      className={`ts-skill-node ${isActive ? 'active' : ''}`}
      onClick={onClick}
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.8 }}
      transition={{ delay: index * 0.05, duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
      whileHover={{ scale: 1.05, y: -6 }}
      whileTap={{ scale: 0.97 }}
      style={{ '--node-accent': categoryColor } as React.CSSProperties}
    >
      <div className="ts-node-glow" />
      <div className="ts-node-inner">
        <div className="ts-node-level-badge">
          <Zap size={10} />
          <span>LVL {level}</span>
        </div>
        <div className="ts-node-name">{tech.name}</div>
        <div className="ts-node-count">{tech.count} project{tech.count > 1 ? 's' : ''}</div>
        <div className="ts-node-power-bar">
          <motion.div 
            className="ts-power-fill"
            initial={{ width: 0 }}
            animate={{ width: `${percentage}%` }}
            transition={{ delay: index * 0.05 + 0.3, duration: 0.8, ease: "easeOut" }}
          />
          <div className="ts-power-segments">
            {[1, 2, 3, 4, 5].map(i => (
              <div key={i} className={`ts-power-seg ${i <= level ? 'filled' : ''}`} />
            ))}
          </div>
        </div>
      </div>
    </motion.button>
  );
};

const InspectionPanel = ({ techName, count, projects, onClose, categoryColor }: { techName: string; count: number; projects: any[]; onClose: () => void; categoryColor: string }) => {
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
        style={{ '--panel-accent': categoryColor } as React.CSSProperties}
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
            <div className="ts-stat-value" style={{ color: categoryColor }}>Active</div>
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
                <ChevronRight size={14} className="ts-project-arrow" />
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

  const techList = useMemo(() => {
    return getTechWithCounts().filter(t => t.count >= MIN_PROJECT_COUNT);
  }, []);
  
  const maxCount = techList.length > 0 ? techList[0].count : 1;

  // Group techs by category
  const groupedTechs = useMemo(() => {
    const groups: Record<string, typeof techList> = {};
    const filtered = activeGroup 
      ? techList.filter(t => categorizeTech(t.name) === activeGroup)
      : techList;
    
    for (const tech of filtered) {
      const cat = categorizeTech(tech.name);
      if (!groups[cat]) groups[cat] = [];
      groups[cat].push(tech);
    }
    return groups;
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

  const totalFiltered = Object.values(groupedTechs).reduce((sum, arr) => sum + arr.length, 0);

  return (
    <div className="section-container ts-gamified-container">
      {/* Animated background grid */}
      <div className="ts-bg-grid" />
      
      <div className="ts-vault-header">
        <div>
          <span className="section-tag">Data Vault</span>
          <h2 className="section-title" style={{ marginBottom: '0.25rem' }}>Skill Arsenal</h2>
          <p className="ts-vault-subtitle">
            {totalFiltered} core technologies across {Object.keys(groupedTechs).length} domains
          </p>
        </div>
        
        <div className="ts-hud-controls">
          <button
            className={`ts-hud-btn ${!activeGroup ? 'active' : ''}`}
            onClick={() => setActiveGroup(null)}
          >
            All Systems
          </button>
          {Object.entries(TECH_GROUPS).map(([id, group]) => {
            const count = techList.filter(t => categorizeTech(t.name) === id).length;
            if (count === 0) return null;
            return (
              <button
                key={id}
                className={`ts-hud-btn ${activeGroup === id ? 'active' : ''}`}
                onClick={() => setActiveGroup(activeGroup === id ? null : id)}
                style={{ '--btn-accent': group.color } as React.CSSProperties}
              >
                {group.icon}
                {group.label}
                <span className="ts-hud-count">{count}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Grouped Category Sections */}
      <div className="ts-categories-container">
        <AnimatePresence mode="wait">
          {Object.entries(groupedTechs).map(([catId, techs]) => {
            const group = TECH_GROUPS[catId];
            if (!group || techs.length === 0) return null;
            
            return (
              <motion.div 
                key={catId}
                className="ts-category-section"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.4 }}
              >
                <div className="ts-category-header" style={{ '--cat-color': group.color } as React.CSSProperties}>
                  <div className="ts-category-icon">{group.icon}</div>
                  <span className="ts-category-label">{group.label}</span>
                  <span className="ts-category-count">{techs.length}</span>
                  <div className="ts-category-line" />
                </div>

                <div className="ts-skill-grid">
                  {techs.map((tech, idx) => (
                    <SkillNode
                      key={tech.name}
                      tech={tech}
                      maxCount={maxCount}
                      isActive={selectedTech === tech.name}
                      onClick={() => selectTech(tech.name)}
                      categoryColor={group.color}
                      index={idx}
                    />
                  ))}
                </div>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>

      <AnimatePresence>
        {selectedTech && selectedProjects.length > 0 && (
          <InspectionPanel 
            techName={selectedTech}
            count={techList.find(t => t.name === selectedTech)?.count || 0}
            projects={selectedProjects}
            onClose={clearSelection}
            categoryColor={TECH_GROUPS[categorizeTech(selectedTech)]?.color || '#c8a961'}
          />
        )}
      </AnimatePresence>
    </div>
  );
};

export default TechStackPage;
