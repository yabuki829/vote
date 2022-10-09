import React from 'react'
import {Link} from "react-router-dom"
const Status400 = () => {
  return (
    <div className='text-center'>
      <br />
      <h1 className='text-2xl'>Bad Request 400</h1>
      <br />
      <p className='pt-4'>
      </p>
    
      <div className='flex justify-center'>
        <Link to="/" className=' m-10 px-5 py-3 rounded-lg bg-blue-400 text-white text-center'>トップに戻る</Link>
      </div>
    

    
    </div>
  )
}

export default Status400