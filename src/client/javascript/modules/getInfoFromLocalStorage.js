import { username } from "../index.js";
import { setInfoOnLocalStorage } from "./setInfoOnLocalStorage.js";


export function getInfoFromLocalStorage(){ 
        username.value = localStorage.getItem('name')
}