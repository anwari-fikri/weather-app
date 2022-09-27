import React from 'react'

const SearchBar = ({setQuery, query, search, dateBuilder}) => {
  return (
    <div className='w-full flex flex-col justify-between items-center'>
      <input
        type="text"
        placeholder="Enter a City or a Country..."
        onChange={e => setQuery(e.target.value)}
        value={query}
        onKeyDown={search}
        className="w-[70%] mt-5 border-2 placeholder-gray-200 text-white font-medium bg-transparent border-gray-200 h-10 px-5 rounded-lg text-sm focus:outline-none md:w-[40%]"
      />
      <div className='text-gray-200 pt-1'>{dateBuilder(new Date())}</div>
    </div>
  )
}

export default SearchBar