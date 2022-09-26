import React from 'react'
import { Vote } from '../../../Type'



const VoteCard:React.FC<Vote> = (props) => {

// const VoteCard:React.FC = () => {
  const { questionText,user,choices} = props
  console.log("questionText",questionText)
  return (
    <div className="bg-white border shadow-lg rounded-lg mx-10 my-10  ">
      <div className='flex'>
        <h1>質問 :</h1>
        <h1>{questionText}</h1>
      </div>
     
      
      {
        choices.map((choice)=>(
          <p key={choice.id}>{choice.text}</p>
        ))
      }
    </div>
  )
}

export default VoteCard