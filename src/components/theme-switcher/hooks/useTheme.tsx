import { ThemeProviderContext } from '~components/theme-switcher/components/theme-provider-context';
import { use } from 'react';

export const useTheme = () => {
  return use(ThemeProviderContext);
};
