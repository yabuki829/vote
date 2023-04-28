import axios, {  AxiosResponse} from "axios"
import { baseURL } from "./Api";

type result_data = {
  message:string
}



export function isAuthenticate(token:string):boolean{
 return false
}