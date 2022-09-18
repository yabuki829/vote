import React from 'react'
import {BrowserRouter,Link} from "react-router-dom"

type Props =  {
  isOpen:boolean
  setSideBarOpen:React.Dispatch<React.SetStateAction<boolean>>;
}
const SideBar: React.FC<Props> = ( props: Props) => {
  function handleOpenSideBar(){
    props.setSideBarOpen((preState) => !preState)
  }
  console.log("SideBar")
  return (
   
      <nav className='w-52 bg-indigo-900 text-white h-screen md:p-4 '>
        <h1 className='font-bold text-2xl sm:text-3xl '>Vote</h1>
        <ul className='mt-10 flex-grow'>
          <li>
            <Link to="/" className='block px-4 py-2 hover:bg-indigo-700 rounded-md'>ホーム</Link>
            {/* // <a href="" className='block px-4 py-2 hover:bg-indigo-700 rounded-md '>ホーム</a> */}
          </li>
          {/* <li>
            <Link to="/" className='block px-4 py-2 hover:bg-indigo-700 rounded-md'>投票箱</Link>
           
          </li> */}
          <li>
            <Link to="/thread" className='block px-4 py-2 hover:bg-indigo-700 rounded-md'>スレッド</Link>
            
          </li>
          <li>
            <Link to="/profile" className='block px-4 py-2 hover:bg-indigo-700 rounded-md'>プロフィール</Link>
            
          </li>
          <li>
            <Link to="/contact" className='block px-4 py-2 hover:bg-indigo-700 rounded-md' >お問い合せ</Link>
            
          </li>
          <li className=' bg-blue-400 text-center mt-10 p-5 rounded'>
            <Link to="/post">投票を作成する</Link>
          </li>
        </ul>
      </nav>
   
  )
}

export default SideBar