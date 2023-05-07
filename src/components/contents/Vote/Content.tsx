import React,{ useState,useEffect} from 'react'
import VoteCard from './VoteCard'
import axios, {  AxiosResponse ,AxiosError } from "axios"
import { defaultVote, Profile, Result_Vote,Vote } from '../../../Type'
import { baseURL, refreshAccessToken} from '../../../methods/Api'
import { useCookies } from "react-cookie";
import { useNavigate,Route,Routes,Link} from "react-router-dom"
import InfiniteScroll from 'react-infinite-scroller'

//API_TOKENはクッキーに保存する
const Content:React.FC = () => {
   const [cookies, setCookie, removeCookie] = useCookies()
   //再読み込み判定
   const [hasMore, setHasMore] = useState(true);  
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

      const token = cookies.token  
      axios.get(`${baseURL}api/vote/`,{
         headers: { 
          "Content-Type": "applicaiton/json",
          Authorization: "JWT " + `${token}`
        }
       })
         .then((res:AxiosResponse<Result_Vote>) => {
          setVote(res.data) 
        
     })
     .catch((e: AxiosError<{ error: string }>) => {
      switch (e.response?.status){
        
         case 401:
            //認証エラー
            const refreshToken = cookies.refresh
            refreshAccessToken(refreshToken)
            .then(( data )=>{
              // accessトークンを保存する
              if (data.isComplete){
                setCookie("token", data.token)
                // もう一度習得する
                window.location.reload()  
              }
              else{
                navigate("/login")

              }
             

            })
            .catch(()=>{ 
              navigate("/login")
            })
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
     
      if (vote_result.next == "" || vote_result.next == null){
        return
      }
      const token = cookies.token  
      axios.get(vote_result.next,{
         headers: { 
          "Content-Type": "applicaiton/json",
          Authorization: "JWT " + `${token}`
        }
       })
         .then((res:AxiosResponse<Result_Vote>) => {

          
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
                        numberOfVotes={vote.numberOfVotes} tag={vote.tag} /> 
                     </div>
                    
                  ))
               }
               </InfiniteScroll>
              
         </div>   

   )
}

export default Content

