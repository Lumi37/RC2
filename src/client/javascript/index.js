// const __dirname = new URL('.', import.meta.url).pathname
const socket = io()
const friendsButton = document.querySelector('#friendsButton')
const groupsButton = document.querySelector('#groupsButton')
const friendList = document.querySelector('#friendList')
const groupList = document.querySelector('#groupList')
export const textTypingArea = document.querySelector('#typingArea')

friendsButton.addEventListener('click',e=>{
    groupList.style.display = 'none'
    friendList.style.display = 'block'
})

groupsButton.addEventListener('click',e=>{
    friendList.style.display = 'none'
    groupList.style.display = 'block'
})

textTypingArea.addEventListener('keyup',e=>{
    if(e.key === 'Enter')
    console.log(e.key)
    else
    console.log(e.key)
})

