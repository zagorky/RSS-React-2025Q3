import { QueryClientProvider } from '@tanstack/react-query';
import { render, screen } from '@testing-library/react';
import { queryClient } from '~api/query-client';
import { Header } from '~components/header/header';
import { MemoryRouter } from 'react-router';
import { describe, expect, test } from 'vitest';

describe('Header', () => {
  test('should render header and nav tags', () => {
    render(
      <QueryClientProvider client={queryClient}>
        <MemoryRouter>
          <Header />
        </MemoryRouter>
      </QueryClientProvider>
    );

    expect(screen.getByRole('banner')).toBeInTheDocument();
    expect(screen.getByRole('navigation')).toBeInTheDocument();
  });

  test('should render nav links', () => {
    render(
      <QueryClientProvider client={queryClient}>
        <MemoryRouter>
          <Header />
        </MemoryRouter>
      </QueryClientProvider>
    );

    expect(screen.getByRole('link', { name: 'Main page' })).toBeInTheDocument();
    expect(
      screen.getByRole('link', { name: 'About page' })
    ).toBeInTheDocument();
  });
});