import React from "react";
import Content from "./Content";
import Header from "./Header";
const Course = ({ courses }) => {
  return (
    <div>
      <Header courses={courses} />
      <Content courses={courses} />
    </div>
  );
};

export default Course;
