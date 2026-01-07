import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';

import '../node_modules/bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import '../node_modules/@fortawesome/fontawesome-free/css/all.css';
import './index.css';
import CartProvider from './context/cartContext.jsx';
import FavoritesProvider from './context/favoritesContext.jsx';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <FavoritesProvider>
      <CartProvider>
        <App />
      </CartProvider>
    </FavoritesProvider>
  </React.StrictMode>
);
