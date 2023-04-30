import React from "react";
import styled from "styled-components";

const NotificationDiv = styled.div`
  color: ${(props) => (props.hasError ? "red" : "green")};
  background: lightgrey;
  font-size: 20px;
  border-style: solid;
  border-radius: 5px;
  padding: 10px;
  margin-bottom: 10px;
`;

const Notification = ({ message, hasError }) => {
  return (
    <NotificationDiv hasError={hasError}>
      <div>{message}</div>
    </NotificationDiv>
  );
};

export default Notification;
