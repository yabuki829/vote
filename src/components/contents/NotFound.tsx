import React from 'react'
import {Link} from "react-router-dom"
const NotFound = () => {
  return (
    <div className='text-center'>
      <br />
      <h1 className='text-2xl'>お探しのページは見つかりません。</h1>
      <br />
      <p className='pt-4'>お探しのページは一時的にアクセスができない状況にあるか、
          移動もしくは削除された可能性があります。
      </p>
      <p> また、URL、ファイル名にタイプミスがないか再度ご確認ください。</p>

      <div className='flex justify-center'>
        <Link to="/" className=' m-10 px-5 py-3 rounded-lg bg-blue-400 text-white text-center'>トップに戻る</Link>
      </div>
      
    </div>
  )
}
export default NotFound