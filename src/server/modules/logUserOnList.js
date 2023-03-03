import { userList } from "../server.js"
export function logUserOnList(name,id){
        
            userList.push({
                name:name,
                id:id,
                connectionStatus:{
                    status:'offline', 
                    date:{years:0, months:0, days:0, hours:0, minutes:0}, 
                    offlineDifference:{years:0, months:0, days:0, hours:0, minutes:0} 
                },
                lastMessage:{ text:'', date:'' },
                profilePicturePathname:`images/darkmode/default.png`,
                socketId:''
            })
            console.log(`New User \nNAME: ${name}\nID: ${id}`)        
}