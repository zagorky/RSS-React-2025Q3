import { render, screen } from '@testing-library/react';
import ErrorPage from '~pages/error/error-page';
import * as router from 'react-router';
import { createMemoryRouter, RouterProvider } from 'react-router';

describe('Error Page', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  test('should render error name and message for error instance', () => {
    const error = new Error('something went wrong');
    error.name = 'custom error';
    vi.spyOn(router, 'useRouteError').mockReturnValue(error);

    render(
      <RouterProvider
        router={createMemoryRouter([
          {
            path: '/',
            element: <ErrorPage />,
            errorElement: <ErrorPage />,
          },
        ])}
      />
    );

    expect(screen.getByText('custom error')).toBeInTheDocument();
    expect(screen.getByText('something went wrong')).toBeInTheDocument();
    expect(screen.getByTestId('error-fallback')).toBeInTheDocument();
    expect(screen.getByTestId('error-fallback-button')).toBeInTheDocument();
  });

  test('renders default 404 error when error is not an error instance', () => {
    vi.spyOn(router, 'useRouteError').mockReturnValue({});

    render(
      <RouterProvider
        router={createMemoryRouter([
          {
            path: '/',
            element: <ErrorPage />,
            errorElement: <ErrorPage />,
          },
        ])}
      />
    );

    expect(screen.getByText('404: Page Not Found')).toBeInTheDocument();
    expect(screen.getByText('Something went wrong')).toBeInTheDocument();
    expect(screen.getByTestId('error-fallback')).toBeInTheDocument();
    expect(screen.getByTestId('error-fallback-button')).toBeInTheDocument();
  });
});