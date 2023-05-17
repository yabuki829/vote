import React, { useEffect, useState } from 'react'
import {useNavigate,Link} from "react-router-dom"
import profile from "../../image/profile.png"
import post from "../../image/post.png"
import home from "../../image/home.png"
import search from "../../image/search.png"
const SideBar: React.FC = () => {
  const navigate = useNavigate();

  const [isLogin,setIsLogin] = useState(true)
  // useEffect
  const [isLocation,setIsLocation] = useState("")
  function handleTapPostButton(){

    
    //ログイン済みであれば Post画面に遷移する
    navigate("/post")
    //未ログインであれば　login画面に遷移する

  }
  console.log("SideBar")
  return (
   
      <nav className='w-16 md:w-52 bg-indigo-900 md:text-white h-screen md:p-4 flex md:block flex-col justify-around  md:justify-normal '>
        <h1 className='font-bold text-2xl sm:text-3xl hidden md:block md:my-4'>Vote</h1>
        <div>
          <div>
              <Link to="/" className=''>
                <a className='block px-4 py-2 hover:bg-indigo-700 rounded-md hidden md:block' >ホーム</a>
                <img className='w-full h-full block md:hidden  p-4 mb-2 hover:bg-indigo-700' src={home} alt="" />
              </Link>
              
          </div>
          
          <div>
              <Link to="/search" className=''>
                <img className='w-full w-full block md:hidden  p-4 my-2 hover:bg-indigo-700' src={search} alt="" />
              </Link>
           
          </div>

          <div>
          <Link to="/profile" className=''>
                <a className='block px-4 py-2 hover:bg-indigo-700 rounded-md hidden md:block' >プロフィール</a>
                <img className='w-full w-full block md:hidden  p-4 my-2 hover:bg-indigo-700' src={profile} alt="" />
          </Link>
          
          </div>
        </div>
        <Link  to="/post">
              <div className='bg-blue-400 hover:bg-blue-300 text-center mt-10 p-5 rounded-full m-1 md:rounded '>
                <a className=' hidden md:block' href="">質問を作成する</a>
                 <img className="block md:hidden    " src={post} alt="" />
              </div> 
        </Link>
            
            
      

      </nav>
   
  )
}

export default SideBar