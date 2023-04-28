import React,{ useState,useEffect} from 'react'
import axios, {  AxiosResponse ,AxiosError } from "axios"
import { useCookies } from "react-cookie";
import { Thread } from '../../../Type';
import { baseURL} from '../../../methods/Api'
import ThreadCard from './ThreadCard';
import { useNavigate} from "react-router-dom"

//スレッド一覧
const ThreadContent = () => {
  const [cookies, setCookie, removeCookie] = useCookies()
  const [threads, setTreads] = useState<Array<Thread>>([])
  const navigate = useNavigate()
  function fetchAPIThreadData(){
    
    const token = cookies.token  
    axios.get(`${baseURL}api/thread`,{
      headers: { 
       "Content-Type": "applicaiton/json",
       Authorization: "JWT " + `${token}`
     }
    })
      .then((res:AxiosResponse<Array<Thread>>) => {
      setTreads(res.data) 
     
  })
  .catch((e: AxiosError<{ error: string }>) => {
   console.log("エラー",e.response?.status)
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

  useEffect(() => {
    fetchAPIThreadData()
  },[]);


  return (
    <div>
      {threads.map((thread)=> (
        <ThreadCard 
          id={thread.id}
          user={thread.user}
          vote={thread.vote}
          title={thread.title}
          createdAt={thread.createdAt} explain={thread.explain}/>
      ))}
    </div>
  )
}

export default ThreadContent