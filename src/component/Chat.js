import React, {useState, useEffect} from 'react';
import queryString from 'query-string';
import io from 'socket.io-client';
import ChatUi from './ChatUi/ChatUi';
import MessagesQueue from './../shared/Queues/MessagesQueue';
import moment from 'moment';
import useMessageEncryption from './../shared/custom-hooks/useMessageEncryption';
// localStorage.debug = '*';
const messageQueue = new MessagesQueue();
let socket;
export default function Chat({location}) {
    const [name, setName] = useState("");
    const [room, setRoom] = useState("");
    const [messages, setMessages] = useState([]);
    const [message, setMessage] = useState("");
    const [attachments, setAttachments] = useState({
        video:null,
        image:null
    });
    const {encode, decode} = useMessageEncryption();
    // const ENDPOINT = 'https://chat-app-server-node.herokuapp.com/'
    const ENDPOINT = process.env.NODE_ENV == "production" ? process.env.REACT_APP_URL_LIVE : process.env.REACT_APP_URL 

    useEffect(() => {
        const {name, room} = queryString.parse(location.search);
        console.log("name,room",name,room);
        socket =  io(ENDPOINT);
        window.myChat = {socket};
        setName(name);
        setRoom(room);

        socket.emit('join', {name, room}, (resp)=>{
            // console.log(resp);
        });
        socket.on("message", (message)=>{
            message = decode(message);
            // if(message.user ==="admin") return;
            let foramtedMessage = message.user === "admin" ? message : JSON.parse(message.text);
            let messageToSave = {
                ...foramtedMessage,
                incomming:true,
            }
            
            console.log("decoded", messageToSave);
            setMessages((prevMessages)=>[...prevMessages, messageToSave]);
        });
        return () => {
            socket.emit('diconnect');
            socket.off();
        }
    }, [])
    
    const handleSendMessage = () => {
        const messageToSend = messageQueue.dequeue();
        console.log("encode(message)",messageToSend, encode(messageToSend));

        socket.emit("sendMessage", encode(messageToSend), ()=>{
            if(!messageQueue.isEmpty())
            handleSendMessage()
        });
    }
    const sendMessage = (event) => {
        event.preventDefault();
        if(message) {
            handleSendMessage();
            setMessage("");
        }
    }
    const uploadVideos = async () => {

        // const response = await uploadVideo(file)
    }
    const handleOnKeyPress = (event)=> {
        if(event.key === 'Enter' && (message.length > 0 || attachments.video)){
            let messageToSave = {
                text:message,
                user:name,
                incomming:false,
                time:moment().format('HH:mm A'),
                ...attachments
            }
            
            if(!attachments.video)
            messageQueue.enqueue({
                text:message,
                user:name,
                incomming:false,
                time:moment().format('HH:mm A')
            });

            setMessages([...messages, messageToSave]);
            sendMessage(event)
        }
    }
    const getUploadeFile = (fileData) =>{
        setAttachments((prevState)=>({
            ...prevState,
            video :{ ...fileData }
        }))
    }
    return (
        <>
            <ChatUi 
                username={name}
                value={message}
                messages={messages}
                getUploadeFile={getUploadeFile}
                onChange={(event)=> setMessage(event.target.value)}
                onKeyPress={handleOnKeyPress}
            />
        </>
    )
}
