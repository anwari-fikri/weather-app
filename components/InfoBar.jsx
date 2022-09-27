import React from 'react'

const InfoBar = ({humidity="- ", pressure="- ", windSpeed="- "}) => {
  return (
    <div className='mx-auto first-line:border-[1px] py-2 border-gray-200 rounded-md flex justify-evenly bg-white bg-opacity-10 md:max-w-[60%]'>
      <div className='text-white flex flex-col items-center'>
        <h3 className='text-base font-normal'>{humidity}%</h3>
        <h4 className='text-xs font-extralight'>Humidity</h4>
      </div>
      <div className='text-white flex flex-col items-center'>
        <h3 className='text-base font-normal'>{(pressure)}hPa</h3>
        <h4 className='text-xs font-extralight'>Pressure</h4>
      </div>
      <div className='text-white flex flex-col items-center'>
        <h3 className='text-base font-normal'>{(windSpeed)}m/s</h3>
        <h4 className='text-xs font-extralight'>Wind Speed</h4>
      </div>
    </div>
  )
}

export default InfoBar