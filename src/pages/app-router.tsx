import { Layout } from '~components/layout/layout';
import { DetailedPage, MainPage } from '~pages/lazy';
import { Suspense } from 'react';
import { createBrowserRouter } from 'react-router';

export const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        path: '/',
        element: (
          <Suspense>
            <MainPage />
          </Suspense>
        ),
        children: [
          {
            path: ':slug',
            element: (
              <Suspense>
                <DetailedPage />
              </Suspense>
            ),
          },
        ],
      },
    ],
  },
]);
