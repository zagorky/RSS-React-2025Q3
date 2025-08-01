import { Button } from '~components/button/button';
import { useTheme } from '~components/theme-switcher/hooks/useTheme';
import { withDataTestId } from '~utils/utilities';
import { Moon, Sun } from 'lucide-react';

export const ThemeSwitcher = () => {
  const { theme, setTheme } = useTheme();
  const isLight = theme === 'light';
  return (
    <Button
      type="button"
      classNames="cursor-pointer"
      onClick={() => {
        setTheme(isLight ? 'dark' : 'light');
      }}
    >
      {isLight ? (
        <Sun {...withDataTestId('sun-icon')} className="h-4.5" />
      ) : (
        <Moon {...withDataTestId('moon-icon')} className="h-4.5" />
      )}
      <span className="sr-only">Toggle theme</span>
    </Button>
  );
};
