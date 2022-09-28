import React,{ useState,useEffect} from 'react'
import VoteCard from './contents/Vote/VoteCard'
import axios, {  AxiosResponse} from "axios"
import { User,Vote } from '../Type'
import { baseURL } from '../methods/Api'

//API_TOKENはクッキーに保存する
const API_TOKEN = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNjY0MjYxNjQ0LCJqdGkiOiI4NzUwOWRhMjM0MTE0ODBiYjExNTJiODI5MWIwZTBhNyIsInVzZXJfaWQiOjF9.ebXImSeHw8FCPB5OvGFjhNrmzqTWu6DPQwRv9AIiFkA"
const Content:React.FC = () => {
   const [votes, setPost] = useState<Array<Vote>>([]);
   console.log("レンダリングがされました。")
   useEffect(() => {
      console.log("useEffect",baseURL)
   
      axios.get(baseURL,
         { headers: { Authorization: "JWT " + API_TOKEN } })
         .then((response:AxiosResponse<Array<Vote>>) => {
         console.log("----------------------------")
         console.log(response.data)
         console.log("取得完了")
         setPost(response.data);
      });

    },[]);

   
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

