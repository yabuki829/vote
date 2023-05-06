import React from 'react'
import { Link} from "react-router-dom"
const Footer = () => {
  return (
    <footer className='w-full'>
      <div className='flex justify-center md:justify-center'>
        <Link to="/rule" className='block text-xs md:text-base hover:underline mx-3'><a href="">利用規約</a> </Link>
        <Link to="/privacypolicy" className='block text-xs md:text-base hover:underline  mx-3'><a href="">プライバシポリシー</a> </Link>
        <a className='block text-xs md:text-base hover:underline mx-3' href="https://twitter.com/vote_selection">Twitter</a>
       
       
      </div>
      <br />
    </footer>
  )
}

export default Footer