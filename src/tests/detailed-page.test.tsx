import type { DataItem } from '~types/types';

import { render, screen } from '@testing-library/react';
import { RouterProvider } from 'react-router';
import { describe, expect, test } from 'vitest';

import {
  mockDetailedPageLoader,
  mockInvalidDetailedPageLoader,
  specificQueryResponse,
} from '~/tests/mocks/data';
import { createDetailedTestRouter } from '~/tests/test-utilties';

describe('Detail Page', async () => {
  const testId = specificQueryResponse.data[0].mal_id.toString();

  test('should render results when data is provided', async () => {
    render(
      <RouterProvider
        router={createDetailedTestRouter(mockDetailedPageLoader, testId)}
      />
    );

    const data = mockDetailedPageLoader.data as DataItem;
    const status = data.airing ? 'Ongoing' : 'Released';

    expect(await screen.findByRole('link', { name: '❌' })).toBeInTheDocument();
    expect(
      screen.getByRole('heading', { name: data.title })
    ).toBeInTheDocument();
    expect(screen.getByTestId('detailed-type')).toHaveTextContent(
      data.type.toUpperCase()
    );
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