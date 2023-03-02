import {oneToOneRooms} from "../server.js";
export function registerOneToOneRoom(userRequest){
    let privateRoomName
    if(oneToOneRooms.filter(e=> e.room === userRequest.userId+':'+userRequest.otherUserId).length>0){
        privateRoomName = userRequest.userId+':'+userRequest.otherUserId
        return privateRoomName
    }
    else if(oneToOneRooms.filter(e=> e.room === userRequest.otherUserId+':'+userRequest.userId).length>0) {
        privateRoomName = userRequest.otherUserId+':'+userRequest.userId
        return privateRoomName
    }
    else{
        privateRoomName = userRequest.userId+':'+userRequest.otherUserId
        oneToOneRooms.push({
            room:privateRoomName,
            receivers:[ userRequest.userId, userRequest.otherUserId]
        })
        return privateRoomName
    }
}