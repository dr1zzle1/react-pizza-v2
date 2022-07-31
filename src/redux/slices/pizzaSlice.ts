import { IPizza } from '../../types/index';
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';

interface IPizzaState{
	items:IPizza[],
	status:'loading' | 'success' | 'error'
}
type FetchPizzaType={
	sort:string,
	category:string,
	activePage:number
}

export const fetchPizzas = createAsyncThunk(
  'pizza/fetchPizzasStatus',
  async ({ sort, category, activePage }:FetchPizzaType) => {
    const { data } = await axios.get(
      `https://62c160f7eff7f7856f0d3c98.mockapi.io/pizzas/pizzas?${sort}${category}&p=${activePage}&l=6`,
    );
    return data as IPizza[];
  },
);

export const pizzaSlice = createSlice({
  name: 'pizza',
  initialState: {
    items: [],
    status: 'loading',
  } as IPizzaState,
  reducers: {
    setItems: (state, action:PayloadAction<IPizza[]>) => {
      state.items = action.payload;
    },
  },
  extraReducers: (builder) => {
	builder.addCase(fetchPizzas.pending,(state,action) => {
		state.status = 'loading';
	})
	builder.addCase(fetchPizzas.fulfilled,(state,action) => {
		state.items = action.payload;
      state.status = 'success';
	})
	builder.addCase(fetchPizzas.rejected,(state,action) => {
		      state.status = 'error';
      state.items = [];
	})
  }
});

export const { setItems } = pizzaSlice.actions;

export default pizzaSlice.reducer;
