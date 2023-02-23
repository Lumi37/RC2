export function identifyTypeOfRequest(type){
    switch(type){
        case 'connection':
            return 'connection'
        case 'chat-message':
            return 'chat-message'
        case 'name':
            return 'name'
        case 'list':
            return 'list'
        case 'history':
            return 'history'
        case 'One:One convo':
            return 'One:One convo'
        case 'team1':
            return 'team1'
        default:
            console.log('Uknown type : ',type)
    }


}