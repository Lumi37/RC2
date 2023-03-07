

export function getOnlineUsersOfGroup(room,onlineUsers){
    console.log(`----------  getOnlineUsersOfGroup ----------`)

    let groupOnlineUsers
    console.log(room)
    groupOnlineUsers = onlineUsers.filter( user => room.members.some(member=> user.id === member.id))
    groupOnlineUsers.forEach(user=>console.log(`user: ${user.name}`))
    return groupOnlineUsers
}