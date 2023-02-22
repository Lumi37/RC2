import { hiddenIdField } from "../index.js"
import { userIdGenerator } from "./idGen.js"
export function setUserIdOnLocalStorage(){
    if(!localStorage.id){
        localStorage.setItem('id',userIdGenerator())
    }
    hiddenIdField.value = localStorage.id
}