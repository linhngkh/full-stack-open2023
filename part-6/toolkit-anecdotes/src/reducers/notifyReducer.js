import { createSlice } from "@reduxjs/toolkit";

const initialState = null;

const notificationsSlice = createSlice({
  name: "notify",
  initialState,
  reducers: {
    setNotification: (state, action) => {
      return action.payload;
    },
  },
});

let timer = null;

export const handleNotification = (content, second) => {
  return (dispatch) => {
    dispatch(setNotification(content));

    if (timer) {
      clearTimeout(timer);
    }
    timer = setTimeout(() => dispatch(setNotification(null)), second * 1000);
  };
};

export const { setNotification } = notificationsSlice.actions;
export default notificationsSlice.reducer;
