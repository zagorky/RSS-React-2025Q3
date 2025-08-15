'use client';
import { useThemeStore } from '~store/theme-store';
import { type ThemeProviderProps } from '~types/theme';
import { useLayoutEffect } from 'react';

import { ThemeProviderContext } from './theme-provider-context';

export const ThemeProvider = ({ children }: ThemeProviderProps) => {
  const { theme, actions } = useThemeStore();

  useLayoutEffect(() => {
    actions.updateSystemTheme();

    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handler = () => actions.updateSystemTheme();
    mediaQuery.addEventListener('change', handler);

    return () => mediaQuery.removeEventListener('change', handler);
  }, [actions]);

  return (
    <ThemeProviderContext.Provider
      value={{ theme, setTheme: actions.setTheme }}
    >
      {children}
    </ThemeProviderContext.Provider>
  );
};
