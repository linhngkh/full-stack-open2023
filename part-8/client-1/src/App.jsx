import { useQuery } from "@apollo/client";
import Persons from "./components/Persons";
import { ALL_PERSONS } from "./queries";
import PersonForm from "./components/PersonForm";

function App() {
  const result = useQuery(ALL_PERSONS, {
    pollInterval: 2000,
  });
  if (result.loading) {
    return <div>Loading ...</div>;
  }
  return (
    <div>
      <Persons persons={result.data.allPersons} />
      <PersonForm />
    </div>
  );
}

export default App;
