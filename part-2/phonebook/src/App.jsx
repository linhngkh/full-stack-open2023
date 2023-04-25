import { useState, useEffect } from "react";
import Persons from "./components/Persons";
import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";
import phoneBookService from "./services/server";

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
  const [successAdded, setSuccessAdded] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    phoneBookService.getAll().then((initialValues) => {
      setPersons(initialValues);
    });
  }, []);

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
      // send the data to the backend server
      phoneBookService
        .create(nameObject)
        .then((newPerson) => {
          setPersons(persons.concat(newPerson));
          // reset input
          setNewName("");
          setNewNumber("");
          setSuccessAdded(`Added ${newName}`);
        })

        .catch((error) => {
          console.log(error);
          setError(error.response.data.error);
        });
      setTimeout(() => {
        setError(null);
      }, 3000);
    }
    if (window.confirm(`Update ${nameExist.name}?`)) {
      const personFound = persons.find((person) => person.id === nameExist.id);
      const changePerson = { ...personFound, number: newNumber };
      phoneBookService
        .update(changePerson.id, changePerson)
        .then(
          setPersons(
            persons.map((p) => (p.id !== changePerson.id ? p : changePerson))
          )
        )
        .catch((error) => {
          console.log(error);
          setError(`${personFound.name} was already deleted from server`);
        });
      setTimeout(() => {
        setError(null);
      }, 3000);
      setPersons(persons.filter((p) => p.id !== personFound.id));
    }
  };

  const deletePerson = (person) => {
    if (window.confirm(`Delete ${person.name}?`)) {
      const newPerson = persons.filter((p) => p.id !== person.id);
      phoneBookService.deletePerson(person.id).then(() => {
        setPersons(newPerson);
      });
    }
  };
// step10
  const updatePerson = (personToUpdate) => {
    const updatedPerson = { ...personToUpdate, number: newNumber };
    phoneBookService
      .update()
      .then((res) => {
        setPersons(
          persons.map((p) => (p.id === personToUpdate.id ? res.data : p))
        );
        setNewName("");
        setNewNumber("");
        setSuccessAdded(
          `${personToUpdate.name} is already added to phonebook, replace the old number with a new one?`
        );
      })
      .catch((error) => {
        console.log(error);
        setError(error.message);
      });
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter filterHandle={filterHandle} filterByName={filterByName} />
      <h2>Add a new</h2>
      <PersonForm
        addName={addName}
        newName={newName}
        handleChangeName={handleChangeName}
        handleChangeNumber={handleChangeNumber}
      />
      <h2>Numbers</h2>
      <ul>
        {persons.map((person) => (
          <Persons
            person={person}
            key={person.id}
            deletePerson={deletePerson}
          />
        ))}
      </ul>
    </div>
  );
};

export default App;
