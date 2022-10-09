import React from 'react'
import { useLocation } from 'react-router-dom'
import { User, Vote } from '../../../Type'
import VoteCard from '../Vote/VoteCard'
import { useCookies } from "react-cookie";
interface state {
  threadid: string
  vote: Vote
  user: User
  title: string
}
const ThreadDetail = () => {
  const location = useLocation();
  const { vote, user, title, threadid } = location.state as state
  const [cookies, setCookie, removeCookie] = useCookies()
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
          <img className=' w-5 h-5 text-sm  md:w-10 md:h-10 md:text-base  border-2 rounded-full object-cover' src={"http://127.0.0.1:8000"+ cookies.profileimage} alt="" />
          <textarea className='p-2 border w-full mx-5' placeholder='コメント' ></textarea>
        
        </div>
        <div className='m-2 flex justify-end '>
          <button className=' py-2 px-2  ' >キャンセル</button>
          <button className='bg-blue-300 text-white font-bold px-3 py-2 m-5 cursor-pointer hover:bg-blue-400' >コメント</button>
        </div>
      </div>
    </div>

  )
}

export default ThreadDetail
