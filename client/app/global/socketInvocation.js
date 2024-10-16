import {io} from 'socket.io-client'
let mysocketUrl = "https://edu-socket.onrender.com";
// mysocketUrl = "http://localhost:3001";
let socket;
export const invokeSocket = ()=> {
    if (!socket) {
         socket = io(mysocketUrl)
    }

    return socket
}//