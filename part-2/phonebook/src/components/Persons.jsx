import React from "react";

const Persons = ({ person, deletePerson }) => {
  return (
    <div>
      <h4>
        {person.name} - {person.number}
      </h4>
      <button onClick={() => deletePerson(person)}>delete</button>
    </div>
  );
};

export default Persons;
