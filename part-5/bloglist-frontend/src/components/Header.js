import React from "react";
import { Link } from "react-router-dom";
const Header = ({ user, logout }) => {
  return (
    <nav>
      <h1>BLOGS</h1>
      <div>
        <Link to={"/"}>Home</Link>
        <Link to={"/user"}>Users</Link>
      </div>
      <p>{user.name} logged in</p>
      <button onClick={logout}>logout</button>
    </nav>
  );
};

export default Header;
