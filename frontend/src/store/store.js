import { configureStore } from "@reduxjs/toolkit";
import fetchStatusSlice from "./fetchStatusSlice.js";
import campsSlice from "./campsSlice.js";
import authSlice from "./authSlice.js";
import userSlice from "./userSlice.js";

const raktkoshStore = configureStore({
  reducer: {
    fetchStatus: fetchStatusSlice.reducer,
    camps: campsSlice.reducer,
    auth: authSlice.reducer,
    user: userSlice.reducer,
  },
});
export default raktkoshStore;
