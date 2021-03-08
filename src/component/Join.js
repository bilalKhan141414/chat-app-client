import React, {useState, useEffect} from 'react'
import Chat from './Chat';
import {useHistory} from 'react-router-dom';
export default function Join() {
    const [name, setName] = useState("");
    const [room, setRoom] = useState("");
    const [isSignedIn, setIsSignedIn] = useState(false);
    const history = useHistory();
    const filterQueryString = () => {
        let queryString = history.location.search;
        return queryString.length > 0 && queryString.split("&").map((qp)=>{
            let queryParam = qp.replace("?","").split("=");
            return {
                [queryParam[0]] : queryParam[1]
            }
        })
    }
    useEffect(() => {
        let queryParams = filterQueryString();
        if(queryParams){
            setIsSignedIn(true);
        }
    }, [history.location.search])
    const handleSignInClick = (e) => {
        if(!name || !room) 
        {
            e.preventDefault();
            return;
        }
        setIsSignedIn(true);
        history.replace(`/?name=${name}&room=${room}`);
    }
    return (
        <>
        {
            isSignedIn ?
            <Chat location={history.location}/>
            : <div>
                <div>
                    <input placeholder="Name" onChange={(e)=> setName(e.target.value)} />
                    <input placeholder="Room" onChange={(e)=> setRoom(e.target.value)} />
                </div>
                <div>
                    <div onClick={handleSignInClick} >
                        <button>SignIn</button>
                    </div> 
                </div>
            </div>
        }
        </>
       
    )
}
