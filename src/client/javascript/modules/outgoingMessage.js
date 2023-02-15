import { socket,username } from "../index.js";

export function outgoingMessage(msg){
    socket.emit('message',{name:username,message:msg})

}