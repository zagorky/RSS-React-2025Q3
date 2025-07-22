import { render, screen, waitFor } from '@testing-library/react';
import { getSearchEndpoint } from '~api/api';
import { ResultsSection } from '~pages/main/components/results-section/results-section';
import { delay, http, HttpResponse } from 'msw';
import { MemoryRouter } from 'react-router';

import {
  emptyQueryResponse,
  emptyResponse,
  specificQueryResponse,
} from '~/tests/mocks/data';

import { server } from '../../vitest.setupTests';

describe('Results Component', () => {
  const mockProps = {
    results: specificQueryResponse.data,
    pagination: {
      has_next_page: true,
      current_page: 1,
    },
    error: null,
    loading: false,
  };

  const specificQuery = 'friren';
  const queryWithoutResults = 'beeeeeeeeee';

  test('should render correct number of items when data is provided', async () => {
    server.use(
      http.get(getSearchEndpoint(specificQuery), ({ request }) => {
        const url = new URL(request.url);
        const query = url.searchParams.get('q');

        if (query === specificQuery) {
          return HttpResponse.json(specificQueryResponse);
        }
      })
    );

    render(
      <MemoryRouter>
        <ResultsSection {...mockProps} />
      </MemoryRouter>
    );

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
      http.get(getSearchEndpoint(queryWithoutResults), ({ request }) => {
        const url = new URL(request.url);
        const query = url.searchParams.get('q');

        if (query === queryWithoutResults) {
          return HttpResponse.json(emptyResponse);
        }
      })
    );

    render(
      <MemoryRouter>
        <ResultsSection {...mockProps} results={[]} />
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(screen.queryByTestId('loader')).toBeNull();
    });

    expect(await screen.findByTestId('empty-list')).toBeInTheDocument();

    expect(screen.queryByTestId('result-list')).toBeNull();
    expect(screen.queryByTestId('error-fallback')).toBeNull();
  });

  test('should show loading state while fetching data', async () => {
    server.use(
      http.get(getSearchEndpoint(), async ({ request }) => {
        const url = new URL(request.url);
        const query = url.searchParams.get('q');
        await delay(300);

        if (query === specificQuery) {
          return HttpResponse.json(emptyQueryResponse);
        }
      })
    );

    const { rerender } = render(
      <MemoryRouter>
        <ResultsSection {...mockProps} loading={true} />
      </MemoryRouter>
    );

    expect(screen.getByTestId('loader')).toBeInTheDocument();
    expect(screen.queryByTestId('empty-list')).toBeNull();
    expect(screen.queryByTestId('result-list')).toBeNull();
    expect(screen.queryByTestId('error-fallback')).toBeNull();

    rerender(
      <MemoryRouter>
        <ResultsSection {...mockProps} loading={false} />
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(screen.queryByTestId('loader')).toBeNull();
      expect(screen.getByTestId('result-list')).toBeInTheDocument();
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

  const invalidMockProps = {
    loading: false,
    error: 'error',
    results: [],
    pagination: { current_page: 1, has_next_page: false },
  };

  test.each(errorCases)(
    'should show error fallback on $name',
    async ({ handler }) => {
      server.use(http.get(getSearchEndpoint(), handler));

      render(
        <MemoryRouter>
          <ResultsSection {...invalidMockProps} />
        </MemoryRouter>
      );

      expect(await screen.findByTestId('error-fallback')).toBeInTheDocument();

      expect(screen.queryByTestId('empty-list')).toBeNull();
      expect(screen.queryByTestId('result-list')).toBeNull();
      expect(screen.queryByTestId('loader')).toBeNull();
    }
  );
});
