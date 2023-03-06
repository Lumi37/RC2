import { rooms } from "../server.js"

export function roomExistenceByName(roomName){
    console.log(`---------- roomExistenceByName ----------`)

    for (let i=0; i<rooms.length; i++){
        if (rooms[i].room === roomName){
            console.log(`Room: ${roomName}, exists`)
            return true 
        }
    }
    console.log(`Room: ${roomName}, does not exist`)
    return false 
}