import { userList } from "../server.js";

export function disconnectedTimeUpdate(){
    let date = new Date()
    let timeObject
    let timeDifference 

    userList.forEach(user=>{ 
        
        if(user.connectionStatus.status === 'offline'){
            timeObject = user.connectionStatus.date //{ years:0, months:0, days:0, hours:0, minutes:0 } 
            timeDifference = user.connectionStatus.offlineDifference
            if( (date.getMinutes() - timeObject.minutes) < 0 )
                timeDifference.minutes = (date.getMinutes() + 60) - timeObject.minutes 
            else
                timeDifference.minutes = date.getMinutes() - timeObject.minutes
            
            if( (date.getHours() - timeObject.hours) < 0 )
                timeDifference.hours = (date.getHours() + 24) - timeObject.hours 
            else
                timeDifference.hours = date.getHours() - timeObject.hours
            
            if( (date.getDate() - timeObject.days) < 0 )
                timeDifference.days = (date.getDate() + 30) - timeObject.days 
            else
                timeDifference.days = date.getDate() - timeObject.days
            
            if( ((date.getMonth() + 1) - timeObject.months) < 0 )
                timeDifference.months = (date.getMonth() + 13) - timeObject.months
            else
                timeDifference.months = (date.getMonth() + 1) - timeObject.months 
            
                timeObject.years = date.getFullYear() - timeObject.years 
                
            
        }
    })
}