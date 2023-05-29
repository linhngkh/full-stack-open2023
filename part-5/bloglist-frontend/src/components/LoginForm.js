import React from "react";
import Button from "./utils/Button";
import PropTypes from "prop-types";

const LoginForm = ({
  handleLogin,
  handlePasswordChange,
  handleUsernameChange,
  username,
  password,
}) => {
  return (
    <div className="flex mx-auto flex-col h-screen justify-center items-center ">
      <h2 className="text-xl p-4 font-bold">Log in to application</h2>
      <form onSubmit={handleLogin}>
        <div>
          username
          <input
            id="username"
            type="text"
            value={username}
            name="Username"
            className="w-full bg-slate-200 mb-3 rounded-lg px-3 py-2"
            onChange={handleUsernameChange}
          />
        </div>
        <div>
          password
          <input
            id="password"
            type="password"
            value={password}
            name="Password"
            className="w-full bg-slate-200 mb-3 rounded-lg px-3 py-2"
            onChange={handlePasswordChange}
          />
        </div>{" "}
        <Button id="login-button" type="submit">
          Login
        </Button>
      </form>
    </div>
  );
};

LoginForm.propTypes = {
  handleSubmit: PropTypes.func,
  handleUsernameChange: PropTypes.func,
  handlePasswordChange: PropTypes.func,
  username: PropTypes.string,
  password: PropTypes.string,
};

export default LoginForm;
