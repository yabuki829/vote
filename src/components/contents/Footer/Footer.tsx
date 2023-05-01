import React from 'react'
import { Link} from "react-router-dom"
const Footer = () => {
  return (
    <footer className='w-full '>
      <div className='flex justify-center md:justify-center'>
        <Link to="/rule" className='block text-xs md:text-base hover:underline '><a href="">利用規約</a> </Link>
        <Link to="/privacypolicy" className='block text-xs md:text-base hover:underline '><a href="">プライバシーポリシー</a> </Link>
        <a className='mx-2 block text-xs md:text-base hover:underline' href="https://twitter.com/sdi2025">Twitter</a>
       
       
      </div>
    </footer>
  )
}

export default Footer