import React from 'react'
import Footer from '../Footer/Footer'
import { useNavigate,Link} from "react-router-dom"
import { useForm, SubmitHandler } from "react-hook-form";
import { Auth_Login, registerUser } from '../../../methods/Api';

const Register = () => {
  const navigate = useNavigate()
  const { register, handleSubmit,formState: { errors } } = useForm<Auth_Login>()
  const handleLogin: SubmitHandler<Auth_Login> = async data =>{
    //ログインする
    const auth:Auth_Login = {email:data["email"] ,password:data["password"]}
    const result = await registerUser(auth)
    // data["username"]

    //proifleを作成する

    navigate("/login")
  };

  return (
    <div className=" flex justify-center mt-10" >
    <div className='w-1/2 bg-gray-400"'>
      <div className='flex justify-center'>
        <h1 className='text-2xl font-bold underline '>アカウント作成</h1>
      </div>
      
      <form onSubmit={handleSubmit(handleLogin)} className='py-5 ' action="">
      
        <div className='items-center pb-5'>
          <label className=" ">メールアドレス</label>
          <input {...register("email", { required: true, maxLength: 20 })} type="email" id="email" className="w-full shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm  focus:ring-primary-500 focus:border-primary-500 block  p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500 dark:shadow-sm-light"   />
          {errors.email?.type === 'required' && <p className='text-gray-600' role="alert">メールアドレスが入力されていません</p>}
        </div>
        <div className='items-center pb-5'>
        <label className=" ">パスワード</label>
          <input {...register("password", { required: true, maxLength: 20 })}  type="password"  id="password" className="w-full shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm focus:ring-primary-500 focus:border-primary-500 block  p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500 dark:shadow-sm-light"/>
          {errors.password?.type === 'required' && <p className='text-gray-600' role="alert">パスワードが入力されていません</p>}
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






