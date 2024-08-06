import { configureStore } from "@reduxjs/toolkit";
import productSlice from "./productSlice";
import cartSlice from "./cartSlice";
import userSlice from "./userSlice";

export const store = configureStore({
  reducer: { product: productSlice, cart: cartSlice, user: userSlice },
});
