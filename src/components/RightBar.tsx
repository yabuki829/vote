import React from 'react'
import SearchInput from './headerComponents/SearchInput'
const RightBar = () => {
  return (
    <nav className='  overflow-scroll  w-96 bg-gray-200 text-white md:h-screen md:p-3 '>
       <SearchInput/>
        <div className='mt-5 h-96 bg-orange-300'><h1>a</h1></div>
        <div className=' h-96 bg-blue-200'><h1>b</h1></div>
        <div className=' h-96 bg-red-300'><h1>c</h1></div>
       
    </nav>
  )
}

export default RightBar