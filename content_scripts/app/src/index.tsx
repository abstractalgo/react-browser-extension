import React from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App';

import './bla.scss';

createRoot(document.getElementById('content-script-root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
