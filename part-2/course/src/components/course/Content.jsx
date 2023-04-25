import React from "react";
import Part from "./Part";
const Content = ({ courses }) => {
  return (
    <div>
      <Part courses={courses} />
    </div>
  );
};

export default Content;
