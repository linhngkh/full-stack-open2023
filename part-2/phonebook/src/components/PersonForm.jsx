import React from "react";

const PersonForm = ({
  addName,
  newName,
  handleChangeName,
  handleChangeNumber,
  newNumber,
}) => {
  return (
    <form onSubmit={addName}>
      <div>
        name: <input value={newName} onChange={handleChangeName} />
      </div>
      <br />
      <div>
        number: <input value={newNumber} onChange={handleChangeNumber} />
      </div>
      <br />
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  );
};

export default PersonForm;
