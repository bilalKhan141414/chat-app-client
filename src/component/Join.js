import React, {useState} from 'react'
import {Link} from 'react-router-dom';
export default function Join() {
    const [name, setName] = useState("");
    const [room, setRoom] = useState("");



    return (
        <div>
            <div>
                <input placeholder="Name" onChange={(e)=> setName(e.target.value)} />
                <input placeholder="Room" onChange={(e)=> setRoom(e.target.value)} />
            </div>
            <div>
                <Link onClick={(e)=> (!name || !room) && e.preventDefault()} to={`/chat?name=${name}&room=${room}`} >
                    <button>SignIn</button>
                </Link> 
            </div>
        </div>
    )
}
