import { render, screen, waitFor } from '@testing-library/react';
import { getSearchEndpoint } from '~api/api';
import { ResultsSection } from '~pages/main/components/results-section/results-section';
import { delay, http, HttpResponse } from 'msw';

import {
  emptyQueryResponse,
  emptyResponse,
  specificQueryResponse,
} from '~/tests/mocks/data';

import { server } from '../../vitest.setupTests';

const specificQuery = 'friren';
const emptyQuery = '';
const queryWithoutResults = 'beeeeeeeeee';

describe('Results Component', () => {
  test('should render correct number of items when data is provided', async () => {
    server.use(
      http.get(getSearchEndpoint(specificQuery), () =>
        HttpResponse.json(specificQueryResponse)
      )
    );

    render(<ResultsSection searchQuery={specificQuery} />);

    await waitFor(() => {
      expect(screen.queryByTestId('loader')).toBeNull();
    });

    expect(await screen.findByTestId('result-list')).toBeInTheDocument();
    const numberOfItems = await screen.findAllByTestId('result-item');
    expect(numberOfItems).toHaveLength(4);

    expect(screen.queryByTestId('empty-list')).toBeNull();
    expect(screen.queryByTestId('error-fallback')).toBeNull();
  });

  test('should display empty list component when there is no matches', async () => {
    server.use(
      http.get(getSearchEndpoint(queryWithoutResults), () =>
        HttpResponse.json(emptyResponse)
      )
    );

    render(<ResultsSection searchQuery={queryWithoutResults} />);

    await waitFor(() => {
      expect(screen.queryByTestId('loader')).toBeNull();
    });

    expect(await screen.findByTestId('empty-list')).toBeInTheDocument();

    expect(screen.queryByTestId('result-list')).toBeNull();
    expect(screen.queryByTestId('error-fallback')).toBeNull();
  });

  test('should show loading state while fetching data', async () => {
    server.use(
      http.get(getSearchEndpoint(), async () => {
        await delay(200);
        return HttpResponse.json(emptyQueryResponse);
      })
    );

    render(<ResultsSection searchQuery={emptyQuery} />);

    expect(await screen.findByTestId('loader')).toBeInTheDocument();

    expect(screen.queryByTestId('empty-list')).toBeNull();
    expect(screen.queryByTestId('result-list')).toBeNull();
    expect(screen.queryByTestId('error-fallback')).toBeNull();

    await waitFor(() => {
      expect(screen.queryByTestId('loader')).toBeNull();
    });
  });
});

describe('API error handling', () => {
  const errorCases = [
    {
      name: 'invalid API response structure',
      handler: () => HttpResponse.json({ data: [] }),
    },
    {
      name: '400 Bad Request error',
      handler: () => HttpResponse.json(null, { status: 400 }),
    },
    {
      name: '404 Not Found error',
      handler: () => HttpResponse.json(null, { status: 404 }),
    },
    {
      name: '429 Too Many Requests error',
      handler: () => HttpResponse.json(null, { status: 429 }),
    },
    {
      name: '500 Internal Server Error',
      handler: () => HttpResponse.json(null, { status: 500 }),
    },
  ];

  test.each(errorCases)(
    'should show error fallback on $name',
    async ({ handler }) => {
      server.use(http.get(getSearchEndpoint(), handler));

      render(<ResultsSection searchQuery={emptyQuery} />);

      expect(await screen.findByTestId('error-fallback')).toBeInTheDocument();

      expect(screen.queryByTestId('empty-list')).toBeNull();
      expect(screen.queryByTestId('result-list')).toBeNull();
      expect(screen.queryByTestId('loader')).toBeNull();
    }
  );
});