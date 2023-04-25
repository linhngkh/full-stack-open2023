import React from "react";

const Notification = ({ message }) => {
  return <div className={message ? "success" : "error"}>{message}</div>;
};

export default Notification;
