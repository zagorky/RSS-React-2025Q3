import { render, screen } from '@testing-library/react';
import { getSearchEndpoint } from '~api/api';
import { LS_KEY, queryVariants } from '~config/app-config';
import { MainPage } from '~pages/main/main-page';
import { http, HttpResponse } from 'msw';
import { expect } from 'vitest';

import { ErrorBoundary } from '~/error-boundary';
import { getSpecificQueryResponse } from '~/mocks/data';
import { fallbackMock, setItemSpy } from '~/mocks/mocked-functions';
import {
  searchButton,
  searchInput,
  setupUserEvent,
} from '~/tests/test-utilties';

import { server } from '../../vitest.setupTests';

describe('Main page', () => {
  afterEach(() => {
    vi.clearAllMocks();
    localStorage.clear();
  });
  test('should render search form, results section and error button', async () => {
    server.use(
      http.get(getSearchEndpoint(queryVariants.specific), () =>
        HttpResponse.json(getSpecificQueryResponse())
      )
    );
    render(<MainPage />);

    expect(screen.getByTestId('search-form')).toBeInTheDocument();
    expect(await screen.findByTestId('result-list')).toBeInTheDocument();
    expect(screen.getByTestId('throw-error-button')).toBeInTheDocument();
  });

  test('should display error boundary fallback when error button is clicked', async () => {
    const { user } = setupUserEvent(
      <ErrorBoundary fallback={fallbackMock}>
        <MainPage />
      </ErrorBoundary>
    );

    await user.click(screen.getByTestId('throw-error-button'));
    expect(screen.getByTestId('error-fallback')).toBeInTheDocument();
  });

  test('should save search query to localStorage when form is submitted', async () => {
    const { user } = setupUserEvent(<MainPage />);

    await user.type(searchInput(), queryVariants.specific);
    await user.click(searchButton());

    expect(setItemSpy).toHaveBeenCalledWith(LS_KEY, queryVariants.specific);
  });

  test('should load initial query from localStorage', () => {
    localStorage.setItem(LS_KEY, queryVariants.notFound);
    render(<MainPage />);

    expect(searchInput().value).toBe(queryVariants.notFound);
  });

  test('should save to localStorage on search', async () => {
    const { user } = setupUserEvent(<MainPage />);

    await user.type(searchInput(), queryVariants.specific);
    await user.click(searchButton());

    expect(setItemSpy).toHaveBeenCalledWith(LS_KEY, queryVariants.specific);
  });
});
