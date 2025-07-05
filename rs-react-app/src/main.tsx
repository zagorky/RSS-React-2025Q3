import { ErrorFallback } from '~components/error-fallback/error-fallback';
import { StrictMode } from 'react';

import './index.css';
import { createRoot } from 'react-dom/client';

import { ErrorBoundary } from '~/error-boundary';

import App from './App';

const root = document.querySelector('#root');

if (!root) {
  throw new Error('Root must be provided');
}

createRoot(root).render(
  <StrictMode>
    <ErrorBoundary fallback={(error) => <ErrorFallback error={error} />}>
      <App />
    </ErrorBoundary>
  </StrictMode>
);
