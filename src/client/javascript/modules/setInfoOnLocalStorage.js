
import { socket, username } from "../index.js";
import { userIdGenerator } from "./idGen.js";

export function setInfoOnLocalStorage(){
    localStorage.setItem('name', username.value)
    if(!localStorage.id)
    localStorage.setItem('id',userIdGenerator())
    //socket.emit('message')
}