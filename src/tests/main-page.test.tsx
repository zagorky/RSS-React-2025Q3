import { render, screen } from '@testing-library/react';
import { getSearchEndpoint } from '~api/api';
import { LS_KEY } from '~config/app-config';
import MainPage from '~pages/main/main-page';
import { http, HttpResponse } from 'msw';
import { MemoryRouter } from 'react-router';
import { expect } from 'vitest';

import { ErrorBoundary } from '~/error-boundary';
import { specificQueryResponse } from '~/tests/mocks/data';
import { fallbackMock, setItemSpy } from '~/tests/mocks/mocked-functions';
import {
  searchButton,
  searchInput,
  setupUserEvent,
} from '~/tests/test-utilties';

import { server } from '../../vitest.setupTests';

vi.spyOn(console, 'error').mockImplementation(() => {});

const specificQuery = 'friren';
const queryWithoutResults = 'beeeeeeeeee';
const LS_KEY_FOR_TESTS = 'ZAGORKY:retrievedQuery';

describe('Main page', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    localStorage.clear();
  });

  test('should render search form, results section and error button', async () => {
    server.use(
      http.get(getSearchEndpoint(specificQuery), () =>
        HttpResponse.json(specificQueryResponse)
      )
    );
    render(
      <MemoryRouter>
        <MainPage />
      </MemoryRouter>
    );

    expect(screen.getByTestId('search-form')).toBeInTheDocument();
    expect(await screen.findByTestId('result-list')).toBeInTheDocument();
    expect(screen.getByTestId('throw-error-button')).toBeInTheDocument();
  });

  test('should display error boundary fallback when error button is clicked', async () => {
    const { user } = setupUserEvent(
      <MemoryRouter>
        <ErrorBoundary fallback={fallbackMock}>
          <MainPage />
        </ErrorBoundary>
      </MemoryRouter>
    );

    await user.click(screen.getByTestId('throw-error-button'));
    expect(screen.getByTestId('error-fallback')).toBeInTheDocument();
  });

  test('should save search query to localStorage when form is submitted', async () => {
    const { user } = setupUserEvent(
      <MemoryRouter>
        <MainPage />
      </MemoryRouter>
    );

    await user.type(searchInput(), specificQuery);
    await user.click(searchButton());

    expect(setItemSpy).toHaveBeenCalledWith(LS_KEY_FOR_TESTS, 'friren');
  });

  test('should load initial query from localStorage', () => {
    localStorage.setItem(LS_KEY, queryWithoutResults);
    render(
      <MemoryRouter>
        <MainPage />
      </MemoryRouter>
    );

    expect(searchInput()).toHaveValue('beeeeeeeeee');
  });

  test('should save to localStorage on search', async () => {
    const { user } = setupUserEvent(
      <MemoryRouter>
        <MainPage />
      </MemoryRouter>
    );

    await user.type(searchInput(), specificQuery);
    await user.click(searchButton());

    expect(setItemSpy).toHaveBeenCalledWith(LS_KEY_FOR_TESTS, 'friren');
  });
});