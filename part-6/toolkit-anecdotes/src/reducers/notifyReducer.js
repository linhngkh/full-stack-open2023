import { createSlice } from "@reduxjs/toolkit";

const initialState = null;

const notificationsSlice = createSlice({
  name: "notify",
  initialState,
  reducers: {
    notification: (state, action) => {
      return action.payload;
    },
  },
});

let timer = null;

export const setNotification = (content, second) => {
  return (dispatch) => {
    dispatch(notification(content));

    if (timer) {
      clearTimeout(timer);
    }
    timer = setTimeout(() => dispatch(notification(null)), second * 1000);
  };
};

export const { notification } = notificationsSlice.actions;
export default notificationsSlice.reducer;
