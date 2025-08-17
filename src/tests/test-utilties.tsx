import type { ReactNode } from 'react';

import { render, type RenderResult } from '@testing-library/react';
import { type UserEvent, userEvent } from '@testing-library/user-event';

export const setupUserEvent = (tsx: ReactNode): { user: UserEvent } & RenderResult => {
  return {
    user: userEvent.setup(),
    ...render(tsx),
  };
};
