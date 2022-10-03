import React from 'react'
import { useNavigate,Route,Routes,Link} from "react-router-dom"



const Header:React.FC = () => {
  const navigate = useNavigate();
  const isLogin = false
  function handleImageTap(){
    console.log("profileに遷移します")
    if (isLogin) {
      navigate("/profile")
    }
    else{
      navigate("/login")
    }
    //未ログインのユーザーであればログイン画面に遷移する
    // navigate("/login")
    //ログイン済みであればprofileに遷移する

   
    
  }
  
  return (
    <div className='lg:flex w-full h-16 bg-gray-100 z-10 sticky top-0'>
      <header className='w-full items-center flex justify-between md:mx-3 '>
        {/*  パソコン */}
        <h1 className='text-3xl sm: text-xl font-bold  hidden md:block'>
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
          </Routes>
        </h1>
       
       
        {/* モバイル */}
        <h1 className='text-3xl sm: text-xl font-bold mx-5 md:mx-10 block md:hidden'>Vote</h1>
        {/* <div className='items-center block'> */}
          <button className="items-center block" onClick={handleImageTap}>
            <img className='border-2 rounded-full object-cover mr-4 shadow w-10 h-10' src="https://images.unsplash.com/photo-1542156822-6924d1a71ace?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60" alt="" />
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