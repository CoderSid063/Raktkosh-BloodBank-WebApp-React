import { configureStore } from "@reduxjs/toolkit";
import fetchStatusSlice from "./fetchStatusSlice.js";
import campsSlice from "./campsSlice.js";
import authSlice from "./authSlice.js";

const raktkoshStore = configureStore({
  reducer: {
    fetchStatus: fetchStatusSlice.reducer,
    camps: campsSlice.reducer,
    auth: authSlice.reducer,
  },
});
export default raktkoshStore;
