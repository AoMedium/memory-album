import * as React from 'react';
import { createRoot } from 'react-dom/client';

import './index.css';
import { App } from '@/app';
import { Provider } from 'react-redux';
import { store } from '@/state/store';

const root = document.getElementById('root');
if (!root) throw new Error('No root element found');

createRoot(root).render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
);
