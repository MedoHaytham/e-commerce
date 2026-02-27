import axios from 'axios';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

const initialState = {
  favoritesItems: [],
  isLoading: false,
  error: null,
  optimisticSnapshot: null,
};

const API = 'https://e-commerce-backend-geri.onrender.com/api/users';

export const fetchFavorites = createAsyncThunk("favorites/fetchFavorites", async (_, thunkAPI) => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(`${API}/favorites`,
        { 
          headers: 
          {
            Authorization: `Bearer ${token}` 
          } 
        }
      );
      return response.data.data.favoriteProducts;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error?.response?.data || { message: error.message }
      );
    }
  }
);

export const toggleFavorites = createAsyncThunk("favorites/toggleFavorite", async ({ productId }, thunkAPI) => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.post(`${API}/favorites/${productId}`,
        {},
        { 
          headers: 
          {
            Authorization: `Bearer ${token}` 
          }
        }
      );
      return response.data.data.favoriteProducts;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error?.response?.data || { message: error.message }
      );
    }
  }
);

export const FavoritesSlice = createSlice({
  name: "favorites",
  initialState,
  reducers: {
    clearFavorites: (state) => {
      state.favoritesItems = [];
      state.error = null;
      state.optimisticSnapshot = null;
    }
  },
  extraReducers: (builder) => {
    builder
    .addCase(fetchFavorites.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchFavorites.fulfilled, (state, action) => {
        state.isLoading = false;
        state.favoritesItems = action.payload;
      })
      .addCase(fetchFavorites.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })


      .addCase(toggleFavorites.pending, (state, action) => {
        state.error = null;

        const { productId, product } = action.meta.arg;

        state.optimisticSnapshot = [...state.favoritesItems];

        const exists = state.favoritesItems.some(
          (p) => (p._id || p.id) === productId
        );

        if (exists) {
          state.favoritesItems = state.favoritesItems.filter(
            (p) => (p._id || p.id) !== productId
          );
        } else {
          state.favoritesItems.push(product);
        }
      })
      .addCase(toggleFavorites.fulfilled, (state, action) => {
        state.optimisticSnapshot = null;
        state.favoritesItems = action.payload;
      })
      .addCase(toggleFavorites.rejected, (state, action) => {
        if (state.optimisticSnapshot) {
          state.favoritesItems = state.optimisticSnapshot;
        }
        state.optimisticSnapshot = null;
        state.error = action.payload;
      });
  },
});

export const { clearFavorites } = FavoritesSlice.actions;
export default FavoritesSlice.reducer;