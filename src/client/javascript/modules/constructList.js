

const friendList = document.querySelector('#friendList')
const groupList = document.querySelector('#groupList')
export function constructList(res){
    let list = res.userList
    let groups = res.rooms
    friendList.innerHTML   = ''
    console.log('list eraser')
    groupList.innerHTML = ''
    list.forEach(user=>{ 
            if(user.id !== localStorage.id){
                console.log(user.name,':',user.connectionStatus.status ==='online')
                if(user.connectionStatus.status==='online'){
                    console.log('IF pou shmainei oti user.connectionStatus.status==="online" TRUE!! ')
                // alert('mpainei sto online gia ton xristi: ',user.name,':',user.connectionStatus.status ==='online')
                    friendList.innerHTML+=`
                    <li class="friendListItemsContainer" data-socketId='${user.socketId}' data-userLocalId='${user.id}'>  
                        <div id="imgContainerList">
                            <img src=${user.profilePicturePathname} id="listUserIcon" alt=""> 
                            <div id=${user.connectionStatus.status}></div>
                        </div>
                        <div class="listNameMessageContainer">
                            <div id="userListName">${user.name}<div class="tooltip">${user.name}</div></div>
                            <div id="userLastMessage">${user.lastMessage.text}<div class="tooltip">${user.lastMessage.text}</div></div>
                        </div>
                        <div id="dateContainer"><div id="lastOnline">${user.connectionStatus.status}</div></div>
                    </li>`
            }
                else{
                    //TIME OFFLINE
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
                    console.log('ELSE pou shmainei oti user.connectionStatus.status==="online" NOT TRUE \n',timeOffline,' <--')
                    friendList.innerHTML+=`
                    <li class="friendListItemsContainer" data-userLocalId='${user.id}'>  
                        <div id="imgContainerList">
                            <img src=${user.profilePicturePathname} id="listUserIcon" alt=""> 
                            <div id=${user.connectionStatus.status}></div>
                        </div>
                        <div class="listNameMessageContainer">
                            <div id="userListName">${user.name}
                            <div class="tooltip">${user.name}</div>
                            </div>
                            <div id="userLastMessage">${user.lastMessage.text}
                            <div class="tooltip">${user.lastMessage.text}</div>
                            </div>
                        </div>
                        <div id="dateContainer"><div id="lastOnline">${timeOffline}</div></div>
                    </li>`
                }
            }       
    })
    groups.forEach(group=>{
        groupList.innerHTML+=`
            <li class="groupListItemsContainer">  
                <div id="imgContainerList">
                    <img src="images/darkmode/default.png" id="listUserIcon" alt=""> 
                    <div id="online"></div>
                </div>
                <div class="groupItemContainer">
                    <div id="groupListName">${group.room}</div>
                    <div id="groupLastMessage">${group.lastMessage.name}:${group.lastMessage.text}</div>
                </div>
                <button id="joinGroup" data-group="${group.room}">join</button>
                <button id="leaveGroup">leave</button>
            </li> `
    })
}    
    
{/* <div id="groupLastMessage">${group.lastMessage.name}:${group.lastMessage.text}</div> */}
 