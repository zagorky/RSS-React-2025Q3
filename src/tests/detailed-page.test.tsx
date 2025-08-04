import type { DataItem } from '~types/types';

import { QueryClientProvider } from '@tanstack/react-query';
import { render, screen } from '@testing-library/react';
import { queryClient } from '~api/query-client';
import { RouterProvider } from 'react-router';
import { describe, expect, test } from 'vitest';

import {
  mockDetailedPageLoader,
  mockInvalidDetailedPageLoader,
  specificQueryResponse,
} from '~/mocks/data';
import { createDetailedTestRouter } from '~/tests/test-utilties';

describe.skip('Detail Page', async () => {
  const testId = specificQueryResponse.data[0].mal_id.toString();

  test('should render results when data is provided', async () => {
    render(
      <QueryClientProvider client={queryClient}>
        <RouterProvider
          router={createDetailedTestRouter(mockDetailedPageLoader, testId)}
        />
      </QueryClientProvider>
    );

    const data = mockDetailedPageLoader.data as DataItem;
    const status = data.airing ? 'Ongoing' : 'Released';

    expect(
      await screen.findByRole('link', { name: 'close' })
    ).toBeInTheDocument();
    expect(
      screen.getByRole('heading', { name: data.title })
    ).toBeInTheDocument();
    expect(screen.getByTestId('detailed-type')).toHaveTextContent(data.type);
    expect(screen.getByTestId('detailed-status')).toHaveTextContent(status);
    expect(screen.getByTestId('detailed-score')).toHaveTextContent(
      data.score.toString()
    );
    expect(screen.getAllByTestId('detailed-genres')).toHaveLength(
      data.genres.length
    );
    expect(screen.getByAltText(data.title)).toBeInTheDocument();
  });

  test('should render results when data is not provided', async () => {
    render(
      <RouterProvider
        router={createDetailedTestRouter(mockInvalidDetailedPageLoader, testId)}
      />
    );

    expect(await screen.findByTestId('error-fallback')).toBeInTheDocument();
  });
});