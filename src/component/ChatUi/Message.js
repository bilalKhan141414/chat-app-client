import React from 'react'

export default function Message({time, message, incomming, videoUrl}) {
    console.log("message.videoUrl",videoUrl, incomming)
    let isLeft  = incomming;
    let isRight = !incomming;
    let hasAttachment = typeof message !== "string"
    return (
        <div className={`mt-5 flex ${isRight && "justify-end"}`}>
            <div 
            className={`p-5 inline-block rounded-lg 
            ${isLeft ? `rounded-t-l-none bg-theme text-white` : `rounded-t-r-none bg-theme-light`}`
            }>
                <div className={`font-bold messageTime text-xs ${isRight && "text-right"}`}>
                    {time}
                </div>
                <div className={`message`}>
                    {message}
                </div>
            </div>
        </div>
    )
}
