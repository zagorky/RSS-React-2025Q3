import type { ReactNode } from 'react';

import { isString } from '~types/type-guards';

const themes = ['dark', 'light', 'system'] as const;

export type ThemeProviderProps = {
  children: ReactNode;
  defaultTheme?: Theme;
  storageKey?: string;
};

export type ThemeProviderState = {
  theme: Theme;
  setTheme: (theme: Theme) => void;
};

export const isTheme = (value: unknown): value is Theme => {
  return isString(value)
    ? themes.some((theme): theme is Theme => theme === value)
    : false;
};

export type Theme = (typeof themes)[number];
