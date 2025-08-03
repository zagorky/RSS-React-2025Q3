import type { UserEvent } from '@testing-library/user-event';
import type {
  LoaderDataType,
  LoaderDetailedPageType,
} from '~types/loader-types';
import type { ReactNode } from 'react';

import { render, type RenderResult, screen } from '@testing-library/react';
import { userEvent } from '@testing-library/user-event';
import { detailedPageLoader, mainPageLoader } from '~api/loaders';
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
            loader: loaderData ? () => loaderData : mainPageLoader,
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
  loaderData?: LoaderDetailedPageType,
  testId: string = '1'
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
            path: 'anime/:id',
            id: 'detailed-page',
            loader: loaderData ? () => loaderData : detailedPageLoader,
            element: <DetailedPage />,
            errorElement: <ErrorPage />,
          },
        ],
      },
    ],
    {
      initialEntries: [`/anime/${testId}`],
      initialIndex: 0,
    }
  );
};
