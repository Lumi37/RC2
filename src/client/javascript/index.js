// const __dirname = new URL('.', import.meta.url).pathname
import { outgoingTextMessage } from "./modules/outgoingTextMessage.js"
import { userIdGenerator } from "./modules/idGen.js"
import { identifyResponseByType } from "./modules/identifyResponseByType.js"
import { incomingTextMessage } from "./modules/incomingTextMessage.js"
import { setInfoOnLocalStorage } from "./modules/setInfoOnLocalStorage.js"
export const socket = io()
const friendsButton = document.querySelector('#friendsButton')
const groupsButton = document.querySelector('#groupsButton')
const friendList = document.querySelector('#friendList')
const groupList = document.querySelector('#groupList')
const saveButton = document.querySelector('#saveButton')
const editButton = document.querySelector('#editButton')
export const username = document.querySelector('#username')
const uploadProfilePictureButton = document.querySelector('#uploadButton')
export const textTypingArea = document.querySelector('#typingArea')


saveButton.addEventListener('click',e=>{
    setInfoOnLocalStorage()
    // if(!localStorage.getItem('name'))
    //     window.localStorage.setItem('name',username.value)
})
username.addEventListener('keypress',e=>{
    if(e.key === 'Enter')
        // if(!localStorage.getItem('name'))
        setInfoOnLocalStorage()    

        
})

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
        outgoingTextMessage()
    }
})


socket.on('message',res=>{

    const responseType = identifyResponseByType(res.type)
    if(responseType === 'chat-message')
        incomingTextMessage(res.textMessage)
    // if(responseType === 'list')
    // if(responseType === 'history')
})

