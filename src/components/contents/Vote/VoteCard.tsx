
import React from 'react'
import { Choice, Profile, Vote } from '../../../Type'
import profile  from "../../../image/profile.png"
import menuIcon from "../../../image/menu.png"
import ReactTooltip from 'react-tooltip'
import ProfileCard from '../Profile/ProfileCard'
import { putAPISelectChoice } from '../../../methods/Api'
import { useCookies } from "react-cookie";


const VoteCard:React.FC<Vote> = (props) => {
  const { questionText,user,choices,id} = props
  const imageStyle = "w-10 h-10 border-2 rounded-full object-cover mr-4 shadow"
  const [cookies, setCookie, removeCookie] = useCookies()
  
  async function  handleVote(choiceID:string,text:string){
    const token = cookies.token  
    console.log("api通信を行います")
    await putAPISelectChoice(choiceID,token,id)
  }
  
  //投票していたら結果を表示する

  function isVoted():boolean{
    //投票済みかどうか確認する
    const userid = cookies.userid
    //props.numberOfVotesに自分のidがあるかどうかを調べる
    for (const userid in props.numberOfVotes) {
      if(userid === userid ){
        return true
        break
      }
    }
   
    return false
  }

  function isChoice(choice:Choice):boolean{
    const userid = cookies.userid
    //　選択肢を選んでいるかどうか確認する
    // props.choicesに自分のidがあるか調べる
    for(const userid in choice.votedUserCount){
      if (userid === userid){
        return true
        break
      }
    } 
    return false
  }


  // isVoted がtrue 投票済み
  // isChoice がtrue 投票した選択肢
  const votedStyle = "absolute  whitespace-nowrap bg-blue-400 bg-opacity-40 text-left"
  //            falseであれば投票してない選択肢
  const votedStyle2 = "absolute  whitespace-nowrap bg-green-400 bg-opacity-40 text-left"

  //         　falseで未投票
  const noVotedStyle =  ""


const aa = "10"


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
      <h1>{isVoted()?("投票済み"):("未投票")}</h1>
        {
          choices.map((choice)=>(
            //もし投稿していたらhover:色変わらない様にする
            <button onClick={(e) => handleVote(choice.id,choice.text)}  className='border border-gray-300 mb-2 w-full' key={choice.id}>
              <div className='flex  justify-between bg-gray-100 hover:bg-gray-300'>
               
                {
                  isVoted() && (
                    isChoice(choice) ?( <div className={votedStyle} style={ {width: "25%" ,color:"transparent"} }>こんな内側まで見ないでよ、えっち</div>) : ( <div className={votedStyle2} style={ {width: "25%" ,color:"transparent"} }>こんな内側まで見ないでよ、えっち</div>)
                  )  
                }
               
                <h1 className='text-left pl-2 '>{choice.text}</h1>
                
                {
                  
                  //投票済みであればその選択肢が％を表示する
                  isVoted() ?(<h1 className='pr-3 text-gray-500'>25%</h1>):(<></>)
                }
                
               
              </div>
            </button>
            
          ))
        }
              
      </div>
      
    </div>
  )
}

export default VoteCard