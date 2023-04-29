import React,{useState} from 'react'
import { useNavigate,Link} from "react-router-dom"
import { useForm, SubmitHandler } from "react-hook-form";
import Footer from '../Footer/Footer';
import { Auth_Login, baseURL, login } from '../../../methods/Api';
import { useCookies } from "react-cookie";
import axios, { AxiosResponse } from 'axios';
import { Profile } from '../../../Type';



const Login:React.FC =  () =>  {
  // token: にjwttokenを保存してる
  const [cookies, setCookie, removeCookie] = useCookies()

  const { register, handleSubmit,formState: { errors } } = useForm<Auth_Login>()
  const navigate = useNavigate()

  const handleLogin: SubmitHandler<Auth_Login> = async data =>{
    //ログインする
    const auth:Auth_Login = {email:data["email"] ,password:data["password"]}
    const result:string = await login(auth)
    setCookie("token",result)
    
    await handleGetProfile(result)
    alert("ホーム画面に移動します")
    // navigate(-1)
    
  };

  async function handleGetProfile(token:string){
    axios.get(`${baseURL}api/profile`,{
      headers: { 
       "Content-Type": "applicaiton/json",
       Authorization: "JWT " + `${token}`
     }
    })
      .then((res:AxiosResponse<Array<Profile>>) => {
        console.log(res.data[0].user.id)
        setCookie("userid",res.data[0].user.id)
      //profileに画像が登録されていればクッキーに保存する
      if(res.data[0].image != ""){
        console.log("画像を保存します")
        setCookie("profileimage",res.data[0].image)
      }
      setCookie("nickName",res.data[0].nickName)
  })
  }
  
  return (
    <div className=" flex justify-center mt-10" >
      <div className='w-2/3 md:w-1/2  bg-gray-400"'>
        <div className='flex justify-center'>
          <h1 className='text-2xl font-bold underline'>ログイン </h1>
        </div>
        
        <form onSubmit={handleSubmit(handleLogin)} className='py-5 ' action="">
          <div className='items-center pb-5'>
            <label className="">メールアドレス</label>
            <input {...register("email", { required: true, maxLength: 20 })} type="email" id="email" className="w-full shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm  focus:ring-primary-500 focus:border-primary-500 block  p-2.5 "   />
            {errors.email?.type === 'required' && <p className='text-gray-600' role="alert">メールアドレスを入力してください</p>}
          </div>
          <div className='items-center pb-5'>
            <label className=" ">パスワード</label>
            <input {...register("password", { required: true, maxLength: 20 })}  type="password"  id="password" className="w-full shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm focus:ring-primary-500 focus:border-primary-500 block  p-2.5 "/>
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


