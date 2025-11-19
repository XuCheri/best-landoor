import React from 'react';
import { useTheme } from '../contexts/ThemeContext';

const ThemeSwitcher = () => {
  const { setTheme, theme: currentTheme, themes } = useTheme();

  return (
    <div className="fixed top-6 right-6 z-50 pointer-events-auto">
      <div className="flex items-center gap-3 p-2 bg-gray-900 bg-opacity-30 backdrop-blur-sm rounded-full border border-white/10">
        {Object.keys(themes).map((themeName) => (
          <button
            key={themeName}
            onClick={() => setTheme(themeName)}
            className={`w-6 h-6 rounded-full transition-transform hover:scale-110 border-2 ${
              currentTheme.name === themes[themeName].name ? 'border-white' : 'border-transparent'
            }`}
            style={{ backgroundColor: themes[themeName].colors.primary }}
            title={themes[themeName].name}
          />
        ))}
      </div>
    </div>
  );
};

export default ThemeSwitcher;
