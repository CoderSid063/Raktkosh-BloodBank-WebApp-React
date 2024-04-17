import { createSlice } from "@reduxjs/toolkit";

const campsSlice = createSlice({
  name: "camps",
  initialState: [],
  reducers: {
    addInitialItems: (state, action) => {
      return action.payload.data;
    },
  },
});

export const campsActions = campsSlice.actions;

export default campsSlice;
