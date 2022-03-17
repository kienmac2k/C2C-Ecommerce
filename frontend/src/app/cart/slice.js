import { createSlice } from "@reduxjs/toolkit";
import { cartState } from "./state";

const cartSlice = createSlice({
  name: "cart",
  initialState: cartState,
  reducers: {
    addItem: (state, { payload }) => {
      const item = state.cart.find((item) => item.id === payload.id);
      if (item) {
        item.quantity += 1;
      } else {
        state.cart.push(payload);
      }
    },
    increaseItem: (state, { payload }) => {
      const item = state.cart.find((item) => item.id === payload);
      if (item) {
        item.quantity += 1;
      }
    },
    decreaseItem: (state, { payload }) => {
      const item = state.cart.find((item) => item.id === payload);
      if (item && item.quantity > 1) {
        item.quantity -= 1;
      }
    },

    removeItem: (state, { payload }) => {
      state.cart = state.cart.filter((item) => item.id !== payload);
    },
    setTotal: (state) => {
      state.total = state.cart.reduce((total, item) => {
        return total + item.price * item.quantity;
      }, 0);
    },
  },
});

export const { addItem, removeItem, setTotal, increaseItem, decreaseItem } =
  cartSlice.actions;
export default cartSlice.reducer;
