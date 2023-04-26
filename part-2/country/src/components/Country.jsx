import React from "react";

const Country = ({ country }) => {
  return (
    <div>
      <h1>{country[0].name.common}</h1>
      <p> Capital {country[0].capital}</p>
      <p>Area {country[0].area}</p>
      <strong>Languages: </strong>

      <ul>
        {Object.values(country[0].languages).map((language, id) => (
          <li key={id}>{language}</li>
        ))}
      </ul>
      <img alt="flag" src={country[0].flag} width="40" />
    </div>
  );
};

export default Country;
