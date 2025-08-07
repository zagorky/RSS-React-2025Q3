import { QueryClientProvider } from '@tanstack/react-query';
import { waitFor } from '@testing-library/dom';
import { render, screen } from '@testing-library/react';
import { queryClient } from '~api/query-client';
import { http, HttpResponse } from 'msw';
import { RouterProvider } from 'react-router';

import {
  emptyResponse,
  mockEmptyLoaderData,
  mockLoaderData,
  specificQueryResponse,
} from '~/mocks/data';
import { createMainTestRouter } from '~/tests/test-utilties';

import { server } from '../../vitest.setupTests';

const localStorageMock = {
  getItem: vi.fn(),
  setItem: vi.fn(),
  clear: vi.fn(),
};
vi.stubGlobal('localStorage', localStorageMock);

describe('Results Section', () => {
  test('should render results when data is provided', async () => {
    localStorageMock.getItem.mockReturnValueOnce('friren');

    server.use(
      http.get('https://api.jikan.moe/v4/anime', () => {
        return HttpResponse.json(specificQueryResponse);
      })
    );

    const router = createMainTestRouter(mockLoaderData);
    render(
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
      </QueryClientProvider>
    );

    await waitFor(() => {
      expect(screen.getByTestId('result-list')).toBeInTheDocument();
    });

    const items = screen.getAllByTestId('result-item');
    expect(items).toHaveLength(mockLoaderData.results.length);

    expect(screen.queryByTestId('empty-list')).toBeNull();
    expect(screen.queryByTestId('error-fallback')).toBeNull();
  });

  test('should render emptyList when results are empty', async () => {
    localStorageMock.getItem.mockReturnValueOnce('empty-query');

    server.use(
      http.get('https://api.jikan.moe/v4/anime', () => {
        return HttpResponse.json(emptyResponse);
      })
    );

    const router = createMainTestRouter(mockEmptyLoaderData);
    render(
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
      </QueryClientProvider>
    );

    expect(await screen.findByTestId('empty-list')).toBeInTheDocument();
  });

  test.skip('should render error fallback when error exists', async () => {
    const errorLoaderData = {
      results: [],
      pagination: {
        current_page: 1,
        has_next_page: false,
        last_visible_page: 1,
      },
      query: '',
      error: 'Test error',
    };

    const router = createMainTestRouter(errorLoaderData);
    render(
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
      </QueryClientProvider>
    );

    expect(await screen.findByTestId('error-fallback')).toBeInTheDocument();
  });
});
