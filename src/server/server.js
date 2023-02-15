import express from 'express'
import fileUpload  from 'express-fileupload'
import lodash from 'lodash'
import { Server } from 'socket.io'
import http from 'http'

const app = express()
const server = http.createServer(app)
const __dirname = new URL('.', import.meta.url).pathname
const io = new Server(server)
console.log(__dirname)
app.use(express.static(`${__dirname}../client`))


io.on('connection',socket=>{
    console.log(`user connected. : ${socket}`)
    socket.on('message',(obj)=>{
        console.log(obj)
    socket.emit('message',obj)
    socket.broadcast.emit('message',obj)
     })
    socket.on('disconnect',()=>{
        console.log('user disconnected')
    })
})







server.listen(3000,()=>{console.log('listens to 3000')})