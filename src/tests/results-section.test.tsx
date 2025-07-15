import { render, screen } from '@testing-library/react';
import { getSearchEndpoint } from '~api/api';
import { ResultsSection } from '~pages/main/components/results-section/results-section';
import { http, HttpResponse } from 'msw';

import {
  emptyQueryResponse,
  emptyResponse,
  specificQueryResponse,
} from '~/tests/mocks/data';
import { queryVariants } from '~/tests/mocks/query-variants';

import { server } from '../../vitest.setupTests';

describe('Results Component', () => {
  test('should render list of data', async () => {
    server.use(
      http.get(getSearchEndpoint(queryVariants.specific), () =>
        HttpResponse.json(specificQueryResponse)
      )
    );

    render(<ResultsSection searchQuery={queryVariants.specific} />);

    expect(await screen.findByTestId('result-list')).toBeInTheDocument();
  });

  test('should render correct number of items when data is provided', async () => {
    server.use(
      http.get(getSearchEndpoint(queryVariants.specific), () =>
        HttpResponse.json(specificQueryResponse)
      )
    );

    render(<ResultsSection searchQuery={queryVariants.specific} />);

    const numberOfNumber = await screen.findAllByTestId('result-item');
    expect(numberOfNumber).toHaveLength(specificQueryResponse.data.length);
  });

  test('should display empty list component when there is no matches', async () => {
    server.use(
      http.get(getSearchEndpoint(queryVariants.notFound), () =>
        HttpResponse.json(emptyResponse)
      )
    );

    render(<ResultsSection searchQuery={queryVariants.notFound} />);

    expect(await screen.findByTestId('empty-list')).toBeInTheDocument();
  });

  test('should show loading state while fetching data', async () => {
    server.use(
      http.get(getSearchEndpoint(), () => HttpResponse.json(emptyQueryResponse))
    );

    render(<ResultsSection searchQuery={queryVariants.empty} />);

    expect(screen.getByTestId('loader')).toBeInTheDocument();
  });

  test('should show error fallback on invalid API response', async () => {
    server.use(
      http.get(getSearchEndpoint(), () => HttpResponse.json({ data: [] }))
    );

    render(<ResultsSection searchQuery={queryVariants.empty} />);

    expect(await screen.findByTestId('error-fallback')).toBeInTheDocument();
  });

  test('should show error fallback on API 400 error', async () => {
    server.use(
      http.get(getSearchEndpoint(), () =>
        HttpResponse.json(null, { status: 400 })
      )
    );

    render(<ResultsSection searchQuery={queryVariants.empty} />);

    expect(await screen.findByTestId('error-fallback')).toBeInTheDocument();
  });
});