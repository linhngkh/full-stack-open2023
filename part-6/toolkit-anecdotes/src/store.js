import { configureStore } from "@reduxjs/toolkit";
import anecdoteReducer from "./reducers/anecdoteReducer";
import filterReducer from "./reducers/filterReducer";
import { addNotification, removeNotification } from "./reducers/notifyReducer";
const store = configureStore({
  reducer: {
    anecdotes: anecdoteReducer,
    filter: filterReducer,
    addNoti: addNotification,
    removeNoti: removeNotification,
  },
});

export default store;
