import type { Theme } from '~types/theme';
import type { ReactNode } from 'react';

import { ThemeProviderContext } from '~components/theme-switcher/theme-provider-context';
import { THEME_LS_KEY } from '~config/app-config';
import { useLocalStorage } from '~hooks/useLocalStorage';
import { isTheme } from '~types/theme';
import { useEffect, useLayoutEffect, useMemo, useState } from 'react';

type ThemeProviderProps = {
  children: ReactNode;
  defaultTheme?: Theme;
  storageKey?: string;
};

export const ThemeProvider = ({
  children,
  defaultTheme = 'system',
  storageKey = THEME_LS_KEY,
}: ThemeProviderProps) => {
  const { valueFromLS, setValueToLS } = useLocalStorage(storageKey);
  const [theme, setTheme] = useState<Theme>(() => {
    return isTheme(valueFromLS) ? valueFromLS : defaultTheme;
  });

  useLayoutEffect(() => {
    if (theme === 'system') {
      const systemTheme = window.matchMedia('(prefers-color-scheme: dark)')
        .matches
        ? 'dark'
        : 'light';

      setValueToLS(systemTheme);
    }
  }, [setValueToLS, theme]);

  useLayoutEffect(() => {
    const root = window.document.documentElement;

    root.classList.remove('light', 'dark');

    if (theme === 'system') {
      const systemTheme = window.matchMedia('(prefers-color-scheme: dark)')
        .matches
        ? 'dark'
        : 'light';

      root.classList.add(systemTheme);
    }

    root.classList.add(theme);
  }, [setValueToLS, theme]);

  useEffect(() => {
    setValueToLS(theme);
  }, [setValueToLS, theme]);

  const value = useMemo(
    () => ({
      theme,
      setTheme,
    }),
    [theme]
  );

  return (
    <ThemeProviderContext.Provider value={value}>
      {children}
    </ThemeProviderContext.Provider>
  );
};
