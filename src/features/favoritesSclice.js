import axios from 'axios';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

const initialState = {
  favoritesItems: [],
  isLoading: false,
  error: null,
}

export const fetchFavorites = createAsyncThunk('favorites/fetchFavorites', async(_,thunkAPI) => {
  try {
    const token = localStorage.getItem('token');
    const response = await axios.get('https://e-commerce-backend-geri.onrender.com/api/users/favorites',
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data.data.favoriteProducts;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data);
  }
})

export const toggleFavorites = createAsyncThunk('favorites/toggleFavorite', async (productId, thunkAPI) => {
  try {
    const token = localStorage.getItem('token');
    const response = await axios.post(`https://e-commerce-backend-geri.onrender.com/api/users/favorites/${productId}`,
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        }
      }
    )
    return response.data.data.favoriteProducts;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data);
  }
})

export const FavoritesSlice = createSlice({
  name: 'favorites',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchFavorites.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(fetchFavorites.fulfilled, (state, action) => {
      state.isLoading = false;
      state.favoritesItems = action.payload;
    });
    builder.addCase(fetchFavorites.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    });

    builder.addCase(toggleFavorites.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(toggleFavorites.fulfilled, (state, action) => {
      state.isLoading = false;
      state.favoritesItems = action.payload;
    });
    builder.addCase(toggleFavorites.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    });
  }
});

export default FavoritesSlice.reducer