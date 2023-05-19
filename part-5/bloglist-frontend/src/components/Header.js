import React from "react";
import { Link } from "react-router-dom";
const Header = ({ username, logout }) => {
  const handleLogout = async () => {
    await logout();
  };
  return (
    <nav className="bg-pink-200">
      <h1>BLOGS</h1>
      <div>
        <Link to={"/"}>Home</Link>
        <Link to={"/user"}>Users</Link>
      </div>
      <p>{username} logged in</p>
      <button onClick={handleLogout}>logout</button>
    </nav>
  );
};

export default Header;
