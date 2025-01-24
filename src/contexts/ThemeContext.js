import React, { createContext, useContext, useState, useEffect } from 'react';

const ThemeContext = createContext();

export const themes = {
  light: {
    name: 'light',
    colors: {
      primary: '#3B82F6',
      secondary: '#6B7280',
      background: '#F3F4F6',
      surface: '#FFFFFF',
      text: '#1F2937',
      textSecondary: '#4B5563',
      border: '#E5E7EB'
    }
  },
  dark: {
    name: 'dark',
    colors: {
      primary: '#60A5FA',
      secondary: '#9CA3AF',
      background: '#1F2937',
      surface: '#374151',
      text: '#F9FAFB',
      textSecondary: '#D1D5DB',
      border: '#4B5563'
    }
  },
  ocean: {
    name: 'ocean',
    colors: {
      primary: '#0EA5E9',
      secondary: '#64748B',
      background: '#F0F9FF',
      surface: '#FFFFFF',
      text: '#0F172A',
      textSecondary: '#334155',
      border: '#E0F2FE'
    }
  },
  forest: {
    name: 'forest',
    colors: {
      primary: '#059669',
      secondary: '#64748B',
      background: '#F0FDF4',
      surface: '#FFFFFF',
      text: '#064E3B',
      textSecondary: '#065F46',
      border: '#DCFCE7'
    }
  }
};

export function ThemeProvider({ children }) {
  const [currentTheme, setCurrentTheme] = useState(() => {
    const saved = localStorage.getItem('theme');
    return saved ? JSON.parse(saved) : themes.light;
  });

  const [isDark, setIsDark] = useState(() => {
    const saved = localStorage.getItem('isDark');
    return saved ? JSON.parse(saved) : false;
  });

  useEffect(() => {
    localStorage.setItem('theme', JSON.stringify(currentTheme));
    localStorage.setItem('isDark', JSON.stringify(isDark));

    // Appliquer les couleurs CSS personnalisées
    Object.entries(currentTheme.colors).forEach(([key, value]) => {
      document.documentElement.style.setProperty(`--color-${key}`, value);
    });

    // Gérer la classe dark pour Tailwind
    if (isDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [currentTheme, isDark]);

  const toggleDarkMode = () => {
    setIsDark(!isDark);
    setCurrentTheme(isDark ? themes.light : themes.dark);
  };

  const changeTheme = (themeName) => {
    const newTheme = themes[themeName];
    if (newTheme) {
      setCurrentTheme(newTheme);
      setIsDark(themeName === 'dark');
    }
  };

  return (
    <ThemeContext.Provider value={{
      currentTheme,
      isDark,
      toggleDarkMode,
      changeTheme,
      themes
    }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}

// Hook pour les animations CSS légères
export function useThemeTransition() {
  useEffect(() => {
    // Ajouter les transitions CSS de base
    const transitionStyle = `
      * {
        transition-property: background-color, border-color, color, fill, stroke;
        transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
        transition-duration: 150ms;
      }
    `;

    const styleElement = document.createElement('style');
    styleElement.innerHTML = transitionStyle;
    document.head.appendChild(styleElement);

    return () => {
      document.head.removeChild(styleElement);
    };
  }, []);
}
