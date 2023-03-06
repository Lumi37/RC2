import { userList,rooms } from "../server.js"

export function logHistoryOnRoom(userRequest,listIndex){
    console.log(`---------- logHistoryOnRoom ----------`)
    //console.log(userList[listIndex].profilePicturePathname)
    for(let i=0; i<rooms.length; i++)
        if(userRequest.room === rooms[i].room){
            rooms[i].history.push({
                name:userRequest.name, 
                id:userRequest.id, 
                text:userRequest.text, 
                type:'chat-message',
                room:userRequest.room, 
                profilePicturePathname:`images/darkmode/default.png`
                // profilePicturePathname:userList[listIndex].profilePicturePathname
            })


            rooms[i].lastMessage = {
                name:userRequest.name, 
                id:userRequest.id, 
                text:userRequest.text, 
                type:'chat-message',
                room:userRequest.room, 
                profilePicturePathname:`images/darkmode/default.png`
            } 
        }
}