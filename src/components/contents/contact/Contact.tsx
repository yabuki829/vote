import React from 'react'
import { useForm, SubmitHandler } from "react-hook-form";
import emailjs from '@emailjs/browser';
import Footer from '../Footer/Footer';

//  いい名前見つけたら変更する
//  ここのContactでしか使用してない

type Email_Send = {
  email: string;
  username:string
  message:string
}

const Contact = () => {
  const { register, handleSubmit,formState: { errors } } = useForm<Email_Send>()

  const handleSendEmail: SubmitHandler<Email_Send> = async data =>{
    //メールを送信する
    const publicKey = `${process.env.REACT_APP_PUBLIC_KEY}`
    const serviceID = `${process.env.REACT_APP_SERVICE_ID}`
    const templateID = `${process.env.REACT_APP_TEMPLATE_ID}`
    console.log("送信します")
    console.log(data["email"])
    const templateParams = {
      from_email: data["email"],
      from_name: data["username"],
      message: data["message"]
    };
    console.log(process.env.REACT_APP_PUBLIC_KEY)
    console.log(serviceID)
    console.log(templateID)
    
    emailjs.send(serviceID,templateID, templateParams,publicKey)
    .then(function(response) {
      console.log('SUCCESS!', response.status, response.text);

      alert("送信しました。内容を確認し次第返信いたします。")
   }, function(error) {
    console.log("-----------------------")
    console.log(error)
    alert("現在アクセスが多いためTwitterDMからお願いいたします。")
   });

  };

  return (

      <section className="bg-white ">
        
        <div className="py-8 lg:py-16 px-4 mx-auto max-w-screen-md">
          <h2 className="mb-4 text-4xl tracking-tight font-extrabold text-center text-gray-900 ">Contact Us</h2>
          
          <form onSubmit={handleSubmit(handleSendEmail)} className="space-y-8 mx-10 md:mx-0">
            <div>
              <label  className="block mb-2 text-sm font-medium text-gray-900 ">名前</label>
              <input  {...register("username", { required: true, maxLength: 20 })}  type="name" id="name" className="w-full shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm  focus:ring-primary-500 focus:border-primary-500 block  p-2.5 " placeholder="名前"  />
              {errors.username?.type === 'required' && <p className='text-gray-600 text-sm' role="alert">名前を入力してください</p>}
            </div>
            <div>
              <label  className="block mb-2 text-sm font-medium text-gray-900 ">メールアドレス</label>
              <input  {...register("email", { required: true, maxLength: 20 })}  type="email" id="email" className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm  focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 " placeholder="name@example.com"  />
              {errors.email?.type === 'required' && <p className='text-gray-600 text-sm' role="alert">メールアドレスを入力してください</p>}
            </div>
           
            <div className="sm:col-span-2">
              <label className="block mb-2 text-sm font-medium text-gray-900 ">お問合せ内容</label>
              <textarea  {...register("message", { required: true })}  id="message" className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50  shadow-sm border border-gray-300 focus:ring-primary-500 focus:border-primary-500 " ></textarea>
              {errors.message?.type === 'required' && <p className='text-gray-600 text-sm' role="alert">お問合せ内容を入力してください</p>}
            </div>
            <div className='flex justify-center'>
            <input className='bg-blue-500 text-white font-bold px-8 py-2 m-5 cursor-pointer hover:bg-blue-400' type="submit" value="送信する" />
            </div>
          </form>
          
          <br />
           <p className='text-center'><span><a className='text-blue-400 hover:underline' href="https://twitter.com/sdi2025" target="_blank">Twiiter</a></span> からのご連絡でも大丈夫です！</p>          
        </div>
       <Footer/>
      </section>
    
  )
}

export default Contact