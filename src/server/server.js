import express from 'express'
import fileUpload  from 'express-fileupload'
import lodash from 'lodash'
import { Server } from 'socket.io'
import http from 'http'
import { identifyTypeOfRequest } from './modules/identifyTypeOfRequest.js'

const app = express()
const server = http.createServer(app)
const __dirname = new URL('.', import.meta.url).pathname
const io = new Server(server)
console.log(__dirname)
app.use(express.static(`${__dirname}../client`))
const  userList = []


io.on('connection',socket=>{
    console.log(`user connected. : ${socket.id}`)
    socket.on('message',(userRequest)=>{
        console.log(userRequest)
        let requestType = identifyTypeOfRequest(userRequest.type)
        if (requestType === 'chat-message'){
            socket.emit('message',userRequest)
            socket.broadcast.emit('message',userRequest)
        }
     })
    socket.on('disconnect',()=>{
        console.log('user disconnected')
    })
})







server.listen(3000,()=>{console.log('listens to 3000')})