import {useEffect, useState} from 'react'
import io from 'socket.io-client';
import useMessageEncryption from './useMessageEncryption';

let socket = null;
export default function useSocket() {
    window.myChat = {socket};
    const [newMessage, setNewMessage] = useState(null)
    const {encode, decode} = useMessageEncryption();
    useEffect(() => {
        socket = io(window.ENDPOINT, { autoConnect: true });
      
        socket.on("message", (message)=>{
            console.log("message",message);
            // return;
            message = decode(message);
            console.log("decodedmessage",message, message.text);
            let foramtedMessage = message.user === "admin" ? message : typeof message.text === "string" ? JSON.parse(message.text) : message.text;
            let messageToSave = {
                ...foramtedMessage,
                incomming:true,
            }
            
            console.log("decoded", messageToSave);
            setNewMessage({...messageToSave});
        });
        return () => {
            // socket.emit('diconnect');
            // socket.off();
        }
    }, [])

    const join = (data, callback) => {
        socket.emit('join', data, callback);
    }
    const broadCastMessage = (message, callback) => {
        console.log("encode(message)", message, encode(message));
        socket.emit("sendMessage", encode(message), callback);
    }
    const ConnectUser = () => {
        socket.connect();
    }
    const listenActiveStatus =  (callback) => {
        socket.on("friendActiveStatus", (data) => {
            data = decode(data);
            console.log("data", data);
            callback(data.text.userId)
        });
    }
    return ({
        listenActiveStatus,
        newMessage,
        join,
        broadCastMessage
    })
}
