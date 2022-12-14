import { configureStore } from '@reduxjs/toolkit';
import filter from './slices/filterSlice';
import cart from './slices/cartSlice';
import favorite from './slices/favoriteSlice';

export const store = configureStore({
  reducer: {
    filter,
    cart,
    favorite
  }
});
