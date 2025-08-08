import { detailedPageLoader2, mainPageLoader2 } from '~api/loaders';
import { queryClient } from '~api/query-client';
import { Layout } from '~components/layout/layout';
import { Loader } from '~components/loader/loader';
import { navigation } from '~config/navigation';
import { AboutPage, DetailedPage, ErrorPage, MainPage } from '~pages/lazy';
import { Suspense } from 'react';
import { createBrowserRouter } from 'react-router';

export const router = createBrowserRouter([
  {
    path: navigation.main,
    element: <Layout />,
    hydrateFallbackElement: <Loader />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: navigation.main,
        loader: mainPageLoader2(queryClient),
        id: 'main-page',
        hydrateFallbackElement: <Loader />,

        errorElement: <ErrorPage />,
        element: (
          <Suspense fallback={<Loader />}>
            <MainPage />
          </Suspense>
        ),
        children: [
          {
            path: navigation.detailed,
            hydrateFallbackElement: <Loader />,

            loader: detailedPageLoader2(queryClient),
            element: (
              <Suspense fallback={<Loader />}>
                <DetailedPage />
              </Suspense>
            ),
          },
        ],
      },
      {
        path: navigation.about,
        errorElement: <ErrorPage />,
        element: (
          <Suspense fallback={<Loader />}>
            <AboutPage />
          </Suspense>
        ),
      },
      {
        path: navigation.error,
        element: (
          <Suspense fallback={<Loader />}>
            <ErrorPage />
          </Suspense>
        ),
      },
    ],
  },
]);