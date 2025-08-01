import { render, screen } from '@testing-library/react';
import { ThemeProvider } from '~components/theme-switcher/components/theme-provider';
import { ThemeSwitcher } from '~components/theme-switcher/components/theme-switcher';
import { beforeEach, describe, test, vi } from 'vitest';

import { setupUserEvent } from '~/tests/test-utilties';

beforeEach(() => {
  window.matchMedia = vi.fn().mockImplementation(() => ({
    matches: false,
  }));
});

describe('ThemeSwitcher', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    localStorage.clear();
  });

  test('should render sun icon when theme is light', () => {
    render(
      <ThemeProvider defaultTheme="light">
        <ThemeSwitcher />
      </ThemeProvider>
    );

    expect(screen.getByTestId('sun-icon')).toBeInTheDocument();
  });

  test('should render moon icon when theme is dark', () => {
    render(
      <ThemeProvider defaultTheme="dark">
        <ThemeSwitcher />
      </ThemeProvider>
    );

    expect(screen.getByTestId('moon-icon')).toBeInTheDocument();
  });

  test('should toggle theme when clicked', async () => {
    const { user } = setupUserEvent(
      <ThemeProvider defaultTheme="light">
        <ThemeSwitcher />
      </ThemeProvider>
    );

    expect(screen.getByTestId('sun-icon')).toBeInTheDocument();

    await user.click(screen.getByRole('button', { name: /toggle theme/i }));

    expect(screen.getByTestId('moon-icon')).toBeInTheDocument();
  });
});