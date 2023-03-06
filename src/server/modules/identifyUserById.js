import { userList } from "../server.js";

export function identifyUserById(name,id){
    console.log(`---------- identifyUserById ----------`)
    let userExistenceOnList = false
    userList.forEach(user=>{
        if(user.id === id){
            userExistenceOnList = true
            if(user.name === name){
                console.log(`user identified as ${user.name}`)
                return true
            }
            else{
                console.log(`user identified as ${name} previously known as ${user.name}`)
                user.name = name 
                return true
            }
        }
   })
   return false
    // if (userExistenceOnList  === false ){
    //     if(name){
    //         console.log('eimaialogo')
    //         userList.push({
    //             name:name,
    //             id:id,
    //             connectionStatus:{
    //                 status:'offline', 
    //                 date:{years:0, months:0, days:0, hours:0, minutes:0}, 
    //                 offlineDifference:{years:0, months:0, days:0, hours:0, minutes:0} 
    //             },
    //             lastMessage:{ text:'', date:'' },
    //             profilePicturePathname:`images/darkmode/default.png`,
    //             socketId:''
    //         })
    //         console.log(`New User \nNAME: ${name}\nID: ${id}`)
    //     }
    //     else{
    //         userList.push({
    //             name:'unnamed',
    //             id:id,
    //             connectionStatus:{
    //                 status:'offline',
    //                 date:{years:0, months:0, days:0, hours:0, minutes:0},
    //                 offlineDifference:{years:0, months:0, days:0, hours:0, minutes:0}
    //              },
    //             lastMessage:{ text:'', date:'' },
    //             profilePicturePathname:`images/darkmode/default.png`,
    //             socketId:''

    //         })
    //         console.log(`New User \nNAME: unnamed\nID: ${id}`)
    //     }
    // }
    // console.log(`\n\n`)
}



// // export const  userList = [{
//     name:'',
//     id:'', 
//     connectionStatus:{ status:'offline', date:'' }, 
//     lastMessage:{ text:'', date:{years:0, months:0, days:0, hours:0, minutes:0} }
// }]
// // 