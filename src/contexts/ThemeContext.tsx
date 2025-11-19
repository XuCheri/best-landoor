import React, { createContext, useState, useContext, useMemo, useEffect } from 'react';

const themes = {
  'neon-blue': {
    name: 'Neon Blue',
    colors: {
      background: '#0a0f1f',
      primary: '#00f6ff',
      secondary: '#007bff',
      accent: '#ffffff',
      text: '#e0e0e0',
    },
  },
  'purple-gradient': {
    name: 'Purple Gradient',
    colors: {
      background: '#1a0f2d',
      primary: '#ff00c8',
      secondary: '#a900ff',
      accent: '#ffffff',
      text: '#f0e8ff',
    },
  },
  'black-gold': {
    name: 'Black Gold Tech',
    colors: {
      background: '#0c0c0c',
      primary: '#ffd700',
      secondary: '#ffb700',
      accent: '#ffffff',
      text: '#e0e0e0',
    },
  },
};

const ThemeContext = createContext({
  theme: themes['neon-blue'],
  setTheme: (themeName: string) => {},
  themes: themes,
});

export const ThemeProvider = ({ children }) => {
  const [themeName, setThemeName] = useState('neon-blue');

  useEffect(() => {
    const theme = themes[themeName];
    const root = document.documentElement;
    root.style.setProperty('--color-background', theme.colors.background);
    root.style.setProperty('--color-primary', theme.colors.primary);
    root.style.setProperty('--color-secondary', theme.colors.secondary);
    root.style.setProperty('--color-accent', theme.colors.accent);
    root.style.setProperty('--color-text', theme.colors.text);
  }, [themeName]);

  const value = useMemo(() => ({
    theme: themes[themeName],
    setTheme: setThemeName,
    themes: themes,
  }), [themeName]);

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);
