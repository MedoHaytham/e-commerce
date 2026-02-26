import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios';

const initialState = {
  cartItems: [],
  isLoading: false,
  error: null,
}

export const fetchCart = createAsyncThunk('cart/fetchCart', async(_,thunkAPI) => {
  try {
    const token = localStorage.getItem('token');
    const response = await axios.get('https://e-commerce-backend-geri.onrender.com/api/users/cart',
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data.data.inCartProducts;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data);
  }
})

export const addToCart = createAsyncThunk('cart/addToCart', async (productId, thunkAPI) => {
  try {
    const token = localStorage.getItem('token');
    const response = await axios.post(`https://e-commerce-backend-geri.onrender.com/api/users/cart/${productId}`,
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        }
      }
    )
    return response.data.data.inCartProducts;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data);
  }
})

export const removeFromCart = createAsyncThunk('cart/removeFromCart', async (productId, thunkAPI) => {
  try {
    const token = localStorage.getItem('token');
    const response = await axios.delete(`https://e-commerce-backend-geri.onrender.com/api/users/cart/${productId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        }
      }
    )
    return response.data.data.inCartProducts;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data);
  }
})

export const increaseQuantity = createAsyncThunk('cart/increaseQuantity', async (productId, thunkAPI) => {
  try {
    const token = localStorage.getItem('token');
    const response = await axios.patch(`https://e-commerce-backend-geri.onrender.com/api/users/cart/${productId}/increase`,
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        }
      }
    )
    return response.data.data.inCartProducts;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data);
  }
})

export const decreaseQuantity = createAsyncThunk('cart/decreaseQuantity', async (productId, thunkAPI) => {
  try {
    const token = localStorage.getItem('token');
    const response = await axios.patch(`https://e-commerce-backend-geri.onrender.com/api/users/cart/${productId}/decrease`,
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        }
      }
    )
    return response.data.data.inCartProducts;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data);
  }
})

export const CartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCart.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchCart.fulfilled, (state, action) => {
        state.isLoading = false;
        state.cartItems = action.payload;
      })
      .addCase(fetchCart.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(addToCart.fulfilled, (state, action) => {
        state.cartItems = action.payload;
      })
      .addCase(removeFromCart.fulfilled, (state, action) => {
        state.cartItems = action.payload;
      })
      .addCase(increaseQuantity.fulfilled, (state, action) => {
        state.cartItems = action.payload;
      })
      .addCase(decreaseQuantity.fulfilled, (state, action) => {
        state.cartItems = action.payload;
      })
  }
});

export default CartSlice.reducer