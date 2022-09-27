import React, { useState } from 'react'
const api = {
  key: "17de6ed997e33ccb85d03acf1d7eeb02",
  base: "https://api.openweathermap.org/data/2.5/"
}

const Main = () => {

  const [query, setQuery] = useState('');
  const [weather, setWeather] = useState({});

  const search = evt => {
    if (evt.key === "Enter") {
      fetch(`${api.base}weather?q=${query}&units=metric&APPID=${api.key}`)
        .then(res => res.json())
        .then(result => {
          setWeather(result);
          setQuery('');
          console.log(result);
          }
        );
    }
  }

  const dateBuilder = (d) => {
    let months = [
      "January", "February", "March", "April", "May", "June", "July", 
      "August", "September", "October", "November", "December"
    ]
    let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

    let day = days[d.getDay()];
    let date = d.getDate();
    let month = months[d.getMonth()];
    let year = d.getFullYear();

    return `${day} ${date} ${month} ${year}`
  }

  return (
    <div className="w-full h-screen bg-[url('../public/assets/cold-bg.jpg')] bg-cover bg-bottom">
      <div>
        <input
          type="text"
          placeholder="Search..."
          onChange={e => setQuery(e.target.value)}
          value={query}
          onKeyDown={search}
        />
      </div>

      {(typeof weather.main != "undefined") 
      ? (
          <div>
          <div>
            <div>{weather.name}, {weather.sys.country}</div>
            <div>{dateBuilder(new Date())}</div>
          </div>
          <div>
            <div>
              {Math.round(weather.main.temp*10)/10}°C
            </div>
            <div>
              {weather.weather[0].main}
            </div>
          </div>
        </div>
        ) 
      : ('')}
      
      
    </div>
  )
}

export default Main