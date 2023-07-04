import React,{ useState,useEffect} from 'react'
import VoteCard from './VoteCard'
import axios, {  AxiosResponse ,AxiosError } from "axios"
import { defaultVote, Profile, Result_Vote,Vote } from '../../../Type'
import { baseURL, instance, refreshAccessToken} from '../../../methods/Api'
import { useCookies } from "react-cookie";
import { useNavigate,Route,Routes,Link} from "react-router-dom"
import InfiniteScroll from 'react-infinite-scroller'



//API_TOKENはクッキーに保存する
const Content:React.FC = () => {
   const [cookies, setCookie, removeCookie] = useCookies()
   //再読み込み判定
   const [hasMore, setHasMore] = useState(false);  
   const [vote_result, setVote] = useState<Result_Vote>({
    count:0,
    next: "",
    previous :"",
    results: [defaultVote]
   })
   const navigate = useNavigate()
   
   useEffect(() => {
      fetchAPIQuestionData()
    },[]);

    function  fetchAPIQuestionData(){
      
      instance.get("vote").then((res)=>{
        console.log("ok")
        setVote(res.data)

      }).catch((e: AxiosError<{ error: string }>)=>{
        switch (e.response?.status){
          case 401:

            // リフレッシュトークンからアクセストークンを取得する
            instance.post("token/refresh/").catch((res)=> {
              console.log("トークンをリフレッシュしました")
              console.log("ここだよ",)
              switch (res.response.status){
                case 200:
                  window.location.reload()  
                  break
                case 401:
                  console.log("リフレッシュできませんでした。")
                  navigate("/login")
                  break
                default :
                  navigate("/login")
              }
  
            })
            break
          case 403:
            break
          default:
            navigate("/login")
            break
        }
      })

      
    }
    
    function fetchAdditionalData(){
     
      if (vote_result.next == "" || vote_result.next == null){
        return
      }
      instance.get(vote_result.next).then((res:AxiosResponse<Result_Vote>)=>{
        if (res.data.next == null){
          setHasMore((pre)=> !pre)
        }
        setVote({
          ...vote_result,
          results: [...vote_result.results, ...(Array.isArray(res.data.results) ? res.data.results : [res.data.results])],
          next: res.data.next,
          previous: res.data.previous
        });
      })
    }
   
  const loader =<div className="text-center text-gray-500" key={0}>Loading ...{hasMore}</div>;
   return (
    
         <div className='min-h-screen'>
        
          <InfiniteScroll loadMore={fetchAdditionalData}    //項目を読み込む際に処理するコールバック関数
        hasMore={hasMore}         //読み込みを行うかどうかの判定
        loader={loader}>
               {
                  vote_result.results.map((vote) => (
                     <div key={vote.id}>
                        <VoteCard
                        questionText={vote.questionText}
                        id={vote.id}
                        user={vote.user}
                        createdAt={vote.createdAt}
                        image={vote.image}
                        isOnlyLoginUser={vote.isOnlyLoginUser}
                        choices={vote.choices}
                        numberOfVotes={vote.numberOfVotes} tags={vote.tags} /> 
                     </div>
                    
                  ))
               }
               </InfiniteScroll>
              
         </div>   

   )
}

export default Content

