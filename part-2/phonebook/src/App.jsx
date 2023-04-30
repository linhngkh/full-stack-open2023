import { useState, useEffect } from "react";
import Persons from "./components/Persons";
import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";
import phoneBookService from "./services/server";
import Notification from "./components/Notification";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [successAdded, setSuccessAdded] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

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
    // define a variable to check if the name is already existed
    const nameExist = persons.filter((person) => person.name === newName);
    if (nameExist.length === 0) {
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
          //notification
          setSuccessAdded(`Added ${newName}!`);
          setTimeout(() => {
            setSuccessAdded(null);
          }, 3000);
        })
        .catch((error) => {
          console.log("fail to create new", error);
          setErrorMessage(error.response.data.error);
          setTimeout(() => {
            setErrorMessage(null);
          }, 3000);
        });
    } else {
      // update the exist one
      if (window.confirm(`Update ${nameExist[0].name}?`)) {
        const personFound = persons.find(
          (person) => person.id === nameExist[0].id
        );
        const changePerson = { ...personFound, number: newNumber };
        phoneBookService
          .update(changePerson.id, changePerson)
          .then(() => {
            setPersons(
              persons.map((p) => (p.id !== changePerson.id ? p : changePerson))
            );
            setSuccessAdded(`Update ${changePerson.name} successfully`);
          })
          .catch((error) => {
            console.log("fail to update", error);
          });
        setTimeout(() => {
          setErrorMessage(null);
        }, 3000);
        setPersons(persons.filter((p) => p.id !== personFound.id));
      }
    }
  };

  const deletePerson = (personToDelete) => {
    const confirmed = window.confirm(`Delete ${personToDelete.name}`);

    if (confirmed) {
      const newPerson = persons.filter((p) => p.id !== personToDelete.id);
      phoneBookService
        .deletePerson(personToDelete.id)
        .then(() => {
          setPersons(newPerson);
          setSuccessAdded(`Deleted ${personToDelete.name}`);
        })
        .catch((error) => {
          console.log("Fail to delete ", error);
          setErrorMessage(
            `Information of ${personToDelete.name} has already been removed from server`
          );
        });
    }
  };

  return (
    <div>
      <h2>Phonebook</h2>
      {successAdded ? (
        <Notification message={successAdded} />
      ) : errorMessage ? (
        <Notification message={errorMessage} />
      ) : null}

      <Filter filterHandle={filterHandle} filterByName={filterByName} />
      <h2>Add a new person</h2>
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
