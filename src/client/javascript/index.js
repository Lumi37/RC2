// const __dirname = new URL('.', import.meta.url).pathname
import { outgoingTextMessage } from "./modules/outgoingTextMessage.js"
import { identifyResponseByType } from "./modules/identifyResponseByType.js"
import { incomingTextMessage } from "./modules/incomingTextMessage.js"
import { setNameOnLocalStorage } from "./modules/setINameOnLocalStorage.js"
import { setUserIdOnLocalStorage } from "./modules/setUserIdOnLocalStorage.js"
import { getUserNameFromLocalStorage } from "./modules/getUserNameFromLocalStorage.js"
import { getUserIdFromLocalStorage } from "./modules/getUserIdFromLocalStorage.js"
import { constructList } from "./modules/constructList.js"
import { UserSocketIdToLocalStorage } from "./modules/UserSocketIdToLocalStorage.js"
import { selectChatroom } from "./modules/selectChatroom.js"

export const socket = io()
//  /*hidden form 
export const hiddenIdField = document.querySelector('#userID')
const fileUpload = document.querySelector('#fileupload')
export const hiddenUsernameField = document.querySelector('#hiddenusername')
const fileSubmitButton = document.querySelector('#submitFile')
// */
const uploadProfPicButton = document.querySelector('#uploadButton')
const darkmode = document.querySelector('#darkmode')
const friendsButton = document.querySelector('#friendsButton')
const groupsButton = document.querySelector('#groupsButton')
export const friendList = document.querySelector('#friendList')
export const groupList = document.querySelector('#groupList')
const saveButton = document.querySelector('#saveButton')
const editButton = document.querySelector('#editButton')
export const username = document.querySelector('#username')
export const textTypingArea = document.querySelector('#typingArea')
export const selectedChatRoom = document.querySelector('#selectedChatRoom')
const team1 = document.querySelector('#joinTeam1')
setUserIdOnLocalStorage() //does not set if exists

socket.emit('message',{name:getUserNameFromLocalStorage(),id:getUserIdFromLocalStorage(),type:'connection'}) 
socket.emit('message',{type:'list'})
darkmode.addEventListener('click',e=>{
    socket.emit('message',{type:'list'})
})
//PROFILE UPLOAD
uploadProfPicButton.addEventListener('click',e=>{
    fileUpload.click()
})
fileUpload.onchange = ()=> fileSubmitButton.click()
// SAVING NAME
saveButton.addEventListener('click',e=>{
    if(saveButton.id=='saveButton'){
        setNameOnLocalStorage()
        if(username.value){
            hiddenUsernameField.value = username.value
            socket.emit('message',{name:username.value, id:getUserIdFromLocalStorage(), type:'name'})
            saveButton.id = 'saveButtonDisabled'
        }
    }
        
})
// document.querySelectorAll('.listNameMessageContainer').addEventListener('click',e=>{
//     console.log(e.currentTarget)
// })
friendList.addEventListener('click',e=>{
    //console.log(e.target.closest('li[data-socketId]').dataset.socketid)
    //createnewchatTabinhtml
    socket.emit('message',{
        type:'One:One convo',
        mainUserSocketId:localStorage.socketId, 
        otherUserSocketId:e.target.closest('li[data-socketId]').dataset.socketid,
        userId:localStorage.id,
        otherUserId:e.target.closest('li[data-userLocalId]').dataset.userlocalid
    })
    
})

team1.addEventListener('click',e=>{
    socket.emit('message',{
        name : localStorage.name,
        id : localStorage.id,
        type : 'team1'
    })
})

username.addEventListener('keypress',e=>{
    if(e.key === 'Enter'){
        if(saveButton.id=='saveButton'){
            if(username.value){
                setNameOnLocalStorage()
                hiddenUsernameField.value = username.value
                socket.emit('message',{name:username.value, id:getUserIdFromLocalStorage(), type:'name'})
                saveButton.id = 'saveButtonDisabled'
            }
        }
    }
})

// ENABLING NAME EDITING
editButton.addEventListener('click',e=>{
    saveButton.id = 'saveButton'

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
    // console.log(e.key)
    if(e.key === 'Enter'){
        outgoingTextMessage()
    }
})


socket.on('message',res=>{
    const responseType = identifyResponseByType(res.type)
    console.log(res.type)
    if(responseType === 'connection') UserSocketIdToLocalStorage(res.socketId)
    if(responseType === 'chat-message') incomingTextMessage(res)
    if(responseType === 'list') constructList(res)
    if(responseType === 'selectedRoom')selectChatroom(res.room)
    // if(responseType === 'history')
})

