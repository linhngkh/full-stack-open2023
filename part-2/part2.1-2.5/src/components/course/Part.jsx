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
    <li key={id}>{part.name}</li>
  ));

  const partExercise1 = courses[0].parts.map((part, id) => (
    <li key={id}>{part.exercises}</li>
  ));
  const partNames2 = courses[1].parts.map((part, id) => (
    <li key={id}>{part.name}</li>
  ));

  const partExercise2 = courses[1].parts.map((part, id) => (
    <li key={id}>{part.exercises}</li>
  ));

  return (
    <div>
      <div>
        {partNames1} {partExercise1}
      </div>
      <p>total of {total1}</p>
      <p>
        {partNames2} {partExercise2}
      </p>
      <p>total of {total2}</p>
      <strong>total of {total} exercises</strong>
    </div>
  );
};

export default Part;
