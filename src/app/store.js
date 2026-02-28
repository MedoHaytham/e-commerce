import { configureStore } from '@reduxjs/toolkit'
import  CartReducer from '../features/cartSlice'
import  FavoritesReducer from '../features/favoritesSclice'
import AuthReducer from '../features/authSlice'

export const store = configureStore({
  reducer: {
    cart: CartReducer,
    favorites: FavoritesReducer,
    auth: AuthReducer
  },
})