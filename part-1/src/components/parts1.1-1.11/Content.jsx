import React from "react";
import Part1 from "./content/Part1";
import Part2 from "./content/Part2";
import Part3 from "./content/Part3";

const Content = ({ parts }) => {
  return (
    <div>
      {" "}
      <Part1 parts={parts} />
      <Part2 parts={parts} />
      <Part3 parts={parts} />
    </div>
  );
};

export default Content;
