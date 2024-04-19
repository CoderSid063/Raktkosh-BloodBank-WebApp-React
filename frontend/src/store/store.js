import { configureStore } from "@reduxjs/toolkit";
import fetchStatusSlice from "./fetchStatusSlice.js";
import campsSlice from "./campsSlice.js";

const raktkoshStore = configureStore({
  reducer: {
    fetchStatus: fetchStatusSlice.reducer,
    camps: campsSlice.reducer,
  },
});
export default raktkoshStore;
