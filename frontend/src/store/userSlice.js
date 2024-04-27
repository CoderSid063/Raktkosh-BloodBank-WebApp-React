import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: {
    userData: null,
  },
  reducers: {
    setUserData: (state, action) => {
      state.userData = action.payload;
    },
    clearUserData: (state) => {
      state.userData = null;
    },
    setOrganizedBloodCamps: (state, action) => {
      // console.log(action.payload);
      state.organizedBloodCamps = action.payload;
    },
    setSubmittedBloodForms: (state, action) => {
      // console.log(action.payload);
      state.submittedBloodForms = action.payload;
    },
  },
});

export const userActions = userSlice.actions;
export default userSlice;
