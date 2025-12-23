import React from 'react';
import './App.css';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import RootLayout from './layout/rootLayout';
import HomePage from './pages/home/home';
import AboutPage from './pages/about';
import AccessoriesPage from './pages/accessories';
import BlogPage from './pages/blog';
import ContactPage from './pages/contact';
import SignInPage from './pages/signInPage';
import RegisterPage from './pages/registerPage';
import ErrorPage from './pages/errorPage';
import ProductPage from './pages/product/productPage';
import CartPage from './pages/cart/cartPage';
import FavoritesPage from './pages/favoritesPage';


const App = () => {
  return ( 
    <>
      <ToastContainer />
      <Router>
        <Routes>
          <Route path='/' element={<RootLayout />}>
            <Route index element={<HomePage />}/>
            <Route path='/favorites' element={<FavoritesPage />}/>
            <Route path='/cart' element={<CartPage />}/>
            <Route path='/about' element={<AboutPage />}/>
            <Route path='/accessories' element={<AccessoriesPage />}/>
            <Route path='/blog' element={<BlogPage />}/>
            <Route path='/contact' element={<ContactPage />}/>
            <Route path='/product/:id' element={<ProductPage />}/>
            <Route path='/signIn' element={<SignInPage />}/>
            <Route path='/register' element={<RegisterPage />}/>
            <Route path="*" element={<ErrorPage />} />
          </Route>
        </Routes>
      </Router>
    </>
  );
}

export default App;