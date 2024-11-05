import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import District from './Districts';
import Chart from './ElectionChart.js';
import ElectionChart from './ElectionChart.js';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
    <District />
    <ElectionChart />
  </React.StrictMode>
);

