import { ErrorFallback } from '~components/error-fallback/error-fallback';
import { assertIsNonNullable } from '~utils/utilities';

import './index.css';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

import { ErrorBoundary } from '~/error-boundary';

import App from './App';

const root = document.querySelector('#root');

assertIsNonNullable(root);

createRoot(root).render(
  <StrictMode>
    <ErrorBoundary fallback={(error: Error) => <ErrorFallback error={error} />}>
      <App />
    </ErrorBoundary>
  </StrictMode>
);
