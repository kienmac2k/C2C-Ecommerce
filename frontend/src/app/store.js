import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./cart/slice";
import productReducer from "./product/slice";
const rootReducer = {
  cart: cartReducer,
  product: productReducer,
};

export const store = configureStore({
  reducer: rootReducer,
});

export default store;
