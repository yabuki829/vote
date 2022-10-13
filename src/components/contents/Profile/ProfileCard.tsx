import React from 'react'
import { Profile } from '../../../Type'
import profile from "../../../image/profile.png"
const ProfileCard:React.FC<Profile> = (props) => {
  return (
    <div className='flex justify-center items-center px-20 pt-8'>
        <img className='w-24 h-24 border-2 rounded-full object-cover mr-4 shadow' src={props.image ? ("http://127.0.0.1:8000"+props.image) : (profile)} alt="" />
        <div className='px-5'>
          <div className='items-center flex'>
            <h1 className='text-2xl font-bold '>{props.nickName ? (props.nickName):"NoName"}</h1>
          </div>
        </div>
      </div>
  )
}

export default ProfileCard