import express from 'express'
import fileUpload  from 'express-fileupload'
import lodash from 'lodash'
import { Server } from 'socket.io'
import http from 'http'
import { identifyTypeOfRequest } from './modules/identifyTypeOfRequest.js'
import { identifyUserById } from './modules/identifyUserById.js'

const app = express()
const server = http.createServer(app)
const __dirname = new URL('.', import.meta.url).pathname
const io = new Server(server)
console.log(__dirname)
app.use(express.static(`${__dirname}../client`))
export const  userList = [{name:'', id:'', connectionStatus:'offline'}]


io.on('connection',socket=>{
    //socket.broadcast.emit(`'message',{type:'new-user'}`)
    //socket.broadcast.emit('message',{type:list})
    //socket.emit('message', {type:history})
    console.log(socket.id)
    socket.on('message',(userRequest)=>{
        console.log(userRequest)
        let requestType = identifyTypeOfRequest(userRequest.type)
        console.log(requestType)
        if(requestType === 'connection'){
            identifyUserById(userRequest.name, userRequest.id) // logs new user if id does not match
            socket.userID = userRequest.id
            const listIndex = userList.findIndex(user => user.id === socket.userID)
            userList[listIndex].connectionStatus = 'online'
        }
        if(requestType === 'name'){
            identifyUserById(userRequest.name, userRequest.id)
        }
        if (requestType === 'chat-message'){
            socket.emit('message',userRequest) 
            socket.broadcast.emit('message',userRequest)
        }
     })
    socket.on('disconnect',()=>{
        const listIndex = userList.findIndex(user =>user.id === socket.userID) //finding userList index by relative (custome)socket id
        if(listIndex!==-1)
        userList[listIndex].connectionStatus = 'offline'
        
        //socket.broadcast.emit('message',{type:list} disconnected user
    })
})







server.listen(3000,()=>{console.log('listens to 3000')})