import { rooms } from "../server.js"
export function registerRoom(userRequest){
    rooms.push({
            room:userRequest.room,
            creator:{ //log creator of group
                name:userRequest.creator.name,
                id:userRequest.creator.id
            },
            lastMessage:{
            name:'',
            text:''
            },
            members:[{ //log creator as a member too
                name:userRequest.creator.name,
                id:userRequest.creator.id
            }]
    })
    return userRequest.room
}