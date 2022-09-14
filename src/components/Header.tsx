import React from 'react'




const Header:React.FC = () => {
  
  
  return (
    <div className='lg:flex w-full h-16 bg-gray-100 sticky top-0'>
      <header className='items-center flex'>
        {/*  パソコン */}
        <h1 className='text-3xl sm: text-xl font-bold md:mx-10 hidden md:block'>投票アプリ</h1>
        {/* モバイル */}
        <h1 className='text-3xl sm: text-xl font-bold md:mx-10 block md:hidden'>Vote</h1>
      

      </header>
      
      
      <div className='visible md:invisible bg-indigo-400 '>
        <ul className='flex  text-white'>
          <li>
            <a href="" className='block px-4 py-2 hover:bg-indigo-700 rounded-md '>ホーム</a>
          </li>
          <li>
            <a href="" className='block px-4 py-2 hover:bg-indigo-700 rounded-md'>投票箱</a>
          </li>
          <li>
            <a href="" className='block px-4 py-2 hover:bg-indigo-700 rounded-md'>スレッド</a>
          </li>
          
        </ul>
      </div>
    </div>
    
    
  )
}

export default Header