import React from 'react'

export default function AvatarText({text}) {
    return (
        <div className="m-1 mr-2 w-12 h-12 relative flex justify-center items-center rounded-full bg-green-500 text-xl text-white uppercase">
            {text && text.substr(0,3)}
        </div>
    )
}
