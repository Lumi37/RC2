import { userList,rooms } from "../server.js";
export function subscribeMemberToRoom(room,listIndex){
    console.log(`---------- subscribeMemberToRoom ----------`)
    
    let alreadyMember = false
    if( !userList[listIndex].groupMemberOf.includes(room) )
        userList[listIndex].groupMemberOf.push(room)
    else 
        alreadyMember = true 
    if(!alreadyMember)
        for(let i=0; i < rooms.length; i++){
            if( rooms[i].room === room){
                rooms[i].members.push({name:userList[listIndex].name ,id:userList[listIndex].id})
            }        
        }
    else
        console.log(`${userList[listIndex].name}, is already a member of: ${room}`)
   
   
    // for(let i=0; i < rooms.length; i++){
    //     // for(let j=0; j < userList[listIndex].groupMemberOf.length; j++)
    //     //     if( !(room === userList[listIndex].groupMemberOf[j]) )

    // }

}