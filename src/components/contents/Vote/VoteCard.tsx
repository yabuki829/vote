
import React from 'react'
import { Vote } from '../../../Type'
import profile  from "../../../image/profile.png"
import menuIcon from "../../../image/menu.png"
import ReactTooltip from 'react-tooltip'
import ProfileCard from '../Profile/ProfileCard'
import { putAPISelectChoice } from '../../../methods/Api'
import { useCookies } from "react-cookie";


const VoteCard:React.FC<Vote> = (props) => {
  const { questionText,user,choices} = props
  const imageStyle = "w-10 h-10 border-2 rounded-full object-cover mr-4 shadow"
  const [cookies, setCookie, removeCookie] = useCookies()
  
  async function  handleVote(id:string,text:string){
    const token = cookies.token  
    console.log("api通信を行います")
    await putAPISelectChoice(id,token,"efeifeifje")
  }
  
  //投票していたら結果を表示する

  function isVoted():boolean{
    //投票済みかどうか確認する
    //props.numberOfVotesに自分のidがあるかどうかを調べる
    
    
    return false
  }

  function isChoiced():boolean{
    //　選択肢を選んでいるかどうか確認する
    // props.choicesに自分のidがあるか調べる
    return false
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
            //もし投稿していたらhover:色変わらない様にする
            <button onClick={(e) => handleVote(choice.id,choice.text)}  className='border border-gray-300 mb-2 w-full' key={choice.id}>
              <div className='flex relative justify-between hover:bg-gray-300'>
                {/* <h1 style={ {color: 'red'} }></h1>width:70%; */}
                <div className='absolute bg-blue-400 bg-opacity-40 text-left whitespace-nowrap' style={ {width:"25%",color:"transparent"} }>こんな内側まで見ないでよ、えっち</div>
                <h1 className='text-left pl-2 '>{choice.text}</h1>

                <h1 className='pr-3 text-gray-500'>25%</h1>
               
              </div>
            </button>
            
          ))
        }
              
      </div>
      
    </div>
  )
}

export default VoteCard