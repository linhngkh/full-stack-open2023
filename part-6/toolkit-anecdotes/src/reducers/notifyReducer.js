import { createSlice, createAction } from "@reduxjs/toolkit";

const addNotification = createAction("notify/add");
const removeNotification = createAction("notify/remove");
const initialState = "";

const notificationsSlice = createSlice({
  name: "notify",
  initialState,
  reducers: {
    setNotification: (state, action) => {
      state.push(action.payload);
    },
    removeNotification: () => {
      return initialState;
    },
  },
});

export const { setNotification } = notificationsSlice.actions;

export { addNotification, removeNotification };

export default notificationsSlice.reducer;
