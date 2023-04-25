import React from "react";

const Filter = ({ filterHandle, filterByName }) => {
  return (
    <div>
      filter shown with <input onChange={filterHandle} />
      <ul>
        {filterByName.map((person) => (
          <p key={person.id}>{person.name}</p>
        ))}
      </ul>
    </div>
  );
};

export default Filter;
