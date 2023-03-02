import { userList,rooms } from "../server.js";
export function refreshListOnAllClients(socket){
    socket.emit('message',{userList:userList,rooms:rooms,type:'list'})
    socket.broadcast.emit('message',{userList:userList,rooms:rooms,type:'list'})
}