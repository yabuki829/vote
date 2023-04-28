import axios, { AxiosError, AxiosResponse } from 'axios'
import React, { useEffect, useState } from 'react'
import { useCookies } from 'react-cookie'
import { useNavigate,Link } from 'react-router-dom'
import { baseURL } from '../../../methods/Api'
import { Profile, Vote } from '../../../Type'
import VoteCard from '../Vote/VoteCard'
import ProfileCard from './ProfileCard'

const MyProfile = () => {
  const [cookies,setCookie] = useCookies()
  const [profile, setProfile] = useState<Profile>({ id: "", user: { id: "" }, nickName: "", createdAt: "", image: "" ,bio:""})
  const navigate = useNavigate()
  const [isVoteComp, setisVoteComp] = useState(true)
  const [votes,setVotes] = useState<Array<Vote>>([])
  const [voteddata,setVotedData] = useState<Array<Vote>>([])
  const onStyle = "bg-gray-300  w-1/2"
  const offStyle = "w-1/2 border border-gray-300 "

  const menuCommentStyle = isVoteComp ? onStyle : offStyle
  const menuThreadStyle = isVoteComp ? offStyle : onStyle

  useEffect(() => {
    getAPIProfileData()
    getAPIMyVotdData()
    getAPIMyVote()
  }, []);
  
  function getAPIProfileData() {
    const token = cookies.token
    axios.get(`${baseURL}api/profile`, {
      headers: {
        "Content-Type": "applicaiton/json",
        Authorization: "JWT " + `${token}`
      }
    })
      .then((res: AxiosResponse<Array<Profile>>) => {
        setProfile(res.data[0])
          
        setCookie("profileimage",res.data[0].image)
        setCookie("nickName",res.data[0].nickName)
      })
      .catch((e: AxiosError<{ error: string }>) => {
      //  alert(e.message)
        switch (e.response?.status) {
          case 401:
            //認証エラー
            navigate("/login")
            break
          case 403:

          default:
            break
        }
      });
  }

  //自分の投稿を取得する
  function getAPIMyVote() {
    //自分の投稿を取得する
    const token = cookies.token
    axios.get(`${baseURL}api/vote/?type=me`, {
      headers: {
        "Content-Type": "applicaiton/json",
        Authorization: "JWT " + `${token}`
      }
    })
      .then((res: AxiosResponse<Array<Vote>>) => {

        setVotes(res.data)

      })
      .catch((e: AxiosError<{ error: string }>) => {
        console.log("エラー", e.response?.status)
        switch (e.response?.status) {
          case 401:
            //認証エラー
            // navigate("/login")
            break
          case 403:

          default:
            break
        }
      });

  }
  //自分が投票した投稿を取得する
  function getAPIMyVotdData() {
    const token = cookies.token
    axios.get(`${baseURL}api/vote/?type=voted`, {
      headers: {
        "Content-Type": "applicaiton/json",
        Authorization: "JWT " + `${token}`
      }
    })
      .then((res: AxiosResponse<Array<Vote>>) => {
        setVotedData(res.data)
      })
      .catch((e: AxiosError<{ error: string }>) => {
        console.log("エラー", e.response?.status)
        switch (e.response?.status) {
          case 401:
            //認証エラー
            // navigate("/login")
            break
          case 403:

          default:
            break
        }
      });
  }


  let isEmptyVotes = true
  let votesMessage = "投稿はまだありません"
  if (votes.length !== 0) {
    isEmptyVotes = false
    votesMessage = `${votes.length}件の投稿`
  }


  let isEmptyVotedData = true 
  let votedDatMessage = "投票した投稿はまだありません"
  if (voteddata.length !== 0) {
    isEmptyVotedData = false
    votedDatMessage = `${voteddata.length}件の投稿に投票をしてます`

  }

  
  return (
    <div className='mx-2'>
      <ProfileCard id={profile?.id} nickName={profile?.nickName} user={profile?.user} createdAt={profile.createdAt} image={profile.image} bio={profile.bio} />
      <div className='flex justify-center my-3 '>
      <Link to={"/edit/profile"} state={{ profile: profile }}  className='bg-gray-200 rounded-md px-4 py-1 hover:bg-gray-300'>
        プロフィールを編集する
      </Link>
       
      </div>
      

      <div className='flex justify-center my-10 '>
        <button onClick={() => setisVoteComp(true)} className={menuCommentStyle}>最近の投稿</button>
        <button onClick={() => setisVoteComp(false)} className={menuThreadStyle}>投票済み</button>
      </div>
      {isVoteComp ? (
        <div>
           <h1 className='mx-3'> {votesMessage}</h1>
          <hr />
          {votes.map((vote) => (
             <VoteCard id={vote.id} user={vote.user} questionText={vote.questionText} createdAt={vote.createdAt} image={vote.image} isOnlyLoginUser={false} choices={vote.choices} numberOfVotes={vote.numberOfVotes} tag={vote.tag}/>
          ))}
        </div>
      ) : ( 
        <div>
          <h1 className='mx-3'> {votedDatMessage}</h1>
         
          
          <hr />
          {voteddata.map((vote) => (
            <VoteCard id={vote.id} user={vote.user} questionText={vote.questionText} createdAt={vote.createdAt} image={vote.image} isOnlyLoginUser={false} choices={vote.choices} numberOfVotes={vote.numberOfVotes} tag={vote.tag}/>
          ))}
        </div>
      )}
    </div>
  )
}

export default MyProfile