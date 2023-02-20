import { socket,textTypingArea } from "../index.js";

export function outgoingTextMessage(){
    socket.emit('message',{
        name : localStorage.name,
        id : localStorage.id,
        textMessage : textTypingArea.value,
        type : 'chat-message'
    })
    textTypingArea.value = ''
    
    // if(type === 'list')
    //     //request producelist
        
    // if(type === 'history')
    //     //request producehistory
}