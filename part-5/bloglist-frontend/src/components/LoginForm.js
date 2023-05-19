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
    <div className="flex mx-auto flex-col h-screen justify-center items-center ">
      <h2 className="text-xl p-4 font-bold">Log in to application</h2>
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
    </div>
  );
};

export default LoginForm;
