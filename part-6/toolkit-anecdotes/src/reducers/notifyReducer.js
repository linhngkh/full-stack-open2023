import { createSlice } from "@reduxjs/toolkit";

const initialState = "";

const notifySlice = createSlice({
  name: "notify",
  initialState,
  reducers: {
    addNotification: (state, action) => {
      state.push(action.content);
    },
    removeNotification: (state, action) => {
      return state.filter(
        (notification) => notification.message !== action.content
      );
    },
  },
});

export const { addNotification, removeNotification } = notifySlice.actions;

export default notifySlice.reducer;
