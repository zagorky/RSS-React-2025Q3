import { assertIsNonNullable } from '~utils/utilities';

import './index.css';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

import App from './App';

const root = document.querySelector('#root');

assertIsNonNullable(root);

createRoot(root).render(
  <StrictMode>
    <App />
  </StrictMode>
);