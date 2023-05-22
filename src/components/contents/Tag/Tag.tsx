import React,{ useState,useEffect} from 'react'
import { useLocation } from 'react-router-dom';
import axios, {  AxiosResponse ,AxiosError } from "axios"
import { Vote } from '../../../Type';
import { baseURL} from '../../../methods/Api'
import { useCookies } from "react-cookie";
import { useNavigate,Route,Routes,Link} from "react-router-dom"
import VoteCard from '../Vote/VoteCard';

const Tag = () => {
  useEffect(() => {
    fetchAPIQuestionData()
  },[]);
  const [cookies, setCookie, removeCookie] = useCookies()
  const search = useLocation().search
  const query = new URLSearchParams(search)
  const [votes, setPost] = useState<Array<Vote>>([])
  const navigate = useNavigate()

  function fetchAPIQuestionData(){
      const token = cookies.token  
      axios.get(`${baseURL}api/vote/?tag=${query.get("title")}`,{
         headers: { 
          "Content-Type": "applicaiton/json",
          Authorization: "JWT " + `${token}`
        }
       })
         .then((res:AxiosResponse<Array<Vote>>) => {
         setPost(res.data) 
        
     })
     .catch((e: AxiosError<{ error: string }>) => {
      switch (e.response?.status){
        
         case 401:
            //認証エラー
            navigate("/login")
            break
         case 403:
            break
         default:
            break
      }
    });
  }
  return (
    <>
    {
       votes.map((vote) => (
          <div key={vote.id}>
             <VoteCard
             questionText={vote.questionText}
             id={vote.id}
             user={vote.user}
             createdAt={vote.createdAt}
             image={vote.image}
             isOnlyLoginUser={vote.isOnlyLoginUser}
             choices={vote.choices}
             numberOfVotes={vote.numberOfVotes} tags={vote.tags}                        /> 
          </div>
         
       ))
    }
    
   
</>   
  )
}

export default Tag