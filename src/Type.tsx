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
