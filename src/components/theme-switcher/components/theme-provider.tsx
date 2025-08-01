import type { Theme } from '~types/theme';
import type { ReactNode } from 'react';

import { ThemeProviderContext } from '~components/theme-switcher/components/theme-provider-context';
import { THEME_LS_KEY } from '~config/app-config';
import { useLocalStorage } from '~hooks/useLocalStorage';
import { isTheme } from '~types/theme';
import { cn } from '~utils/cn';
import { useMemo, useState } from 'react';

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

  const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches
    ? 'dark'
    : 'light';

  const themeClass = theme === 'system' ? systemTheme : theme;

  const value = useMemo(
    () => ({
      theme,
      setTheme: (theme: Theme) => {
        setValueToLS(theme);
        setTheme(theme);
      },
    }),
    [theme, setValueToLS]
  );

  return (
    <div className={cn('bg-bg', themeClass)}>
      <ThemeProviderContext.Provider value={value}>
        {children}
      </ThemeProviderContext.Provider>
    </div>
  );
};