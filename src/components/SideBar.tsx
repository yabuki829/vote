import React from 'react'


type Props =  {
  isOpen:boolean
  setSideBarOpen:React.Dispatch<React.SetStateAction<boolean>>;
}
const SideBar: React.FC<Props> = ( props: Props) => {
  function handleOpenSideBar(){
    props.setSideBarOpen((preState) => !preState)
  }
  return (
    <nav className='w-52 bg-indigo-900 text-white h-screen md:p-4 '>
      <h1 className='font-bold text-2xl sm:text-3xl '>Vote</h1>
      <ul className='mt-10 flex-grow'>
        <li>
          <a href="" className='block px-4 py-2 hover:bg-indigo-700 rounded-md '>ホーム</a>
        </li>
        <li>
          <a href="" className='block px-4 py-2 hover:bg-indigo-700 rounded-md'>投票箱</a>
        </li>
        <li>
          <a href="" className='block px-4 py-2 hover:bg-indigo-700 rounded-md'>スレッド</a>
        </li>
        <li>
          <a href="" className='block px-4 py-2 hover:bg-indigo-700 rounded-md'>お問い合せ</a>
        </li>
        <li className=' bg-blue-400 text-center mt-10 p-5 rounded'>
          <a href="/">投票を作成する</a>
        </li>
      </ul>

     
    </nav>
  )
}

export default SideBar