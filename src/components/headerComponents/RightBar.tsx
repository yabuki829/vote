import axios, { AxiosError, AxiosResponse } from 'axios'
import React, { useEffect, useState } from 'react'
import { Cookies, useCookies } from 'react-cookie'
import { Link, useNavigate } from 'react-router-dom'
import { baseURL, instance } from '../../methods/Api'
import { Vote } from '../../Type'
import Footer from "../contents/Footer/Footer"
import SearchInput from './SearchInput'
import profile  from "../../image/profile.png"

const RightBar = () => {
  const [cookies, setCookie, removeCookie] = useCookies()
  const [votes, setVotedData] = useState<Array<Vote>>([])
  const navigate = useNavigate()
  const imageStyle = "w-10 h-10 border-2 rounded-full object-cover mr-4 "
  useEffect(() => {
    getAPIMyUnVotdData()
  },[]);

  // 未投票の投稿を取得する
  function getAPIMyUnVotdData() {
    const token = cookies.token
    instance.get(`vote/?type=unvoted`)
      .then((res: AxiosResponse<Array<Vote>>) => {
        setVotedData(res.data)
      })
      .catch((e: AxiosError<{ error: string }>) => {
        console.log("エラー", e.response?.status)
        switch (e.response?.status) {
          case 401:
            //認証エラー
            break
          case 403:
            break
          default:
            break
        }
      });
  }
  // お知らせをnotionAPIから取得する
  function getAPINews(){

  }

  return (
    
    <div className="top-0 right-0 sticky md:h-full hidden md:block">
      <nav className='  overflow-scroll  w-96 bg-gray-100 md:h-screen md:p-3.5 '>
       
       <SearchInput/>


        <h1 className='text-black font-bold my-3 text-center'>新着の投稿</h1>
        {

          votes.map((vote)=>(
              <div key={vote.id} className='my-2 bg-white p-3 rounded-md'>
                <Link to={"/vote/"+vote.id} >
                  <div className='flex items-center'>
                    { vote.user.image ? (<img className={imageStyle}  src={ "http://127.0.0.1:8000"+vote.user.image} alt="profile" />):(<img className={imageStyle} src={profile} alt="" />) }
                    <h1>{vote.user.nickName}</h1>
                  </div>
                  <h1>{vote.questionText}</h1>
                
                </Link>
              
              </div>
          

           
           
          ))
        }
        <div className='bg-blue-300 h-32 my-8 flex justify-center items-center'>
          <h1 className='text-white font-bold'>広告募集</h1>
        </div>
        <h1 className='text-black font-bold my-5 text-center'>最近のニュース</h1>
        ここにアップデート情報を載せる過去5件
        ここにアップデート情報を載せる過去5件
        ここにアップデート情報を載せる過去5件
        ここにアップデート情報を載せる過去5件
        ここにアップデート情報を載せる過去5件
        ここにアップデート情報を載せる過去5件
        ここにアップデート情報を載せる過去5件
        ここにアップデート情報を載せる過去5件
        ここにアップデート情報を載せる過去5件
        ここにアップデート情報を載せる過去5件
        ここにアップデート情報を載せる過去5件
        ここにアップデート情報を載せる過去5件
        ここにアップデート情報を載せる過去5件
        ここにアップデート情報を載せる過去5件
        ここにアップデート情報を載せる過去5件
        ここにアップデート情報を載せる過去5件
        ここにアップデート情報を載せる過去5件
        ここにアップデート情報を載せる過去5件
        ここにアップデート情報を載せる過去5件
        ここにアップデート情報を載せる過去5件
        ここにアップデート情報を載せる過去5件
        ここにアップデート情報を載せる過去5件
        ここにアップデート情報を載せる過去5件
        ここにアップデート情報を載せる過去5件
        ここにアップデート情報を載せる過去5件
        ここにアップデート情報を載せる過去5件
        ここにアップデート情報を載せる過去5件
        ここにアップデート情報を載せる過去5件
        ここにアップデート情報を載せる過去5件
        ここにアップデート情報を載せる過去5件
        ここにアップデート情報を載せる過去5件
        ここにアップデート情報を載せる過去5件
        ここにアップデート情報を載せる過去5件
        ここにアップデート情報を載せる過去5件
        ここにアップデート情報を載せる過去5件
        ここにアップデート情報を載せる過去5件
        ここにアップデート情報を載せる過去5件
        ここにアップデート情報を載せる過去5件
        ここにアップデート情報を載せる過去5件
        ここにアップデート情報を載せる過去5件
        ここにアップデート情報を載せる過去5件
        ここにアップデート情報を載せる過去5件
        ここにアップデート情報を載せる過去5件
        ここにアップデート情報を載せる過去5件
        ここにアップデート情報を載せる過去5件
        ここにアップデート情報を載せる過去5件
        ここにアップデート情報を載せる過去5件
        ここにアップデート情報を載せる過去5件
        ここにアップデート情報を載せる過去5件
        ここにアップデート情報を載せる過去5件
        ここにアップデート情報を載せる過去5件
        ここにアップデート情報を載せる過去5件
        ここにアップデート情報を載せる過去5件
        ここにアップデート情報を載せる過去5件
        ここにアップデート情報を載せる過去5件
        ここにアップデート情報を載せる過去5件
        ここにアップデート情報を載せる過去5件
        ここにアップデート情報を載せる過去5件
        ここにアップデート情報を載せる過去5件
        ここにアップデート情報を載せる過去5件
        ここにアップデート情報を載せる過去5件
        ここにアップデート情報を載せる過去5件
        ここにアップデート情報を載せる過去5件
        ここにアップデート情報を載せる過去5件
        ここにアップデート情報を載せる過去5件
        ここにアップデート情報を載せる過去5件
        ここにアップデート情報を載せる過去5件
        ここにアップデート情報を載せる過去5件
        ここにアップデート情報を載せる過去5件
        ここにアップデート情報を載せる過去5件
        ここにアップデート情報を載せる過去5件
        ここにアップデート情報を載せる過去5件
        ここにアップデート情報を載せる過去5件
        ここにアップデート情報を載せる過去5件
        ここにアップデート情報を載せる過去5件
        ここにアップデート情報を載せる過去5件
        ここにアップデート情報を載せる過去5件
        ここにアップデート情報を載せる過去5件
        ここにアップデート情報を載せる過去5件
        ここにアップデート情報を載せる過去5件
        ここにアップデート情報を載せる過去5件
        ここにアップデート情報を載せる過去5件
        ここにアップデート情報を載せる過去5件
        ここにアップデート情報を載せる過去5件
        ここにアップデート情報を載せる過去5件
        ここにアップデート情報を載せる過去5件
        ここにアップデート情報を載せる過去5件
        ここにアップデート情報を載せる過去5件
        ここにアップデート情報を載せる過去5件
        ここにアップデート情報を載せる過去5件
        ここにアップデート情報を載せる過去5件
        ここにアップデート情報を載せる過去5件
        ここにアップデート情報を載せる過去5件
        ここにアップデート情報を載せる過去5件
        ここにアップデート情報を載せる過去5件
        ここにアップデート情報を載せる過去5件
        ここにアップデート情報を載せる過去5件
        ここにアップデート情報を載せる過去5件
        ここにアップデート情報を載せる過去5件
        ここにアップデート情報を載せる過去5件
        ここにアップデート情報を載せる過去5件
        ここにアップデート情報を載せる過去5件
        ここにアップデート情報を載せる過去5件
        ここにアップデート情報を載せる過去5件
        ここにアップデート情報を載せる過去5件
        ここにアップデート情報を載せる過去5件
        ここにアップデート情報を載せる過去5件
        ここにアップデート情報を載せる過去5件
        ここにアップデート情報を載せる過去5件
        ここにアップデート情報を載せる過去5件
        ここにアップデート情報を載せる過去5件
        ここにアップデート情報を載せる過去5件
        ここにアップデート情報を載せる過去5件
        ここにアップデート情報を載せる過去5件
        ここにアップデート情報を載せる過去5件
        ここにアップデート情報を載せる過去5件
        ここにアップデート情報を載せる過去5件
        ここにアップデート情報を載せる過去5件
        ここにアップデート情報を載せる過去5件
        ここにアップデート情報を載せる過去5件
        ここにアップデート情報を載せる過去5件
        ここにアップデート情報を載せる過去5件
        ここにアップデート情報を載せる過去5件
        ここにアップデート情報を載せる過去5件
        ここにアップデート情報を載せる過去5件
        ここにアップデート情報を載せる過去5件
        ここにアップデート情報を載せる過去5件
        ここにアップデート情報を載せる過去5件
        ここにアップデート情報を載せる過去5件
        ここにアップデート情報を載せる過去5件
        ここにアップデート情報を載せる過去5件
        ここにアップデート情報を載せる過去5件
        ここにアップデート情報を載せる過去5件
        ここにアップデート情報を載せる過去5件
        ここにアップデート情報を載せる過去5件
        ここにアップデート情報を載せる過去5件
        ここにアップデート情報を載せる過去5件
        ここにアップデート情報を載せる過去5件
        ここにアップデート情報を載せる過去5件
        ここにアップデート情報を載せる過去5件
        ここにアップデート情報を載せる過去5件
        ここにアップデート情報を載せる過去5件
        ここにアップデート情報を載せる過去5件
        ここにアップデート情報を載せる過去5件
        ここにアップデート情報を載せる過去5件
        ここにアップデート情報を載せる過去5件
        ここにアップデート情報を載せる過去5件
        ここにアップデート情報を載せる過去5件
        ここにアップデート情報を載せる過去5件
        ここにアップデート情報を載せる過去5件
        ここにアップデート情報を載せる過去5件
        ここにアップデート情報を載せる過去5件
        ここにアップデート情報を載せる過去5件
        ここにアップデート情報を載せる過去5件
        ここにアップデート情報を載せる過去5件
        ここにアップデート情報を載せる過去5件
        ここにアップデート情報を載せる過去5件
        ここにアップデート情報を載せる過去5件
        ここにアップデート情報を載せる過去5件
        ここにアップデート情報を載せる過去5件
        ここにアップデート情報を載せる過去5件
        ここにアップデート情報を載せる過去5件
        ここにアップデート情報を載せる過去5件
        ここにアップデート情報を載せる過去5件
        ここにアップデート情報を載せる過去5件
        ここにアップデート情報を載せる過去5件
        ここにアップデート情報を載せる過去5件
        ここにアップデート情報を載せる過去5件
        ここにアップデート情報を載せる過去5件
        ここにアップデート情報を載せる過去5件
        ここにアップデート情報を載せる過去5件
        ここにアップデート情報を載せる過去5件
        ここにアップデート情報を載せる過去5件
        ここにアップデート情報を載せる過去5件
        ここにアップデート情報を載せる過去5件
        ここにアップデート情報を載せる過去5件
        ここにアップデート情報を載せる過去5件
        ここにアップデート情報を載せる過去5件
        ここにアップデート情報を載せる過去5件
        ここにアップデート情報を載せる過去5件
        ここにアップデート情報を載せる過去5件
        ここにアップデート情報を載せる過去5件
        ここにアップデート情報を載せる過去5件
        ここにアップデート情報を載せる過去5件
        ここにアップデート情報を載せる過去5件
        ここにアップデート情報を載せる過去5件
        ここにアップデート情報を載せる過去5件
        ここにアップデート情報を載せる過去5件
        ここにアップデート情報を載せる過去5件
        ここにアップデート情報を載せる過去5件
        ここにアップデート情報を載せる過去5件
        ここにアップデート情報を載せる過去5件
        ここにアップデート情報を載せる過去5件
        ここにアップデート情報を載せる過去5件
        ここにアップデート情報を載せる過去5件
        ここにアップデート情報を載せる過去5件
        ここにアップデート情報を載せる過去5件
        ここにアップデート情報を載せる過去5件
        ここにアップデート情報を載せる過去5件
        ここにアップデート情報を載せる過去5件
      
        <div className='my-10'>
          <Footer/>
        </div>
       
      </nav>
      
    </div>

  )
}

export default RightBar