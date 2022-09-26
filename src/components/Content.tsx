import React,{ useState,useEffect} from 'react';
import VoteCard from './contents/Vote/VoteCard';
import axios, { AxiosRequestConfig, AxiosResponse, AxiosError } from "axios";
import { User,Vote } from '../Type';

const baseURL = "http://127.0.0.1:8000/api/vote/";
//API_TOKENはクッキーに保存する
const API_TOKEN = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNjY0MTk1MzQwLCJqdGkiOiI2NGE3ZDViNjM2NzE0NzQ4YjdhZTAxNjU3YTIzM2ZiMSIsInVzZXJfaWQiOjF9.26O-Xox0ucsn4tr4_bOr0Hr5cDPHlNCBYHMhLSn3IkA"
const Content:React.FC = () => {
   const [votes, setPost] = useState<Array<Vote>>([]);
   //質問と選択肢を取得する
   console.log("レンダリングがされました。")
   useEffect(() => {
      // console.log("useEffect",baseURL)
     
      axios.get(baseURL,
         { headers: { Authorization: "JWT " + API_TOKEN } })
         .then((response:AxiosResponse<Array<Vote>>) => {
         console.log("----------------------------")
         // console.log(response.data)
         console.log("取得完了")
         setPost(response.data);
      });

    },[]);
   

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
                        choices={vote.choices} /> 
                  ))
               }
               
              
         </>   

   )
}

export default Content

