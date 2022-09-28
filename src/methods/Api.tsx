import React from 'react'
import axios, {  AxiosResponse} from "axios"
import { type } from '@testing-library/user-event/dist/type';
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

export async function register(auth:Auth_Login){
  const res = await axios.post(`${baseURL}api/register`,auth,{
    headers: {
      "Content-Type": "applicaiton/json",
    }
  });
  console.log("データ登録",res.data)
  //user情報が返ってくるはず
  return res.data
}

