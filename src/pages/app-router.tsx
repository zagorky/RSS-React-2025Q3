import { Layout } from '~components/layout/layout';
import { Loader } from '~components/loader/loader';
import { navigation } from '~config/navigation';
import { searchAction, searchLoader } from '~pages/data-loader';
import { AboutPage, ErrorPage, MainPage } from '~pages/lazy';
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
        loader: searchLoader,
        action: searchAction,
        errorElement: <ErrorPage />,
        element: (
          <Suspense fallback={<Loader />}>
            <MainPage />
          </Suspense>
        ),
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
