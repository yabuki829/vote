import React, { useEffect } from 'react'
import { useCookies } from "react-cookie";
import { useNavigate,Link} from "react-router-dom"
import { activate } from '../../../methods/activate';
import { useLocation } from 'react-router-dom'
import { Auth_Login, registerUser } from '../../../methods/Api';

const ActiveUser = () => {
  const location = useLocation();

  function doActive(){
    
    const token = location.pathname.split('/')[3]

    const id = location.pathname.split('/')[2]
    alert(token)
    activate(id,token)
    
  }
  useEffect(() => {
    // 仮登録から本登録に移行させる
    console.log("呼ばれてる？？？")
    doActive()
  }, []);
  return (
    <div className='bg-gray-100 border my-5 md:my-10 mx-5 md:mx-20 p-5'>
      <h1>登録が完了しました。</h1>
      <h1>右上のアイコンからログインができます。</h1>
    </div>
  )
}

export default ActiveUser