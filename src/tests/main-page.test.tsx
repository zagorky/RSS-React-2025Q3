import { waitFor } from '@testing-library/dom';
import { render, screen } from '@testing-library/react';
import { http, HttpResponse } from 'msw';
import { RouterProvider } from 'react-router';

import {
  emptyResponse,
  mockEmptyLoaderData,
  mockEmptyQueryLoaderData,
  mockLoaderData,
  specificQueryResponse,
} from '~/tests/mocks/data';
import { createMainTestRouter } from '~/tests/test-utilties';

import { server } from '../../vitest.setupTests';

const localStorageMock = {
  getItem: vi.fn(),
  setItem: vi.fn(),
  clear: vi.fn(),
};
vi.stubGlobal('localStorage', localStorageMock);

const mockNavigate = vi.fn();
vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom');
  return {
    ...actual,
    useNavigate: () => mockNavigate,
  };
});

describe('Main Page', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    localStorageMock.clear();
    server.resetHandlers();
    mockNavigate.mockReset();
  });

  test('should render search form and results section with data', async () => {
    localStorageMock.getItem.mockReturnValueOnce('friren');
    server.use(
      http.get('https://api.jikan.moe/v4/anime', () => {
        return HttpResponse.json(specificQueryResponse);
      })
    );

    render(<RouterProvider router={createMainTestRouter(mockLoaderData)} />);

    expect(await screen.findByTestId('search-form')).toBeInTheDocument();
    expect(await screen.findByTestId('result-list')).toBeInTheDocument();
    expect(screen.getAllByTestId('result-item')).toHaveLength(
      mockLoaderData.results.length
    );
  });

  test('should initialize with query from localStorage', async () => {
    localStorageMock.getItem.mockReturnValueOnce('');
    render(
      <RouterProvider router={createMainTestRouter(mockEmptyQueryLoaderData)} />
    );

    await waitFor(() => {
      expect(screen.getByRole('textbox')).toHaveValue('');
    });
  });

  test('should show empty state when no results', async () => {
    localStorageMock.getItem.mockReturnValueOnce('beeeeeeeeeeeee');
    server.use(
      http.get('https://api.jikan.moe/v4/anime', () => {
        return HttpResponse.json(emptyResponse);
      })
    );

    render(
      <RouterProvider router={createMainTestRouter(mockEmptyLoaderData)} />
    );
    expect(await screen.findByTestId('empty-list')).toBeInTheDocument();
  });

  test('should show error state when API fails', async () => {
    localStorageMock.getItem.mockReturnValueOnce('error-query');
    server.use(
      http.get('https://api.jikan.moe/v4/anime', () => {
        return new HttpResponse(null, { status: 500 });
      })
    );

    render(<RouterProvider router={createMainTestRouter()} />);
    expect(await screen.findByTestId('error-fallback')).toBeInTheDocument();
  });
});
