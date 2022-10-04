import React from 'react'


//propsでvote_idを受け取る
const MenuCard = () => {
  return (
    <div className='absolute bg-white z-10 right-20 border shadow-xl w-32'>
      <div className=' hover:bg-gray-200'>
        <a className='block p-2' href="/thread">スレッド</a>
        
      </div>
      
      <hr />
      <div className='hover:bg-gray-200'>
        <a className='block p-2' href="">共有する</a>
      </div>
      <hr />
      <div className='hover:bg-gray-200'>
        <a className='block p-2' href="">通報する</a>
      </div>
    </div>
  )
}

export default MenuCard



