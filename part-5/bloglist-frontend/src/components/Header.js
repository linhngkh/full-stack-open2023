import React from "react";
import { Link } from "react-router-dom";
import Button from "./utils/Button";

const Header = ({ username, logout }) => {
  const handleLogout = async () => {
    await logout();
  };
  return (
    <>
      <nav className="flex justify-evenly flex-row  items-center w-full bg-slate-900 text-white p-6">
        {" "}
        <h1 className="font-bold text-xl">BLOGS</h1>
        <Link to={"/"}>Home</Link>
        <Link to={"/user"}>Users</Link>
      </nav>
      <div className="p-2 w-1/3">
        <h1>blogs</h1>
        <p>{username} logged in</p>
        <Button onClick={handleLogout}>Logout</Button>
      </div>
    </>
  );
};

export default Header;
