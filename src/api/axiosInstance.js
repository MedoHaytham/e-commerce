import axios from "axios";
import { store } from "../app/store";
import { logout as logoutAction, setCredentials } from "../features/authSlice";
import { clearCart } from "../features/cartSlice";
import { clearFavorites } from "../features/favoritesSclice";

const api = axios.create({
  baseURL: "https://e-commerce-backend-geri.onrender.com/api",
  withCredentials: true, // ✅ عشان refresh token cookie
});

let isRefreshing = false;
let failedQueue = [];

const processQueue = (error, token = null) => {
  failedQueue.forEach((p) => {
    if (error) p.reject(error);
    else p.resolve(token);
  });
  failedQueue = [];
};

const clearClientAuth = () => {
  store.dispatch(logoutAction());
  store.dispatch(clearCart());
  store.dispatch(clearFavorites());
};

const serverLogout = async () => {
  try {
    await api.post("/auth/logout");
  } catch (_) {
  } finally {
    clearClientAuth();
    window.location.href = "#/signIn";
  }
};

// ✅ Request interceptor: token من Redux فقط
api.interceptors.request.use(
  (config) => {
    const token = store.getState().auth.token;
    if (token) config.headers.Authorization = `Bearer ${token}`;
    return config;
  },
  (error) => Promise.reject(error)
);

// ✅ Response interceptor: refresh + retry
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // لو 401 ومش request للـ refresh نفسه ومش signIn
    const shouldTryRefresh =
      error.response?.status === 401 &&
      !originalRequest?._retry &&
      !originalRequest?.url?.includes("/auth/refresh") &&
      window.location.hash !== "#/signIn";

    if (shouldTryRefresh) {
      originalRequest._retry = true;

      // لو refresh شغال بالفعل → استنى في queue
      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          failedQueue.push({
            resolve: (token) => {
              originalRequest.headers.Authorization = `Bearer ${token}`;
              resolve(api(originalRequest));
            },
            reject,
          });
        });
      }

      isRefreshing = true;

      try {
        const refreshRes = await api.get("/auth/refresh");
        const { accessToken, user } = refreshRes.data.data;

        store.dispatch(setCredentials({ accessToken, user }));

        processQueue(null, accessToken);

        originalRequest.headers.Authorization = `Bearer ${accessToken}`;
        return api(originalRequest);
      } catch (refreshErr) {
        processQueue(refreshErr, null);
        await serverLogout();
        return Promise.reject(refreshErr);
      } finally {
        isRefreshing = false;
      }
    }

    // لو 403 غالبًا refresh cookie مش موجود/ممنوع → logout
    if (error.response?.status === 403 && window.location.hash !== "#/signIn") {
      await serverLogout();
    }

    return Promise.reject(error);
  }
);

export default api;