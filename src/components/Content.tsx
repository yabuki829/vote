import React from 'react'
import VoteCard from './contents/Vote/VoteCard'

type Vote = {
   id:string
   text:String
}

const Content:React.FC = () => {
   const voteList:Array<Vote> = [{id:"1",text:"aa"},{id:"2",text:"bb"},{id:"3",text:"cc"},{id:"4",text:"dd"}]
   return (
         <>
            <h1 className='text-2xl font-bold mx-3 mt-5'> <span>「React」</span>で検索しました</h1>
            
               {
                 
                  voteList.map((vote)=> (
                     <VoteCard/>
                  ))
                 
               }
              
               
            
         </>
        
   

   )
}

export default Content

