import axios, {  AxiosResponse} from "axios"
import { baseURL } from "./Api";

type result_data = {
  message:string
}

type data_type = {
  uidb64:string
  token:string
}

export function activate(uidd64:string,token:string){
  const data:data_type =  {
    uidb64:uidd64,
    token: token
  }
  const res = axios.post(`${baseURL}api/activate/`,data,{
    headers: {
      "Content-Type": "application/json",
    }
  }).then((res:AxiosResponse<result_data>) => {
      alert(res.data.message) 
  });
}