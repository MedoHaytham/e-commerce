import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  cartItems: [],
  isLoading: false,
  error: null,
  optimisticSnapshot: null,
};

const API = "https://e-commerce-backend-geri.onrender.com/api/users";

export const fetchCart = createAsyncThunk("cart/fetchCart", async (_, thunkAPI) => {
  try {
    const token = localStorage.getItem("token");
    const response = await axios.get(`${API}/cart`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data.data.inCartProducts;
  } catch (error) {
    return thunkAPI.rejectWithValue(error?.response?.data || { message: error.message });
  }
});

export const addToCart = createAsyncThunk('cart/addToCart', async ({ productId }, thunkAPI) => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.post(`${API}/cart/${productId}`,
        {},
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      return response.data.data.inCartProducts;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error?.response?.data || { message: error.message }
      );
    }
  }
);

export const removeFromCart = createAsyncThunk("cart/removeFromCart", async (productId, thunkAPI) => {
  try {
    const token = localStorage.getItem("token");
    const response = await axios.delete(`${API}/cart/${productId}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data.data.inCartProducts;
  } catch (error) {
    return thunkAPI.rejectWithValue(error?.response?.data || { message: error.message });
  }
});

export const increaseQuantity = createAsyncThunk("cart/increaseQuantity", async (productId, thunkAPI) => {
  try {
    const token = localStorage.getItem("token");
    const response = await axios.patch(`${API}/cart/${productId}/increase`, {}, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data.data.inCartProducts;
  } catch (error) {
    return thunkAPI.rejectWithValue(error?.response?.data || { message: error.message });
  }
});

export const decreaseQuantity = createAsyncThunk("cart/decreaseQuantity", async (productId, thunkAPI) => {
  try {
    const token = localStorage.getItem("token");
    const response = await axios.patch(`${API}/cart/${productId}/decrease`, {}, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data.data.inCartProducts;
  } catch (error) {
    return thunkAPI.rejectWithValue(error?.response?.data || { message: error.message });
  }
});

const getPid = (x) => x?.product?._id || x?.product?.id;
const snapshot = (state) => {
  state.optimisticSnapshot = state.cartItems.map((x) => ({
    ...x,
    product: x.product,
  }));
};

export const CartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCart.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchCart.fulfilled, (state, action) => {
        state.isLoading = false;
        state.cartItems = action.payload;
      })
      .addCase(fetchCart.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })

      .addCase(addToCart.pending, (state, action) => {
        state.error = null;
        snapshot(state);

        const { productId, product } = action.meta.arg;

        const existing = state.cartItems.find((x) => getPid(x) === productId);

        if (existing) {
          existing.quantity += 1;
        } else {
          state.cartItems.push({
            product: product || { _id: productId },
            quantity: 1,
            _optimistic: true,
          });
        }
      })
      .addCase(addToCart.fulfilled, (state, action) => {
        state.optimisticSnapshot = null;
        state.cartItems = action.payload;
      })
      .addCase(addToCart.rejected, (state, action) => {
        if (state.optimisticSnapshot) state.cartItems = state.optimisticSnapshot;
        state.optimisticSnapshot = null;
        state.error = action.payload;
      })

      .addCase(removeFromCart.pending, (state, action) => {
        state.error = null;
        snapshot(state);

        const productId = action.meta.arg;
        state.cartItems = state.cartItems.filter((x) => getPid(x) !== productId);
      })
      .addCase(removeFromCart.fulfilled, (state, action) => {
        state.optimisticSnapshot = null;
        state.cartItems = action.payload;
      })
      .addCase(removeFromCart.rejected, (state, action) => {
        if (state.optimisticSnapshot) state.cartItems = state.optimisticSnapshot;
        state.optimisticSnapshot = null;
        state.error = action.payload;
      })

      .addCase(increaseQuantity.pending, (state, action) => {
        state.error = null;
        snapshot(state);

        const productId = action.meta.arg;
        const item = state.cartItems.find((x) => getPid(x) === productId);
        if (item) item.quantity += 1;
      })
      .addCase(increaseQuantity.fulfilled, (state, action) => {
        state.optimisticSnapshot = null;
        state.cartItems = action.payload;
      })
      .addCase(increaseQuantity.rejected, (state, action) => {
        if (state.optimisticSnapshot) state.cartItems = state.optimisticSnapshot;
        state.optimisticSnapshot = null;
        state.error = action.payload;
      })

      .addCase(decreaseQuantity.pending, (state, action) => {
        state.error = null;
        snapshot(state);

        const productId = action.meta.arg;
        const item = state.cartItems.find((x) => getPid(x) === productId);
        if (item && item.quantity > 1) item.quantity -= 1;
      })
      .addCase(decreaseQuantity.fulfilled, (state, action) => {
        state.optimisticSnapshot = null;
        state.cartItems = action.payload;
      })
      .addCase(decreaseQuantity.rejected, (state, action) => {
        if (state.optimisticSnapshot) state.cartItems = state.optimisticSnapshot;
        state.optimisticSnapshot = null;
        state.error = action.payload;
      });
  },
});

export default CartSlice.reducer;