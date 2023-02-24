import { userList } from "../server.js";
export function refreshListOnAllClients(socket){
    socket.emit('message',{list:userList,type:'list'})
    socket.broadcast.emit('message',{list:userList,type:'list'})
}