import { username } from "../index.js";


export function getInfoFromLocalStorage(){ 
        username.value = localStorage.getItem('name')

}