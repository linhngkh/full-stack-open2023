import { createSlice } from "@reduxjs/toolkit";

const initialState = "";

const notifySlice = createSlice({
  name: "notify",
  initialState,
  reducers: {
    addNotification: (state, action) => {
      state.push(action.payload);
    },
  },
});

export const { addNotification } = notifySlice.actions;

export default notifySlice.reducer;
