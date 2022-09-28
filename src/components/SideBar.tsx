import React from 'react'
import {useNavigate,Link} from "react-router-dom"


const SideBar: React.FC = () => {
  const navigate = useNavigate();
  function handleTapPostButton(){
    //ログイン済みであれば Post画面に遷移する
    navigate("/post")
    //未ログインであれば　login画面に遷移する

  }
  console.log("SideBar")
  return (
   
      <nav className='w-52 bg-indigo-900 text-white h-screen md:p-4 '>
        <h1 className='font-bold text-2xl sm:text-3xl '>Vote</h1>
        <ul className='mt-10 flex-grow'>
          <li>
            <Link to="/" className='block px-4 py-2 hover:bg-indigo-700 rounded-md'>ホーム</Link>
          </li>
          <li>
            <Link to="/thread" className='block px-4 py-2 hover:bg-indigo-700 rounded-md'>スレッド</Link>
            
          </li>
          <li>
            <Link to="/profile" className='block px-4 py-2 hover:bg-indigo-700 rounded-md'>プロフィール</Link>
            
          </li>
          <li>
            <Link to="/contact" className='block px-4 py-2 hover:bg-indigo-700 rounded-md' >お問い合せ</Link>
            
          </li>
          <li className='bg-blue-400 hover:bg-blue-300 text-center mt-10 p-5 rounded'>
            <Link to="/post">質問を作成する</Link>
          </li>
        </ul>
      </nav>
   
  )
}

export default SideBar