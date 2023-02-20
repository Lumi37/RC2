import { userList } from "../server.js";
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
            userList.push({name:name, id:id, connectionStatus:'s'})
            console.log(`New User \nNAME: ${name}\nID: ${id}`)
        }
        else{
            userList.push({name:'unnamed',id:id, connectionStatus:'s'})
            console.log(`New User \nNAME: unnamed\nID: ${id}`)
        }
    }
    console.log(`\n\n`)
}