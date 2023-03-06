import {oneToOneRooms} from "../server.js";
export function registerOneToOneRoom(userRequest){
    console.log(`---------- registerOneToOneRoom ----------`)
    let privateRoomName
    if(oneToOneRooms.filter(e=> e.room === userRequest.userId+':'+userRequest.otherUserId).length>0){
        privateRoomName = userRequest.userId+':'+userRequest.otherUserId
        console.log(`One to One Room --> ${privateRoomName}`)
        return privateRoomName
    }
    else if(oneToOneRooms.filter(e=> e.room === userRequest.otherUserId+':'+userRequest.userId).length>0) {
        privateRoomName = userRequest.otherUserId+':'+userRequest.userId
        console.log(`One to One Room --> ${privateRoomName}`)
        return privateRoomName
    }
    else{
        privateRoomName = userRequest.userId+':'+userRequest.otherUserId
        oneToOneRooms.push({
            room:privateRoomName,
            receivers:[ userRequest.userId, userRequest.otherUserId],
            lastMessage:{},
            members:[],
            history:[]
        })
        console.log(`One to One Room --> ${privateRoomName}`)
        return privateRoomName
    }
}