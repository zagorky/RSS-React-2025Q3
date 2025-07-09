import { ErrorFallback } from '~components/error-fallback/error-fallback';
import { assertIsNonNullable } from '~utils/utilities';

import './index.css';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

import { ErrorBoundary } from '~/error-boundary';

import App from './App';
import { worker } from './mocks/browser';

const root = document.querySelector('#root');

assertIsNonNullable(root);

if (process.env.NODE_ENV === 'development') {
  worker
    .start()
    .then(() => {
      console.log('MSW успешно запущен');
    })
    .catch((error) => {
      console.error('Ошибка запуска MSW:', error);
    });
}

createRoot(root).render(
  <StrictMode>
    <ErrorBoundary fallback={(error: Error) => <ErrorFallback error={error} />}>
      <App />
    </ErrorBoundary>
  </StrictMode>
);
