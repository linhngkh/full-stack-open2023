import React, { useState } from "react";
import Button from "./utils/Button";

const LoginForm = ({
  handleLogin,
  username,
  handlePasswordChange,
  password,
  handleUsernameChange,
}) => {
  const inputStyles = `w-full bg-slate-200 mb-3 rounded-lg px-3 py-2`;
  return (
    <form onSubmit={handleLogin}>
      <div>
        username
        <input
          type="text"
          value={username}
          name="Username"
          className={inputStyles}
          onChange={handleUsernameChange}
        />
      </div>
      <div>
        password
        <input
          type="password"
          value={password}
          name="Password"
          className={inputStyles}
          onChange={handlePasswordChange}
        />
      </div>{" "}
      <Button type="submit">Login</Button>
    </form>
  );
};

export default LoginForm;
