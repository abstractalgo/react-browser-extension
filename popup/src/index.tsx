import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';

createRoot(document.getElementById('popup-page-root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
