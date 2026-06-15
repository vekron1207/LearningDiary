'use client';

import { useState, useEffect, useCallback } from 'react';

const THEME_KEY = 'diary-theme';

export function useTheme() {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    setIsDark(localStorage.getItem(THEME_KEY) === 'dark');
  }, []);

  useEffect(() => {
    localStorage.setItem(THEME_KEY, isDark ? 'dark' : 'light');
  }, [isDark]);

  const toggleDark = useCallback(() => setIsDark(d => !d), []);

  return { isDark, toggleDark };
}
