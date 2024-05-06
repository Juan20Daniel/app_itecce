import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './glovals-styles.css'
import { BrowserRouter } from 'react-router-dom';
import './data/remote/axios.interceptors';
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
);