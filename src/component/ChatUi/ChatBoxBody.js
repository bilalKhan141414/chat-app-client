import React from 'react'
import VideoElement from './VideoElement';
import Message from './Message';
import ScrollToBottom from 'react-scroll-to-bottom';
import videoE from './../../assets/mov_bbb.mp4';

export default function ChatBoxBody({messages}) {
    return (
        <ScrollToBottom debug={false} className="chatBoxBody chat-box-body-min-hbg-white overflow-y-auto overflow-x-hidden h-chat-body-min">
            <div className="p-5">
                {
                    messages && messages.length > 0 && messages.map((message , index) => {
                        return message.video || message.videoUrl ?
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
    )
}
