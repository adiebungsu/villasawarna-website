import React, { createContext, useContext, useEffect, useState } from 'react';
import { Theme, getActiveTheme } from '@/lib/theme-utils';

interface ThemeContextType {
  theme: Theme;
  setTheme: (theme: Theme) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [theme, setTheme] = useState<Theme>(() => {
    // Cek localStorage untuk tema yang tersimpan
    const savedTheme = localStorage.getItem('theme') as Theme;
    if (savedTheme) return savedTheme;
    
    // Jika tidak ada preferensi yang tersimpan, gunakan mode auto sebagai default
    return 'auto';
  });

  useEffect(() => {
    const root = window.document.documentElement;
    
    // Hapus kelas tema sebelumnya
    root.classList.remove('light', 'dark');
    
    // Tambahkan kelas tema yang sesuai
    const activeTheme = getActiveTheme(theme);
    root.classList.add(activeTheme);
    
    // Simpan preferensi tema
    localStorage.setItem('theme', theme);

    // Jika menggunakan mode auto, atur interval untuk mengecek waktu
    let intervalId: NodeJS.Timeout | undefined;
    if (theme === 'auto') {
      intervalId = setInterval(() => {
        const newActiveTheme = getActiveTheme(theme);
        root.classList.remove('light', 'dark');
        root.classList.add(newActiveTheme);
      }, 60000); // Cek setiap menit
    }

    return () => {
      if (intervalId) {
        clearInterval(intervalId);
      }
    };
  }, [theme]);

  // Listen untuk perubahan preferensi sistem
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    
    const handleChange = () => {
      if (theme === 'system') {
        const root = window.document.documentElement;
        root.classList.remove('light', 'dark');
        root.classList.add(mediaQuery.matches ? 'dark' : 'light');
      }
    };

    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}; 