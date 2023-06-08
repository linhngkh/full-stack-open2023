import { createSlice } from "@reduxjs/toolkit";

const initialState = null;

const notifySlice = createSlice({
  name: "notify",
  initialState,
  reducers: {
    notifyReducer(state, action) {
      state.push(action.payload);
    },
    removeNotifyReducer: () => {
      return initialState;
    },
  },
});

export const { notifyReducer, removeNotifyReducer } = notifySlice.actions;
export default notifySlice.reducer;
