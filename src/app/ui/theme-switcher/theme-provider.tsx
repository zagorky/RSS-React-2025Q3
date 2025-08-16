'use client';
import { useTheme, useThemeActions } from '~store/theme-store';
import { type ThemeProviderProps } from '~types/theme';
import { useLayoutEffect } from 'react';

import { ThemeProviderContext } from './theme-provider-context';

export const ThemeProvider = ({ children }: ThemeProviderProps) => {
  const theme = useTheme();
  const { updateSystemTheme, applyCurrentTheme, setTheme } = useThemeActions();

  useLayoutEffect(() => {
    updateSystemTheme();
    applyCurrentTheme();

    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handler = () => updateSystemTheme();
    mediaQuery.addEventListener('change', handler);

    return () => mediaQuery.removeEventListener('change', handler);
  }, [applyCurrentTheme, updateSystemTheme]);

  return (
    <ThemeProviderContext.Provider value={{ theme, setTheme: setTheme }}>
      {children}
    </ThemeProviderContext.Provider>
  );
};
