'use client';

import { createContext, useContext, useState, useEffect, useCallback } from 'react';

const THEME_KEY = 'diary-theme';

interface ThemeValue {
  isDark: boolean;
  toggleDark: () => void;
}

const ThemeContext = createContext<ThemeValue>({ isDark: false, toggleDark: () => {} });

/* Theme state lives here, in the root layout, which never unmounts on
   client-side navigation — so the choice persists across every page.
   We read localStorage once on mount and only ever write on an explicit
   toggle, so there is no read/write effect race to clobber the value. */
export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    setIsDark(localStorage.getItem(THEME_KEY) === 'dark');
  }, []);

  const toggleDark = useCallback(() => {
    setIsDark(prev => {
      const next = !prev;
      try { localStorage.setItem(THEME_KEY, next ? 'dark' : 'light'); } catch { /* private mode */ }
      return next;
    });
  }, []);

  return <ThemeContext.Provider value={{ isDark, toggleDark }}>{children}</ThemeContext.Provider>;
}

export function useTheme() {
  return useContext(ThemeContext);
}
