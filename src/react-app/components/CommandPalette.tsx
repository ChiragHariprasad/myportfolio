import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, ArrowRight, FileText, Globe, Mail, Palette, ExternalLink } from 'lucide-react';
import { search } from '../data/searchIndex';
import { useTheme } from './ThemeProvider';
import type { SearchItem } from '../data/types';

const CommandPalette: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<SearchItem[]>([]);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();
  const { themes, setTheme } = useTheme();

  // Open with "/" key
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === '/' && !isOpen && !(e.target instanceof HTMLInputElement)) {
        e.preventDefault();
        setIsOpen(true);
      }
      if (e.key === 'Escape' && isOpen) {
        setIsOpen(false);
      }
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [isOpen]);

  // Focus input when opened
  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
      setQuery('');
      setResults([]);
      setSelectedIndex(0);
    }
  }, [isOpen]);

  // Search on query change
  useEffect(() => {
    if (!query.trim()) {
      // Show default items when empty
      const defaults = search('', 0);
      // Add theme switcher items
      const themeItems: SearchItem[] = themes.map(t => ({
        id: `theme-${t.id}`,
        title: `Theme: ${t.name}`,
        subtitle: `Switch to ${t.name} theme`,
        type: 'action' as const,
        path: `#theme-${t.id}`,
        keywords: ['theme', t.name.toLowerCase()],
      }));
      setResults([...defaults, ...themeItems].slice(0, 8));
      setSelectedIndex(0);
      return;
    }

    // Search content + add theme results
    const contentResults = search(query, 8);
    const themeResults: SearchItem[] = themes
      .filter(t => t.name.toLowerCase().includes(query.toLowerCase()) || 'theme'.includes(query.toLowerCase()))
      .map(t => ({
        id: `theme-${t.id}`,
        title: `Theme: ${t.name}`,
        subtitle: `Switch to ${t.name} theme`,
        type: 'action' as const,
        path: `#theme-${t.id}`,
        keywords: ['theme'],
      }));

    setResults([...contentResults, ...themeResults].slice(0, 10));
    setSelectedIndex(0);
  }, [query, themes]);

  const executeItem = useCallback((item: SearchItem) => {
    setIsOpen(false);

    // Theme switching
    if (item.path.startsWith('#theme-')) {
      const themeId = item.path.replace('#theme-', '');
      setTheme(themeId);
      return;
    }

    // External links
    if (item.path.startsWith('http') || item.path.startsWith('mailto:')) {
      window.open(item.path, '_blank');
      return;
    }

    // Resume download
    if (item.path.endsWith('.pdf')) {
      window.open(item.path, '_blank');
      return;
    }

    // Internal navigation
    navigate(item.path);
  }, [navigate, setTheme]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex(i => Math.min(i + 1, results.length - 1));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex(i => Math.max(i - 1, 0));
    } else if (e.key === 'Enter' && results[selectedIndex]) {
      executeItem(results[selectedIndex]);
    }
  };

  const getIcon = (item: SearchItem) => {
    if (item.path.startsWith('#theme-')) return <Palette size={16} />;
    if (item.type === 'action') {
      if (item.path.includes('github') || item.path.includes('linkedin')) return <ExternalLink size={16} />;
      if (item.path.includes('mailto')) return <Mail size={16} />;
      if (item.path.endsWith('.pdf')) return <FileText size={16} />;
      return <Globe size={16} />;
    }
    return <ArrowRight size={16} />;
  };

  if (!isOpen) return null;

  return (
    <div className="command-palette-overlay" onClick={() => setIsOpen(false)}>
      <div className="command-palette" onClick={e => e.stopPropagation()}>
        <div className="command-palette-input-wrapper">
          <Search size={18} className="command-palette-search-icon" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={e => setQuery(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Search projects, navigate, switch themes..."
            className="command-palette-input"
            autoComplete="off"
          />
          <kbd className="command-palette-kbd">ESC</kbd>
        </div>

        {results.length > 0 && (
          <div className="command-palette-results">
            {results.map((item, idx) => (
              <button
                key={item.id}
                className={`command-palette-item ${idx === selectedIndex ? 'selected' : ''}`}
                onClick={() => executeItem(item)}
                onMouseEnter={() => setSelectedIndex(idx)}
              >
                <span className="command-palette-item-icon">{getIcon(item)}</span>
                <div className="command-palette-item-text">
                  <span className="command-palette-item-title">{item.title}</span>
                  <span className="command-palette-item-subtitle">{item.subtitle}</span>
                </div>
                <span className={`command-palette-item-type type-${item.type}`}>
                  {item.type}
                </span>
              </button>
            ))}
          </div>
        )}

        {query && results.length === 0 && (
          <div className="command-palette-empty">
            No results for "{query}"
          </div>
        )}
      </div>
    </div>
  );
};

export default CommandPalette;
