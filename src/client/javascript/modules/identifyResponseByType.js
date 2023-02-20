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
        default:
            console.log('Unknown type : ',type)
    }
}