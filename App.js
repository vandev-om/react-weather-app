import React from "react";
import { useState } from "react";

const api = {
  key: "your dedicated key",
  url: "https://api.openweathermap.org/data/2.5/",
};

function App() {
  const [data, setData] = useState("");
  const [weather, setWeather] = useState({});

  const search = (evnt) => {
    if (evnt.key === "Enter") {
      fetch(`${api.url}weather?q=${data}&units=metric&APPID=${api.key}`)
        .then((response) => response.json())
        .then((result) => {
          setWeather(result);
          setData("");
          console.log(result);
        });
    }
  };

  const dateParser = (d) => {
    let months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    let days = [
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
      "Sunday",
    ];
    let date = d.getDate();
    let day = days[d.getDay()];
    let month = months[d.getMonth()];
    let year = d.getFullYear();

    return `${day} ${date} ${month} ${year}`;
  };

  return (
    <div
      className={
        typeof weather.main != "undefined"
          ? weather.main.temp > 15
            ? "app warm"
            : "app cold"
          : "app"
      }
    >
      <main>
        <div className="search-box">
          <input
            type="text"
            className="input-box"
            placeholder="Enter city name"
            onChange={(e) => setData(e.target.value)}
            value={data}
            onKeyPress={search}
          />
        </div>
        {typeof weather.main != "undefined" ? (
          <div>
            <div className="location-container">
              <div className="location">
                {weather.name}, {weather.sys.country}
              </div>
              <div className="date">{dateParser(new Date())}</div>
              <div className="weather-container">
                <div className="temperature">
                  {Math.round(weather.main.temp)}°C
                </div>
                <div className="weather">{weather.weather[0].main}</div>
              </div>
            </div>
          </div>
        ) : (
          ""
        )}
      </main>
    </div>
  );
}

export default App;
