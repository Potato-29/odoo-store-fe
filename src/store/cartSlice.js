import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: [],
  tax: 0,
  cartTotal: 0,
  subTotal: 0,
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    saveCartToStore: (state, action) => {
      state.items = action.payload;
      // state.items.map((item) => (state.cartTotal += item.price * item.qty));
      // state.tax = (state.cartTotal * 5) / 100;
      // state.subTotal = state.cartTotal + state.tax;
    },
  },
});

export const { saveCartToStore } = cartSlice.actions;

export default cartSlice.reducer;
