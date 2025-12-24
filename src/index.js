import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';

// import '../node_modules/bootstrap/dist/css/bootstrap.min.css'
// import '../node_modules/bootstrap/dist/js/bootstrap.bundle.min.js';
import '../node_modules/@fortawesome/fontawesome-free/css/all.css';
import CartProvider from './context/cartContext';
import FavoritesProvider from './context/favoritesContext';

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
