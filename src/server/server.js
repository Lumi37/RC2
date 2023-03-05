import express from 'express'
import fileUpload  from 'express-fileupload'
import lodash from 'lodash'
import { Server } from 'socket.io'
import http from 'http'
import { logLastSentMessage } from './modules/logLastSentMessage.js'
import { identifyTypeOfRequest } from './modules/identifyTypeOfRequest.js'
import { identifyUserById } from './modules/identifyUserById.js'
import { handleUploadedFile } from './modules/handleUploadedFile.js'
import { disconnectTimeCapture } from './modules/disconnectTimeCapture.js'
import {disconnectedTimeUpdate} from './modules/disconnectedTimeUpdate.js'
import { refreshListOnAllClients } from './modules/refreshListOnAllClient.js'
import { registerOneToOneRoom } from './modules/registerOneToOneRoom.js'
import { registerRoom } from './modules/registerRoom.js'
import { roomExistenceByName } from './modules/roomExistenceByName.js'
import { logUserOnList } from './modules/logUserOnList.js'
import { userExistenceOnRoom } from './modules/userExistenceOnRoom.js'

const app = express()
const server = http.createServer(app)
export const __dirname = new URL('.', import.meta.url).pathname
const io = new Server(server)
app.use(fileUpload({
    limits: {
        fileSize: 20000000 //20 MB
    }
}));

app.post('/',function(req,res){
    handleUploadedFile(req,res)
})

app.use(express.static(`${__dirname}../client`))
export let  userList =[]
//  [{
//     name:'',
//     id:'', 
//     connectionStatus:{
//         status:'offline',
//         date:{ years:0, months:0, days:0, hours:0, minutes:0 },
//         offlineDifference:{ years:0, months:0, days:0, hours:0, minutes:0 }
//     }, 
//     lastMessage:{ text:'', date:'' },
//     profilePicturePathname:'',
//     socketId:''
// }]
export let oneToOneRooms= [] 
export let rooms = [{
    room:'global',
    creator:{
        name:'',
        id:''
    },
    lastMessage:{
        name:'',
        text:''
    },
    members:[]
}]            


io.on('connection',socket=>{
    let currentRoom = 'global'
    socket.join(currentRoom)
    socket.emit('message',{room:currentRoom,type:'selectedRoom'})
   
    socket.on('message',(userRequest)=>{
        console.log(userRequest)
        let requestType = identifyTypeOfRequest(userRequest.type)
        console.log('TYPE OF REQUEST --->',requestType)

        // Setting status to 'Online'
        if(requestType === 'connection'){
            let userExistenceOnList =  identifyUserById(userRequest.name, userRequest.id)
            socket.userID = userRequest.id
            if(!userExistenceOnList){
                logUserOnList(userRequest.name,userRequest.id)
                rooms[0].members.push({name:userRequest.name,id:userRequest.id}) //log user on global room obj
            }
            const listIndex = userList.findIndex(user => user.id === socket.userID)
           try {
                userList[listIndex].connectionStatus.status = 'online'
                userList[listIndex].connectionStatus.date = {years:0, months:0, days:0, hours:0, minutes:0}
                userList[listIndex].socketId = socket.id

           } catch (error) {
                console.log(error)
           }
           socket.emit('message',{type:'connection',socketId:socket.id})
           refreshListOnAllClients(socket)
        }
        if(requestType === 'name'){
            let userExistenceOnList =  identifyUserById(userRequest.name, userRequest.id)
            socket.userID = userRequest.id
            if(!userExistenceOnList){
                logUserOnList(userRequest.name,userRequest.id)
                rooms[0].members.push({name:userRequest.name,id:userRequest.id}) //log user on global room obj
            }
            const listIndex = userList.findIndex(user => user.id === socket.userID)
           try {
                userList[listIndex].connectionStatus.status = 'online'
                userList[listIndex].connectionStatus.date = {years:0, months:0, days:0, hours:0, minutes:0}
                userList[listIndex].socketId = socket.id

           } catch (error) {
                console.log(error)
                socket.emit('message',{type:'error', error:error})
           }
           socket.emit('message',{type:'connection',socketId:socket.id})
            refreshListOnAllClients(socket)
        }
        if (requestType === 'chat-message'){
            const listIndex = userList.findIndex(user => user.id === socket.userID)
            logLastSentMessage(listIndex, userRequest.textMessage)
            userRequest.profilePicturePathname = userList[listIndex].profilePicturePathname
            refreshListOnAllClients(socket)
            if(userRequest.messageTo){
                socket.to(userRequest.messageTo).emit('message',userRequest)
            }else{
                console.log('ERROR - > ',userList.messageTo,':',currentRoom)
            }
                
        }
        if(requestType === 'list'){
            disconnectedTimeUpdate()
            userList.socketId = socket.id
            refreshListOnAllClients(socket)
        }
        if(requestType === 'One:One convo'){
            socket.leave(currentRoom)
            currentRoom = registerOneToOneRoom(userRequest) 
            socket.join(currentRoom)
            socket.emit('message',{room:currentRoom,type:'selectedRoom'})
        }
        if(requestType==='newGroup'){
            if(userRequest.room){
                if(roomExistenceByName(userRequest.room)) socket.emit('message',{type:'error',error:'Group already exists.'})   //if result = true the room exists send error back to client     
                else{ 
                    registerRoom(userRequest)
                    socket.leave(currentRoom)
                    currentRoom  = userRequest.room
                    socket.emit('message',{type:'alert',text:`Group: ${userRequest.room} has been created successfuly!`})
                    refreshListOnAllClients(socket)
                    socket.emit('message',{room:currentRoom,type:'selectedRoom'})

                }
            }else
                socket.emit('message',{type:'alert', text:'cannot create void name of a Group'})
        }
        if(requestType === 'joinGroup'){
            let exists = userExistenceOnRoom(userRequest)
            if(exists)
                socket.emit('message', { type:'alert', text:`you are already a member of this group: ${userRequest.room}`})
            else{
                socket.leave(currentRoom)
                currentRoom = userRequest.room
                socket.join(currentRoom)
                socket.emit('message',{room:currentRoom,type:'selectedRoom'})
                //create new tab socket.emit('message', newtab)
            }
        }
     })
    socket.on('disconnect',()=>{
        const listIndex = userList.findIndex(user =>user.id === socket.userID) //finding userList index by relative (custom)socket id
       //Setting status to offline
        if(listIndex!==-1){
            userList[listIndex].connectionStatus.status = 'offline'
            userList[listIndex].connectionStatus.date = disconnectTimeCapture()
            disconnectedTimeUpdate()
            userList[listIndex].socketId=''
        }
        refreshListOnAllClients(socket)
        //socket.broadcast.emit('message',{type:list} disconnected user
    })
})

// io.to('team1').emit('message',{textMessage:'hello team1',type:'message'})





server.listen(3000,()=>{console.log('listens to 3000')})