import { hiddenUsernameField,username } from "../index.js"

export function getUserNameFromLocalStorage(){
    console.log(localStorage.name)
    if(localStorage.name){
        username.value = localStorage.name
        hiddenUsernameField.value = localStorage.name
        return localStorage.name
    }else
    return ''
    
}