import { rooms } from "../server.js";

export function userExistenceOnRoom(userRequest){
    console.log(`---------- userExistenceOnRoom ----------`)

    let outcome = false 
    for (let i=0; i<rooms.length; i++){
        if (rooms[i].room === userRequest.room)
                rooms[i].members.forEach( member =>{
                    if( member.id === userRequest.id){
                        outcome = true   
                        console.log(`${userRequest.name} is already a member of ${userRequest.room}`)
                    }
                })
    }    
    if(!outcome){
        console.log(`${userRequest.name} Isn't a member of ${userRequest.room}`)
    }
    return outcome
}