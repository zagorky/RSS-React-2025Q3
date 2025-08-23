import type { ReactNode } from 'react';

import { render, type RenderResult, screen } from '@testing-library/react';
import { type UserEvent, userEvent } from '@testing-library/user-event';

export const setupUserEvent = (tsx: ReactNode): { user: UserEvent } & RenderResult => {
  return {
    user: userEvent.setup(),
    ...render(tsx),
  };
};

export const getFormFields = () => {
  const name = screen.getByRole('textbox', { name: /name/i });
  const age = screen.getByRole('spinbutton', { name: /age/i });
  const password = screen.getByRole('textbox', { name: 'Password' });
  const confirmPassword = screen.getByRole('textbox', { name: /confirm/i });
  const email = screen.getByRole('textbox', { name: /email/i });
  const male = screen.getByRole('radio', { name: 'male' });
  const female = screen.getByRole('radio', { name: 'female' });
  const country = screen.getByRole('combobox', { name: /country/i });
  const image = screen.getByLabelText(/image/i);
  const terms = screen.getByRole('checkbox', { name: /terms/i });
  const submit = screen.getByRole('button', { name: /submit/i });

  return {
    name,
    age,
    password,
    confirmPassword,
    email,
    male,
    female,
    country,
    submit,
    terms,
    image,
  };
};