import React from "react";
import Part1 from "./parts/Part1";
import Part2 from "./parts/Part2";
import Part3 from "./parts/Part3";

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
