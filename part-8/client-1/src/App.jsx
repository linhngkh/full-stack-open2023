import { useQuery } from "@apollo/client";
import Persons from "./components/Persons";
import { ALL_PERSONS } from "./queries";
import PersonForm from "./components/PersonForm";
import { useState } from "react";
import Notify from "./components/Notify";

function App() {
  const [errorMessage, setErrorMessage] = useState(null);
  const result = useQuery(ALL_PERSONS, {
    pollInterval: 2000,
  });
  if (result.loading) {
    return <div>Loading ...</div>;
  }

  const notify = (message) => {
    setErrorMessage(message);
    setTimeout(() => {
      setErrorMessage(null);
    }, 10000);
  };

  return (
    <div>
      <Notify errorMessage={errorMessage} />
      <Persons persons={result.data.allPersons} />
      <PersonForm setError={notify} />
    </div>
  );
}

export default App;
