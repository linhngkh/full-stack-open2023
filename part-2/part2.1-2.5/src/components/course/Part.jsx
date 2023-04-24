import React from "react";

const Part = ({ courses }) => {
  const total1 = courses[0].parts.reduce(
    (sum, part) => sum + part.exercises,
    0
  );
  const total2 = courses[1].parts.reduce(
    (sum, part) => sum + part.exercises,
    0
  );
  const total = courses.reduce((sum, course) => {
    return (
      sum +
      course.parts.reduce((acc, part) => {
        return acc + part.exercises;
      }, 0)
    );
  }, 0);
  return (
    <div>
      {/* <h5>
        {courses.parts[0].name} {courses.parts[0].exercises}
      </h5>
      <h5>
        {parts[1].name} {parts[1].exercises}
      </h5>
      <h5>
        {parts[2].name} {parts[2].exercises}
      </h5>
      <h5>
        {parts[3].name} {parts[3].exercises}
      </h5> */}
      <p>total of {total1}</p>
      <p>total of {total2}</p>
      <strong>total of {total} exercises</strong>
    </div>
  );
};

export default Part;
