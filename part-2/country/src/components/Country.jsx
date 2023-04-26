import React, { useState, useEffect } from "react";
import axios from "axios";

const Country = ({ country }) => {
  const [weather, setWeather] = useState({});

  const URL = "https://api.openweathermap.org/data/2.5/weather?";
  const API_KEY = "c2ccd68ef98004ae2058dcec9fe13a58";

  useEffect(() => {
    axios.get(URL + `q=${country[0].capital}&appid=${API_KEY}`).then((res) => {
      setWeather(res.data);
    });
  }, [country]);

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
      <img src={country[0].flags.png} alt="nationalFlag" />

      {/* weather */}
      <h3>Weather in {country[0].capital}</h3>

      {weather.main && (
        <>
          {" "}
          <p>
            Temperature {(weather.main.temp - 273.15).toFixed(2)}
            <sup>&deg;C</sup>
          </p>
          <img
            src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
            alt={weather.weather[0].description}
          />
          <p>Wind {weather.wind.speed} m/s</p>
        </>
      )}
    </div>
  );
};

export default Country;
