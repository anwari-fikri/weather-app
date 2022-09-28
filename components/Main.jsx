import React, { useEffect, useState } from "react"
import InfoBar from "./InfoBar";
import SearchBar from "./SearchBar";
import WeatherHero from "./WeatherHero";

const api = {
  key: process.env.NEXT_PUBLIC_PRIVATE_API_KEY,
  base: "https://api.openweathermap.org/data/2.5/"
}

const Main = () => {

  const [bg, setBg] = useState(`w-full h-screen bg-[url("../public/assets/default.jpg")] bg-cover bg-bottom`);
  const [savedQuery, setSavedQuery] = useState("");
  const [query, setQuery] = useState("");
  const [weather, setWeather] = useState({});

  // Set starting weather location to brunei on page start
  useEffect(() => {
    fetch(`${api.base}weather?q=brunei&units=metric&APPID=${api.key}`)
      .then(res => res.json())
      .then(data => {
        setWeather(data);
        changeBg(data.weather[0].main)
        }
      );
  }, []);

  // Fetch API everytime search button submitted
  const search = evt => {
    if (evt.key === "Enter") {
      fetch(`${api.base}weather?q=${query}&units=metric&APPID=${api.key}`)
        .then(res => res.json())
        .then(data => {
          if (data.weather[0].main != "undefined") {
            changeBg(data.weather[0].main)
          }
          setSavedQuery(query)
          setWeather(data);
          setQuery("");
        });
    }
  }

  // Toggle background based on weather
  const changeBg = (main) => {
    switch(main) {
      case "Thunderstorm":
        setBg(`w-full h-screen bg-[url("/assets/thunderstorm.jpg")] bg-cover bg-bottom`);
        break;
      case "Drizzle":
        setBg(`w-full h-screen bg-[url("/assets/drizzle.jpg")] bg-cover bg-bottom`);
        break;
      case "Rain":
        setBg(`w-full h-screen bg-[url("/assets/rain.jpg")] bg-cover bg-bottom`);
        break;
      case "Snow":
        setBg(`w-full h-screen bg-[url("/assets/snow.jpg")] bg-cover bg-bottom`);
        break;
      case "Clear":
        setBg(`w-full h-screen bg-[url("/assets/clear.jpg")] bg-cover bg-bottom`);
        break;
      case "Clouds":
        setBg(`w-full h-screen bg-[url("/assets/clouds.jpg")] bg-cover bg-bottom`);
        break;
      default:
        setBg(`w-full h-screen bg-[url("/assets/default.jpg")] bg-cover bg-bottom`);
    }
  }

  const dateBuilder = (d) => {
    let date = d.toDateString()
    return date
  }


  return (
    <div className={bg}>
        <div className="w-full h-full bg-gradient-to-t from-[#222222] pb-14">
          <div className="max-w-[85%] h-full m-auto flex flex-col justify-between">
            {(typeof weather.main != "undefined") 
            ? (
            <WeatherHero location={(weather.name)} temperature={(weather.main.temp)} weather={(weather.weather[0].description)}/>
            ) 
            : (
            <h2 className="text-white text-2xl m-auto">I don`t know where <span className="text-red-700">{savedQuery}</span> is 😔</h2>
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