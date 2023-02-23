import { userList,__dirname } from "../server.js";
export function identifyUserById(name,id){
    console.log(`---------- IDENTIFYING USER BY ID ----------`)
    let userExistanceOnList = false
    userList.forEach(user=>{
        if(user.id === id){
            userExistanceOnList = true
            if(user.name === name){
                console.log(`user identified as ${user.name}`)
            }
            else{
                console.log(`user identified as ${name} previously known as ${user.name}`)
                user.name = name 
            }
        }
   })
    if (userExistanceOnList  === false ){
        if(name){
            userList.push({
                name:name,
                id:id,
                connectionStatus:{ status:'offline', date:{years:0, months:0, days:0, hours:0, minutes:0}, offlineDifference:{years:0, months:0, days:0, hours:0, minutes:0} },
                lastMessage:{ text:'', date:'' },
                profilePicturePathname:`images/darkmode/default.png`,
                socketId:''
            })
            console.log(`New User \nNAME: ${name}\nID: ${id}`)
        }
        else{
            userList.push({
                name:'unnamed',
                id:id,
                connectionStatus:{ status:'offline', date:{years:0, months:0, days:0, hours:0, minutes:0}, offlineDifference:{years:0, months:0, days:0, hours:0, minutes:0} },
                lastMessage:{ text:'', date:'' },
                profilePicturePathname:`images/darkmode/default.png`,
                socketId:''

            })
            console.log(`New User \nNAME: unnamed\nID: ${id}`)
        }
    }
    console.log(`\n\n`)
}



// // export const  userList = [{
//     name:'',
//     id:'', 
//     connectionStatus:{ status:'offline', date:'' }, 
//     lastMessage:{ text:'', date:{years:0, months:0, days:0, hours:0, minutes:0} }
// }]
// // 