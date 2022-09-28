import React,{useState} from 'react'
import { useNavigate,Route,Routes,Link} from "react-router-dom"
import { useForm, SubmitHandler } from "react-hook-form";
import Footer from '../Footer/Footer';
import axios from 'axios';
import { Auth_Login, login } from '../../../methods/Api';




const Login:React.FC =  () =>  {
  const { register, handleSubmit,formState: { errors } } = useForm<Auth_Login>();
  const navigate = useNavigate();
  const handleLogin: SubmitHandler<Auth_Login> =async data =>{
    //ログインする
    const auth:Auth_Login = {email:data["email"] ,password:data["password"]}
    const result = await login(auth)
    console.log("ホーム画面に遷移する")
    // axios
    navigate("/")
    // base_url/ api / login/ 
  };

  
  return (
    <div className=" flex justify-center mt-10" >
      <div className='w-1/2 bg-gray-400"'>
        <div className='flex justify-center'>
          <h1 className='text-2xl font-bold'>ログイン</h1>
        </div>
        
        <form onSubmit={handleSubmit(handleLogin)} className='py-5 ' action="">
          <div className='items-center pb-5'>
            <label className="">メールアドレス</label>
            <input {...register("email", { required: true, maxLength: 20 })} type="email" id="email" className="w-full shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm  focus:ring-primary-500 focus:border-primary-500 block  p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500 dark:shadow-sm-light"   />
            {errors.email?.type === 'required' && <p className='text-gray-600' role="alert">メールアドレスを入力してください</p>}
          </div>
          <div className='items-center pb-5'>
            <label className=" ">パスワード</label>
            <input {...register("password", { required: true, maxLength: 20 })}  type="password"  id="password" className="w-full shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm focus:ring-primary-500 focus:border-primary-500 block  p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500 dark:shadow-sm-light"/>
            {errors.password?.type === 'required' && <p className='text-gray-600' role="alert">パスワードを入力してください</p>}
            {/* {errors.password?.type === "minLength" &&  <p className='text-red-600 text-base' role="alert">*8文字以上の半角英数字</p>} */}
            
          </div>
          <div className='flex justify-center'>
            <input className='bg-red-500 text-white font-bold px-8 py-2 m-5 cursor-pointer hover:bg-red-400' type="submit" value="ログイン" />
          </div>
        </form>
        
        <div className='text-center py-3'>
          <Link to="/register" className='text-blue-600 '>アカウントをお持ちでない方</Link>
        </div>
        <div className='mt-10'> 
          <Footer/>
        </div>
        
      </div>
      
    </div>
  )
}

export default Login


