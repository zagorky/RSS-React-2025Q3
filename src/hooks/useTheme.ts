import { ThemeProviderContext } from '~components/theme-switcher/theme-provider-context';
import { use } from 'react';

export const useTheme = () => {
  const context = use(ThemeProviderContext);
  if (!context) {
    throw new Error('useTheme must be used within a theme context');
  }
  return context;
};