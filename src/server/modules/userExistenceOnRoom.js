import { rooms } from "../server.js";

export function userExistenceOnRoom(userRequest){
    let outcome = false 
    for (let i=0; i<rooms.length; i++){
        if (rooms[i].room === userRequest.room)
                rooms[i].members.forEach( member =>{
                    if( member.id === userRequest.id)
                        outcome = true   
                })
    }    
    return outcome
}