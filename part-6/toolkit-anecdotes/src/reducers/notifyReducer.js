import { createSlice, createAction } from "@reduxjs/toolkit";

const addNotification = createAction("notifications/add");
const removeNotification = createAction("notifications/remove");

const notificationsSlice = createSlice({
  name: "notifications",
  initialState: "",
  reducers: {
    setNotification: (state, action) => {
      state.push(action.payload);
    },
    removeNotification: (state, action) => {
      const { id } = action.payload;
      return state.filter((notification) => notification.id !== id);
    },
  },
});

export const { setNotification } = notificationsSlice.actions;

export { addNotification, removeNotification };

export default notificationsSlice.reducer;
