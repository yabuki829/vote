import React, { useState } from 'react'
import Footer from '../Footer/Footer'
import { useNavigate,Link} from "react-router-dom"
import { useForm, SubmitHandler } from "react-hook-form";
import { Auth_Login,Auth_Register , instance, registerUser } from '../../../methods/Api';
import { useCookies } from "react-cookie";

type genderButtonType = {
  id:string
  gender:string
  value:number
  required:boolean
}


const Register = () => {
  const [cookies, setCookie, removeCookie] = useCookies()
  const navigate = useNavigate()
  const { register, handleSubmit,formState: { errors } } = useForm<Auth_Register>()
  const [selectedGender, setSelectedGender] = useState("")
  const genderButtons:Array<genderButtonType> = [
    { id: "male", gender: "男性", value: 1, required: true },
    { id: "female", gender: "女性", value: 2, required: false },
  ];

  const handleLogin: SubmitHandler<Auth_Register> = async data =>{
    //アカウント作成
    var gender = 0
    if (selectedGender == "male"){
      gender=1 
    }
    else {
      gender = 2
    }
    const auth:Auth_Register = { email:data["email"] ,password:data["password"],dateOfBirth:data["dateOfBirth"],gender:gender}
    instance.post("register/",auth).then((res)=>{
      setCookie("userid",res.data["id"])
      navigate("/entry")
    })
  };
  const handleGenderChange = (e:React.ChangeEvent<HTMLInputElement>) => {
    
    setSelectedGender(e.target.value); // ラジオボタンの状態を更新
  };

  return (
    <div className=" flex justify-center mt-10" >
    <div className='w-2/3 md:w-1/2  bg-gray-400"'>
      <div className='flex justify-center'>
        <h1 className='text-2xl font-bold underline '>アカウント作成</h1>
      </div>
      
      <form onSubmit={handleSubmit(handleLogin)} className='py-5 ' action="">
        
      
        <div className='items-center pb-5'>
          <label className=" ">メールアドレス</label>
          <input autoComplete="email" {...register("email", { required: true, maxLength: 20 })} type="email" id="email" className="w-full shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm  focus:ring-primary-500 focus:border-primary-500 block  p-2.5 "   />
          {errors.email?.type === 'required' && <p className='text-gray-600' role="alert">メールアドレスが入力されていません</p>}
        </div>
        <div className='items-center pb-5'>
        <label className=" ">パスワード</label>
          <input autoComplete="current-password" {...register("password", { required: true, maxLength: 20 })}  type="password"  id="password" className="w-full shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm focus:ring-primary-500 focus:border-primary-500 block  p-2.5 "/>
          {errors.password?.type === 'required' && <p className='text-gray-600' role="alert">パスワードが入力されていません</p>}
        </div>

        <div className=''>
          <label className=" ">性別</label>
          <div className="flex">
            
            <div className="w-full mx-10">
              <input className="hidden" type="radio" name="central" id="male" value="male" onChange={handleGenderChange} checked={selectedGender === "male"} />
              <label className={`flex flex-col w-full max-w-lg text-center border rounded-2xl border-gray-400 p-2 hover:border-blue-400 hover:bg-blue-200 ${selectedGender === "male" ? "bg-blue-200 " : ""}`} htmlFor="male">
                男性
              </label>
            </div>
            <div className='border-l border border-gray-200' ></div>
          <div className="w-full mx-10">
            <input className="hidden" type="radio" name="central" id="female" value="female" onChange={handleGenderChange} checked={selectedGender === "female"} />
            <label className={`flex flex-col w-full max-w-lg text-center border rounded-2xl border-gray-400 p-2 hover:border-blue-400 hover:bg-blue-200 ${selectedGender === "female" ? "bg-blue-200 " : ""}`} htmlFor="female">
              女性
            </label>
          </div>
        </div>
        
        </div>
        <br />
        <div className='items-center pb-5 w-full'>
          <label className=" ">生年月日</label>
          <input placeholder='例)  1990/12/1 生まれの場合 19901201' {...register("dateOfBirth", { required: true, maxLength: 8 })}  type="number"  id="number" className=" w-full shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm focus:ring-primary-500 focus:border-primary-500 block  p-2.5"/>
          {errors.password?.type === 'required' && <p className='text-gray-600' role="alert">生年月日が入力されていません</p>}
        </div>
        <p className='m-1'>性別と生年月日は、他の利用者に共有されることがあります。</p>
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






