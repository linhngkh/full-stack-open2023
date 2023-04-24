import React from "react";

const Part2 = ({ parts }) => {
  return (
    <div>
      {" "}
      <p>
        {parts[1].name} {parts[1].exercises}
      </p>
    </div>
  );
};

export default Part2;
