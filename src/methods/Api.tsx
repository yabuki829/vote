import React from 'react'
import axios, {  AxiosResponse} from "axios"
import { type } from '@testing-library/user-event/dist/type';
import { Profile, Vote } from '../Type';

//TODO デプロイする時隠す
export const baseURL = "http://127.0.0.1:8000/"

// corsの設定
//"http://127.0.0.1:8000/" だとcookieが保存されない
// http://localhost:8000の部分を合わせないといけない？


export const instance = axios.create({

  baseURL:  "http://localhost:8000/api/",
  timeout: 5000,
  withCredentials: true ,
  headers: {
    "Accept": "application/json",
    "Content-Type": "application/json",
    
  },
})

export type Auth_Login = {
  email: string;
  password: string;
}


export type Auth_Register = {
  email:string
  password: string
  dateOfBirth: number
  gender: number
}

axios.defaults.withCredentials = true;
axios.defaults.headers.post['Access-Control-Allow-Origin'] = '*';

export async function login(auth:Auth_Login){
  //トークン メールアドレス　パスワードが必要
  console.log("api接続します")
  const res = await instance.post("token/",auth)
  
  return res.data
 
}

export async function registerUser(auth:Auth_Register){
  alert("apiに接続します")
  
 
}
//質問を取得する 
//TODO 現在は全て取得になっていて投稿数が多くなったときに動作が重くなるため、取得数を変更したい。

export async function postAPIQuestionData(vote:object){
  console.log("投稿します",vote)
  
  const res =  await instance.post("vote/",vote)
  console.log("ここだよ",res.data)
  
  console.log("--------------投稿完了---------------")
  
  
  
}


export type Change_Profile = {
  nickName:string
  profileImage:File
  bio:string
  isImageNone:false
  // job:string
}

export type Change_Profile_without_image = {
  nickName:string
  bio:string
  isImageNone:true
  // job:string
}


  


type Refresh = {
  isComplete:boolean,
  token:string
}

export function refreshAccessToken(token:string): Promise<Refresh> {
  return axios.post(`${baseURL}authen/jwt/refresh`,{
    refresh: `${token}`
    
  }).then((res)=> {
    const refresh: Refresh = {
      isComplete: true,
      token: res.data["access"]
    }
    return refresh;
  }).catch(()=>{
    const refresh: Refresh = {
      isComplete: false,
      token: ""
    }
    return refresh;
  });
}

export function vertifyToken(token:string) {
  
}

