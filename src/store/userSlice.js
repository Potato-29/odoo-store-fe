import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  token: "",
  user: {},
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    authenticateUser: (state, action) => {
      state.token = action.payload.token;
      state.user = {
        email: action.payload.email,
        id: action.payload.userId,
      };
    },
  },
});

export const { authenticateUser } = userSlice.actions;

export default userSlice.reducer;
