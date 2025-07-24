import { render, screen } from '@testing-library/react';
import { Header } from '~components/header/header';
import { MemoryRouter } from 'react-router';
import { describe, expect, test } from 'vitest';

describe('Header', () => {
  test('should render header and nav tags', () => {
    render(
      <MemoryRouter>
        <Header />
      </MemoryRouter>
    );

    expect(screen.getByRole('banner')).toBeInTheDocument();
    expect(screen.getByRole('navigation')).toBeInTheDocument();
  });

  test('should render nav links', () => {
    render(
      <MemoryRouter>
        <Header />
      </MemoryRouter>
    );

    expect(screen.getByRole('link', { name: 'Main page' })).toBeInTheDocument();
    expect(
      screen.getByRole('link', { name: 'About page' })
    ).toBeInTheDocument();
  });
});