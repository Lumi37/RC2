import { userList } from "../server.js";


export function getOnlineUsers(){
    console.log(`----------  getOnlineUsers ----------`)
    let onlineUsers = userList.filter(user =>user.connectionStatus.status === 'online')
    console.log('Online Users : ',onlineUsers.length)
    onlineUsers.forEach(user=>console.log(`user: ${user.name}`))
    return onlineUsers
}