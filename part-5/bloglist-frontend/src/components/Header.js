import React from "react";
import { Link } from "react-router-dom";
import Button from "./utils/Button";
const Header = ({ logout }) => {
  return (
    <>
      <nav className="flex justify-evenly flex-row  items-center w-full bg-slate-900 text-white p-6">
        {" "}
        <h1 className="font-bold text-xl">BLOGS</h1>
        <Link to={"/"}>Home</Link>
        <Link to={"/user"}>Users</Link>
        <Button onClick={logout}>Log Out</Button>
      </nav>
    </>
  );
};

export default Header;
