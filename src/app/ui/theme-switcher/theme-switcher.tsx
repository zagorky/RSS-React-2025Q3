'use client';

import { withDataTestId } from '~lib/utilities';
import { useTheme, useThemeActions } from '~store/theme-store';
import { Button } from '~ui/button/button';
import { Moon, Sun } from 'lucide-react';
import { useTranslations } from 'next-intl';

export const ThemeSwitcher = () => {
  const theme = useTheme();
  const { setTheme } = useThemeActions();
  const t = useTranslations('ThemeSwitcher');

  const isLight = theme === 'light';
  return (
    <Button
      type="button"
      classNames="cursor-pointer"
      onClick={() => {
        setTheme(isLight ? 'dark' : 'light');
      }}
      aria-label={isLight ? t('lightTheme') : t('darkTheme')}
    >
      {isLight ? (
        <Sun {...withDataTestId('sun-icon')} className="h-4.5" />
      ) : (
        <Moon {...withDataTestId('moon-icon')} className="h-4.5" />
      )}
      <span className="sr-only">{t('toggleTheme')}</span>
    </Button>
  );
};