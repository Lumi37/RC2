import { selectedChatRoom } from "../index.js";
const upperRightContainer = document.querySelector('.upperRightContainer')


export function showChosenGroup(res){
    let roomObj = res.roomObj
    const groups = document.querySelectorAll('li[data-group]')
    groups.forEach( group =>{
        if (group.dataset.group === selectedChatRoom.innerHTML)
            upperRightContainer.innerHTML = `
            this many ${roomObj.legth}
            
            `
            
    })
}