import * as React from 'react';
import { createRoot } from 'react-dom/client';

import './index.css';
import { App } from '@/app';
import Providers from './app/providers';

const root = document.getElementById('root');
if (!root) throw new Error('No root element found');

createRoot(root).render(
  <React.StrictMode>
    <Providers>
      <App />
    </Providers>
  </React.StrictMode>,
);
