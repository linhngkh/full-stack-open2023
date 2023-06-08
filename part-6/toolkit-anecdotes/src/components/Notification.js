import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { removeNotifyReducer, notifyReducer } from "../reducers/notifyReducer";

const Notification = () => {
  const dispatch = useDispatch();
  const notification = useSelector((state) => state.notifyReducer);
  const style = {
    border: "solid",
    padding: 10,
    borderWidth: 1,
  };

  useEffect(() => {
    if (notification) {
      const timer = setTimeout(() => {
        dispatch(removeNotifyReducer());
      }, 5000);

      return () => clearTimeout(timer);
    }
  }, [notification, dispatch]);

  if (!notification) {
    return null;
  }
  return <div style={style}>{notification}</div>;
};

export default Notification;
