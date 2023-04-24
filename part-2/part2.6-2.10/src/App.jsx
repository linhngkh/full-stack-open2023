import { useState } from "react";
import Persons from "./components/Persons";
import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";
const App = () => {
  const [persons, setPersons] = useState([
    { name: "Arto Hellas", number: "040-123456", id: 1 },
    { name: "Ada Lovelace", number: "39-44-5323523", id: 2 },
    { name: "Dan Abramov", number: "12-43-234345", id: 3 },
    { name: "Mary Poppendieck", number: "39-23-6423122", id: 4 },
  ]);

  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  const filterHandle = (event) => {
    setSearchTerm(event.target.value.toLowerCase());
  };

  const filterByName = persons.filter((person) =>
    person.name.toLowerCase().includes(searchTerm)
  );

  const handleChangeName = (event) => {
    setNewName(event.target.value);
  };

  const handleChangeNumber = (event) => {
    setNewNumber(event.target.value);
  };

  const addName = (event) => {
    event.preventDefault();
    // define a variable to check if the name is already existed with an alert
    const nameExist = persons.find((person) => person.name === newName);
    if (nameExist) {
      alert(`${newName} is already added to phonebook`);
    } else {
      // create a new object for the note
      const nameObject = {
        name: newName,
        number: newNumber,
        // generate a unique identifier for each new person added to the phonebook
        id: persons.length + 1,
      };
      setPersons(persons.concat(nameObject));
      // reset input
      setNewName("");
      setNewNumber("");
    }
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter filterHandle={filterHandle} filterByName={filterByName} />
      <h2>add a new</h2>
      <PersonForm
        addName={addName}
        newName={newName}
        handleChangeName={handleChangeName}
        handleChangeNumber={handleChangeNumber}
      />
      <h2>Numbers</h2>
      <ul>
        {persons.map((person) => (
          <Persons person={person} key={person.id} />
        ))}
      </ul>
    </div>
  );
};

export default App;
