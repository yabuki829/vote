
import React, { useState } from 'react'
import { Choice, Vote ,User} from '../../../Type'
import profile  from "../../../image/profile.png"
import menuIcon from "../../../image/menu.png"
import { putAPISelectChoice } from '../../../methods/Api'
import { useCookies } from "react-cookie";
import MenuCard from './MenuCard'
import { useNavigate,Route,Routes,Link} from "react-router-dom"

const VoteCard:React.FC<Vote> = (props) => {
  const { questionText,user,choices,id} = props
  const imageStyle = "w-10 h-10 border-2 rounded-full object-cover mr-4 "
  const [cookies, setCookie, removeCookie] = useCookies()
  const [voted,setVoted] = useState(isVoted() )
  const [isShownMenuCard,setIsShownMenuCard] = useState(false)

  async function  handleVote(choiceID:string,text:string){
    if (!isVoted()) {
      const token = cookies.token  
      console.log("api通信を行います")
      await putAPISelectChoice(choiceID,token,id)

      const user:User = {id:cookies.userid}
      

      props.numberOfVotes.push(user)
     
      choices.map((choice) => (
        (choice.id === choiceID) ?(choice.votedUserCount.push(user)) :("")
      ))
      // alert("投票完了")
      
      setVoted(true)
    }
    
    
  }

  function handleMenuCard(){
    setIsShownMenuCard(!isShownMenuCard)
  }


  function isVoted():boolean{
    //投票済みかどうか確認する
    //props.numberOfVotesに自分のidがあるかどうかを調べる
    //あれば投票済み
    const myuserid = cookies.userid

    const user_dic  =  props.numberOfVotes
    console.log("-----------------")
    for (let i = 0; i < user_dic.length; i++) {
      console.log(myuserid, "===" ,user_dic[i].id)
      if( myuserid === user_dic[i].id ){
        console.log(questionText,"投票済み")
        return true
        break
      }
    }

    console.log(questionText,"未投票")
    
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


  // TODO リファクタリングしたい


  //選択肢のStyle
    //投票済みの選択済の場合のスタイル
  const votedChoicedStyle = "  whitespace-nowrap bg-blue-300  text-left"
   //投票済みだけど選択してない場合
  const voteNotChoicedStyle2 = "  whitespace-nowrap bg-gray-300 text-left"


  // 投票済みの時ホバーした時に指マークにならないようにするやつ
  const isVotedStyle1 = "flex relative justify-between cursor-default"
  //未投票時にホバーした時色が変わる様にするやつ
  const isNotVotedStyle1 = "flex relative justify-between hover:bg-gray-200 "

  const styleBackground = voted ? isVotedStyle1 : isNotVotedStyle1

  
  //選択肢の上のパーセントを表してる色のやつ?　↓こいつ選択肢のtextにかかってる
  const isVotedStyle2 = " pl-2 bg-opacity-100 absolute"
  const isNotVotedStyle2 = " pl-2 bg-opacity-100 "

  const styleChoiceText = voted ? isVotedStyle2 : isNotVotedStyle2

  const numberOfVotes =  props.numberOfVotes.length


  return (
    <div  className="bg-white border shadow-lg rounded-lg mx-10 my-3 p-3 ">
      {/* 詳細画面に遷移する */}
        <div className='flex justify-between  items-center'>
          <div className='flex items-center '>
            { user.image ? (<img className={imageStyle}  src={ "http://127.0.0.1:8000"+user.image} alt="profile" />):(<img className={imageStyle} src={profile} alt="" />) }
            <h1 className='a'>{user.nickName}</h1>
          </div>


            
            <div className='flex '>
             
              {
                isShownMenuCard ? (<MenuCard/>):(<h1 className='invisible absolute'>こんなところまで見るなんてえっちね</h1>)
              }
              
                <img onClick={handleMenuCard} className=" w-5 h-5 " src={menuIcon} alt="" /> 
            </div>
            
        </div>
        <Link to={"vote/"+props.id} state={{vote:props}} className='hover:bg-gray-100'>
          <h1 className='inline-block text-xl font-bold my-5 hover:underline'>{questionText} </h1>
        </Link>
        
      <div className='mx-10 '>
       
              
     
        {
          
          choices.map((choice)=>(
            //もし投稿していたらhover:色変わらない様にする
            <div key={choice.id}>
              <button  onClick={(e) => handleVote(choice.id,choice.text)}  className='border border-gray-300 mb-2 w-full' key={choice.id}>
                <div className={styleBackground}>         
                  <h1 className={styleChoiceText}>{choice.text}</h1>
                  {
                    voted && (
                      isChoice(choice) ?( <div className={votedChoicedStyle} style={ { width: Math.round(choice.votedUserCount.length / numberOfVotes  * 100)+"%" ,color:"transparent"} }>こんな内側まで見ないでよ、えっち</div>) : ( <div className={voteNotChoicedStyle2} style={ {width:Math.round(choice.votedUserCount.length / numberOfVotes  * 100)+"%"   ,color:"transparent"} }>こんな内側まで見ないでよ、えっち</div>)
                    )  
                  }
                  {

                    //投票済みであればその選択肢が％を表示する
                    voted ?(
                      <h1 className='pr-3 text-gray-500 absolute right-0'>
                        { Math.round(choice.votedUserCount.length / numberOfVotes  * 100)}%
                      </h1>):(<></>)
                  }
                  
                
                </div>
              </button>
            </div>
            
            
          ))
          
        }
        <h1 className='text-right'>{numberOfVotes}人が投票</h1>
      </div>
      
    </div>
  )
}

export default VoteCard