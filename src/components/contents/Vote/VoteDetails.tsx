import React from 'react'
import { useLocation } from "react-router-dom"
import { Vote } from '../../../Type';

interface state {
  vote: Vote
}
const VoteDetails = () => {
  const location = useLocation();
  const { vote } = location.state as state
  console.log("ここです")
  console.log(vote)
  return (
    <div className='m-3'>
      <div className='flex items-center my-10'>
        <div className='items-center'>
          <img className='w-20 h-20 border-2 rounded-full object-cover' src={"http://127.0.0.1:8000"+vote.user.image} alt="" />
          <h1 className='text-sm text-left'>{vote.user.nickName}</h1>
        </div>
      
        
        <h1 className='text-2xl font-bold mx-3'> {vote.questionText}{vote.questionText}{vote.questionText}{vote.questionText}{vote.questionText}</h1>
         
      </div>

      <div>
        
      </div>
      
      <hr />
      <div>{vote.user.user.id}</div>
    </div>
   
  )
}

export default VoteDetails