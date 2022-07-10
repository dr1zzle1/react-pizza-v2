import { createSlice } from '@reduxjs/toolkit';

export const filterSlice = createSlice({
  name: 'filter',
  initialState: {
    activeCategory: 0,
    sortProperty: {
      name: 'популярности',
      sort: 'rating',
    },
    activePage: 1,
  },
  reducers: {
    setCategory(state, action) {
      state.activeCategory = action.payload;
    },
    setSortProperty(state, action) {
      state.sortProperty = action.payload;
    },
    setActivePage(state, action) {
      state.activePage = action.payload;
    },
  },
});

export const { setCategory, setSortProperty, setActivePage } = filterSlice.actions;

export default filterSlice.reducer;
