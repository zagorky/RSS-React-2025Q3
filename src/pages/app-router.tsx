import { Layout } from '~components/layout';
import { Loader } from '~components/loader';
import { ErrorPage, MainPage } from '~pages/lazy';
import { Suspense } from 'react';
import { createBrowserRouter } from 'react-router';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    hydrateFallbackElement: <Loader />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: '/',
        errorElement: <ErrorPage />,
        element: (
          <Suspense fallback={<Loader />}>
            <MainPage />
          </Suspense>
        ),
      },
      {
        path: '*',
        element: (
          <Suspense fallback={<Loader />}>
            <ErrorPage />
          </Suspense>
        ),
      },
    ],
  },
]);