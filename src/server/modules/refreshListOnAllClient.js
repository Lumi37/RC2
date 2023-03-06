import { userList,rooms } from "../server.js";
export function refreshListOnAllClients(socket){
    console.log(`---------- refreshListOnAllClients ----------`)
    console.log('Refreshing List ...')
    socket.emit('message',{userList:userList,rooms:rooms,type:'list'})
    socket.broadcast.emit('message',{userList:userList,rooms:rooms,type:'list'})
}