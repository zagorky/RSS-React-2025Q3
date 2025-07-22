import { lazy } from 'react';

export const MainPage = lazy(() => import('~pages/main/main-page'));
export const DetailedPage = lazy(() => import('~pages/detailed/detailed-page'));
export const ErrorPage = lazy(() => import('~pages/error/error-page'));