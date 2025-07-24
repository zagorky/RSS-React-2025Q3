import { searchAction } from '~api/actions';
import { detailedPageLoader, mainPageLoader } from '~api/loaders';
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
        loader: mainPageLoader,
        action: searchAction,
        id: 'main-page',
        errorElement: <ErrorPage />,
        element: (
          <Suspense fallback={<Loader />}>
            <MainPage />
          </Suspense>
        ),
        children: [
          {
            path: navigation.detailed,
            loader: detailedPageLoader,
            id: 'detailed-page',
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