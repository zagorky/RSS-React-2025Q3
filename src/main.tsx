import { assertIsNonNullable } from '~utils/utilities';

import './index.css';
import { createRoot } from 'react-dom/client';

import App from './App';

const root = document.querySelector('#root');

assertIsNonNullable(root);

createRoot(root).render(<App />);