import React from 'react'
import { Link} from "react-router-dom"
import Footer from '../Footer/Footer'
const Register = () => {
  return (
    <div className=" flex justify-center mt-10" >
    <div className='w-1/2 bg-gray-400"'>
      <div className='flex justify-center'>
        <h1 className='text-2xl font-bold'>アカウント作成</h1>
      </div>
      
      <form className='py-5 ' action="">
        <div className='items-center pb-5'>
          <label className=" ">名前</label>
          <input type="name" id="name" className="w-full shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm  focus:ring-primary-500 focus:border-primary-500 block  p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500 dark:shadow-sm-light"   />
        </div>
        <div className='items-center pb-5'>
          <label className=" ">メールアドレス</label>
          <input type="email" id="email" className="w-full shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm  focus:ring-primary-500 focus:border-primary-500 block  p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500 dark:shadow-sm-light"   />
        </div>
        <div className='items-center pb-5'>
          <label className=" ">パスワード</label>
          <input type="password" id="password" className="w-full shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm focus:ring-primary-500 focus:border-primary-500 block  p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500 dark:shadow-sm-light"/>
        </div>
        <div className='flex justify-center pt-2'>
          <input  type="checkbox" name="" id="" />
          <Link  to="/terms" className='text-blue-600 pl-2'>利用規約</Link>
        </div>
       
        <div className='flex justify-center'>
          <input className='bg-red-500 text-white font-bold px-8 py-2 m-5 cursor-pointer hover:bg-red-400' type="submit" value="登録する" />
        </div>
      </form>
      
      
      <div className='text-center py-3'>
        <Link to="/login" className='text-blue-600 '>アカウントをお持ちの方</Link>
      </div>
      <div className='mt-10'> 
        <Footer/>
      </div>
    </div>
    
   
  </div>
  )
}

export default Register






