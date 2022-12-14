import React,{ useState,useEffect} from 'react'
import { Thread } from '../../../Type'
import profile  from "../../../image/profile.png"
import menuIcon from "../../../image/menu.png"
import ThreadMenuCard from './ThreadMenuCard'
import { useNavigate,Route,Routes,Link} from "react-router-dom"
import { useCookies } from 'react-cookie'


const ThreadCard:React.FC<Thread> = (props) => {
  const { id,vote,user, title  } = props
  const imageStyle = "w-10 h-10 border-2 rounded-full object-cover mr-4 shadow"
  const [isShownMenuCard,setIsShownMenuCard] = useState(false)
  const [cookies, setCookie, removeCookie] = useCookies()
  
  function handleMenuCard(){
    setIsShownMenuCard(!isShownMenuCard)
  }
  const myuserid = cookies.userid
  return (
    <div className="bg-white mx-10 my-3 py-5 ">
      <Link to={"/thread/"+id}  className='hover:bg-gray-100'>
        <div className='mx-3 p-2'>
          <div className='flex justify-between  items-center'>
            
            <div className='flex items-center '>
              { user.image ? (<img className={imageStyle}  src={"http://127.0.0.1:8000"+user.image} alt="profile" />):(<img className={imageStyle} src={profile} alt="" />) }
            
              <h1 className=''>{user.nickName}</h1>
            </div>
           
          </div>
          <h1 className='text-xl font-bold'>{title}</h1>
        </div>
        
        <Link to={"/vote/"+vote.id} state={{vote:vote,userid:cookies.userid}} className='hover:bg-gray-100'>
          <div className='border rounded-lg mx-10 p-2 mb-5 hover:bg-gray-100'>
            <div className='flex justify-between  items-center'>
              <div className='flex items-center '>
                { vote.user.image ? (<img className={imageStyle}  src={"http://127.0.0.1:8000"+vote.user.image} alt="profile" />):(<img className={imageStyle} src={profile} alt="" />) }
                <h1 className=''>{vote.user.nickName}</h1>
              </div>
            
            </div>
            <a className='text-xl font-bold ' href="">{vote.questionText}</a>
            <div className='text-right'>
              <a className='text-blue-600 hover:underline' href="">...???????????????</a>
            </div>
          </div>
        </Link>
      </Link>
      
      
     <hr />
    </div>
   
  )
}

export default ThreadCard
