
import React, { useState } from 'react'
import { Choice, Vote ,User} from '../../../Type'
import profile  from "../../../image/profile.png"
import { useCookies } from "react-cookie";
import { Link, useLocation} from "react-router-dom"
import { isNotVotedStyle1, isNotVotedStyle2, isVotedStyle1, isVotedStyle2, votedChoicedStyle, voteNotChoicedStyle } from '../../../styles/VoteStyle'

const VoteCard:React.FC<Vote> = (props) => {
  const { questionText,user,choices } = props
  const imageStyle = "w-10 h-10 border-2 rounded-full object-cover mr-4 "
  const [cookies, setCookie, removeCookie] = useCookies()
  const location = useLocation();


  function isVoted():boolean{
    //投票済みかどうか確認する
    //props.numberOfVotesに自分のidがあるかどうかを調べる
    //あれば投票済み
  
    const myuserid = cookies.userid
    const user_dic  =  props.numberOfVotes

    for (let i = 0; i < user_dic.length; i++) {
    
      if( myuserid === user_dic[i].id ){
        return true
      }
    }
    return false
  }

  function isChoice(choice:Choice):boolean{
    const userid = cookies.userid
    //　選択肢を選んでいるかどうか確認する
    // props.choicesに自分のidがあるか調べる
    const user_dic  =  choice.votedUserCount
    for(let i = 0; i < user_dic.length; i++){
      if (userid === user_dic[i].id ){
        return true

        break
      }
      
    } 
    
    return false
  }

  
 

  const styleBackground = isVoted() ? isVotedStyle1 : isNotVotedStyle1

  const styleChoiceText = isVoted() ? isVotedStyle2 : isNotVotedStyle2

  const numberOfVotes =  props.numberOfVotes.length


  return (
    // <div  className="bg-white border shadow-lg rounded-lg mx-10 my-3 p-3 ">
    <Link to={"/vote/"+props.id} className='hover:bg-gray-100 w-full'>
    <div  className=" mx-10 my-3 ">
      {/* 詳細画面に遷移する */}
        <div className='flex justify-between  items-center '>
          <div className='flex items-center '>
            { user.image ? (<img className={imageStyle}  src={ "http://127.0.0.1:8000"+user.image} alt="profile" />):(<img className={imageStyle} src={profile} alt="" />) }
            <h1 className='a'>{user.nickName}</h1>
          </div>
          <h1>{props.createdAt}</h1>
        </div>
        
      
      <div  className='mx-10'>
            
      <h1 className='my-4'>{questionText}</h1>
        {
          choices.length <= 3 ?(
            choices.map((choice,index)=>(
            
              //もし投稿していたらhover:色変わらない様にする
              <div key={choice.id}>
                <button  className='border border-gray-300 mb-2 w-full' key={choice.id}>
                  <div className={styleBackground}>         
                    <h1 className={styleChoiceText}>{choice.text}</h1>
                    {
                      isVoted() && (
                        isChoice(choice) ?( <div className={votedChoicedStyle} style={ { width: Math.round(choice.votedUserCount.length / numberOfVotes  * 100)+"%" ,color:"transparent"} }>こんな内側まで見ないでよ、えっち</div>) : ( <div className={voteNotChoicedStyle} style={ {width:Math.round(choice.votedUserCount.length / numberOfVotes  * 100)+"%"   ,color:"transparent"} }>こんな内側まで見ないでよ、えっち</div>)
                      )  
                    }
                    {

                      //投票済みであればその選択肢が％を表示する
                    
                      isVoted() ?(
                        <h1 className='pr-3 text-gray-500 absolute right-0'>
                          { Math.round(choice.votedUserCount.length / numberOfVotes  * 100)}%
                        </h1>):(<></>)
                    }
                    
                  
                  </div>
                </button>
              </div>
              
              
            ))
          ):(
             // 選択肢が多い場合は3件のみを表示する
            choices.slice(0, 3).map((choice)=>(
            
              <div key={choice.id}>
                <button  className='border border-gray-300 mb-2 w-full' key={choice.id}>
                  <div className={styleBackground}>         
                    <h1 className={styleChoiceText}>{choice.text}</h1>
                      {
                        isVoted() && (
                          isChoice(choice) ?( <div className={votedChoicedStyle} style={ { width: Math.round(choice.votedUserCount.length / numberOfVotes  * 100)+"%" ,color:"transparent"} }>こんな内側まで見ないでよ、えっち</div>) : ( <div className={voteNotChoicedStyle} style={ {width:Math.round(choice.votedUserCount.length / numberOfVotes  * 100)+"%"   ,color:"transparent"} }>こんな内側まで見ないでよ、えっち</div>)
                        )  
                      }
                      
                    {

                      //投票済みであればその選択肢が％を表示する
                    
                      isVoted() ?(
                        <h1 className='pr-3 text-gray-500 absolute right-0'>
                          { Math.round(choice.votedUserCount.length / numberOfVotes  * 100)}%
                        </h1>):(<></>)
                    }
                    
                  
                  </div>
                </button>
               
              </div>
              
              
            ))
          )
        

        }
        {
          choices.length > 3 &&(
            <h1 className='text-center font-bold text-2xl'>⋮</h1>
          )
        }
        <div className='flex justify-end py-3  '>
          {
            isVoted() ?(
              <h1 className='text-right'>{numberOfVotes}人が投票</h1>):(<></>)
           
          }
        
        </div>
      
      </div>
        
      <hr />
      
    </div>
  </Link>
    // </div>
  )
}

export default VoteCard