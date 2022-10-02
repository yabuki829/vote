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
  numberOfVotes:number
}


export type Choice ={
  id:string
  text:string
  votedUserCount:number
}

export type Profile ={
   //今後uuid(string)に変更する
  id:number
  nickName:string
  user:User
  createdAt:string
  image:string
}
export type User ={
  //今後uuid(string)に変更する
  id:number
}

