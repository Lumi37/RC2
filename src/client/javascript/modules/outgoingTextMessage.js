import { socket,textTypingArea,selectedChatRoom } from "../index.js";
import{chatDisplay} from './incomingTextMessage.js'
export function outgoingTextMessage(){
    socket.emit('message',{
        name : localStorage.name,
        id : localStorage.id,
        textMessage : textTypingArea.value,
        type : 'chat-message',
        messageTo:selectedChatRoom.innerHTML
    })
    chatDisplay.innerHTML += `
    <div class="userTextWrap">
        <img class="textUserIcon" src="images/darkmode/default.png" alt="images/darkmode/default.png">
     <div class="userText">${textTypingArea.value}</div>
    </div>`
    textTypingArea.value = ''
}