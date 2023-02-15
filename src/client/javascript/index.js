// const __dirname = new URL('.', import.meta.url).pathname
import { outgoingMessage } from "./modules/outgoingMessage.js"
import { incomingMessage } from "./modules/incomingMessage.js"
export const socket = io()
const friendsButton = document.querySelector('#friendsButton')
const groupsButton = document.querySelector('#groupsButton')
const friendList = document.querySelector('#friendList')
const groupList = document.querySelector('#groupList')
const saveButton = document.querySelector('#saveButton')
const editButton = document.querySelector('#editButton')
export const username = document.querySelector('#username').value
const uploadProfilePictureButton = document.querySelector('#uploadButton')
export const textTypingArea = document.querySelector('#typingArea').value


friendsButton.addEventListener('click',e=>{
    groupList.style.display = 'none'
    friendList.style.display = 'block'
})

groupsButton.addEventListener('click',e=>{
    friendList.style.display = 'none'
    groupList.style.display = 'block'
})

textTypingArea.addEventListener('keyup',e=>{
    console.log(e.key)
    if(e.key === 'Enter'){
        outgoingMessage(textTypingArea)
        textTypingArea= ''
    }
})

socket.on('message',msg=>{
    incomingMessage(msg)
})