import React,{ useState,useEffect} from 'react'
import VoteCard from './VoteCard'
import axios, {  AxiosResponse ,AxiosError } from "axios"
import { User,Vote } from '../../../Type'
import { baseURL} from '../../../methods/Api'
import { useCookies } from "react-cookie";
import { useNavigate,Route,Routes,Link} from "react-router-dom"

//API_TOKENはクッキーに保存する
const Content:React.FC = () => {
   const [cookies, setCookie, removeCookie] = useCookies()
   const [votes, setPost] = useState<Array<Vote>>([])
   const navigate = useNavigate()
   useEffect(() => {
      // console.log("useEffect",baseURL)
      fetchAPIQuestionData()
    },[]);

   function  fetchAPIQuestionData(){
      const token = cookies.token  
      // TODO 前取得から制限する
      axios.get(`${baseURL}api/vote`,{
         headers: { 
          "Content-Type": "applicaiton/json",
          Authorization: "JWT " + `${token}`
        }
       })
         .then((res:AxiosResponse<Array<Vote>>) => {
         console.log("----------------------------")
         console.log(res.data[1])
         console.log("取得完了")

         setPost(res.data) 
        
     })
     .catch((e: AxiosError<{ error: string }>) => {
      console.log("エラー",e.response?.status)
      switch (e.response?.status){
        
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

    function fetchAdditionalData(){
      // TODO 一番下までスクロールしたら追加でデータを取得する
    }
   
   console.log(votes.length)

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
                           numberOfVotes={vote.numberOfVotes}                        /> 
                     </div>
                    
                  ))
               }
               
              
         </>   

   )
}

export default Content

