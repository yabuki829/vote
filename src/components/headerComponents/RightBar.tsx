import axios, { AxiosError, AxiosResponse } from 'axios'
import React, { useEffect, useState } from 'react'
import { Cookies, useCookies } from 'react-cookie'
import { Link, useNavigate } from 'react-router-dom'
import { baseURL } from '../../methods/Api'
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
  function getAPIMyUnVotdData() {
    const token = cookies.token
    
    axios.get(`${baseURL}api/vote/?type=unvoted`, {
      headers: {
        "Content-Type": "applicaiton/json",
        Authorization: "JWT " + `${token}`
      }
    })
      .then((res: AxiosResponse<Array<Vote>>) => {
        setVotedData(res.data)
      })
      .catch((e: AxiosError<{ error: string }>) => {
        console.log("エラー", e.response?.status)
        switch (e.response?.status) {
          case 401:
            //認証エラー
            // navigate("/login")
            break
          case 403:

          default:
            break
        }
      });
  }


  return (
    <div className="top-0 right-0 sticky md:h-full hidden md:block">
      <nav className='  overflow-scroll  w-96 bg-gray-100 md:h-screen md:p-3 '>
       
       <SearchInput/>
        <h1 className='text-black font-bold my-5 text-center'>新着の投稿</h1>
        {

          votes.map((vote)=>(
            <>
              <div className='my-2 bg-white p-3 rounded-md'>
                <Link to={"/vote/"+vote.id} >
                  <div className='flex items-center'>
                    { vote.user.image ? (<img className={imageStyle}  src={ "http://127.0.0.1:8000"+vote.user.image} alt="profile" />):(<img className={imageStyle} src={profile} alt="" />) }
                    <h1>{vote.user.nickName}</h1>
                  </div>
                  <h1>{vote.questionText}</h1>
                
                
                </Link>
              
              </div>
              <hr />
            </>

           
           
          ))
        }
      
        <div className='my-10'>
          <Footer/>
        </div>
       
      </nav>
      
    </div>

  )
}

export default RightBar