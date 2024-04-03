import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';

import { BrowserRouter } from 'react-router-dom'
import SearchResultsProvider from './ReactContext/SearchResults';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <SearchResultsProvider>
        <App />
      </SearchResultsProvider>
    </BrowserRouter>
  </React.StrictMode>
);


