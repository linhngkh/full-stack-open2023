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

  const partNames1 = courses[0].parts.map((part, id) => (
    <li key={id}>
      {part.name} {part.exercises}
    </li>
  ));

  const partNames2 = courses[1].parts.map((part, id) => (
    <li key={id}>
      {part.name} {part.exercises}
    </li>
  ));

  return (
    <div>
      <div>{partNames1}</div>
      <strong>total of {total1} exercises</strong>
      <h2>{courses[1].name}</h2>
      <p>{partNames2}</p>
      <strong>total of {total2} exercises</strong>
      <br />
      <strong>total of {total} exercises</strong>
    </div>
  );
};

export default Part;
