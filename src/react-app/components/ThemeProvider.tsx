import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { getSiteConfig } from '../data/contentLoader';
import type { ThemeDefinition } from '../data/types';

interface ThemeContextType {
  currentTheme: ThemeDefinition;
  setTheme: (themeId: string) => void;
  themes: ThemeDefinition[];
  themeId: string;
}

const ThemeContext = createContext<ThemeContextType | null>(null);

export function useTheme(): ThemeContextType {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error('useTheme must be used within ThemeProvider');
  return ctx;
}

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const siteConfig = getSiteConfig();
  const themes = siteConfig.themes;

  const [themeId, setThemeId] = useState<string>(() => {
    const saved = localStorage.getItem('portfolio-theme');
    return saved && themes.find(t => t.id === saved) ? saved : siteConfig.defaultTheme;
  });

  const currentTheme = themes.find(t => t.id === themeId) || themes[0];

  const applyTheme = useCallback((theme: ThemeDefinition) => {
    const root = document.documentElement;
    for (const [key, value] of Object.entries(theme.colors)) {
      root.style.setProperty(key, value);
    }
  }, []);

  useEffect(() => {
    applyTheme(currentTheme);
    localStorage.setItem('portfolio-theme', themeId);
  }, [themeId, currentTheme, applyTheme]);

  const setTheme = (id: string) => {
    if (themes.find(t => t.id === id)) {
      setThemeId(id);
    }
  };

  return (
    <ThemeContext.Provider value={{ currentTheme, setTheme, themes, themeId }}>
      {children}
    </ThemeContext.Provider>
  );
};
