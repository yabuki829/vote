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




//保存してるデータ　
// token,

export async function login(auth:Auth_Login){
  //トークン メールアドレス　パスワードが必要
  // const [cookies, setCookie, removeCookie] = useCookies();
  console.log("api接続します")
  const res = await axios.post(`${baseURL}authen/jwt/create`,auth,{
    headers: {
      "Content-Type": "application/json",
    }
  });
  
  const token =  res.data["access"]
  // setCookie("token",token)
  return res.data["access"]

 
}

export async function register(auth:Auth_Login){
  const res = await axios.post(`${baseURL}api/register`,auth,{
    headers: {
      "Content-Type": "applicaiton/json",
    }
  });
  console.log("データ登録",res.data)
  const token =  res.data["access"]

  //user情報が返ってくるはず
  return res.data
}
