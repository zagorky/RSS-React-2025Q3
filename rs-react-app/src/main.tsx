import { ErrorFallback } from '~components/error-fallback/error-fallback';
import { ErrorBoundary } from '~pages/main/components/results-section/error-boundary';

import './index.css';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

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
