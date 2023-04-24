import React from "react";

const Part1 = ({ parts }) => {
  return (
    <div>
      <p>
        {parts[0].name} {parts[0].exercises}
      </p>
    </div>
  );
};

export default Part1;
