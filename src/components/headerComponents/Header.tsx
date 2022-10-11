import React from 'react'
import { useNavigate,Route,Routes,Link} from "react-router-dom"
import { useCookies } from "react-cookie";
import profile  from "../../image/profile.png"
import arrowleft  from "../../image/arrowleft.png"
const Header:React.FC = () => {
  const [cookies, setCookie, removeCookie] = useCookies()
  const navigate = useNavigate();
  const isLogin = false
  
  function handleImageTap(){
      navigate("/profile")
  }
  

  let profileImage
  if (cookies.profileimage === "" || cookies.profileimage === "null" || cookies.profileimage === undefined){
    console.log("デフォルトの画像")
    profileImage = <img className='border-2 rounded-full object-cover mr-4 shadow w-10 h-10' src={profile} alt="" />
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
    <div className='lg:flex w-full h-16 bg-gray-100 z-10 sticky top-0'>
      <header className='w-full items-center flex justify-between md:mx-3 '>
        {/*  パソコン */}
        <h1 className='text-3xl sm: text-xl font-bold  hidden md:block'>
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
                </div>}></Route>
              <Route path='/thread' element={ <h1>スレッド</h1>}> </Route>
              <Route path='/contact' element={<h1>お問い合せ</h1>}></Route>
              <Route path='/post' element={<h1>投票を作成する</h1>}></Route>
              <Route path='/profile' element={<h1>プロフィール</h1>}></Route>
              <Route path='/profile/:id' element={<h1>プロフィール</h1>}></Route>
          </Routes>
        </h1>
       
       
        {/* モバイル */}
        <h1 className='text-3xl sm: text-xl font-bold mx-5 md:mx-10 block md:hidden'>Vote</h1>
        {/* <div className='items-center block'> */}
          <button className="items-center block" onClick={handleImageTap}>
            {  
              //ここでクッキーから画像を取得して表示する
             profileImage

            }
            
            
          </button>
      
       
      </header>
      
      
      <div className='block md:hidden bg-indigo-400 '>
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