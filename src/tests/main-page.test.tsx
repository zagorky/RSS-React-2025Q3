import { render, screen } from '@testing-library/react';
import { getSearchEndpoint } from '~api/api';
import { LS_KEY } from '~config/app-config';
import { navigation } from '~config/navigation';
import MainPage from '~pages/main/main-page';
import { http, HttpResponse } from 'msw';
import { createMemoryRouter, MemoryRouter, RouterProvider } from 'react-router';
import { expect } from 'vitest';

import { specificQueryResponse } from '~/tests/mocks/data';
import { setItemSpy } from '~/tests/mocks/mocked-functions';
import {
  searchButton,
  searchInput,
  setupUserEvent,
} from '~/tests/test-utilties';

import { server } from '../../vitest.setupTests';

const mockLoaderData = {
  results: specificQueryResponse.data,
  query: '',
  pagination: specificQueryResponse.pagination,
  error: null,
};

const specificQuery = 'friren';
const queryWithoutResults = 'beeeeeeeeee';
const LS_KEY_FOR_TESTS = 'ZAGORKY:retrievedQuery';

vi.spyOn(console, 'error').mockImplementation(() => {});
const mockLoader = vi.fn().mockReturnValue(mockLoaderData);
const mockAction = vi.fn().mockImplementation(async ({ request }) => {
  const formData = (await request.formData()) as FormData;
  const query = formData.get('search-input') as string;
  return {
    results: specificQueryResponse.data,
    query,
    pagination: specificQueryResponse.pagination,
    error: null,
  };
});

describe('Main page', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    localStorage.clear();
  });

  test('should render search form, results section and error button', async () => {
    server.use(
      http.get(getSearchEndpoint({ query: specificQuery }), () =>
        HttpResponse.json(specificQueryResponse)
      )
    );

    const routes = [
      {
        path: navigation.main,
        element: <MainPage />,
        loader: mockLoader,
        action: mockAction,
      },
    ];
    const router = createMemoryRouter(routes, {
      initialEntries: [navigation.main],
    });

    render(<RouterProvider router={router} />);

    expect(await screen.findByTestId('search-form')).toBeInTheDocument();
    expect(screen.getByTestId('result-list')).toBeInTheDocument();
  });

  test.skip('should save search query to localStorage when form is submitted', async () => {
    const routes = [
      {
        path: navigation.main,
        element: <MainPage />,
        loader: mockLoader,
        action: mockAction,
      },
    ];
    const router = createMemoryRouter(routes, {
      initialEntries: [navigation.main],
    });

    const { user } = setupUserEvent(<RouterProvider router={router} />);

    expect(await screen.findByTestId('search-form')).toBeInTheDocument();
    await user.type(searchInput(), specificQuery);
    await user.click(searchButton());

    expect(setItemSpy).toHaveBeenCalledWith(LS_KEY_FOR_TESTS, 'friren');
  });

  test.skip('should save search query to localStorage when form is submitted', async () => {
    server.use(
      http.get(getSearchEndpoint({ query: 'friren' }), () =>
        HttpResponse.json(specificQueryResponse)
      )
    );

    const routes = [
      {
        path: navigation.main,
        element: <MainPage />,
        loader: mockLoader,
        action: mockAction,
      },
    ];

    const router = createMemoryRouter(routes, {
      initialEntries: [navigation.main],
    });

    const { user } = setupUserEvent(<RouterProvider router={router} />);

    const input = await screen.findByTestId('search-form');
    await user.type(input, 'friren');
    const button = await screen.findByRole('button', { name: 'Search' });
    await user.click(button);

    expect(setItemSpy).toHaveBeenCalledWith(LS_KEY, 'friren');
  });

  test.skip('should load initial query from localStorage', () => {
    localStorage.setItem(LS_KEY, queryWithoutResults);
    render(
      <MemoryRouter>
        <MainPage />
      </MemoryRouter>
    );

    expect(searchInput()).toHaveValue('beeeeeeeeee');
  });

  test.skip('should save to localStorage on search', async () => {
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
