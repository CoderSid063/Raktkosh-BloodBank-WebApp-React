import { createSlice } from "@reduxjs/toolkit";

const campsSlice = createSlice({
  name: "camps",
  initialState: [],
  reducers: {
    addInitialItems: (state, action) => {
      console.log(action);
      return action.payload;
    },
  },
});

export const campsActions = campsSlice.actions;

export default campsSlice;
