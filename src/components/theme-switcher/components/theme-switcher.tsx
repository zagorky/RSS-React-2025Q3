import { Button } from '~components/button/button';
import { useTheme } from '~components/theme-switcher/hooks/useTheme';
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
      {isLight ? <Sun /> : <Moon />}
      <span className="sr-only">Toggle theme</span>
    </Button>
  );
};