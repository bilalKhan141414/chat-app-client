import React, {useState, useEffect} from 'react';
import queryString from 'query-string';
import io from 'socket.io-client';
import ChatUi from './ChatUi/ChatUi';
import useMessageEncryption from './../shared/custom-hooks/useMessageEncryption';
// localStorage.debug = '*';

let socket;
export default function Chat({location}) {
    const [name, setName] = useState("");
    const [room, setRoom] = useState("");
    const [messages, setMessages] = useState([]);
    const [message, setMessage] = useState("");
    const {encode, decode} = useMessageEncryption();
    // const ENDPOINT = 'https://chat-app-server-node.herokuapp.com/'
    const ENDPOINT = process.env.REACT_APP_URL || 'https://chat-app-server-node.herokuapp.com/'
    useEffect(() => {
        const {name, room} = queryString.parse(location.search);
        
        socket =  io(ENDPOINT);

        setName(name);
        setRoom(room);

        socket.emit('join', {name, room}, (resp)=>{
            // console.log(resp);
        });

        return () => {
            socket.emit('diconnect');
            socket.off();
        }
    }, [])
    
    useEffect(() => {
        socket.on("message", (message)=>{
            message = decode(message);
            // if(message.user ==="admin") return;
            let messageToSave = {
                ...message,
                incomming:true,
            }
            setMessages([...messages, messageToSave]);
            console.log("message",message);
        });
    }, [setMessages, messages, name])

    const sendMessage = (event) => {
        event.preventDefault();
        if(message) {
            console.log("encode(message)",encode(message))
            socket.emit("sendMessage", encode(message), ()=>{});
            setMessage("");
        }
    }
    const handleOnKeyPress = (event)=> {
        if(event.key === 'Enter'){
            let messageToSave = {
                text:message,
                user:name,
                incomming:false,
            }
            setMessages([...messages, messageToSave]);
            sendMessage(event)
        }
    }

    return (
        <>
            <ChatUi 
                username={name}
                value={message}
                messages={messages}
                onChange={(event)=> setMessage(event.target.value)}
                onKeyPress={handleOnKeyPress}
            />
        </>
    )
}
