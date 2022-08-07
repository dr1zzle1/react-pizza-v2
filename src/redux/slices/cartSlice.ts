import { calcTotalPrice } from './../../utils/calcTotalPrice';
import { ICartItem } from './../../types/index';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { getCartFromLS } from '../../utils/getCartFromLS';


interface ICartState{
	items:ICartItem[],
	totalPrice:number
} 

type ItemActionType={
	id:number,
	type:number,
	size:number
}

export const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    items: getCartFromLS().items,
    totalPrice: getCartFromLS().totalPrice,
  } as ICartState,
  reducers: {
    addItem(state, action:PayloadAction<ICartItem>) {
      const findItem = state.items.find(
        (obj) =>
          obj.id === action.payload.id &&
          obj.size === action.payload.size &&
          obj.type === action.payload.type,
      );
      if (findItem) {
        findItem.count++;
      } else {
        state.items.push({ ...action.payload, count: 1 });
      }
      state.totalPrice = calcTotalPrice(state.items)
    },
    clearCart(state) {
      state.items = [];
      state.totalPrice = 0;
    },
    plusItem(state, action:PayloadAction<ItemActionType>) {
      const findItem = state.items.find(
        (obj) =>
          obj.id === action.payload.id &&
          obj.size === action.payload.size &&
          obj.type === action.payload.type,
      );
      if (findItem) {
        findItem.count++;
      }
      state.totalPrice = state.items.reduce((sum, obj) => {
        return obj.price * obj.count + sum;
      }, 0);
    },
    minusItem(state, action:PayloadAction<ItemActionType>) {
      const findItem = state.items.find(
        (obj) =>
          obj.id === action.payload.id &&
          obj.size === action.payload.size &&
          obj.type === action.payload.type,
      );
      if (findItem) {
        findItem.count--;
      }
      state.totalPrice = state.items.reduce((sum, obj) => {
        return obj.price * obj.count + sum;
      }, 0);
    },
    removeItem(state, action:PayloadAction<ItemActionType>) {
      state.items = state.items.filter(
        (el) =>
          el.id !== action.payload.id ||
          el.type !== action.payload.type ||
          el.size !== action.payload.size,
      );
      state.totalPrice = state.items.reduce((sum, obj) => {
        return obj.price * obj.count + sum;
      }, 0);
    },
  },
});

export const { addItem, clearCart, removeItem, plusItem, minusItem } = cartSlice.actions;

export default cartSlice.reducer;
