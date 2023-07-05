import React, { useState } from 'react'
import { useNavigate,Route,Routes,Link} from "react-router-dom"
import { useCookies } from "react-cookie";
import arrowleft  from "../../image/arrowleft.png"
import { useLocation } from 'react-router-dom'
import SearchInput from './SearchInput';
import { instance } from '../../methods/Api';
const Header:React.FC = () => {
  const [cookies, setCookie, removeCookie] = useCookies()
  const navigate = useNavigate();

  const search = useLocation().search;
  const query = new URLSearchParams(search);

  const [isLogin,setIsLogin] = useState(false)
  function handleImageTap(){
      navigate("/profile")
  }

  function showloginORLogoutButton(){
    if (cookies.userid != undefined && cookies.nickName != undefined){
      const button = <button className="items-center block font-bold text-gray-800 p-2 mr-2 md:mr-0 bg-gray-200 " onClick={handleLogout}>ログアウト</button>
      return button
    }
    else{
      return <Link to="/login" className="items-center block font-bold text-gray-800 p-2 mr-2 md:mr-0 bg-gray-200 " >ログイン</Link>
    }
    
  }
  
  function handleLogout(){
    // token profileを削除する
    // alert("ログアウトしました")
    instance.post("logout/").then((res)=>{
        
      removeCookie("bio")
      removeCookie("profileimage")
      removeCookie("userid")
      removeCookie("nickName")
      navigate("/login")
      window.location.reload()
     
    })
   
    
   

    
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
              <Route path='/' element={<h1>質問サービスVote</h1>}></Route>
              <Route path='/vote' element={<h1>投票箱</h1> }>
              </Route>
              <Route path='/vote/:id' element={
                <div className='flex items-center'> 
                  <button className='hover:bg-gray-200 rounded-full' onClick={goBack}><img className='w-10 h-10' src={arrowleft} alt="" /></button>
                  <h1>投票箱</h1>
                </div>}>
              </Route>
           

              
              <Route path='tag' element={
                <div className='flex items-center'> 
                  {/* <button className='hover:bg-gray-200 rounded-full' onClick={goBack}><img className='w-10 h-10' src={arrowleft} alt="" /></button> */}
                  <h1>「{query.get('title')}」</h1>
                </div>
              }> </Route>
              <Route path='search' element={
                <div className='flex items-center'>
                  {/* <button className='hover:bg-gray-200 rounded-full' onClick={goBack}><img className='w-10 h-10' src={arrowleft} alt="" /></button> */}
                   <h1>「{query.get('q')}」で検索しました</h1>
                </div>
               
              }> </Route>
             
               <Route path='/thread' element={<h1>新規スレッド</h1>}></Route>
              <Route path='/thread/:id' element={
                <div className='flex items-center'> 
                  <button className='hover:bg-gray-200 rounded-full' onClick={goBack}><img className='w-10 h-10' src={arrowleft} alt="" /></button>
                  <h1>スレッド</h1>
                </div>}>
              </Route>
              <Route path='/contact' element={<h1>お問い合せ</h1>}></Route>
              <Route path='/post' element={<h1>投票を作成する</h1>}></Route>
              <Route path='/profile' element={<h1>プロフィール</h1>}></Route>
              <Route path='/info' element={<h1>使い方</h1>}></Route>
              <Route path='/privacypolicy' element={<h1>プライバシーポリシー</h1>}></Route>
              <Route path='/rule' element={<h1>利用規約</h1>}></Route>
              <Route path="/entry" element={<h1>仮登録が完了しました</h1>}></Route>
              <Route path='/activate/:id/:id' element={<h1>本登録が完了しました</h1>}></Route>

              <Route path='/profile/:id' element={
                 <div className='flex items-center'> 
                  {/* <button className='hover:bg-gray-200 rounded-full' onClick={goBack}><img className='w-10 h-10' src={arrowleft} alt="" /></button> */}
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
        <div className='flex items-center'>
          <Routes>
            <Route path='/' element={
              <>
                {/* <button className='hover:bg-gray-200 rounded-full block md:hidden' onClick={goBack}><img className='w-10 h-10' src={arrowleft} alt="" /></button> */}
                <h1 className=' font-bold m-5 block md:hidden'>質問サービスVote</h1>
              </>
            }></Route>
            <Route path='/vote/:id' element={
              <div>
                <button className='hover:bg-gray-200 rounded-full block md:hidden m-1' onClick={goBack}><img className='w-10 h-10' src={arrowleft} alt="" /></button>
              </div>
            }></Route>
            <Route path='/info' element={<h1 className='font-bold m-5 block md:hidden'>使い方</h1>}></Route>
            <Route path='/post' element={<h1 className='font-bold m-5 block md:hidden'>投稿する</h1>}></Route>
            <Route path='/thread' element={<h1 className='font-bold m-5 block md:hidden'>新規スレッド</h1>}></Route>
            <Route path='search' element={<h1 className='font-bold m-5 block md:hidden'>検索</h1> }> </Route>
          </Routes>
         
        </div>
      
      
       {showloginORLogoutButton()}
      </header>
    
     
    </div>
    
    
  )
}

export default Header