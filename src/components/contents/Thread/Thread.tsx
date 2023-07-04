import React, { useState,useEffect } from 'react'
import { instance } from '../../../methods/Api'
import { Thread } from '../../../Type'
import { useNavigate,Route,Routes,Link} from "react-router-dom"
import VoteCard from "../Vote/VoteCard"
const ThreadContent = () => {
  const navigate = useNavigate()
  const [threads, setThreads] = useState<Array<Thread>>([])
  useEffect(() => {
    fetchThreadData()
  },[]);

  function fetchThreadData(){
    instance.get("thread").then((res)=>{
      setThreads(res.data)
      console.log(res.data)
    })
  }

  return (
    <div className='mx-10 md:mx-20'>
     <div  className='flex justify-center w-full mx-auto my-5'>
            
        <input   className='w-full px-2 border rounded-full ' type="text" placeholder='検索' />
        <button  className='bg-blue-400 p-2 text-white ml-2 '>
                  
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4  rounded-full">
            <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
          </svg>
        </button>
      </div>
      <hr />
      { 
        threads.map((thread)=>(
          <>
          <Link  to={"/thread/"+thread.id} >
            <div className='py-3' key={thread.id}>

            
              <h1 className='text-blue-600 '> {thread.title}</h1>      
            </div>
            </Link>
            <hr />
          </>
          
          
        ))
      }
    </div>
  )
}

export default ThreadContent