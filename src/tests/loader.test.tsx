import type { Navigation } from 'react-router';

import { QueryClientProvider } from '@tanstack/react-query';
import { render, screen } from '@testing-library/react';
import { queryClient } from '~api/query-client';
import { Loader } from '~components/loader/loader';
import { useNavigation } from 'react-router';
import { describe, expect, it, vi } from 'vitest';

vi.mock('react-router', async () => {
  const actual = await vi.importActual('react-router');
  return {
    ...actual,
    useNavigation: vi.fn(),
  };
});

describe('Loader', () => {
  it('should not render when navigation state is "idle"', () => {
    vi.mocked(useNavigation).mockReturnValue({ state: 'idle' } as Navigation);

    render(
      <QueryClientProvider client={queryClient}>
        <Loader />
      </QueryClientProvider>
    );

    expect(screen.queryByTestId('loader')).toBeNull();
  });

  it('should not render when navigation state is "submitting"', () => {
    vi.mocked(useNavigation).mockReturnValue({
      state: 'submitting',
    } as Navigation);

    render(
      <QueryClientProvider client={queryClient}>
        <Loader />
      </QueryClientProvider>
    );
    expect(screen.queryByTestId('loader')).toBeNull();
  });

  it('should render when navigation state is "loading"', () => {
    vi.mocked(useNavigation).mockReturnValue({
      state: 'loading',
    } as Navigation);

    render(
      <QueryClientProvider client={queryClient}>
        <Loader />
      </QueryClientProvider>
    );
    const loader = screen.getByTestId('loader');
    expect(loader).toBeInTheDocument();

    expect(loader).toHaveClass('loader-container');
    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });
});