import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  FavoritesItems: JSON.parse(localStorage.getItem('favItems')) || [],
}

export const FavoritesSlice = createSlice({
  name: 'favorites',
  initialState,
  reducers: {
    toggleFavorites : (currentState, action) => {
      let item = action.payload;
      let favoritesItems = currentState.FavoritesItems;
      const exists = favoritesItems.find((favItem) => favItem.id === item.id);
      if (exists) {
        currentState.FavoritesItems = currentState.FavoritesItems.filter((favItem) => favItem.id !== item.id);
      } else {
        favoritesItems.push({...item});
      }
      localStorage.setItem('favItems', JSON.stringify(currentState.FavoritesItems));
    }
  }
});

export const {toggleFavorites} = FavoritesSlice.actions;
export default FavoritesSlice.reducer