import React, {useState} from 'react'
import Message from './Message';
import ScrollToBottom from 'react-scroll-to-bottom';
import './ChatUi.css';
import ChatUiFooter from './ChatUiFooter';
import ChatUiHeader from './ChatUiHeader';
import VideoElement from './VideoElement';
import videoE from './../../assets/mov_bbb.mp4';

export default function ChatUi({username, messages, value, onChange, onKeyPress, getUploadeFile}) {
    return (    
        <div className="border border-solid chatBox min-h-screen h-screen">
            <ChatUiHeader 
                username={username}
            />
            <ScrollToBottom debug={false} className="chatBoxBody chat-box-body-min-hbg-white overflow-y-auto overflow-x-hidden h-chat-body-min">
                <div className="p-5">
                    {
                        messages && messages.length > 0 && messages.map((message , index) => {
                            return message.video || message.videoUrl  ?
                            <Message 
                            key={index}
                            time={message.time}
                            message={
                                <>
                                <VideoElement 
                                    file={message.video.video}
                                    videoUrl= {message.videoUrl}
                                    message={message}
                                    incomming={message.incomming}
                                />
                                {typeof message.text === "string" ? message.text : message.text.text}
                                </>
                            }
                            videoUrl= {message.videoUrl}
                            incomming={message.incomming}
                            />
                            :
                            <Message 
                                key={index}
                                time={message.time}
                                message={typeof message.text === "string" ? message.text : message.text.text}
                                incomming={message.incomming}
                            />
                        }
                    )
                    }
       
                </div>
            </ScrollToBottom >
           <ChatUiFooter
            value={value}
            handleFileUpload={getUploadeFile}
            onChange={onChange} 
            onKeyPress={onKeyPress}
           />
        </div>
    )
}
