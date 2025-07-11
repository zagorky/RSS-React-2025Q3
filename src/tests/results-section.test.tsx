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
    const resultList = await screen.findByTestId('result-list');

    expect(resultList).toBeInTheDocument();
  });

  test('should displays "no results" message when data array is empty', async () => {
    server.use(
      http.get(getSearchEndpoint(queryVariants.notFound), () =>
        HttpResponse.json(getEmptyResponse())
      )
    );

    render(<ResultsSection searchQuery={queryVariants.notFound} />);
    const emptyList = await screen.findByTestId('empty-list');

    expect(emptyList).toBeInTheDocument();
  });

  test('should shows loading state while fetching data', async () => {
    server.use(
      http.get(getSearchEndpoint(), () =>
        HttpResponse.json(getEmptyQueryResponse())
      )
    );

    render(<ResultsSection searchQuery={queryVariants.empty} />);

    expect(screen.getByTestId('loader')).toBeInTheDocument();
  });

  test('should displays error message when API call fails', async () => {
    server.use(
      http.get(getSearchEndpoint(), () => HttpResponse.json({ data: [] }))
    );

    render(<ResultsSection searchQuery={queryVariants.empty} />);
    const error = await screen.findByTestId('error-fallback');

    expect(error).toBeInTheDocument();
  });
});
