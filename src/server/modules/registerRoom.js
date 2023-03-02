import { rooms } from "../server.js"
export function registerRoom(userRequest){

        rooms.push({
             room:userRequest.room,
             creator:{
                 name:userRequest.creator.name,
                 id:userRequest.creator.id
             },
             lastMessage:{
                name:'',
                text:''
             }
        })
        return userRequest.room

}