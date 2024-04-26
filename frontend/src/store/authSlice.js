import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    accessToken: null,
    refreshToken: null,
    isAuthenticated: false,
  },
  reducers: {
    setTokens: (state) => {
      // console.log(action.payload);
      // const { accessToken, refreshToken } = action.payload;
      // state.accessToken = accessToken;
      // state.refreshToken = refreshToken;
      state.isAuthenticated = true;
    },
    clearTokens: (state) => {
      state.isAuthenticated = false;
    },
  },
});

export const authActions = authSlice.actions;
export default authSlice;
