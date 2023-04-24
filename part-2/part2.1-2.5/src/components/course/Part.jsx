import React from "react";

const Part = ({ course: { parts } }) => {
  const total = parts.reduce((acc, curr) => {
    return acc + curr.exercises;
  }, 0);
  return (
    <div>
      <h5>
        {parts[0].name} {parts[0].exercises}
      </h5>
      <h5>
        {parts[1].name} {parts[1].exercises}
      </h5>
      <h5>
        {parts[2].name} {parts[2].exercises}
      </h5>
      <h5>
        {parts[3].name} {parts[3].exercises}
      </h5>
      <p>total of {total} exercises</p>
    </div>
  );
};

export default Part;
