import React, { useEffect, useState } from 'react'
import { useCookies } from 'react-cookie'
import { useNavigate } from 'react-router-dom'
import profile from "../../../image/profile.png"
const EditProfile = () => {
 function handleEdit(){
  alert("Edit")
 }
  const [cookies] = useCookies()
  const navigate = useNavigate()
  const [image,setProfileImage] = useState<string>()
  const [imageError,setError] = useState(false)
  const [nickName,setNickName] = useState("")
  const [produce,setProduce] = useState("")
  const [job,setJob] = useState("")


  useEffect(() => {
    //profileを取得もしくは、前の画面からprofileを取得しておく
    
  }, [image]);

  function imageHandler(e:React.ChangeEvent<HTMLInputElement>){
    const selected = e.target.files![0]
    
    const ALLOWT_YPES = ["image/png","image/jpeg","image/jpg"]
    if (selected && ALLOWT_YPES.includes(selected.type)){
      let reader = new FileReader()
      reader.onloadend = () => {
        
        setProfileImage(reader.result as string)
      } 
      reader.readAsDataURL(selected)
    }else{
      alert("サポートしていない画像ファイルです")
      return
    }
  }
  return (
    <div>
      <div className='flex justify-center my-5 w-4/5 mx-auto'>
          <div className=' w-full'>
            <div className='flex justify-center'>
              <img className='border rounded-full object-cover  w-20 h-20' src={image ? (image) :("http://127.0.0.1:8000"+cookies.profileimage) ? ("http://127.0.0.1:8000"+cookies.profileimage):(profile)} alt="" />
              {/* <img className='border rounded-full object-cover  w-20 h-20' src={image} alt="" /> */}
            </div>
            
            <div className='mx-10'>  
            <div className='items-center pb-5  '>
                <label className="">プロフィール画像</label>
                <input onChange={(e)=> imageHandler(e)}  type="file" accept="image/*"  id="text" className="w-full shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm  focus:ring-primary-500 focus:border-primary-500 block  p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500 dark:shadow-sm-light"/>
              </div>
              <div className='items-center pb-5 '>
                <label className="">名前</label>
                <input onChange={(e)=> setNickName(e.target.value)} value={nickName} type="text" id="text" className="w-full shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm  focus:ring-primary-500 focus:border-primary-500 block  p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500 dark:shadow-sm-light"   />
                
              </div>
              <div className='items-center pb-5 '>
                <label className="">自己紹介</label>
                <textarea  onChange={(e)=> setProduce(e.target.value)} value={produce} id="text" className="w-full shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm  focus:ring-primary-500 focus:border-primary-500 block  p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500 dark:shadow-sm-light"   />
                
              </div>
              <div className='items-center pb-5  '>
                <label className="">職業</label>
                <input onChange={(e)=> setJob(e.target.value)} value={job} type="text" id="text" className="w-full shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm  focus:ring-primary-500 focus:border-primary-500 block  p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500 dark:shadow-sm-light"   />
                
              </div>
            </div>
            <div className='flex justify-end'>
              {/* <input  type="submit" value="編 集" /> */}
              <button onClick={handleEdit} className='mx-3 my-2 px-3 py-2  bg-blue-400 text-white border hover:bg-blue-300'>編 集</button>
            </div>
          </div>
          
        </div>
        
      {/* <form onSubmit={handleEdit} className='py-5'>
        <div className='flex justify-center my-5 w-4/5 mx-auto'>
          <div className=' w-full'>
            <div className='flex justify-center'>
              <img className='border rounded-full object-cover  w-20 h-20' src={profile} alt="" />
              
            </div>
            
            <div className='mx-10'>  
            <div className='items-center pb-5  '>
                <label className="">プロフィール画像</label>
                <input {...register("profileImage")} type="file" accept="image/*"  id="text" className="w-full shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm  focus:ring-primary-500 focus:border-primary-500 block  p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500 dark:shadow-sm-light"/>
              </div>
              <div className='items-center pb-5 '>
                <label className="">名前</label>
                <input {...register("nickName", { required: true, maxLength: 20 })} type="text" id="text" className="w-full shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm  focus:ring-primary-500 focus:border-primary-500 block  p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500 dark:shadow-sm-light"   />
                {errors.nickName?.type === 'required' && <p className='text-gray-600' role="alert">名前を入力してください</p>}
              </div>
              <div className='items-center pb-5 '>
                <label className="">自己紹介</label>
                <textarea {...register("produce", { required: true, maxLength: 20 })}  id="text" className="w-full shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm  focus:ring-primary-500 focus:border-primary-500 block  p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500 dark:shadow-sm-light"   />
                {errors.produce?.type === 'required' && <p className='text-gray-600' role="alert">自己紹介</p>}
              </div>
              <div className='items-center pb-5  '>
                <label className="">職業</label>
                <input {...register("job", { required: true, maxLength: 20 })} type="text" id="text" className="w-full shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm  focus:ring-primary-500 focus:border-primary-500 block  p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500 dark:shadow-sm-light"   />
                {errors.job?.type === 'required' && <p className='text-gray-600' role="alert">職業</p>}
              </div>
            </div>
            <div className='flex justify-end'>
              <input className='mx-3 my-2 px-3 py-2  bg-blue-400 text-white border hover:bg-blue-300' type="submit" value="編 集" />
            </div>
          </div>
          
        </div>
        
       
      
        </form> */}
      </div>
    
  )
  
}

export default EditProfile
