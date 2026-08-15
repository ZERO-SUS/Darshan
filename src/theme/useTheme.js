import { useCallback, useEffect, useState } from 'react';

/**
 * Theme state synced with <html data-theme>. Reads the value the no-flash
 * inline script (in index.html) already set, persists choice to localStorage,
 * and follows the OS preference until the user makes an explicit choice.
 */
export function useTheme() {
  const [theme, setTheme] = useState(() => {
    if (typeof document === 'undefined') return 'light';
    return document.documentElement.getAttribute('data-theme') || 'light';
  });

  // Apply + persist whenever theme changes.
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  // Follow OS changes only while the user hasn't chosen explicitly.
  useEffect(() => {
    const mq = window.matchMedia('(prefers-color-scheme: dark)');
    const onChange = (e) => {
      if (!localStorage.getItem('theme')) setTheme(e.matches ? 'dark' : 'light');
    };
    mq.addEventListener('change', onChange);
    return () => mq.removeEventListener('change', onChange);
  }, []);

  const toggle = useCallback(() => {
    setTheme((prev) => {
      const next = prev === 'dark' ? 'light' : 'dark';
      try {
        localStorage.setItem('theme', next);
      } catch (e) {
        /* ignore */
      }
      return next;
    });
  }, []);

  return { theme, toggle, isDark: theme === 'dark' };
}
