
import React, { useEffect, useState } from 'react'
import { useLocation } from "react-router-dom"
import { Choice, User, Vote, Comment, Thread } from '../../../Type';
import { isNotVotedStyle1, isNotVotedStyle2, isVotedStyle1, isVotedStyle2, votedChoicedStyle, voteNotChoicedStyle } from '../../../styles/VoteStyle'
import { useCookies } from "react-cookie";
import { baseURL, postAPIThread, putAPISelectChoice } from '../../../methods/Api';
import axios, { AxiosError, AxiosResponse } from 'axios';
import { useNavigate } from "react-router-dom"
import ThreadCard from '../Thread/ThreadCard';
import profile  from "../../../image/profile.png"


type Comment_Type = {
  comment: string;
}

const VoteDetails = () => {
  const location = useLocation();
  const [vote, setVote] = useState<Vote>({
    id:"",
    user: { id: "", user: { id: "" }, nickName: "", image: "", createdAt: "" },
    questionText:"", createdAt:"", image:"", isOnlyLoginUser:false,
    choices:[{id:"",text:"",votedUserCount:[{id:""},]}],numberOfVotes:[]

  })
  const [cookies, setCookie, removeCookie] = useCookies()
  
 
  const [comments, setComments] = useState<Array<Comment>>([])
  const [threads,setThreads] = useState<Array<Thread>>([])
  const [mycomment, setMyComment] = useState("")
  const [threadTitle,setThreadTitle] = useState("")
  const [isCommentComp, setisCommentComp] = useState(true)
  const [voted, setVoted] = useState(true)
  const navigate = useNavigate()

  useEffect(() => {
    // alert("useEffect")
    fetchAPICommentData()
    fetchAPIThreadData()
    fetchAPIDetailVoteData()
  }, []);

  function checkSelectedChoice(choice: Choice) {
    const userid = cookies.userid
    //　選択肢を選んでいるかどうか確認する
    // props.choicesに自分のidがあるか調べる
    const user_dic = choice.votedUserCount
    for (let i = 0; i < user_dic.length; i++) {
      if (userid === user_dic[i].id) {
        return true
        break
      }

    }
    return false
  }
  
  function fetchAPIDetailVoteData(){
    //投稿の詳細を取得する
    const vote_id = location.pathname.split('/')[2]
    const token = cookies.token
    
     axios.get(`${baseURL}api/vote/${vote_id}`, {
      headers: {
        "Content-Type": "applicaiton/json",
        Authorization: "JWT " + `${token}`
      }
    })
      .then((res: AxiosResponse<Array<Vote>>) => {
        setVote(res.data[0])
        
        //投票済みかどうか
        const voteduser = res.data[0].numberOfVotes
        setVoted(isVoted(voteduser))

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
 
  function isVoted(user_dic:Array<User>) {
    const myuserid: string = cookies.userid
    console.log("投票者",user_dic)
    for (let i = 0; i < user_dic.length; i++) {
      console.log(myuserid ,"===", user_dic[i].id)
      if (myuserid === user_dic[i].id) {
        return true
        break
      }
    }

    return false
  }


  async function handleVote(choiceID: string, choiceText: string) {
    if (!voted) {
      const token = cookies.token
      await putAPISelectChoice(choiceID, token, vote.id)
      const user: User = { id: cookies.userid }
      vote.numberOfVotes.push(user)

      vote.choices.map((choice) => (
        (choice.id === choiceID) ? (choice.votedUserCount.push(user)) : ("")
      ))
      // alert("投票完了")

      setVoted(true)
    }
  }

  const styleBackground = voted ? isVotedStyle1 : isNotVotedStyle1
  const styleChoiceText = voted ? isVotedStyle2 : isNotVotedStyle2
  const numberOfVotes = vote.numberOfVotes.length

  const onStyle = "bg-gray-300  w-1/2"
  const offStyle = "w-1/2 border border-gray-300 "

  const menuCommentStyle = isCommentComp ? onStyle : offStyle
  const menuThreadStyle = isCommentComp ? offStyle : onStyle


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
  function fetchAPIThreadData(){
    
    const token = cookies.token  
    const vote_id = location.pathname.split('/')[2]
    
    axios.get(`${baseURL}api/vote/${vote_id }/thread`,{
      headers: {
        "Content-Type": "applicaiton/json",
        Authorization: "JWT " + `${token}`
      }
    })
    .then((res: AxiosResponse<Array<Thread>>) => {
      console.log("----------------------")
      console.log(res.data)
      setThreads(res.data)
    })

  }

  function handleChangeThreadTitle(event: React.ChangeEvent<HTMLInputElement>) {
    setThreadTitle(event.target.value)
  }
  function handleChangeCommentField(event: React.ChangeEvent<HTMLTextAreaElement>) {
    setMyComment(event.target.value)
  }
  type comment_type = {
    text: string
  }

  async function handelPOSTThread(){
    //新規スレッドの作成
    const token = cookies.token
    const result = await postAPIThread(token,vote.id,threadTitle)
    //スレッドの詳細画面に遷移する
    setThreadTitle("")
    alert("作成しました")

  }
  function handlePOSTComment() {

    const token = cookies.token
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

  let ThreadCountText 
  if (threads.length === 0) {
    ThreadCountText = "スレッドはまだありません"
  }
  else {
    ThreadCountText = threads.length + "件のスレッド"
  }

  return (
    <div className='m-3'>

      <div className='flex items-center'>
        <img className='text-sm w-10 h-10 md:text-base  border-2 rounded-full object-cover' src={vote.user.image ? ("http://127.0.0.1:8000" + vote.user.image):(profile)} alt="" />
        <h1 className='text-sm mx-3 text-left'>{vote.user.nickName}</h1>
      </div>




      <h1 className='text-2xl font-bold mx-3'> {vote.questionText}{vote.questionText}{vote.questionText}{vote.questionText}{vote.questionText}</h1>


      <div className='mx-20 my-5'>

        {
          vote.choices.map((choice) => (
            <div key={choice.id}>
              <button onClick={(e) => handleVote(choice.id, choice.text)} className='border border-gray-300 mb-2 w-full' key={choice.id}>
                <div className={styleBackground}>
                  <h1 className={styleChoiceText}>{choice.text}</h1>
                  {
                    voted && (
                      checkSelectedChoice(choice) ? (<div className={votedChoicedStyle} style={{ width: Math.round(choice.votedUserCount.length / numberOfVotes * 100) + "%", color: "transparent" }}>こんな内側まで見ないでよ、えっち</div>) : (<div className={voteNotChoicedStyle} style={{ width: Math.round(choice.votedUserCount.length / numberOfVotes * 100) + "%", color: "transparent" }}>こんな内側まで見ないでよ、えっち</div>)
                    )
                  }
                  {

                    //投票済みであればその選択肢が％を表示する
                    voted ? (
                      <h1 className='pr-3 text-gray-500 absolute right-0'>
                        {Math.round(choice.votedUserCount.length / numberOfVotes * 100)}%
                      </h1>) : (<></>)
                  }
                </div>
              </button>
            </div>
          ))
        }
       
        <h1 className='text-right'>{numberOfVotes}人が投票</h1>
      </div>

      <hr />
      <div className='flex justify-center my-3'>
        <button onClick={() => setisCommentComp(true)} className={menuCommentStyle}>コメント</button>
        <button onClick={() => setisCommentComp(false)} className={menuThreadStyle}>スレッド</button>
      </div>
      <br />
      {
        isCommentComp ? (
          <div>
            <div >
              <div className='p-2 flex'>
                <img className=' w-5 h-5 text-sm  md:w-10 md:h-10 md:text-base  border-2 rounded-full object-cover' src={"http://127.0.0.1:8000" + cookies.profileimage} alt="" />
                <textarea onChange={(e) => handleChangeCommentField(e)} value={mycomment} className='p-2 border w-full mx-5' placeholder='コメント' ></textarea>

              </div>
              <div className='m-2 flex justify-end '>
                <button onClick={()=> setMyComment("")} className=' py-2 px-2  ' >キャンセル</button>
                <button onClick={handlePOSTComment} className='bg-blue-300 text-white font-bold px-3 py-2 m-5 cursor-pointer hover:bg-blue-400' >コメント</button>
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
                      <img className='w-5 h-5 text-sm  md:w-10 md:h-10 md:text-base  border-2 rounded-full object-cover' src={comment.user.image ? ("http://127.0.0.1:8000" + comment.user.image):(profile)} alt="" />
                      <h1 className='mx-3'>{comment.user.nickName}</h1>
                    </div>
                    <h1 className='mb-2'>{comment.text}</h1>
                    <hr />
                  </div>
                ))
              }
            </div>
          </div>
        ) : (
          <div>
            <div >
              <div className='p-2 '>
                <div className='flex'>
                  <a href="/">
                    <img className=' w-5 h-5 text-sm  md:w-10 md:h-10 md:text-base  border-2 rounded-full object-cover' src={"http://127.0.0.1:8000" + cookies.profileimage} alt="" />
                  </a>
                  
                  <input onChange={(e) => handleChangeThreadTitle(e)} value={threadTitle} placeholder='新規スレッド' className='w-full mx-3 border  p-1' type="text" />
                </div>
                
              </div>
              <div className='m-2 flex justify-end '>
                <button onClick={()=>setThreadTitle("")} className=' py-2 px-2  ' >キャンセル</button>
                <button onClick={handelPOSTThread} className='bg-blue-300 text-white font-bold px-3 py-2 m-5 cursor-pointer hover:bg-blue-400' >作成</button>
              </div>
              <h1>
                { ThreadCountText}
              </h1>
              <hr />
              {
                threads.map((thread)=>(
                  <ThreadCard 
                  id={thread.id} 
                  user={thread.user}
                   vote={thread.vote} title={thread.title} createdAt={thread.createdAt}/>
                ))
              }
            </div>
          </div>
          
         
        )
      }

    </div>

  )
}

export default VoteDetails