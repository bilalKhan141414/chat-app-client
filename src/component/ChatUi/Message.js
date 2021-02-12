import React from 'react'

export default function Message({time, message, incomming}) {
    return (
        <div className={`mt-5 flex ${!incomming && "justify-end"}`}>
            <div className={`p-5  inline-block rounded-lg ${incomming ? "rounded-t-l-none bg-theme text-white" : "rounded-t-r-none bg-theme-light "}`}>
                <div className={`false font-bold messageTime text-xs ${!incomming && "text-right"}`}>
                    {time}
                </div>
                <div className="message">
                    {message}
                </div>
            </div>
        </div>
    )
}
