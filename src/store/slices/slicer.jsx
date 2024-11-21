import { createSlice } from "@reduxjs/toolkit";
const initialState = [];
const slice = {
  name: "data",
  initialState,
  reducers: {
    addData: (state, action) => {
      state.push(action.payload);
    },
  },
};
export const dataSlice = createSlice(slice);
export const { addData } = dataSlice.actions;
export default dataSlice.reducer;
