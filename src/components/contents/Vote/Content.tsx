import React,{ useState,useEffect} from 'react'
import VoteCard from './VoteCard'
import axios, {  AxiosResponse ,AxiosError } from "axios"
import { Profile, User,Vote } from '../../../Type'
import { baseURL} from '../../../methods/Api'
import { useCookies } from "react-cookie";
import { useNavigate,Route,Routes,Link} from "react-router-dom"

//API_TOKENはクッキーに保存する
const Content:React.FC = () => {
   const [cookies, setCookie, removeCookie] = useCookies()
   const [votes, setPost] = useState<Array<Vote>>([])
   const navigate = useNavigate()
   
   useEffect(() => {
      fetchAPIQuestionData()
      // getAPIProfileData()
    },[]);

   function  fetchAPIQuestionData(){
      const token = cookies.token  
      axios.get(`${baseURL}api/vote/`,{
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
    function getAPIProfileData() {
      const token = cookies.token
      axios.get(`${baseURL}api/profile/`, {
        headers: {
          "Content-Type": "applicaiton/json",
          Authorization: "JWT " + `${token}`
        }
      })
        .then((res: AxiosResponse<Array<Profile>>) => {
  
          console.log("Profileを取得完了")
          console.log(res.data)
          // setProfile(res.data[0])
  
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
    function fetchAdditionalData(){
      // TODO 一番下までスクロールしたら追加でデータを取得する
    }
   

   return (
         <div className='min-h-screen'>
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
                        numberOfVotes={vote.numberOfVotes} tag={vote.tag}                        /> 
                     </div>
                    
                  ))
               }
               
              
         </div>   

   )
}

export default Content

