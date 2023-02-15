import { identifyMessageByType } from "./identifyMessageByType.js"
const chatDisplay = document.querySelector('#chatDisplay')
export function incomingMessage(msg){
    identifyMessageByType(msg.type)
    chatDisplay.innerHTML += `
    <div class="usertextWrap">
        <img class="textUserIcon" src="images/darkmode/default.png" alt="images/darkmode/default.png">
        <div class="userText">${msg.message}</div>
    </div>`
    

}