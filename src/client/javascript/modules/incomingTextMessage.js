
const chatDisplay = document.querySelector('#chatDisplay')
export function incomingTextMessage(msg){
    console.log(msg)
   if(localStorage.id === msg.id)
        chatDisplay.innerHTML += `
        <div class="userTextWrap">
            <img class="textUserIcon" src="images/darkmode/default.png" alt="images/darkmode/default.png">
            <div class="userText">${msg.textMessage}</div>
        </div>`
    else
    chatDisplay.innerHTML += `
    <div class="otherUserTextWrap">
        <img class="textUserIcon" src=${msg.profilePicturePathname} alt="images/darkmode/default.png">
        <div class="userText">${msg.textMessage}</div>
    </div>`
        
    

}