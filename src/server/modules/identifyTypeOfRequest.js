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
        default:
            console.log('Uknown type : ',type)
    }


}