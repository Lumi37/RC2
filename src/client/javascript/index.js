// const __dirname = new URL('.', import.meta.url).pathname
import { outgoingTextMessage } from "./modules/outgoingTextMessage.js"
import { userIdGenerator } from "./modules/idGen.js"
import { identifyResponseByType } from "./modules/identifyResponseByType.js"
import { incomingTextMessage } from "./modules/incomingTextMessage.js"
import { setNameOnLocalStorage } from "./modules/setINameOnLocalStorage.js"
import { setUserIdOnLocalStorage } from "./modules/setUserIdOnLocalStorage.js"
import { getUserNameFromLocalStorage } from "./modules/getUserNameFromLocalStorage.js"
import { getUserIdFromLocalStorage } from "./modules/getUserIdFromLocalStorage.js"
import { newConnection } from "./modules/newConnection.js"

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

setUserIdOnLocalStorage() //does not set if exists

socket.emit('message',{name:getUserNameFromLocalStorage(),id:getUserIdFromLocalStorage(),type:'connection'}) 



// SAVING NAME
saveButton.addEventListener('click',e=>{
    if(saveButton.id=='saveButton'){
        setNameOnLocalStorage()
        if(username.value){
            socket.emit('message',{name:username.value})
            saveButton.id = 'saveButtonDisabled'
        }
    }
    // if(username.value)
        
})


username.addEventListener('keypress',e=>{
    if(e.key === 'Enter'){
        if(saveButton.id=='saveButton'){
            if(username.value){
                setNameOnLocalStorage()
                socket.emit('message',{name:username.value})
                saveButton.id = 'saveButtonDisabled'
            }
        }
    }
        
          
})

// ENABLING NAME EDITING
// editButton.addEventListener('click',e=>{
//     if(username.value)
//         username.value = 'sd'

// })

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
    if(responseType === 'connection')newConnection(res)
    if(responseType === 'chat-message')incomingTextMessage(res)
    // if(responseType === 'list')
    // if(responseType === 'history')
})

