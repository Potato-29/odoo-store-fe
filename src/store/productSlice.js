import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  list: [],
  limit: 8,
  page: 1,
  totalItems: 0,
  totalPages: 0,
};

export const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    saveProductsToStore: (state, action) => {
      state.list = action.payload.data;
      state.limit = action.payload.limit;
      state.page = action.payload.page;
      state.totalItems = action.payload.totalItems;
      state.totalPages = action.payload.totalPages;
    },
  },
});

export const { saveProductsToStore } = productSlice.actions;

export default productSlice.reducer;
