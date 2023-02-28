import express from 'express'
import fileUpload  from 'express-fileupload'
import lodash from 'lodash'
import { Server } from 'socket.io'
import http from 'http'
import { logLastSentMessage } from '../client/javascript/modules/logLastSentMessage.js'
import { identifyTypeOfRequest } from './modules/identifyTypeOfRequest.js'
import { identifyUserById } from './modules/identifyUserById.js'
import { handleUploadedFile } from './modules/handleUploadedFile.js'
import { disconnectTimeCapture } from './modules/disconnectTimeCapture.js'
import {disconnectedTimeUpdate} from './modules/disconnectedTimeUpdate.js'
import { refreshListOnAllClients } from './modules/refreshListOnAllClient.js'

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
export let  userList = [{
    name:'',
    id:'', 
    connectionStatus:{
        status:'offline',
        date:{ years:0, months:0, days:0, hours:0, minutes:0 },
        offlineDifference:{ years:0, months:0, days:0, hours:0, minutes:0 }
    }, 
    lastMessage:{ text:'', date:'' },
    profilePicturePathname:'',
    socketId:''
}]
let oneToOneRooms= []
let roomIndex = 0


io.on('connection',socket=>{
    // const users = [];
    // for (let [id, socket] of io.of("/").sockets) {
    //   users.push({
    //     userID: id,
    //   });
    //   users.forEach(user=>{console.log(user.id)})
    // }
    //socket.broadcast.emit(`'message',{type:'new-user'}`)
    //socket.broadcast.emit('message',{type:list})
    // //socket.emit('message', {type:history})
    // console.log(socket.id)
    socket.on('message',(userRequest)=>{
        console.log(userRequest)
        let requestType = identifyTypeOfRequest(userRequest.type)
        console.log('TYPE OF REQUEST --->',requestType)

        // Enabling status to 'Online'
        if(requestType === 'connection'){
            identifyUserById(userRequest.name, userRequest.id) // logs new user if id does not match
            socket.userID = userRequest.id
            const listIndex = userList.findIndex(user => user.id === socket.userID)
           try {
                userList[listIndex].connectionStatus.status = 'online'
                userList[listIndex].connectionStatus.date = ''
                userList[listIndex].socketId = socket.id

           } catch (error) {
                console.log(error)
           }
           socket.emit('message',{type:'connection',socketId:socket.id})
           socket.broadcast.emit('message',{list:userList,type:'list'})
        }
        if(requestType === 'name'){
            identifyUserById(userRequest.name, userRequest.id)
        }
        if (requestType === 'chat-message'){
            const listIndex = userList.findIndex(user => user.id === socket.userID)
            logLastSentMessage(listIndex, userRequest.textMessage)
            userRequest.profilePicturePathname = userList[listIndex].profilePicturePathname
            refreshListOnAllClients(socket)
            if(userRequest.messageTo){
                console.log('drown ',userRequest.messageTo)
                socket.to(userRequest.messageTo).emit('message',userRequest)
            }else{
                socket.emit('message',userRequest) 
                socket.broadcast.emit('message',userRequest)
            }
                
        }
        if(requestType === 'list'){
            disconnectedTimeUpdate()
            userList.socketId = socket.id
            refreshListOnAllClients(socket)
        }if(requestType === 'team1'){
            socket.join('team1')
            socket.to('team1').emit('message',{textMessage:`hello Mr.${userRequest.name} welcome to team1`,type:'chat-message' ,room:'team1'})
        }
        if(requestType === 'One:One convo'){
            const listIndex = userList.findIndex(user => user.id === socket.userID)
            let privateRoomName 
            console.log('U-->',userRequest.userId)
            console.log('O-->',userRequest.otherUserId)
            console.log(oneToOneRooms.includes(userRequest.userId+':'+userRequest.otherUserId),'\n*option 1: ',privateRoomName)
            console.log(oneToOneRooms.includes(userRequest.otherUserId+':'+userRequest.userId),'\n*option 2: ',privateRoomName)
            if(oneToOneRooms.filter(e=> e.room === userRequest.userId+':'+userRequest.otherUserId).length>0){
                privateRoomName = userRequest.userId+':'+userRequest.otherUserId
                console.log('option 1: ',privateRoomName)
            }
            else if(oneToOneRooms.filter(e=> e.room === userRequest.otherUserId+':'+userRequest.userId).length>0) {
                privateRoomName = userRequest.otherUserId+':'+userRequest.userId
                console.log('option 2: ',privateRoomName)
            }
            else{
                privateRoomName = userRequest.userId+':'+userRequest.otherUserId
                oneToOneRooms.push({room:privateRoomName,receivers:[ userRequest.userId, userRequest.otherUserId]})
                console.log('option 3: ',privateRoomName)
            }
            socket.join(privateRoomName)
            socket.emit('message',{room:privateRoomName,type:'selectedRoom'})
            console.log('REGISTERED ROOMS')
            oneToOneRooms.forEach((e)=>{console.log(e)})
            console.log('nigger',oneToOneRooms.filter(e=>{
                e.room === privateRoomName
            }))
            //socket.join(userRequest.mainUserSocketId)
        }
     })
    socket.on('disconnect',()=>{
        const listIndex = userList.findIndex(user =>user.id === socket.userID) //finding userList index by relative (custom)socket id
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