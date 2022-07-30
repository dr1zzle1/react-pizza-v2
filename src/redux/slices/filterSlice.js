import { createSlice } from '@reduxjs/toolkit';

export const filterSlice = createSlice({
  name: 'filter',
  initialState: {
    activeCategory: 0,
    sortProperty: {
      name: 'популярности',
      sort: 'rating',
    },
    searchText: '',
    activePage: 1,
  },
  reducers: {
    setCategory(state, action) {
      state.activeCategory = action.payload;
    },
    setSearchText(state, action) {
      state.searchText = action.payload;
    },
    setSortProperty(state, action) {
      state.sortProperty = action.payload;
    },
    setActivePage(state, action) {
      state.activePage = action.payload;
    },
    setFilters(state, action) {
      state.activeCategory = Number(action.payload.activeCategory);
      state.sortProperty = action.payload.sortProperty;
      state.activePage = action.payload.activePage;
    },
  },
});

export const { setCategory, setSortProperty, setActivePage, setFilters, setSearchText } =
  filterSlice.actions;

export default filterSlice.reducer;
