import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  token: "",
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    authenticateUser: (state, action) => {
      state.token = action.payload;
    },
  },
});

export const { authenticateUser } = userSlice.actions;

export default userSlice.reducer;
