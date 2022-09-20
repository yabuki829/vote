import React from 'react'
import {BrowserRouter as Router, Route,Routes,Link} from "react-router-dom"



const Header:React.FC = () => {
  
  
  return (
    <div className='lg:flex w-full h-16 bg-gray-100 sticky top-0'>
      <header className='items-center flex'>
        {/*  パソコン */}
        <h1 className='text-3xl sm: text-xl font-bold md:mx-10 hidden md:block'>
          <Routes>
              <Route path='/' element={<h1>投票箱</h1> }>
              </Route>
              <Route path='/thread' element={ <h1>スレッド</h1>}>
              </Route>
              <Route path='/contact' element={<h1>お問い合せ</h1>}>
              </Route>
              <Route path='/post' element={<h1>投票を作成する</h1>}>
              </Route>
              <Route path='/profile' element={<h1>プロフィール</h1>}>
              </Route>
              <Route path='/*' element={<h1>404: Not Found</h1>}>
              </Route>
          </Routes>
         
        </h1>
        {/* モバイル */}
        <h1 className='text-3xl sm: text-xl font-bold md:mx-10 block md:hidden'>Vote</h1>
      

      </header>
      
      
      <div className='visible md:invisible bg-indigo-400 '>
        <ul className='flex  text-white'>
          <li>
            <Link to="/" className='block px-4 py-2 hover:bg-indigo-700 rounded-md '>ホーム</Link>
          </li>
          <li>
            <Link to="/thread" className='block px-4 py-2 hover:bg-indigo-700 rounded-md '>スレッド</Link>
          </li>
          <li>
            <Link to="/contact" className='block px-4 py-2 hover:bg-indigo-700 rounded-md' >お問合せ</Link>
          </li>
        </ul>
      </div>
    </div>
    
    
  )
}

export default Header