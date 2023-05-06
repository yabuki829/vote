import React, { useState } from 'react'
import { postAPIQuestionData } from '../../../methods/Api'
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom"
import { useModal } from 'react-hooks-use-modal';
const Post = () => {
  const [selections, setSelection] = useState([{ id: createRandomId(), text: "" },{ id: createRandomId(), text: "" }])
  const [text,setText] = useState("")
  const [tag,setTag] = useState("")
  const [cookies, setCookie, removeCookie] = useCookies()
  const navigate = useNavigate();

  const [buttonTitle,setButtonTitle] = useState("全体公開")
  const [Modal, open, close, isOpen] = useModal('root', {
    preventScroll: true 
  });

  function handleAddSelection(event: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
    const id = createRandomId()

    setSelection([...selections, {
      id: id,
      text: ""
    }
    ])
  }

  function handleChangeSelectionTitle(event: React.ChangeEvent<HTMLInputElement>, id: string) {
    if (event.target.value.length <= 15){
      setSelection(
        (preSelecitons) => preSelecitons.map((seleciton) => (seleciton.id === id ? { id: id, text: event.target.value } : seleciton))
      )
    }
    
  }

  function handleChangeText(event: React.ChangeEvent<HTMLTextAreaElement>){
    //120文字以下であれば文字を入力し120以上であれば入力させない
    if (event.target.value.length <= 120){
      setText(event.target.value)
    }
   
  }
  //選択肢を削除する
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
  // idを作成
  function createRandomId(): string {
    var S = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789"
    var N = 6
    const id = Array.from(Array(N)).map(() => S[Math.floor(Math.random() * S.length)]).join('')

    return id
  }

  
  // 投稿
  const onClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    //処理
    
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
    .then((vote_id) => {
      console.log(vote_id)
      navigate("/vote/"+vote_id)
    })
    .catch((error) => {
      console.error("エラーが発生しました:", error);
    });
    
   


  };
  return (
    <div>
       <Modal>
      <div className='bg-white p-2'> 
        <div className='px-10'>
          <h1 className='text-center'>確認</h1>
          <hr />
        </div>
        
        <h1 className='px-10 py-5'>削除しますよろしいですか？</h1>
        <hr />
       
        <div className='flex justify-evenly '>
         <button className='w-full'>キャンセル</button>
         <button  className='w-full bg-red-300 hover:bg-red-400'>投稿する</button>
        </div>
       
      </div>
    </Modal>
      <div className="w-4/5 mx-auto p-5 mt-5  ">
        <textarea onChange={(e) => handleChangeText(e)} id="message" value={text} className="block p-2.5 w-full md:text-xl  outline-0 shadow-sm border" placeholder='質問や選択肢の補足を入力'></textarea>
        <div className="sm:col-span-2 pt-10  ">
            <label className="block mb-2 text-2xl font-bold text-gray-500">選択肢</label>
            {selections.map((selection,index) =>
            

              <div key={selection.id} className='flex h-8 mb-2 ' >
                <input type="name" onChange={(e) => handleChangeSelectionTitle(e, selection.id)} id="name" value={selection.text} className="md:w-3/4 shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm focus:ring-primary-500 focus:border-primary-500 block  p-2.5  "placeholder='15文字まで' />
                <button onClick={() => handleDeleteSelection(selection.id)} className='ml-2 border px-2 bg-red-600 text-white text-sm'>削除</button>
                { index == selections.length - 1 && (<> <button  onClick={(e) => handleAddSelection(e)} className='ml-2 border px-2 bg-blue-400 text-white rounded-full'>＋</button></>)}
              </div>
            )}

            </div>
      </div>
      <br />
      <div className='flex justify-center items-center '>
        <button  className='bg-blue-400 text-white p-2 px-2 font-bold'  onClick={(e) => onClick(e)} >
         {buttonTitle}
        </button>
        <button className='h-full border p-2'>
          <span>^</span>
        </button>
      </div>
      <br />
     
    </div>
  )
}

export default Post