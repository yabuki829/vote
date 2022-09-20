import React from 'react'
import SearchInput from './SearchInput'

const RightBar = () => {
  console.log("RightBar")
  return (
    <div className="top-0 right-0 sticky md:h-full hidden md:block">
      <nav className='  overflow-scroll  w-96 bg-gray-200 text-white md:h-screen md:p-3 '>
       
       <SearchInput/>
        <h1 className='text-black font-bold my-5 text-center'>おすすめのスレッド</h1>
        <div className=' h-96 bg-orange-300'><h1>a</h1></div>
        <div className=' h-96 bg-blue-200'><h1>b</h1></div>
        <div className=' h-96 bg-red-300'><h1>c</h1></div>
       
      </nav>
    </div>

  )
}

export default RightBar