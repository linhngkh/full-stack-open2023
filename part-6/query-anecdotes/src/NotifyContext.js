import { createContext, useReducer, useContext } from "react";

const notificationReducer = (state, action) => {
  switch (action.type) {
    case "CREATE_ANECDOTE":
      return ` created ${action.payload}`;
    case "VOTE_ANECDOTE":
      return ` voted ${action.payload}`;
    case "DISAPPEAR_NOTIFY":
      return "";
    case "ERROR":
      return `error ${action.payload}`;
    default:
      return state;
  }
};

// custom hook

export const useNotification = () => {
  const notificationAndDispatch = useContext(NotificationContext);
  return notificationAndDispatch[0];
};

export const useNotificationDispatch = () => {
  const notificationAndDispatch = useContext(NotificationContext);
  return notificationAndDispatch[1];
};

const NotificationContext = createContext();
export default NotificationContext;

export const NotificationContextProvider = (props) => {
  const [notification, notificationDispatch] = useReducer(
    notificationReducer,
    ""
  );
  return (
    <NotificationContext.Provider value={[notification, notificationDispatch]}>
      {props.children}
    </NotificationContext.Provider>
  );
};
