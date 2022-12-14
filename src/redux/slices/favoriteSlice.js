import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  favorite: JSON.parse(localStorage.getItem('favorites')) || []
};

const favoriteSlice = createSlice({
  name: 'favorite',
  initialState,
  reducers: {
    addToFavorite: (state, action) => {
      state.favorite = [...state.favorite, action.payload];
      setLocalStorageFavorites(state.favorite);
    },
    deleteFromFavorite: (state, action) => {
      const { id } = action.payload;
      state.favorite = state.favorite.filter((obj) => obj.id !== id);
      setLocalStorageFavorites(state.favorite);
    }
  }
});
function setLocalStorageFavorites(favorites) {
  localStorage.setItem('favorites', JSON.stringify(favorites));
}

export const { addToFavorite, deleteFromFavorite } = favoriteSlice.actions;
export default favoriteSlice.reducer;
