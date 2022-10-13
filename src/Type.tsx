import { type } from "@testing-library/user-event/dist/type";


export type Vote = {
  id:string;
  user:Profile
  questionText:string
  createdAt:string
  image:string
  isOnlyLoginUser:boolean
  // 今後stringに変更する
  choices:Array<Choice>
  //全体の投稿数がほしいな
  numberOfVotes:Array<User>
}


 
export type Choice ={
  id:string
  text:string
  votedUserCount:Array<User>
}

export type Profile ={
  id:string
  nickName:string
  user:User
  createdAt:string
  image:string
}
export type User ={
  id: string
}


export type Thread = {
  id:number
  user:Profile
  vote:Vote
  title:string
  createdAt:string
} 


export type Comment = {
  id: string
  user:Profile
  text:string
  createdAt:string
}


export const defaultUser:User = {
  id:""
}


export const defaultProfile:Profile = {
  id:"",
  nickName:"No Name",
  user:defaultUser,
  createdAt:"",
  image:""
}

export const defaultVote:Vote = {
  id:"",
  user:defaultProfile,
  questionText:"読み込み中~",
  createdAt:"",
  image:"",
  isOnlyLoginUser:false,
  // 今後stringに変更する
  choices:[],
  //全体の投稿数がほしいな
  numberOfVotes:[]
}
export const defaultThread:Thread = {
  id:1,
  user:defaultProfile,
  vote: defaultVote,
  title:"",
  createdAt:""
}

