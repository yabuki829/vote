import React from 'react'

const Footer = () => {
  return (
    <footer className='w-full '>
      <div className='flex justify-between md:justify-center'>
        <a className='mx-2 block text-xs md:text-base hover:underline' href="">利用規約</a>
        <a className='mx-2 block text-xs md:text-base hover:underline' href="">プライバシーポリシー</a>
        <a className='mx-2 block text-xs md:text-base hover:underline' href="https://twitter.com/sdi2025">Twitter</a>
      </div>
    </footer>
  )
}

export default Footer