import React from 'react';
import { render } from 'react-dom';
import { BrowserRouter, MemoryRouter } from 'react-router-dom';
import App from './App';

render(
  process.env.NODE_ENV === 'development' ? (
    <BrowserRouter>
      <App />
    </BrowserRouter>
  ) : (
    <MemoryRouter>
      <App />
    </MemoryRouter>
  ),
  document.getElementById('app')
);
