import { createSlice } from "@reduxjs/toolkit";
import { productState } from "./state";

const cartSlice = createSlice({
  name: "product",
  initialState: productState,
  reducers: {
    setProductList: (state, { payload }) => {
      state.product = payload;
      state.loading = false;
    },
  },
});

export const { get } = cartSlice.actions;
export default cartSlice.reducer;
