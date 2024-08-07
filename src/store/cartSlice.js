import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: [],
  cartId: "",
  tax: 0,
  cartTotal: 0,
  subTotal: 0,
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    saveCartToStore: (state, action) => {
      state.cartId = action.payload[0]._id;
      state.items = action.payload[0].items;
    },
    addItemToCart: (state, action) => {
      const newItem = action.payload;
      const existingItem = state.items.find((item) => item._id === newItem._id);

      if (existingItem) {
        existingItem.qty += newItem.qty;
      } else {
        state.items.push({ ...newItem, qty: 1 });
      }
    },
    increaseQty: (state, action) => {
      const { _id } = action.payload;
      const item = state.items.find((item) => item._id === _id);
      if (item) {
        item.qty += 1;
      }
    },
    decreaseQty: (state, action) => {
      const { _id } = action.payload;
      const itemIndex = state.items.findIndex((item) => item._id === _id);
      if (itemIndex !== -1) {
        const item = state.items[itemIndex];
        if (item.qty > 1) {
          item.qty -= 1;
        } else {
          state.items.splice(itemIndex, 1);
        }
      }
    },
    clearCart: (state, action) => {
      state.items = [];
      state.tax = 0;
      state.subTotal = 0;
      state.cartTotal = 0;
    },
  },
});

export const {
  saveCartToStore,
  addItemToCart,
  clearCart,
  increaseQty,
  decreaseQty,
} = cartSlice.actions;

export default cartSlice.reducer;
