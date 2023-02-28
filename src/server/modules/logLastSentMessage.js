import { userList } from "../server.js";

export function logLastSentMessage(listIndex,text){
    userList[listIndex].lastMessage.text = text
}