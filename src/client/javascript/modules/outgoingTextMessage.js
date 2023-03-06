import { socket,textTypingArea,selectedChatRoom } from "../index.js";
import{chatDisplay} from './incomingTextMessage.js'
export function outgoingTextMessage(){
    socket.emit('message',{
        name : localStorage.name,
        id : localStorage.id,
        text : textTypingArea.value,
        type : 'chat-message',
        room:selectedChatRoom.innerHTML
    })
    chatDisplay.innerHTML += `
    <div class="userTextWrap">
        <img class="textUserIcon" src="images/darkmode/default.png" alt="images/darkmode/default.png">
     <div class="userText">${textTypingArea.value}</div>
    </div>`
    textTypingArea.value = ''
}