import { createSlice } from "@reduxjs/toolkit";

const initialState = null;

const notifySlice = createSlice({
  name: "notify",
  initialState,
  reducers: {
    notifyReducer(state, action) {
      return action.payload;
    },
    removeNotification: (state) => {
      state.notification = null;
    },
  },
});

export const { notifyReducer, removeNotification } = notifySlice.actions;
export default notifySlice.reducer;
