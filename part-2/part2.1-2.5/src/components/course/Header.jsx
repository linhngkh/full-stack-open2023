import React from "react";

const Header = ({ courses }) => {
  return (
    <div>
      <h1>Web development curriculum</h1>
      <h2>{courses[0].name}</h2>
    </div>
  );
};

export default Header;
