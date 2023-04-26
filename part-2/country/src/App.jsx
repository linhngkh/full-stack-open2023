import { useEffect, useState } from "react";
import findCountry from "./services/server";

function App() {
  const [countries, setCountries] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    findCountry.getAll().then((initialValue) => {
      setCountries(initialValue);
    });
  }, []);

  const handleChange = (e) => {
    setSearchTerm(e.target.value.toLowerCase());
  };

  const filterByName = countries.filter((country) =>
    country.name.common.toLowerCase().includes(searchTerm)
  );

  return (
    <>
      <div>
        find country <input value={searchTerm} onChange={handleChange} />
      </div>
      <p>{filterByName > 10 ? `Too many results` : null}</p>
      <ul>
        {filterByName.map((country, id) => (
          <p key={id}>{country.name.common}</p>
        ))}
      </ul>
    </>
  );
}

export default App;
