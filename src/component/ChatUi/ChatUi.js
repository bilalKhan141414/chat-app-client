import React from 'react'
import Avatar from './Avatar'
import Message from './Message';
import ScrollToBottom from 'react-scroll-to-bottom';
import './ChatUi.css';

export default function ChatUi({username, messages, value, onChange, onKeyPress}) {
    return (
        <div className="border border-solid chatBox min-h-screen h-screen">
            <div className="chatBoxHeader chat-box-min-h px-5">
                <div className="flex items-center">
                    <Avatar />
                    <div className="capitalize">
                        {username}
                    </div> 
                </div>
            </div>
            <ScrollToBottom debug={false} className="chatBoxBody chat-box-body-min-hbg-white overflow-y-auto overflow-x-hidden h-chat-body-min">
                <div className="p-5">
                    {
                        messages && messages.length > 0 && messages.map((message , index) => 
                            <Message 
                                key={index}
                                time={"2:57 PM"}
                                message={message.text}
                                incomming={message.incomming}
                            />
                    )
                    }
                </div>
                
            </ScrollToBottom >
            <div className="chatBoxFooter chat-box-min-h bg-gray-100 relative border-t">
                <input 
                placeholder="Write a message..." 
                className="absolute block focus:outline-none h-full left-0 top-0 w-full px-5"
                value={value}
                onKeyPress={onKeyPress}
                onChange={onChange}
                />
            </div>
        </div>
    )
}
