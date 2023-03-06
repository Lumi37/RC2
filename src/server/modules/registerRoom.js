import { rooms } from "../server.js"
export function registerRoom(userRequest){
    console.log(`---------- registerRoom ----------`)

    rooms.push({
            room:userRequest.room,
            creator:{ //log creator of group
                name:userRequest.creator.name,
                id:userRequest.creator.id
            },
            lastMessage:{},
            members:[{ //log creator as a member too
                name:userRequest.creator.name,
                id:userRequest.creator.id
            }],
            history:[]
    })
    console.log(`Room: ${rooms[rooms.length-1]} succesfully created.`)
    return userRequest.room
}