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
/*
{
  "id": "1e190539-5723-4550-b165-61c5b016de5f",
  "user": {
      "id": 1,
      "nickName": "藪木",
      "user": {
          "id": 1,
          "email": "test@test.com"
      },
      "createdAt": "2022-09-24",
      "image": null
  },
  "questionText": "取得すべき言語は？",
  "createdAt": "2022-09-24",
  "image": null,
  "isOnlyLoginUser": false,
  "choices": [
      {
          "id": "cff2f53a-facc-44c3-8ed8-126bdaf59694",
          "text": "Go",
          "votedUserCount": []
      },
      {
          "id": "afd2aaf9-1186-4e30-8cf7-2acc93173156",
          "text": "Swift",
          "votedUserCount": []
      },
      {
          "id": "dcdf5f2d-675b-4ae7-9245-40f4cf0cabe9",
          "text": "Python",
          "votedUserCount": []
      }
  ]
},




 {
    "id": 1,
    "nickName": "藪木",
    "user": {
        "id": 1
    },
    "createdAt": "2022-09-24",
    "image": null
  }

*/


