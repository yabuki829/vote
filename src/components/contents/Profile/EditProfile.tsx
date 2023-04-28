import axios, { AxiosResponse } from 'axios'
import React, { useEffect, useState } from 'react'
import { useCookies } from 'react-cookie'
import { useNavigate } from 'react-router-dom'
import profile from "../../../image/profile.png"
import { baseURL, Change_Profile, Change_Profile_without_image } from '../../../methods/Api'
import { Profile } from '../../../Type'

const EditProfile = () => {
  const [cookies,setCookie] = useCookies()
  const navigate = useNavigate()
  const [profileimage,setProfileImage] = useState<string>()
  const [imageFile,setImageFile] = useState<File>()
  const [username,setNickName] = useState("")
  const [bio,setBio] = useState("")
  const [job,setJob] = useState("")

 
  useEffect(() => {
    setNickName(cookies.nickName)
    setBio(cookies.bio)
  }, []);

 function handleEdit(){
  if (imageFile === null  || imageFile === undefined){
    const token = cookies.token
    const data:Change_Profile_without_image = {
      nickName: username,
      bio: bio,
      isImageNone: true
    }
    putAPIChangeProfile(token,data)
    navigate("/profile")
  }
  else{
    const token = cookies.token
    const data:Change_Profile = {
      nickName: username,
      profileImage: imageFile as File,
      bio: bio,
      isImageNone: false
    }
    putAPIChangeProfile(token,data)
    navigate("/profile")
  }
  
 }
  async function putAPIChangeProfile(token:string,data:Change_Profile|Change_Profile_without_image ){
    let url = `${baseURL}api/profile/`
    if (data.isImageNone) {
      url = `${baseURL}api/profile/?type=none`
    }
    await axios.put(url,data,{
    headers: {
      "Content-Type": "multipart/form-data",
      Authorization: "JWT " + `${token}`
    }
   }).then((res:AxiosResponse<Array<Profile>>) => {
      setCookie("profileimage", res.data[0].image)
      setCookie("nickName",data.nickName)
      setCookie("bio",data.bio)
    })
  } 
  


  function imageHandler(e:React.ChangeEvent<HTMLInputElement>){
    const selected = e.target.files![0]
    setImageFile(e.target.files![0])
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

  function tapImage(){
    alert("tap")
  }
  return (
    <div>
      <div className='flex justify-center my-5 w-4/5 mx-auto'>
          <div className=' w-full'>
            <div className='flex justify-center'>
              <img onClick={tapImage} className='border rounded-full object-cover  w-20 h-20' src={profileimage ? (profileimage) :("http://127.0.0.1:8000"+cookies.profileimage) ? ("http://127.0.0.1:8000"+cookies.profileimage):(profile)} alt="" />
            
            </div>
            
            <div className='mx-10'>  
            <div className='items-center pb-5  '>
                <label className="">新しいプロフィール画像</label>
                <input  onChange={(e)=> imageHandler(e)}  type="file" accept="image/*"  id="text" className="w-full shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm  focus:ring-primary-500 focus:border-primary-500 block  p-2.5 "/>
              </div>
              <div className='items-center pb-5 '>
                <label className="">名前</label>
                <input onChange={(e)=> setNickName(e.target.value)} value={username} type="text" id="text" className="w-full shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm  focus:ring-primary-500 focus:border-primary-500 block  p-2.5 "   />
                
              </div>
              <div className='items-center pb-5 '>
                <label className="">自己紹介</label>
                <textarea  onChange={(e)=> setBio(e.target.value)} value={bio} id="text" className="w-full shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm  focus:ring-primary-500 focus:border-primary-500 block  p-2.5  "   />
              </div>
             
            </div>
            <div className='flex justify-center'>
              {/* <input  type="submit" value="編 集" /> */}
              <button onClick={handleEdit} className='mx-3 my-2 px-3 py-2  bg-blue-400 text-white border hover:bg-blue-300'>編 集</button>
            </div>
          </div>
          
        </div>
        
      </div>
    
  )
  
}

export default EditProfile
