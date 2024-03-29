import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom';
import axios, {  AxiosResponse ,AxiosError } from "axios"
import { Vote } from '../../../Type';
import { baseURL, instance} from '../../../methods/Api'
import { useCookies } from "react-cookie";
import { useNavigate,Route,Routes,Link} from "react-router-dom"
import VoteCard from '../Vote/VoteCard';
import SearchInput from '../../headerComponents/SearchInput';
const Search = () => {
  


  const [cookies, setCookie, removeCookie] = useCookies()
  const search = useLocation().search
  const query = new URLSearchParams(search)
  const [votes, setPost] = useState<Array<Vote>>([])
  const navigate = useNavigate()
  const word = query.get("q")
  useEffect(() => {

   if (word != null){
      fetchAPIQuestionData()
   }
    
  },[word]);

  function fetchAPIQuestionData(){
   const url = `vote/?q=${query.get("q")}`
  
   instance.get(url)
   .then((res:AxiosResponse<Array<Vote>>) =>{
      
       setPost(res.data) 
       console.log(res.data)
   })
   .catch((e: AxiosError<{ error: string }>)=>{
      switch (e.response?.status) {
         
         case 401:
            navigate("/login")
            break
         default:
            navigate("/login")
            break
      }
   })
   }
  return (
   <>
   <div className='my-5 w-full md:hidden'>
       <SearchInput/>
       
   </div>
   <hr className='mx-10 md:hidden' />
   
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
             numberOfVotes={vote.numberOfVotes} tags={vote.tags}/> 
          </div>
         
       ))
    }
   </>
  )
}

export default Search