import React from "react";
import Content from "./Content";

const Course = ({ courses }) => {
  return (
    <div>
      <Content courses={courses} />
    </div>
  );
};

export default Course;
