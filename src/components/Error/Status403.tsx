import React from 'react'
import {Link} from "react-router-dom"
const Status403 = () => {
  return (
    <div className='text-center'>
      <br />
      <h1 className='text-2xl'>Forbidden 403</h1>
      <br />
      <p className='pt-4'>
      </p>
    
      <div className='flex justify-center'>
        <Link to="/" className=' m-10 px-5 py-3 rounded-lg bg-blue-400 text-white text-center'>トップに戻る</Link>
      </div>
    

    
    </div>
  )
}

export default Status403