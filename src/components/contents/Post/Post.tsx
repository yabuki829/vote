import React, { useState } from 'react'

const Post = () => {
  const [selections, setSelection] = useState([{ id: createRandomId(), title: "" }])
  const [text,setText] = useState("")

  
  function handleAddSelection(event: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
    const id = createRandomId()

    setSelection([...selections, {
      id: id,
      title: ""
    }
    ])
  }
  function handleChangeSelectionTitle(event: React.ChangeEvent<HTMLInputElement>, id: string) {
    setSelection(
      (preSelecitons) => preSelecitons.map((seleciton) => (seleciton.id === id ? { id: id, title: event.target.value } : seleciton))
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

    

  };
  // console.log(createRandomId())
  return (
    <div>
      <div className="w-4/5 mx-auto p-5 mt-5  ">
        <div className='flex justify-between'>
          <h1 className='block mb-2 text-4xl font-bold text-gray-900 dark:text-gray-400'>Create</h1>
          <button onClick={(e) => onClick(e)} className='bg-blue-400 text-white p-2 mt-5 rounded hover:bg-blue-600'>投稿する</button>
        </div>
        <div className='mx-5 pt-3'>
          <div className="sm:col-span-2 ">
            <label className="block mb-2 text-2xl font-bold text-gray-900 dark:text-gray-400">内容 <span>{text.length}</span> 文字 </label>
            <textarea onChange={(e) => handleChangeText(e)} id="message" value={text} className="block p-2.5 w-full text-xl text-gray-900 bg-gray-50 rounded-lg shadow-sm border border-gray-300 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder='120文字まで'></textarea>
          </div>
          <div className="sm:col-span-2 pt-10  ">
            <label className="block mb-2 text-2xl font-bold text-gray-900 dark:text-gray-400">選択肢</label>

            {selections.map((selection) =>
              <div className='flex p-3 ' >
                <input type="name" onChange={(e) => handleChangeSelectionTitle(e, selection.id)} id="name" value={selection.title} className="w-4/5  shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block  p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500 dark:shadow-sm-light" placeholder='20文字まで' />
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