import React, { useState } from 'react'
import { useNavigate,Route,Routes,Link} from "react-router-dom"
import { useCookies } from "react-cookie";
import profile  from "../../image/profile.png"
import arrowleft  from "../../image/arrowleft.png"
import { useLocation } from 'react-router-dom'
import SearchInput from './SearchInput';
const Header:React.FC = () => {
  const [cookies, setCookie, removeCookie] = useCookies()
  const navigate = useNavigate();

  const search = useLocation().search;
  const query = new URLSearchParams(search);

  const [isLogin,setIsLogin] = useState(false)
  function handleImageTap(){
      navigate("/profile")
  }
  
  function handleLogout(){
    // token profileを削除する
    alert("ログアウトしました")
    removeCookie("token")
    removeCookie("bio")
    removeCookie("profileimage")
    removeCookie("userid")
    removeCookie("nickName")
    navigate("/login")
  }

  let profileImage
  if (cookies.profileimage === "" || cookies.profileimage === "null" || cookies.profileimage === undefined){
    profileImage = <img className='border-2 rounded-full object-cover pr-4 shadow w-10 h-10' src={profile} alt="" />
  }
  else{
    console.log("登録したProfile")
    const url = "http://127.0.0.1:8000"+cookies.profileimage
    profileImage = <img className='border-2 rounded-full object-cover mr-4 shadow w-10 h-10' src={url} alt="" />
  }
  function goBack(){
    navigate(-1)
  }


  return (
    <div className='lg:flex w-full bg-gray-100 z-10 sticky top-0 md:h-24'>
      <header className='w-full items-center flex justify-between md:mx-3 '>
        {/*  パソコン */}
        <div className='text-3xl sm: text-xl font-bold  hidden md:block'>
        <Routes>
              <Route path='/' element={<h1>投票箱</h1> }>
              </Route>
              <Route path='/vote/:id' element={
                <div className='flex items-center'> 
                  <button className='hover:bg-gray-200 rounded-full' onClick={goBack}><img className='w-10 h-10' src={arrowleft} alt="" /></button>
                  <h1>投票箱</h1>
                </div>}>
              </Route>
              <Route path='/thread/:id' element={ 
                <div className='flex items-center'> 
                  <button className='hover:bg-gray-200 rounded-full' onClick={goBack}><img className='w-10 h-10' src={arrowleft} alt="" /></button>
                  <h1>スレッド</h1>
                </div>}>


                </Route>
                
              <Route path='tag' element={
                <div className='flex items-center'> 
                  <button className='hover:bg-gray-200 rounded-full' onClick={goBack}><img className='w-10 h-10' src={arrowleft} alt="" /></button>
                  <h1>「{query.get('title')}」</h1>
                </div>
              }> </Route>
              <Route path='search' element={
                <div className='flex items-center'>
                  <button className='hover:bg-gray-200 rounded-full' onClick={goBack}><img className='w-10 h-10' src={arrowleft} alt="" /></button>
                   <h1>「{query.get('q')}」で検索しました</h1>
                </div>
               
              }> </Route>
              <Route path='/thread' element={ <h1>スレッド</h1>}> </Route>
              <Route path='/contact' element={<h1>お問い合せ</h1>}></Route>
              <Route path='/post' element={<h1>投票を作成する</h1>}></Route>
              <Route path='/profile' element={<h1>プロフィール</h1>}></Route>
              <Route path='/info' element={<h1>アプリについて</h1>}></Route>
              <Route path='/privacypolicy' element={<h1>プライバシーポリシー</h1>}></Route>
              <Route path='/rule' element={<h1>利用規約</h1>}></Route>
              <Route path="/entry" element={<h1>仮登録が完了しました</h1>}></Route>
              <Route path='/activate/:id/:id' element={<h1>本登録が完了しました</h1>}></Route>

              <Route path='/profile/:id' element={
                 <div className='flex items-center'> 
                  <button className='hover:bg-gray-200 rounded-full' onClick={goBack}><img className='w-10 h-10' src={arrowleft} alt="" /></button>
                  <h1>プロフィール</h1>
               </div>
              }></Route>
              <Route path='/edit/profile' element={ 
              <div className='flex items-center'> 
                  <button className='hover:bg-gray-200 rounded-full' onClick={goBack}><img className='w-10 h-10' src={arrowleft} alt="" /></button>
                  <h1>プロフィール編集</h1>
                </div>}>
              </Route>
          </Routes>
        </div>
       
       
        {/* モバイル */}
        <h1 className='text-3xl sm: text-xl font-bold mx-5 md:mx-10 block md:hidden'>Vote</h1>
        {/* <div className='items-center block'> */}
        { cookies.token ? (
        <button className="items-center block font-bold text-gray-800 p-2 hover:bg-gray-200 " onClick={handleLogout}>
          Logout
        </button>):(
          <Link to="/login" className="items-center block font-bold text-gray-800 p-2 hover:bg-gray-200 " >Login</Link>
        )}
      </header>
      <SearchInput/>
    </div>
    
    
  )
}

export default Header