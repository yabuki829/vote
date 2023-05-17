import axios, {  AxiosResponse} from "axios"
import { baseURL, instance } from "./Api";

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
  instance.post("activate/",data)
  .then((res:AxiosResponse<result_data>) => {
    if (res.data.message == "success"){
      return true
    }
    else {
      return false
    }
      
  });
  return false
}