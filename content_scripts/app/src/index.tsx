import React from 'react';
import { createRoot } from 'react-dom/client';
import './index.scss';
import App from './App';

createRoot(document.getElementById('content-script-root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
