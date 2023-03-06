import { userList,rooms } from "../server.js";

export function logLastSentMessage(listIndex,text){
    console.log(`---------- logLastSentMessage ----------`)
    
    userList[listIndex].lastMessage.text = text
}