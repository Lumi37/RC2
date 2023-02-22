
import { friendList,groupList } from "../index.js"

export function constructList(res){
    let list = res.list
    friendList.innerHTML   = ''
    list.shift() //first arr cell always blank
    list.forEach(user=>{
        if(user.id !== localStorage.id){
            if(user.connectionStatus.status==='online')
                friendList.innerHTML+=`
                <li class="listItemsContainer">  
                    <div id="imgContainerList">
                        <img src=${user.profilePicturePathname} id="listUserIcon" alt=""> 
                        <div id=${user.connectionStatus.status}></div>
                    </div>
                    <div class="listNameMessageContainer">
                        <div id="userListName">${user.name}<div class="tooltip">Kostas</div></div>
                        <div id="userLastMessage">${user.lastMessage.text}<div class="tooltip">>${user.lastMessage.text}</div></div>
                    </div>
                    <div id="dateContainer"><div id="lastOnline">${user.connectionStatus.status}</div></div>
                    <div id='socketid'>${user.}</div>
                </li>`
            else{
                let timeOffline
                if(user.connectionStatus.offlineDifference.years > 0)
                    timeOffline = String(user.connectionStatus.offlineDifference.years) + ' year/s'
                else if (user.connectionStatus.offlineDifference.months > 0)
                    timeOffline = String(user.connectionStatus.offlineDifference.months) + ' month/s'
                else if (user.connectionStatus.offlineDifference.days > 0)
                    timeOffline = String(user.connectionStatus.offlineDifference.days) + 'd'
                else if(user.connectionStatus.offlineDifference.hours > 0)
                    timeOffline =String(user.connectionStatus.offlineDifference.hours)+ 'h'
                else
                    timeOffline =String(user.connectionStatus.offlineDifference.minutes)+ 'm'
                friendList.innerHTML+=`
                <li class="listItemsContainer">  
                    <div id="imgContainerList">
                        <img src=${user.profilePicturePathname} id="listUserIcon" alt=""> 
                        <div id=${user.connectionStatus.status}></div>
                    </div>
                    <div class="listNameMessageContainer">
                        <div id="userListName">${user.name}<div class="tooltip">Kostas</div></div>
                        <div id="userLastMessage">${user.lastMessage.text}<div class="tooltip">>${user.lastMessage.text}</div></div>
                    </div>
                    <div id="dateContainer"><div id="lastOnline">${timeOffline}</div></div>
                </li>`
            }

        }     
    })
}    
    
 