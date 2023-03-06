import { selectedChatRoom } from "../index.js"

export const chatDisplay = document.querySelector('#chatDisplay')
export function incomingTextMessage(msg){
    console.log(msg)
    console.log('selected chatroom: ',selectedChatRoom.innerHTML,'\n sunthiki: ',(selectedChatRoom.innerHTML  === msg.room))
    if(selectedChatRoom.innerHTML  === msg.room)
        if(localStorage.id === msg.id)
            chatDisplay.innerHTML += `
            <div class="userTextWrap">
                <img class="textUserIcon" src="images/darkmode/default.png" alt="images/darkmode/default.png">
                <div class="userText">${msg.text}</div>
            </div>`
        else
        chatDisplay.innerHTML += `
        <div class="otherUserTextWrap">
            <img class="textUserIcon" src=${msg.profilePicturePathname} alt="images/darkmode/default.png">
            <div class="userText">${msg.text}</div>
        </div>`
            
    

}