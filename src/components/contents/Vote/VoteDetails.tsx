
import React, { useEffect, useState } from 'react'
import { Link, useLocation } from "react-router-dom"
import { Choice, User, Vote, Comment } from '../../../Type';
import { isNotVotedStyle1, isNotVotedStyle2, isVotedStyle1, isVotedStyle2, votedChoicedStyle, voteNotChoicedStyle } from '../../../styles/VoteStyle'
import { useCookies } from "react-cookie";
import { baseURL, putAPISelectChoice } from '../../../methods/Api';
import axios, { AxiosError, AxiosResponse } from 'axios';
import { useNavigate } from "react-router-dom"
import profile  from "../../../image/profile.png"
import { useModal } from 'react-hooks-use-modal';

type Comment_Type = {
  comment: string;
}

const VoteDetails = () => {
  const location = useLocation();
  const [Modal, open, close, isOpen] = useModal('root', {
    preventScroll: true //これはオプション。デフォルトはfalse
  });
  
  const [vote, setVote] = useState<Vote>({
    id:"",
    user: { id: "", user: { id: "" }, nickName: "", image: "", createdAt: "" ,bio:"Z"},
    questionText:"", createdAt:"", image:"", isOnlyLoginUser:false,
    choices:[{id:"",text:"",votedUserCount:[{id:""},]}],numberOfVotes:[],tag:{title:""}

  })
  const [cookies, setCookie, removeCookie] = useCookies()
  
 
  const [comments, setComments] = useState<Array<Comment>>([])
  const [mycomment, setMyComment] = useState("")
  const [isCommentComp, setisCommentComp] = useState(true)
  const [voted, setVoted] = useState(false)
  const [isME,setisMyVote] = useState(false)

  const word = ""
  const navigate = useNavigate()
  const vote_id = location.pathname.split('/')[2]
  useEffect(() => {
    // fetchAPICommentData()
    // fetchAPIThreadData()
    fetchAPIDetailVoteData()
  }, [word,vote_id]);

  function checkSelectedChoice(choice: Choice) {
    const userid = cookies.userid
    //　選択肢を選んでいるかどうか確認する
    // props.choicesに自分のidがあるか調べる
    const user_dic = choice.votedUserCount
    for (let i = 0; i < user_dic.length; i++) {
      if (userid === user_dic[i].id) {
        return true
        
      }
    }
    return false
  }
  
  function copyTextToClipboard(text:string) {
   
    navigator.clipboard.writeText(text)
    .then(function() {
      alert("urlをコピーしました。")
    }, function(err) {
      console.error('Async: Could not copy text: ', err);
    });
  }
  function deleteVote(){
    const vote_id = location.pathname.split('/')[2]
    const token = cookies.token
    axios.delete(`${baseURL}api/vote/${vote_id}`, {
      headers: {
        "Content-Type": "applicaiton/json",
        // Authorization: "JWT " + `${token}`
      }
    })
    .then((res: AxiosResponse) => {
      alert("削除完了")
      //ひとつ前のページに戻る
      navigate(-1)
    })
  }
 
  function isMyVote(){
    const userid = cookies.userid
    if (vote.user.user.id === userid){
      // 自分の投稿
      return true
    }
    else{

      return false
    }
  }
  
  function fetchAPIDetailVoteData(){
    //投稿の詳細を取得する
   
    const token = cookies.token
    
     axios.get(`${baseURL}api/vote/${vote_id}`, {
      headers: {
        "Content-Type": "applicaiton/json",
        // Authorization: "JWT " + `${token}`
      }
    })
      .then((res: AxiosResponse<Array<Vote>>) => {
        setVote(res.data[0])
        //投票済みかどうか
        setVoted(isVoted())
        setisMyVote(isMyVote())
        
      })
      .catch((e: AxiosError<{ error: string }>) => {
        switch (e.response?.status) {

          case 401:
            //認証エラー
            navigate("/login")
            break
          case 403:
            break
          case 500:
            navigate("/404")
            break
          default:
            navigate("/404")
            break
        }
      });

  }
 

  function isVoted() {
    const myuserid: string = cookies.userid
    const user_dic = vote.numberOfVotes
    for (let i = 0; i < user_dic.length; i++) {

      if (myuserid === user_dic[i].id) {
        return true
      }
    }
    return false
  }

  //投票する
  async function handleVote(choiceID: string, choiceText: string) {
  
    if (!isVoted()) {
      // tokenがあるかどうかでLoginしてるか判別している
      if  (cookies.token == undefined || cookies.token == ""){
        const userid = cookies.userid
        await putAPISelectChoice(choiceID,"", vote.id,userid).then((return_userid)=>{
           
          // useridが帰ってきた場合にのみ保存する
          if (userid != undefined){
            setCookie("userid",userid)
          }

        
          const user: User = { id: userid }
          vote.numberOfVotes.push(user)
          
          vote.choices.map((choice) => (
            (choice.id === choiceID) ? (choice.votedUserCount.push(user)) : ("")
          ))
          setVoted(true)
          
        })
  
      }
      else{
        
       
        const token = cookies.token
        const userid = cookies.userid
        await putAPISelectChoice(choiceID, token, vote.id,userid)
        const user: User = { id: cookies.userid }
        vote.numberOfVotes.push(user)
  
        vote.choices.map((choice) => (
          (choice.id === choiceID) ? (choice.votedUserCount.push(user)) : ("")
        ))
  
        setVoted(true)
      }

    
    }
  }

  const styleBackground = isVoted() ? isVotedStyle1 : isNotVotedStyle1
  const styleChoiceText = isVoted() ? isVotedStyle2 : isNotVotedStyle2
  const numberOfVotes = vote.numberOfVotes.length

  const onStyle = "bg-gray-300  w-1/2 "
  const offStyle = "w-1/2 border border-gray-300 "

  const menuCommentStyle = isCommentComp ? onStyle : offStyle


  function fetchAPICommentData() {
    const token = cookies.token
    const vote_id = location.pathname.split('/')[2]

    axios.get(`${baseURL}api/vote/${vote_id}/comment`, {
      headers: {
        "Content-Type": "applicaiton/json",
        Authorization: "JWT " + `${token}`
      }
    })
      .then((res: AxiosResponse<Array<Comment>>) => {

        setComments(res.data)

      })
      .catch((e: AxiosError<{ error: string }>) => {
        switch (e.response?.status) {

          case 401:
            //認証エラー
            // navigate("/login")
            break
          case 403:
            break
          default:
            break
        }
      });
  }
  function handleChangeCommentField(event: React.ChangeEvent<HTMLTextAreaElement>) {
    setMyComment(event.target.value)
  }
  type comment_type = {
    text: string
  }

  function handlePOSTComment() {

    const token = cookies.token
    if (mycomment == ""){
      return 
    }
    const data: comment_type = {
      text: mycomment
    }
    axios.post(`${baseURL}api/vote/${vote.id}/comment/`, data, {
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

  const modalStyle: React.CSSProperties = {
    backgroundColor: '#fff',
    padding: '60px 100px',
    borderRadius: '10px',
  };

  return (
    <div className='m-3 min-h-screen'>
     <Modal>
      <div className='bg-white p-2'> 
        <div className='px-10'>
          <h1 className='text-center'>確認</h1>
          <hr />
        </div>
        
        <h1 className='px-10 py-5'>削除しますよろしいですか？</h1>
        <hr />
       
        <div className='flex justify-evenly '>
         <button onClick={close} className='w-full'>キャンセル</button>
         <button onClick={deleteVote} className='w-full bg-red-300 hover:bg-red-400'>削除する</button>
        </div>
       
      </div>
    </Modal>

      <div className='flex justify-between'>
    
      <Link to={"/profile/"+vote.user.user.id} className='flex items-center'>
          <img className='text-sm w-10 h-10 md:text-base  border-2 rounded-full object-cover' src={vote.user.image ? ("http://127.0.0.1:8000" + vote.user.image):(profile)} alt="" />
          <h1 className='text-sm mx-3 text-left'>{vote.user.nickName}</h1>
          
        </Link>
        <h1>{vote.createdAt}</h1>
       
      </div>
      <h1 className='text-2xl font-bold mx-3 mt-5'> {vote.questionText}</h1>


      <div className='mx-10 md:mx-20 my-5'>

        {
          vote.choices.map((choice) => (
            <div key={choice.id}>
              <button onClick={(e) => handleVote(choice.id, choice.text)} className='border border-gray-300 mb-2 w-full ' key={choice.id}>
                <div className={styleBackground}>
                
               
                  <h1 className={styleChoiceText}>{choice.text}</h1>
                  {
                    isVoted() && (
                      checkSelectedChoice(choice) ? (<div className={votedChoicedStyle} style={{ width: Math.round(choice.votedUserCount.length / numberOfVotes * 100) + "%", color: "transparent" }}>こんな内側まで見ないでよ、えっち</div>) : (<div className={voteNotChoicedStyle} style={{ width: Math.round(choice.votedUserCount.length / numberOfVotes * 100) + "%", color: "transparent" }}>こんな内側まで見ないでよ、えっち</div>)
                    )
                  }
                  {

                    //投票済みであればその選択肢が％を表示する
                    
                    isVoted() ? (
                      <h1 className='pr-3 text-gray-500 absolute right-0'>
                        {Math.round(choice.votedUserCount.length / numberOfVotes * 100)}%
                      </h1>) : (<></>)
                  }
                </div>
              </button>
            </div>
          ))
        } 


        { isVoted()? ( <h1 className='text-right'>{numberOfVotes}人が投票</h1>):(<></>) }
       
        
        <div className='flex justify-end'>
          <button onClick={()=>copyTextToClipboard("https://localhost:3000/"+"vote/"+location.pathname.split('/')[2])} className='border bg-blue-400 px-3 text-white text-sm'>URLをコピー</button>
          {  isMyVote() && ( <button onClick={open} className='border bg-red-400 px-3  text-white'>削除</button> )}
        </div>
            
      </div>
      <hr />
      <div className='bg-blue-300 h-32 mx-10 md:mx-20 my-8 flex justify-center items-center'>
          <h1 className='text-white font-bold'>広告募集</h1>
        </div>
      <hr />
      
      <div className=''>
        {/* <h1 className='font-bold'>※コメントは削除できません。適切な言葉かどうか一度考えてから書き込みをしてください。</h1> */}
        <h1 className=' font-bold'>コメントは現在削除できません。</h1>
      </div>
      <br />
      <div>
            <div >
              <div className='p-2 flex'>
                <img className=' w-8 h-8 text-sm  md:w-10 md:h-10 md:text-base  border-2 rounded-full object-cover' src={"http://127.0.0.1:8000" + cookies.profileimage} alt="" />
                <textarea onChange={(e) => handleChangeCommentField(e)} value={mycomment} className='p-2 border w-full ' placeholder='コメント' ></textarea>

              </div>
              <div className='m-2 flex justify-end '>
                <button onClick={()=> setMyComment("")} className=' px-3 py-1 my-5 text-sm mx:text-base' >キャンセル</button>
                <button onClick={handlePOSTComment} className='bg-blue-300 text-white font-bold px-3 py-2 m-5 cursor-pointer hover:bg-blue-400 text-sm mx:text-base' >コメント</button>
              </div>
            </div>
            <div>
              <h1 className='mx-3'>
                {commentCountText}
              </h1>
              <hr />

              {
                comments.map((comment) => (
                  <div className='p-3'>
                    <div className='flex items-center'>
                      <img className='w-8 h-8 text-sm  md:w-10 md:h-10 md:text-base  border-2 rounded-full object-cover' src={comment.user.image ? ("http://127.0.0.1:8000" + comment.user.image):(profile)} alt="" />
                      <h1 className='mx-3'>{comment.user.nickName}</h1>
                    </div>
                    <h1 className='mb-2'>{comment.text}</h1>
                    <hr />
                  </div>
                ))
              }
            </div>
          </div>

    </div>

  )
}

export default VoteDetails