import React, { useEffect, useState } from 'react'
import InfoBar from './InfoBar';
import SearchBar from './SearchBar';
import WeatherHero from './WeatherHero';

const api = {
  key: process.env.NEXT_PUBLIC_PRIVATE_API_KEY,
  base: "https://api.openweathermap.org/data/2.5/"
}

const Main = () => {

  const [savedQuery, setSavedQuery] = useState('');
  const [query, setQuery] = useState('');
  const [weather, setWeather] = useState({});

  useEffect(() => {
    fetch(`${api.base}weather?q=brunei&units=metric&APPID=${api.key}`)
      .then(res => res.json())
      .then(result => {
        setWeather(result);
        }
      );
  }, []);

  const search = evt => {
    if (evt.key === "Enter") {
      fetch(`${api.base}weather?q=${query}&units=metric&APPID=${api.key}`)
        .then(res => res.json())
        .then(result => {
          if (typeof result != "undefined") {
            setSavedQuery(query)
          }
          setWeather(result);
          setQuery('');
          }
        );
    }
  }

  const dateBuilder = (d) => {
    let date = d.toDateString() 

    return date
  }

  return (
    <div className="w-full h-screen bg-[url('../public/assets/sunny.jpg')] bg-cover bg-bottom">
        <div className='w-full h-full bg-gradient-to-t from-[#111111] pb-14'>
          <div className='max-w-[85%] h-full m-auto flex flex-col justify-between'>
            {(typeof weather.main != "undefined") 
            ? (
            <WeatherHero location={(weather.name)} temperature={(weather.main.temp)} weather={(weather.weather[0].description)}/>
            ) 
            : (
            <h2 className='text-white text-2xl m-auto'>I don't know where <span className="text-red-700">{savedQuery}</span> is 😔</h2>
            )}

          
          <div>
            {(typeof weather.main != "undefined")
            ? (
            <InfoBar humidity={(weather.main.humidity)} pressure={(weather.main.pressure)} windSpeed={(weather.wind.speed)} />
            )
            : (
              <InfoBar />
            )}
            
            <SearchBar setQuery={setQuery} query={query} search={search} dateBuilder={dateBuilder}></SearchBar>
          </div>
          
        </div>
      </div>
    </div>
  )
}

export default Main