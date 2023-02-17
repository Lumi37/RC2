
const chatDisplay = document.querySelector('#chatDisplay')
export function incomingTextMessage(msg){
   if(localStorage.id === msg.id)
        chatDisplay.innerHTML += `
        <div class="userTextWrap">
            <img class="textUserIcon" src="images/darkmode/default.png" alt="images/darkmode/default.png">
            <div class="userText">${msg.message}</div>
        </div>`
    else
    chatDisplay.innerHTML += `
    <div class="otherUserTextWrap">
        <img class="textUserIcon" src="images/darkmode/default.png" alt="images/darkmode/default.png">
        <div class="userText">${msg.message}</div>
    </div>`
        
    

}