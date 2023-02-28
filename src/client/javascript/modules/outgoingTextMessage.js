import { socket,textTypingArea,selectedChatRoom } from "../index.js";

export function outgoingTextMessage(){
    socket.emit('message',{
        name : localStorage.name,
        id : localStorage.id,
        textMessage : textTypingArea.value,
        type : 'chat-message',
        messageTo:selectedChatRoom.innerHTML
    })
    textTypingArea.value = ''
}