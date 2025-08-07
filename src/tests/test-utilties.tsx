import type { UserEvent } from '@testing-library/user-event';
import type { LoaderDataType } from '~types/loader-types';
import type { DataItem } from '~types/types';
import type { ReactNode } from 'react';

import { QueryClientProvider } from '@tanstack/react-query';
import { render, type RenderResult, screen } from '@testing-library/react';
import { userEvent } from '@testing-library/user-event';
import { mainPageLoader2 } from '~api/loaders';
import { queryClient } from '~api/query-client';
import { Layout } from '~components/layout/layout';
import DetailedPage from '~pages/detailed/detailed-page';
import ErrorPage from '~pages/error/error-page';
import MainPage from '~pages/main/main-page';
import { createMemoryRouter } from 'react-router';

export const searchInput = () =>
  screen.getByRole('textbox', { name: 'Search' });

export const searchButton = () =>
  screen.getByRole('button', { name: 'Search' });

export const setupUserEvent = (
  tsx: ReactNode
): { user: UserEvent } & RenderResult => {
  return {
    user: userEvent.setup(),
    ...render(tsx),
  };
};

export const createMainTestRouter = (
  loaderData?: LoaderDataType,
  initialEntries: string[] = ['/']
) => {
  return createMemoryRouter(
    [
      {
        path: '/',
        element: <Layout />,
        errorElement: <ErrorPage />,
        hydrateFallbackElement: <></>,
        children: [
          {
            path: '/',
            id: 'main-page',
            loader: loaderData
              ? () => loaderData
              : mainPageLoader2(queryClient),
            element: <MainPage />,
            errorElement: <ErrorPage />,
          },
        ],
      },
    ],
    {
      initialEntries,
      initialIndex: 0,
    }
  );
};

export const createDetailedTestRouter = (
  loaderData?: DataItem,
  testId: string | number = '1'
) => {
  return createMemoryRouter(
    [
      {
        path: 'anime/:id',
        hydrateFallbackElement: <></>,
        loader: () => loaderData,
        element: (
          <QueryClientProvider client={queryClient}>
            <DetailedPage />
          </QueryClientProvider>
        ),
        errorElement: <ErrorPage />,
      },
    ],
    {
      initialEntries: [`/anime/${testId}`],
      initialIndex: 0,
    }
  );
};