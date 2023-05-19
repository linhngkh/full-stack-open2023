import React from "react";
import { Link } from "react-router-dom";
const Header = ({ user, logout }) => {
  const handleLogout = async () => {
    await logout();
  };
  return (
    <nav>
      <h1>BLOGS</h1>
      <div>
        <Link to={"/"}>Home</Link>
        <Link to={"/user"}>Users</Link>
      </div>
      <p>{user.name} logged in</p>
      <button onClick={handleLogout}>logout</button>
    </nav>
  );
};

export default Header;
