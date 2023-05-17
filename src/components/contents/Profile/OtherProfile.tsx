import axios, { AxiosError, AxiosResponse } from 'axios';
import React, { useEffect, useState } from 'react'
import { useCookies } from 'react-cookie';
import { useLocation, useNavigate } from 'react-router-dom';
import { baseURL } from '../../../methods/Api';
import { Profile, Vote } from '../../../Type';
import VoteCard from '../Vote/VoteCard';
import ProfileCard from './ProfileCard';


// 自分以外のuserのプロフィール画面
const OtherProfile = () => {
  const location = useLocation();
  const [cookies] = useCookies()
  const [profile, setProfile] = useState<Profile>({ id: "", user: { id: "" }, nickName: "", createdAt: "", image: "" ,bio:""})
  const navigate = useNavigate()
  const [votes,setVotes] = useState<Array<Vote>>([])

  useEffect(() => {
    getAPIProfileData()
    getAPIMyVote()
  }, []);
  function getAPIProfileData() {
    const other_user_id = location.pathname.split('/')[2]
    const token = cookies.token
    axios.get(`${baseURL}api/profile/${other_user_id}`, {
      headers: {
        "Content-Type": "applicaiton/json",
        Authorization: "JWT " + `${token}`
      }
    })
      .then((res: AxiosResponse<Array<Profile>>) => {
        setProfile(res.data[0])

      })
      .catch((e: AxiosError<{ error: string }>) => {
        switch (e.response?.status) {
          case 401:
            //認証エラー
            alert("401")
            // navigate("/login")
            break
          case 403:

          default:
            break
        }
      });
  }
  function getAPIMyVote() {
    //自分の投稿を取得する
    const token = cookies.token
    const user_id = location.pathname.split('/')[2]
    axios.get(`${baseURL}api/profile/${user_id}?type=vote`,{
      headers: {
        "Content-Type": "applicaiton/json",
        Authorization: "JWT " + `${token}`
      }
    })
      .then((res: AxiosResponse<Array<Vote>>) => {
        setVotes(res.data)

      })
      .catch((e: AxiosError<{ error: string }>) => {
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
  return (
    <div>
     <ProfileCard id={profile?.id} nickName={profile?.nickName} user={profile?.user} createdAt={profile.createdAt} image={profile.image} bio={profile.bio} />
     
      {
        votes.map((vote)=>(
          <VoteCard id={vote.id} user={vote.user} questionText={vote.questionText} createdAt={vote.createdAt} image={vote.image} isOnlyLoginUser={false} choices={vote.choices} numberOfVotes={vote.numberOfVotes} tag={vote.tag}/>
        ))
      }
     
    </div>
  )
}

export default OtherProfile