import React from "react";

const Header = ({ courses }) => {
  return (
    <div>
      <h1>{courses.name}</h1>
    </div>
  );
};

export default Header;
