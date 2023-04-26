import { useEffect, useState } from "react";
import findCountry from "./services/server";
import Country from "./components/Country";
function App() {
  const [countries, setCountries] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    findCountry.getAll().then((initialValue) => {
      setCountries(initialValue);
    });
  }, []);

  const handleChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const filterByName = countries.filter((country) =>
    country.name.common.toLowerCase().includes(searchTerm.trim().toLowerCase())
  );

  return (
    <>
      <div>
        find country <input value={searchTerm} onChange={handleChange} />
      </div>
      <div>
        {filterByName.length > 10 ? (
          <p>Too many matches, specify another filter</p>
        ) : filterByName.length > 1 && filterByName.length < 10 ? (
          <ul>
            {filterByName.map((country, id) => (
              <p key={id}>{country.name.common}</p>
            ))}
          </ul>
        ) : filterByName.length === 1 ? (
          <Country country={filterByName} />
        ) : (
          <p>There is no data for that country</p>
        )}
      </div>
    </>
  );
}

export default App;
