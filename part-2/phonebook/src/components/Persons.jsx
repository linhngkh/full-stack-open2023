import React from "react";

const Persons = ({ person }) => {
  return (
    <div>
      <h4>
        {person.name} {person.number}
      </h4>
    </div>
  );
};

export default Persons;
