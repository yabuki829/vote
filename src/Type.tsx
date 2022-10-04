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
   //今後uuid(string)に変更する
  id:string
  nickName:string
  user:User
  createdAt:string
  image:string
}
export type User ={
  //今後uuid(string)に変更する
  id:string
}


export type Thread = {
  id:number
  user:Profile
  vote:Vote
  title:string
  createdAt:string
} 

// {
//   "id": 3,
//   "user": {
//       "id": "1239487e-3655-48a7-8dd2-d2573a3a7aa6",
//       "nickName": "test",
//       "user": {
//           "id": "0d7e135f-05c8-4169-8b48-b68856d83259"
//       },
//       "createdAt": "2022-10-03",
//       "image": null
//   },
//   "vote": {
//       "id": "ae7a8af0-4e5b-4a89-8f55-eb9a9b82d074",
//       "user": {
//           "id": "1239487e-3655-48a7-8dd2-d2573a3a7aa6",
//           "nickName": "test",
//           "user": {
//               "id": "0d7e135f-05c8-4169-8b48-b68856d83259"
//           },
//           "createdAt": "2022-10-03",
//           "image": null
//       },
//       "questionText": "エンジニアとして必要な能力",
//       "createdAt": "2022-10-04T11:10:29.181476+09:00",
//       "image": null,
//       "isOnlyLoginUser": true
//   },
//   "title": "test",
//   "createdAt": "2022-10-04"
// }