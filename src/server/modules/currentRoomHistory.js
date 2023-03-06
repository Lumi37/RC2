import { rooms } from "../server.js";

export function currentRoomHistory(room){
    console.log(`----------  currentRoomHistory ----------`)
    for (let i=0; i<rooms.length; i++)
        if(room === rooms[i].room)
            return rooms[i].history

}