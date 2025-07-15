import type { UserEvent } from '@testing-library/user-event';
import type { ReactNode } from 'react';

import { render, type RenderResult, screen } from '@testing-library/react';
import { userEvent } from '@testing-library/user-event';

export const searchInput = () =>
  screen.getByRole('textbox', { name: 'Search' });

export const searchButton = () =>
  screen.getByRole('button', { name: 'Search' });

export const setupUserEvent = (
  jsx: ReactNode
): { user: UserEvent } & RenderResult => {
  return {
    user: userEvent.setup(),
    ...render(jsx),
  };
};

export const noop = () => {};