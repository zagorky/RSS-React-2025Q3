import { render, screen } from '@testing-library/react';
import { getSearchEndpoint } from '~api/api';
import { queryVariants } from '~config/app-config';
import { ResultsSection } from '~pages/main/components/results-section/results-section';
import { http, HttpResponse } from 'msw';

import {
  getEmptyQueryResponse,
  getEmptyResponse,
  getSpecificQueryResponse,
} from '~/mocks/data';

import { server } from '../../vitest.setupTests';

describe('Results Component', () => {
  test('should render list of data', async () => {
    server.use(
      http.get(getSearchEndpoint(queryVariants.specific), () =>
        HttpResponse.json(getSpecificQueryResponse())
      )
    );

    render(<ResultsSection searchQuery={queryVariants.specific} />);

    expect(await screen.findByTestId('result-list')).toBeInTheDocument();
  });

  test('should render correct number of items when data is provided', async () => {
    server.use(
      http.get(getSearchEndpoint(queryVariants.specific), () =>
        HttpResponse.json(getSpecificQueryResponse())
      )
    );

    render(<ResultsSection searchQuery={queryVariants.specific} />);

    const numberOfNumber = await screen.findAllByTestId('result-item');
    expect(numberOfNumber).toHaveLength(getSpecificQueryResponse().data.length);
  });

  test('should display empty list component when there is no matches', async () => {
    server.use(
      http.get(getSearchEndpoint(queryVariants.notFound), () =>
        HttpResponse.json(getEmptyResponse())
      )
    );

    render(<ResultsSection searchQuery={queryVariants.notFound} />);

    expect(await screen.findByTestId('empty-list')).toBeInTheDocument();
  });

  test('should show loading state while fetching data', async () => {
    server.use(
      http.get(getSearchEndpoint(), () =>
        HttpResponse.json(getEmptyQueryResponse())
      )
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
