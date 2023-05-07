import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const SearchInput = () => {
  const [searchText,setSearchText] = useState("")
  const navigate = useNavigate()
  function handleSearch(){

    navigate(`/search?q=${searchText}`)
  }

  function handleChangeSearchText(e){
   
    setSearchText(e.target.value)
  }
  return (
    
      <div  className='flex w-5/6 mx-auto'>
            
        <input onKeyPress={handleSearch} onChange={(e)=>handleChangeSearchText(e)} className='w-full px-2 border rounded-full ' type="text" placeholder='検索' value={searchText} />
        <button onClick={handleSearch} className='bg-blue-400 p-2 text-white ml-2 '>
              
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4  rounded-full">
            <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
          </svg>
          </button>
      </div>
    
  )
}

export default SearchInput