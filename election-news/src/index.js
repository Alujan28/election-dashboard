import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import District from './Districts';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
    <District />
  </React.StrictMode>
);

