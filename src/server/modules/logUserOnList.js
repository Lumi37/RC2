import { userList } from "../server.js"
export function logUserOnList(name,id){
    console.log(`---------- logUserOnList ----------`)
        
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
                socketId:'',
                groupMemberOf:['global']
            })
            console.log(`New User \nNAME: ${name}\nID: ${id}`)        
}