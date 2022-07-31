import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { SortItemType } from '../../components/Sort';

interface IFilterState{
  activeCategory: number;
  sortProperty: SortItemType;
  searchText: string;
  activePage: number;
}

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
  } as IFilterState,
  reducers: {
    setCategory(state, action:PayloadAction<number>) {
      state.activeCategory = action.payload;
    },
    setSearchText(state, action:PayloadAction<string>) {
      state.searchText = action.payload;
    },
    setSortProperty(state, action:PayloadAction<SortItemType>) {
      state.sortProperty = action.payload;
    },
    setActivePage(state, action:PayloadAction<number>) {
      state.activePage = action.payload;
    },
    setFilters(state, action:PayloadAction<{activeCategory:number,sortProperty:SortItemType,activePage:number}>) {
      state.activeCategory = Number(action.payload.activeCategory);
      state.sortProperty = action.payload.sortProperty;
      state.activePage = action.payload.activePage;
    },
  },
});

export const { setCategory, setSortProperty, setActivePage, setFilters, setSearchText } =
  filterSlice.actions;

export default filterSlice.reducer;
