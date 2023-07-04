import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { User, Vote,Comment, Thread, defaultThread, } from '../../../Type'
import VoteCard from '../Vote/VoteCard'
import { useCookies } from "react-cookie";
import { AxiosError, AxiosResponse } from 'axios';
import { useNavigate } from "react-router-dom"
import { baseURL, instance } from '../../../methods/Api';
import profile from "../../../image/profile.png"

interface state {
  threadid: string
  vote: Vote
  user: User
  title: string
}
const DetailThread = () => {

  const location = useLocation()
  const [comments,setComments] = useState<Array<Comment>>([])
  const [thread,setThread] = useState<Thread>()

  const [myComment,setMyComment] = useState("")
  const [cookies, setCookie, removeCookie] = useCookies()
  const navigate = useNavigate()

  useEffect(() => {
    fetcheAPIThreadData()
    fetchAPIThreadCommentData()
  },[]);

  // -TODO fetcheAPIThreadDataではtokenを付与できているが、
  // fetchAPIThreadCommentDataではtokenを付与できていない
  // サーバー側の問題説が濃厚かな？
  function fetcheAPIThreadData(){
    const thread_id = location.pathname.split('/')[2]
    const url = `thread/${thread_id}/`
    instance.get(url).then((res)=>{
      setThread(res.data[0])
    })
  }
  function fetchAPIThreadCommentData(){
    const thread_id = location.pathname.split('/')[2]
    const url = `thread/${thread_id}/comment/`
    instance.get(url).then((res: AxiosResponse<Array<Comment>>) => {

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

    const data = {text:myComment}
    const thread_id = location.pathname.split('/')[2]
    const url = `thread/${thread_id}/comment/`
    alert(url)
    instance.post(url,data)
    .then((res) => {
        setComments(res.data)
        setMyComment("")
    })
  }

  let commentCountText
  if (comments.length === 0) {
    commentCountText = "最初のコメントをしましょう"
  }
  else {
    commentCountText = comments.length + "件のコメント"
  }

  return (
    <div className='my-5'>
      <div className='flex mx-3 text-2xl font-bold'>
       
        <h1 className=''>{thread?.title}</h1>
      </div>

        {
          thread?.vote ? (
            <div className='border rounded-md  mx-10 my-3 hover:bg-gray-100'>
              <VoteCard id={thread.vote.id} user={thread.vote.user} questionText={thread.vote.questionText} createdAt={thread.vote.createdAt} image={thread.vote.image} isOnlyLoginUser={thread.vote.isOnlyLoginUser} choices={thread.vote.choices} numberOfVotes={thread.vote.numberOfVotes} tags={thread.vote.tags}/> 
            </div>
          ):(<></>)
        }
    

       
      
     
      <h1 className='ml-3'>{commentCountText}</h1>
      <hr />
      <div>
        {
           comments.map((comment) => (
            <div className='p-3'>
              <div className='flex items-center'>
                <img className='w-8 h-8 text-sm  md:w-10 md:h-10 md:text-base  border-2 rounded-full object-cover' src={comment.user.image ?("http://127.0.0.1:8000" + comment.user.image) :(profile)} alt="" />
                <h1 className='mx-3'>{comment.user.nickName}</h1>
              </div>
              <h1 className='mb-2'>{comment.text}</h1>
              <hr />
            </div>
          ))
        }
      </div>
      <br />
      <div >
        <div className='p-2 flex'>
          <img className=' w-8 h-8 text-sm  md:w-10 md:h-10 md:text-base  border-2 rounded-full object-cover' src={cookies.profileimage ? ("http://127.0.0.1:8000"+ cookies.profileimage):(profile)} alt="" />
          <textarea onChange={(e) => setMyComment(e.target.value)} value={myComment} className='p-2 border w-full mx-5' placeholder='コメント' ></textarea>
        
        </div>

        <div className='m-2 flex justify-end '>
          <button className=' py-2 px-2  ' >キャンセル</button>
          <button onClick={handlePOSTComment} className='bg-blue-300 text-white font-bold px-3 py-2 m-5 cursor-pointer hover:bg-blue-400' >コメント</button>
        </div>
        
      </div>
    </div>
  )
}

export default DetailThread