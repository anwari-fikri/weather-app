import React from 'react'

const WeatherHero = ({location, temperature, weather}) => {
  return (
    <div className='md: m-auto'>
      <h2 className='text-white text-2xl font-medium md:text-4xl'>{location}</h2>
      <div>
        <h1 className='text-white text-9xl font-medium lg:text-[256px] md:text-[192px]'>
          {Math.round(temperature)}°
        </h1>
        <h3 className='text-white text-lg font-light md:text-xl'>
          {weather}
        </h3>
      </div>
    </div>
  )
}

export default WeatherHero