import axios, {  AxiosResponse} from "axios"
import { baseURL } from "./Api";



// リフレッシュトークンからアクセストークンを取ってくる
export async function refreshToken(token:string){
  const res = await axios.post(`${baseURL}authen/jwt/refresh`,{
    headers: {
      "Content-Type": "application/json",
    }
  });
}


// アクセストークンを検証する　
export async function verifyToken(){
  const res = await axios.post(`${baseURL}authen/jwt/verify`,{
    headers: {
      "Content-Type": "application/json",
    }
  });
}