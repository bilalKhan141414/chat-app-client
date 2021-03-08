import React from 'react'
import Avatar from './Avatar'

export default function ChatUiHeader({username}) {
    return (
        <div className="chatBoxHeader chat-box-min-h px-5">
            <div className="flex items-center">
                <Avatar />
                <div className="capitalize">
                    {username}
                </div> 
            </div>
        </div>
    )
}
