import React from "react";
import { HashRouter as Router, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import RootLayout from "./layout/rootLayout";
import HomePage from "./pages/home/home";
import SearchPage from "./pages/search/searchPage";
import AccessoriesPage from "./pages/accessories/accessoriesPage";
import SignInPage from "./pages/login/loginPage";
import RegisterPage from "./pages/register/registerPage";
import ErrorPage from "./pages/errorPage";
import ProductPage from "./pages/product/productPage";
import CartPage from "./pages/cart/cartPage";
import FavoritesPage from "./pages/favorites/favoritesPage";
import ContactPage from "./pages/contact/contactPage";
import CheckoutPage from "./pages/checkout/checkoutPage";
import CategoryPage from "./pages/category/categoryPage";
import ScrollToTop from "./components/scrollToTop";
import { Toaster } from "react-hot-toast";
import { AnimatePresence } from "framer-motion";

const App = () => {
  return (
    <>
      <ToastContainer position="bottom-right"/>
      <Toaster
        position="bottom-right"
        toastOptions={{
          style: {
            background: "#e9e9e9",
            borderRadius: "5px",
            padding: "14px",
          },
        }}
      />
      <Router>
        <ScrollToTop />
        <AnimatePresence mode="wait">
          <Routes>
            <Route path="/" element={<RootLayout />}>
              <Route index element={<HomePage />} />
              <Route path="/search" element={<SearchPage />} />
              <Route path="/favorites" element={<FavoritesPage />} />
              <Route path="/cart" element={<CartPage />} />
              <Route path="/checkout" element={<CheckoutPage />} />
              <Route path="/category/:slug" element={<CategoryPage />} />
              <Route path="/accessories" element={<AccessoriesPage />} />
              <Route path="/contact" element={<ContactPage />} />
              <Route path="/product/:id" element={<ProductPage />} />
              <Route path="/signIn" element={<SignInPage />} />
              <Route path="/register" element={<RegisterPage />} />
              <Route path="*" element={<ErrorPage />} />
            </Route>
          </Routes>
        </AnimatePresence>
      </Router>
    </>
  );
};

export default App;
