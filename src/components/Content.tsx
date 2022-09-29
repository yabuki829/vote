import React,{ useState,useEffect} from 'react'
import VoteCard from './contents/Vote/VoteCard'
import axios, {  AxiosResponse ,AxiosError } from "axios"
import { User,Vote } from '../Type'
import { baseURL} from '../methods/Api'
import { useCookies } from "react-cookie";
import { useNavigate,Route,Routes,Link} from "react-router-dom"

//API_TOKENはクッキーに保存する
const Content:React.FC = () => {
   const [cookies, setCookie, removeCookie] = useCookies()
   const [votes, setPost] = useState<Array<Vote>>([])
   const navigate = useNavigate()
   console.log("レンダリングがされました。")
   useEffect(() => {
      console.log("useEffect",baseURL)
   
      fetchAPIQuestionData()

    },[]);

   function fetchAPIQuestionData(){
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
         console.log(res.data)
         console.log("取得完了")
         setPost(res.data) 
        
     })
     .catch((e: AxiosError<{ error: string }>) => {
      // エラー処理
      console.log(e.message);
      navigate("login")
    });
    }

    function fetchAdditionalData(){
      // TODO 一番下までスクロールしたら追加でデータを取得する
    }
   
   console.log(votes.length)

   return (
         <>
         <h1>test</h1>
            {/* <h1 className='text-2xl font-bold mx-3 mt-5'> <span>「React」</span>で検索しました</h1> */}
               {
                  votes.map((vote) => (
                     <VoteCard
                        questionText={vote.questionText}
                        id={vote.id}
                        user={vote.user}
                        createdAt={vote.createdAt}
                        image={vote.image}
                        isOnlyLoginUser={vote.isOnlyLoginUser}
                        choices={vote.choices} numberOfVotes={vote.numberOfVotes}                        /> 
                  ))
               }
               
              
         </>   

   )
}

export default Content

