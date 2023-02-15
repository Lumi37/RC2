import { socket,username } from "../index.js";

export function outgoingMessage(msg,type){
    if(type==='chat message')
        socket.emit('message',{name:username.value,message:msg,type:type})
    // if(type === 'list')
    //     //producelist
        
    // if(type === 'history')
    //     //producehistory
}