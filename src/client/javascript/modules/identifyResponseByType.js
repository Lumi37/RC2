export function identifyResponseByType(type){
    switch(type){
        case 'connection':
            return 'connection'
        case 'chat-message':
            return 'chat-message'
        case 'list':
            return 'list'
        case 'history':
            return 'history'
        case 'selectedRoom':
            return 'selectedRoom'
        case 'alert':
            return 'alert'
        case 'displaySelectedRoom':
            return 'displaySelectedRoom'
        case 'error':
            return 'error'
        default:
            console.log('Unknown type : ',type)
    }
}