import React, { useState } from 'react'
import { postAPIQuestionData } from '../../../methods/Api'
import { useCookies } from "react-cookie";
const Post = () => {
  const [selections, setSelection] = useState([{ id: createRandomId(), text: "" }])
  const [text,setText] = useState("")
  const [tag,setTag] = useState("")
  const [cookies, setCookie, removeCookie] = useCookies()
  
  function handleAddSelection(event: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
    const id = createRandomId()

    setSelection([...selections, {
      id: id,
      text: ""
    }
    ])
  }
  function handleChangeSelectionTitle(event: React.ChangeEvent<HTMLInputElement>, id: string) {
    setSelection(
      (preSelecitons) => preSelecitons.map((seleciton) => (seleciton.id === id ? { id: id, text: event.target.value } : seleciton))
    )
  }
  function handleChangeText(event: React.ChangeEvent<HTMLTextAreaElement>){
    //120文字以下であれば文字を入力し120以上であれば入力させない
    if (event.target.value.length <= 120){
      setText(event.target.value)
    }
   
  }
  function handleDeleteSelection(id: string) {
    //イベントを削除する
    if (selections.length > 2){
      console.log(id, "を削除します")
      setSelection(selections.filter((selection) => selection.id !== id));
    }
    else {
      alert("最低二つ選択肢が必要です")
    }
    
  }
  function createRandomId(): string {
    var S = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789"
    var N = 6
    const id = Array.from(Array(N)).map(() => S[Math.floor(Math.random() * S.length)]).join('')

    return id
  }

  


  const onClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    //処理
    alert("投稿する")
    alert(text)
    
    console.log("質問内容",text)
    const token = cookies.token 
    const voteData= {
      questionText: text,
      image: null,
      tag:tag,
      isOnlyLoginUser: true,
      choices: selections,
    } 
    postAPIQuestionData(voteData,token)
    

  };
  // console.log(createRandomId())
  return (
    <div>
      <div className="w-4/5 mx-auto p-5 mt-5  ">
        <div className='flex justify-between'>
          <h1 className='block mb-2 text-4xl font-bold text-gray-900  underline'>Create</h1>
          <button onClick={(e) => onClick(e)} className='bg-blue-400 text-white p-2 mt-5 rounded hover:bg-blue-600'>投稿する</button>
        </div>
        <div className='mx-5 pt-3'>
          <div className="sm:col-span-2 ">
            
            <textarea onChange={(e) => handleChangeText(e)} id="message" value={text} className="block p-2.5 w-full text-xl  outline-0 shadow-sm border" placeholder='質問や選択肢の補足を入力'></textarea>
            <div className='flex justify-end'>
            <label className="block mb-2 text-2xl font-bold ">{text.length}/120 </label>
            </div>
           
          </div>
          <div className='pt-2 sm:col-span-2'>
            <label className="block mb-2 text-2xl font-bold ">タグ</label>
            <input onChange={(e) => setTag(e.target.value)} value={tag}  type="text"  id="text"  className="w-4/5 shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm focus:ring-primary-500 focus:border-primary-500 block  p-2.5 " placeholder='関連するタグを入力' />
          </div>
          <div className="sm:col-span-2 pt-10  ">
            <label className="block mb-2 text-2xl font-bold text-gray-500">選択肢</label>

            {selections.map((selection) =>
              <div className='flex p-3 ' >
                <input type="name" onChange={(e) => handleChangeSelectionTitle(e, selection.id)} id="name" value={selection.text} className="w-4/5  shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm focus:ring-primary-500 focus:border-primary-500 block  p-2.5 "placeholder='15文字まで' />
                <button onClick={() => handleDeleteSelection(selection.id)} className='block px-3 ml-5 bg-red-400 text-center text-white rounded-md hover:bg-red-600'>削除</button>
              </div>
            )}
           
            
            
            <div className='flex justify-center'>
              <button onClick={(e) => handleAddSelection(e)} className='border border-black p-1 mt-5 rounded'>追加する</button>
            </div>

          </div>
        </div>


      </div>
    </div>
  )
}

export default Post