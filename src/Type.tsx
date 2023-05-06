import { type } from "@testing-library/user-event/dist/type";


export type Result_Vote = {
  count:number
  next: string
  previous :string
  results: Array<Vote>

}

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
  tag:Tag
}

type Tag = {
  title:string
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
  bio:string
}
export type User ={
  id: string
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
  image:"",
  bio:""
}

export const defaultVote:Vote = {
  id: "",
  user: defaultProfile,
  questionText: "読み込み中~",
  createdAt: "",
  image: "",
  isOnlyLoginUser: false,
  // 今後stringに変更する
  choices: [],
  //全体の投稿数がほしいな
  numberOfVotes: [],
  tag: {title:""}
}

export type Edit_Profile = {
  nickName:string
  profileImage:string
  job:string
  produce:string
}


