

export function disconnectTimeCapture(){
    let timeNow = { years:0, months:0, days:0, hours:0, minutes:0 } 
    let date = new Date() //timeNow = { years:date.getFullYear, months:date.getMonth() + 1, days: date.getDate(), hours: date.getHours(), minutes:date.getMinutes() }
    timeNow.years = date.getFullYear()
    timeNow.months = date.getMonth() + 1
    timeNow.days = date.getDate()
    timeNow.hours = date.getHours()
    timeNow.minutes = date.getMinutes()
    return timeNow
}