import { configureStore } from '@reduxjs/toolkit'
import  CartReducer  from '../features/cartSlice'
import  FavoritesReducer  from '../features/favoritesSclice'

export const store = configureStore({
  reducer: {
    cart: CartReducer,
    favorites: FavoritesReducer
  },
})