import { Layout } from '~components/layout/layout';
import { navigation } from '~config/navidation';
import { dataLoader } from '~pages/dataLoader';
import { DetailedPage, ErrorPage, MainPage } from '~pages/lazy';
import { Suspense } from 'react';
import { createBrowserRouter } from 'react-router';

export const router = createBrowserRouter([
  {
    path: navigation.main,
    element: <Layout />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: navigation.main,
        loader: dataLoader,
        element: (
          <Suspense>
            <MainPage />
          </Suspense>
        ),
        children: [
          {
            path: navigation.detailed,
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