import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { addNotification, removeNotification } from "../reducers/notifyReducer";

const Notification = () => {
  const dispatch = useDispatch();
  const notification = useSelector((state) => state.notify);
  const style = {
    border: "solid",
    padding: 10,
    borderWidth: 1,
  };
  useEffect(() => {
    const timer = setTimeout(() => dispatch(notification), 5000);
    return () => clearTimeout(timer);
  }, []);
  return <div style={style}> {notification}</div>;
};

export default Notification;
