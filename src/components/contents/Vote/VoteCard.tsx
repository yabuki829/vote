
import React from 'react'
import { Vote } from '../../../Type'
import profile  from "../../../image/profile.png"
import menuIcon from "../../../image/menu.png"
import ReactTooltip from 'react-tooltip'
import ProfileCard from '../Profile/ProfileCard'

const VoteCard:React.FC<Vote> = (props) => {
// const VoteCard:React.FC = () => {
  const { questionText,user,choices} = props
  const imageStyle = "w-10 h-10 border-2 rounded-full object-cover mr-4 shadow"
  console.log("questionText",questionText)

  function handleVote(id:string,text:string){
    alert(text)
  }
  

  return (
    <div className="bg-white border shadow-lg rounded-lg mx-10 my-3 p-3 ">
      {/* 詳細画面に遷移する */}
      <a href="/profile"> 
        <div className='flex justify-between  items-center'>
          <div className='flex items-center '>
            { user.image ? (<img className={imageStyle}  src={user.image} alt="profile" />):(<img className={imageStyle} src={profile} alt="" />) }
            <h1>{user.nickName}</h1>
          </div>
            <img className="w-5 h-5" src={menuIcon} alt="" />
           
        </div>
        
      </a>
      <h1 className=' text-xl font-bold my-5 hover:underline'><a href="">{questionText}</a> </h1>
      <div className='mx-10 '>
        {
          choices.map((choice)=>(
            
            <button onClick={(e) => handleVote(choice.id,choice.text)}  className='border border-gray-300 mb-2 w-full' key={choice.id}>
              <div className='flex justify-between'>
                <h1 className='text-left pl-2 bg-blue-300'>{choice.text}</h1>
                <h1 className='pr-3 text-gray-500'>20%</h1>
              </div>
              
              
            </button>
              
          
            
            
          ))
        }
              
      </div>
        
   

       
     
      
    </div>
  )
}

export default VoteCard