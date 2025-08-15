import type { Theme } from '~types/theme';

import { THEME_LS_KEY } from '~config/app-config';
import { persist } from 'zustand/middleware';
import { create } from 'zustand/react';

type ThemeStoreType = {
  theme: Theme;
  systemTheme: Theme;
  actions: {
    setTheme: (theme: Theme) => void;
    updateSystemTheme: VoidFunction;
    applyCurrentTheme: VoidFunction;
  };
};

export const useThemeStore = create<ThemeStoreType>()(
  persist(
    (set, get) => ({
      theme: 'system',
      systemTheme: 'dark',
      actions: {
        setTheme: (theme) => {
          set({ theme });
          get().actions.applyCurrentTheme();
        },

        applyCurrentTheme: () => {
          const root = document.documentElement;
          root.classList.remove('light', 'dark');

          const currentTheme =
            get().theme === 'system' ? get().systemTheme : get().theme;

          root.classList.add(currentTheme);
        },

        updateSystemTheme: () => {
          const systemTheme = window.matchMedia('(prefers-color-scheme: dark)')
            .matches
            ? 'dark'
            : 'light';
          set({ systemTheme });
          if (get().theme === 'system') {
            get().actions.applyCurrentTheme();
          }
        },
      },
    }),
    {
      name: THEME_LS_KEY,
      partialize: (state) => ({ theme: state.theme }),
    }
  )
);

export const useTheme = () =>
  useThemeStore((state) => {
    return state.theme === 'system' ? state.systemTheme : state.theme;
  });

export const useThemeActions = () => useThemeStore((state) => state.actions);
