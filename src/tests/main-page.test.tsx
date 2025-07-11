import { render, screen } from '@testing-library/react';
import { getSearchEndpoint } from '~api/api';
import { queryVariants } from '~config/app-config';
import { ErrorButton } from '~pages/main/components/error-section/error-button';
import { ResultsSection } from '~pages/main/components/results-section/results-section';
import { SearchForm } from '~pages/main/components/search-form/search-form';
import { MainPage } from '~pages/main/main-page';
import { setupUserEvent } from '~utils/utilities';
import { http, HttpResponse } from 'msw';
import { expect } from 'vitest';

import { ErrorBoundary } from '~/error-boundary';
import { getSpecificQueryResponse } from '~/mocks/data';
import { fallbackMock } from '~/mocks/mocked-functions';

import { server } from '../../vitest.setupTests';

describe('Main page', () => {
  test('should render search form, results section and error button', async () => {
    server.use(
      http.get(getSearchEndpoint(queryVariants.specific), () =>
        HttpResponse.json(getSpecificQueryResponse())
      )
    );
    render(
      <ErrorBoundary fallback={fallbackMock}>
        <MainPage>
          <SearchForm
            onSubmit={() => {}}
            searchQuery={queryVariants.specific}
          />
          <ResultsSection searchQuery={queryVariants.specific} />
          <ErrorButton />
        </MainPage>
      </ErrorBoundary>
    );

    expect(screen.getByTestId('search-form')).toBeInTheDocument();
    expect(await screen.findByTestId('result-list')).toBeInTheDocument();
    expect(screen.getByTestId('throw-error-button')).toBeInTheDocument();
  });

  test('should error button error boundary component should works', async () => {
    const { user } = setupUserEvent(
      <ErrorBoundary fallback={fallbackMock}>
        <MainPage>
          <SearchForm
            onSubmit={() => {}}
            searchQuery={queryVariants.specific}
          />
          <ResultsSection searchQuery={queryVariants.specific} />
          <ErrorButton />
        </MainPage>
      </ErrorBoundary>
    );

    await user.click(screen.getByTestId('throw-error-button'));
    expect(screen.getByTestId('error-fallback')).toBeInTheDocument();
  });
});
