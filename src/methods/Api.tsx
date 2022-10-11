import React from 'react'
import axios, {  AxiosResponse} from "axios"
import { type } from '@testing-library/user-event/dist/type';
import { Vote } from '../Type';

//TODO デプロイする時隠す
export const baseURL = "http://127.0.0.1:8000/"

export type Auth_Login = {
  email: string;
  password: string;
}



export async function login(auth:Auth_Login){
  //トークン メールアドレス　パスワードが必要
  console.log("api接続します")
  const res = await axios.post(`${baseURL}authen/jwt/create`,auth,{
    headers: {
      "Content-Type": "application/json",
    }
  });
  const token =  res.data["access"]
  return res.data["access"]
 
}

export async function registerUser(auth:Auth_Login){
  console.log("apiに接続します")
  const res = await axios.post(`${baseURL}api/register/`,auth,{
    headers: {
      "Content-Type": "application/json",
    }
  });
  console.log("データ登録",res.data)
  //user情報が返ってくるはず　
  //cookieにnicknameだけ保存したい
  return res.data
}

//質問を取得する 
//TODO 現在は全て取得になっていて投稿数が多くなったときに動作が重くなるため、取得数を変更したい。

export async function postAPIQuestionData(vote:any,token:string){
  console.log("投稿します",vote)
  const res = await axios.post(`${baseURL}api/vote/`,vote,{
    headers: {
      "Content-Type": "application/json",
      Authorization: "JWT " + `${token}`
    }
  });
  console.log("--------------投稿完了---------------")
  console.log(res)
  
  return res.data
}

export async function postAPIRegisterProfile(auth:Auth_Login,token:string){
  console.log("profileを作成します")
  const res = await axios.post(`${baseURL}api/profile/`,auth,{
    headers: {
      "Content-Type": "application/json",
      Authorization: "JWT " + `${token}`
    }

    
  })
  
  return res.data
}

//投票する
export async function putAPISelectChoice(choiceID:string,token:string,voteID:string){
  
  const res = await axios.put(`${baseURL}api/vote/${voteID}/`,choiceID,{
    headers: {
      "Content-Type": "application/json",
      Authorization: "JWT " + `${token}`
    }
  });

  return res.data
}


export async function postAPIThread(token:string,vote_id:string,title:string){
  //vote id
  //title
  const data = {
    vote_id:vote_id,
    thread_title:title
  }
  const res = await axios.post(`${baseURL}api/thread/`,data,{
    headers: {
      "Content-Type": "application/json",
      Authorization: "JWT " + `${token}`
    }
  });
  return res.data
}
export async function postAPIThreadComment(){

}