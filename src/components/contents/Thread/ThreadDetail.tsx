import React from 'react'
import { useNavigate} from "react-router-dom"
import arrowleft  from "../../../image/arrowleft.png"
const ThreadDetail = () => {
  const navigate = useNavigate()
  function goBack(){
    navigate(-1)
  }
  return (
    <div>
        <button className='hover:bg-gray-200 rounded-full' onClick={goBack}><img className='w-10 h-10' src={arrowleft} alt="" /></button>
        <div>スレッド詳細画面</div>
    </div>
   
  )
}

export default ThreadDetail
