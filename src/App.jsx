import { HashRouter as Router, Routes, Route, Navigate } from "react-router-dom";
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
import OrdersPage from "./pages/orders/ordersPage";
import ProfilePage from "./pages/profile/profilePage";
import PasswordPage from "./pages/profile/passwordPage";
import AddressesPage from "./pages/profile/addressesPage";
import PaymentsPage from "./pages/profile/paymentsPage";
import { useGetMeQuery } from "./features/userSlice";
import LoadingCircle from "./components/loadingCircle/loadingCircle";
import Orderpay from "./pages/checkout/orderpay";

const App = () => {

  const { data: meData, isLoading } = useGetMeQuery();
  
  const isAuthenticated = !!meData?.data;

  if (isLoading) {
    return <div style={{ height: 'calc(100vh - 137px)', display: 'flex', justifyContent: 'center', alignItems: 'center' }}><LoadingCircle /></div>;
  }

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
              <Route 
                path="/checkout" 
                element={
                  isAuthenticated ? <CheckoutPage /> : <Navigate to="/signIn" />
                } 
              />
              <Route path="/category/:slug" element={<CategoryPage />} />
              <Route path="/accessories" element={<AccessoriesPage />} />
              <Route path="/contact" element={<ContactPage />} />
              <Route path="/product/:id" element={<ProductPage />} />
              <Route 
                path="/profile" 
                element={
                  isAuthenticated ? <ProfilePage /> : <Navigate to="/signIn" />
                } 
              />
              <Route 
                path="/security-settings" 
                element={
                  isAuthenticated ? <PasswordPage /> : <Navigate to="/signIn" />
                } 
              />
              <Route 
                path="/orders" 
                element={
                  isAuthenticated ? <OrdersPage /> : <Navigate to="/signIn" />
                } 
              />
              <Route 
                path="/addresses" 
                element={
                  isAuthenticated ? <AddressesPage /> : <Navigate to="/signIn" />
                } 
              />
              <Route 
                path="/payments" 
                element={
                  isAuthenticated ? <PaymentsPage /> : <Navigate to="/signIn" />
                } 
              />
              <Route 
                path="/orderpay" 
                element={
                  isAuthenticated ? <Orderpay /> : <Navigate to="/signIn" />
                } 
              />
              <Route path="*" element={<ErrorPage />} />
            </Route>
            <Route 
                path="/signIn" 
                element={
                  isAuthenticated ? <Navigate to="/" replace/> : <SignInPage />
                } 
              />
              <Route 
                path="/register" 
                element={
                  isAuthenticated ? <Navigate to="/" replace/> : <RegisterPage />
                } 
              />
          </Routes>
        </AnimatePresence>
      </Router>
    </>
  );
};

export default App;
