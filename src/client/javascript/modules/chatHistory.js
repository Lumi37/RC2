import { incomingTextMessage, chatDisplay } from "./incomingTextMessage.js"
export function chatHistory(res){
    console.log(res)
    let history  = res.historyArray
    chatDisplay.innerHTML = ''
    history.forEach(msg=>incomingTextMessage(msg))
}