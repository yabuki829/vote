import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { User, Vote,Comment } from '../../../Type'
import VoteCard from '../Vote/VoteCard'
import { useCookies } from "react-cookie";
import axios, { AxiosError, AxiosResponse } from 'axios';
import { useNavigate } from "react-router-dom"
import { baseURL } from '../../../methods/Api';
import profile from "../../../image/profile.png"
interface state {
  threadid: string
  vote: Vote
  user: User
  title: string
}
const ThreadDetail = () => {
  const location = useLocation();
  const { vote, user, title, threadid } = location.state as state
  const [comments,setComments] = useState<Array<Comment>>([])
  const [myComment,setMyComment] = useState("")
  const [cookies, setCookie, removeCookie] = useCookies()
  const navigate = useNavigate()
  useEffect(() => {
   fetchAPIThreadCommentData()
  }, []);

  function fetchAPIThreadCommentData(){
    const token = cookies.token
    axios.get(`${baseURL}api/thread/${threadid}/comment`, {
      headers: {
        "Content-Type": "applicaiton/json",
        Authorization: "JWT " + `${token}`
      }
    })
      .then((res: AxiosResponse<Array<Comment>>) => {

        setComments(res.data)

      })
      .catch((e: AxiosError<{ error: string }>) => {
        console.log("エラー", e.response?.status)
        switch (e.response?.status) {

          case 401:
            //認証エラー
            navigate("/login")
            break
          case 403:
            break
          default:
            break
        }
      });
  }

  function handlePOSTComment() {

    const token = cookies.token
    const data = {text:myComment}
    axios.post(`${baseURL}api/thread/${threadid}/comment`,data , {
      headers: {
        "Content-Type": "application/json",
        Authorization: "JWT " + `${token}`
      }
    })
      .then((res: AxiosResponse<Array<Comment>>) => {

        setComments(res.data)
        setMyComment("")

      })
  }

  let commentCountText
  if (comments.length === 0) {
    commentCountText = "コメントはまだありません"
  }
  else {
    commentCountText = comments.length + "件のコメント"
  }
  return (
    <div className='my-5'>
      <div className='mx-3'>
        <h1 className='text-2xl font-bold'>{title}</h1>
      </div>
      <VoteCard id={vote.id} user={{
        id: vote.user.id,
        nickName: vote.user.nickName,
        user: {
          id: vote.user.user.id
        },
        createdAt: vote.user.createdAt,
        image: vote.image
      }} questionText={vote.questionText} createdAt={vote.createdAt} image={vote.image} isOnlyLoginUser={false} choices={vote.choices} numberOfVotes={vote.numberOfVotes} />

      <div >
        <div className='p-2 flex'>
          <img className=' w-5 h-5 text-sm  md:w-10 md:h-10 md:text-base  border-2 rounded-full object-cover' src={cookies.profileimage ? ("http://127.0.0.1:8000"+ cookies.profileimage):(profile)} alt="" />
          <textarea onChange={(e) => setMyComment(e.target.value)} value={myComment} className='p-2 border w-full mx-5' placeholder='コメント' ></textarea>
        
        </div>
        <div className='m-2 flex justify-end '>
          <button className=' py-2 px-2  ' >キャンセル</button>
          <button onClick={handlePOSTComment} className='bg-blue-300 text-white font-bold px-3 py-2 m-5 cursor-pointer hover:bg-blue-400' >コメント</button>
        </div>
        
      </div>
      <h1 className='ml-3'>{commentCountText}</h1>
      <hr />
      <div>
        {
           comments.map((comment) => (
            <div className='p-3'>
              <div className='flex items-center'>
                <img className='w-5 h-5 text-sm  md:w-10 md:h-10 md:text-base  border-2 rounded-full object-cover' src={comment.user.image ?("http://127.0.0.1:8000" + comment.user.image) :(profile)} alt="" />
                <h1 className='mx-3'>{comment.user.nickName}</h1>
              </div>
              <h1 className='mb-2'>{comment.text}</h1>
              <hr />
            </div>
          ))
        }
      </div>
    </div>
    

  )
}

export default ThreadDetail
