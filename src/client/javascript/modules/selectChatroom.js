import { selectedChatRoom } from "../index.js"
export function selectChatroom(room){
    console.log('selecting chatroom: ',room)
    selectedChatRoom.innerHTML = room
}