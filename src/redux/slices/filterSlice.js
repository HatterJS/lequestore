import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  search: 'Всі пропозиції',
  filter: {
    cost: [0, 5000],
    category: '',
    size: '',
    gender: '',
    brands: ''
  }
};

const filterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    setSearch: (state, action) => {
      state.search = action.payload || 'Всі пропозиції';
      console.log(action.payload);
    },
    setFilter: (state, action) => {
      state.filter = action.payload;
    },
    resetFilter: (state) => {
      state.filter = initialState.filter;
    }
  }
});

export const { setSearch, setFilter, resetFilter } = filterSlice.actions;
export default filterSlice.reducer;
