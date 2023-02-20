
import { socket, username } from "../index.js";
import { userIdGenerator } from "./idGen.js";

export function setNameOnLocalStorage(){
    localStorage.setItem('name', username.value)
}