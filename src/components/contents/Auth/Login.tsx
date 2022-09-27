import React from 'react'
import { Link} from "react-router-dom"
const Login = () => {
  return (
    <div className="w-3/4 md:w-2/5  mx-auto p-5 mt-10 bg-gray-100 rounded border-2 border-gray-300 ">
      <h1 className='text-2xl font-bold'>Login</h1>
      <form className='py-5' action="">
        <div className='items-center pb-5'>
          <p className="">名前 </p>
          <input type="name" id="name" className="w-full shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block  p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500 dark:shadow-sm-light" placeholder="名前"  />
        </div>
        <div className='items-center pb-5'>
          <p className=" ">メールアドレス</p>
          <input type="name" id="name" className="w-full shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block  p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500 dark:shadow-sm-light" placeholder="名前"  />
        </div>
        <div className='items-center pb-5'>
          <p className=" ">パスワード</p>
          <input type="name" id="name" className="w-full shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block  p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500 dark:shadow-sm-light" placeholder="名前"  />
        </div>
      </form>
      <div className='flex justify-center'>
        <button className='bg-blue-400 text-white text-center px-5 py-3 rounded hover:bg-blue-300'>ログイン</button>
      </div>
      <div className='text-center py-3'>
        <Link to="/register" className='text-blue-600 '>アカウントをお持ちでない方</Link>
      </div>
     
    </div>
  )
}

export default Login