import React from 'react'
import Content from '../Content'

const Profile = () => {
  return (
    <div>  
      <div className='flex justify-center items-center px-20 pt-8'>
        <img className='w-24 h-24 border-2 rounded-full object-cover mr-4 shadow' src="https://images.unsplash.com/photo-1542156822-6924d1a71ace?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60" alt="" />
        <div className='px-5'>
          <div className='items-center flex'>
            <h1 className='text-2xl font-bold '>齋藤飛鳥</h1><span className='text-gray-600 text-base font-extralight pl-2'>@saitouasuka</span>
          </div>
         
          <div className='flex'>
            <a className='text-blue-500 pr-5 hover:underline' href=""><h1 ><span className='pl-1'>0 </span>フォロー</h1></a>
            <a className='text-blue-500 hover:underline' href=""><h1><span className='pl-1'>0</span>フォローワー</h1></a>
          </div>
        </div>
      </div>
      <Content/>
      <Content/>
      <Content/>
      <Content/>
      <Content/>

     
    </div>
  )
}

export default Profile