import axios from "axios";
import { store } from "../app/store";
import { logout } from "../features/authSlice";
import { clearCart } from "../features/cartSlice";
import { clearFavorites } from "../features/favoritesSclice";

const api = axios.create({
  baseURL: "https://e-commerce-backend-geri.onrender.com/api",
});

let isLoggingOut = false;


api.interceptors.request.use((config) => {
  const token = store.getState().auth.token || localStorage.getItem("token");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401 && window.location.pathname !== "/signIn" && !isLoggingOut) {
      isLoggingOut = true;
      store.dispatch(logout());
      store.dispatch(clearCart());
      store.dispatch(clearFavorites());
      window.location.href = "#/signIn";
    }
    return Promise.reject(error);
  }
);

export default api;