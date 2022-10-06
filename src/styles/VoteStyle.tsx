 
import React from 'react'
 

 //選択肢のStyle
//投票済みの選択済の場合のスタイル
export const votedChoicedStyle = "  whitespace-nowrap bg-green-300  text-left"
//投票済みだけど選択してない場合
export const voteNotChoicedStyle = "  whitespace-nowrap bg-gray-300 text-left"
 
 
// 投票済みの時ホバーした時に指マークにならないようにするやつ
export const isVotedStyle1 = "flex relative justify-between cursor-default"
//未投票時にホバーした時色が変わる様にするやつ
export const isNotVotedStyle1 = "flex relative justify-between hover:bg-gray-200 "
 
//  const styleBackground = voted ? isVotedStyle1 : isNotVotedStyle1
 
   
//選択肢の上のパーセントを表してる色のやつ?　↓こいつ選択肢のtextにかかってる
export const isVotedStyle2 = " pl-2 bg-opacity-100 absolute"
export const isNotVotedStyle2 = " pl-2 bg-opacity-100 "

//  const styleChoiceText = voted ? isVotedStyle2 : isNotVotedStyle2