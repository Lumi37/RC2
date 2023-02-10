const friendsButton = document.querySelector('#friendsButton')
const groupsButton = document.querySelector('#groupsButton')
const friendList = document.querySelector('#friendList')
const groupList = document.querySelector('#groupList')



friendsButton.addEventListener('click',e=>{
    groupList.style.display = 'none'
    friendList.style.display = 'block'
})

groupsButton.addEventListener('click',e=>{
    friendList.style.display = 'none'
    groupList.style.display = 'block'
})