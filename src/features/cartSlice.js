import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  cartItems: JSON.parse(localStorage.getItem('cartItems')) || [],
}

export const CartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (currentState, action) => {
      let item = action.payload;
      let cartItems = currentState.cartItems;

      let exists = cartItems.find((cartItem) => cartItem.id === item.id);
      if (exists) return;
      cartItems.push({...item, quantity: 1});
      localStorage.setItem('cartItems', JSON.stringify(cartItems));
    },
    removeFromCart: (currentState, action) => {
      let item = action.payload;
      currentState.cartItems = currentState.cartItems.filter((cartItem) => cartItem.id !== item.id);
      localStorage.setItem('cartItems', JSON.stringify(currentState.cartItems));
    },
    increaseQuantity: (currentState, action) => {
      let item = action.payload;
      currentState.cartItems = currentState.cartItems.map((cartItem) => cartItem.id === item.id ? {...cartItem, quantity: cartItem.quantity + 1} : cartItem);
      localStorage.setItem('cartItems', JSON.stringify(currentState.cartItems));
    },
    decreaseQuantity: (currentState, action) => {
      let item = action.payload;
      currentState.cartItems = currentState.cartItems.map((cartItem) => cartItem.id === item.id ? {...cartItem, quantity: cartItem.quantity - 1} : cartItem);
      localStorage.setItem('cartItems', JSON.stringify(currentState.cartItems));
    },
  }
});

export const {addToCart, removeFromCart, increaseQuantity, decreaseQuantity} = CartSlice.actions;
export default CartSlice.reducer