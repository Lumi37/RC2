import { rooms } from "../server.js"

export function roomExistenceByName(roomName){
    for (let i=0; i<rooms.length; i++){
        if (rooms[i].room === roomName){
            return true 
        }
    }
    return false 
}