import React, {useState, useEffect} from 'react'
import useApi from '../../../shared/custom-hooks/api/useApi';
import useLocalStorage from '../../../shared/custom-hooks/useLocalStorage';
import Avatar from '../Avatar';
import routes from './../../../routes';
import './SideBar.scss';

export default function SideBar({
    friends: Friends = [],
    selectedFriend,
    setSelectedUser,
}) {
    const api = useApi();
    const loggedInUser = useLocalStorage();
    const [friends, setFriends] = useState([]);
    useEffect(() => {
        const activeUser = loggedInUser.getUser();
        // console.log("activeUser", activeUser)
        if(activeUser){
            setSelectedUser(null, Friends[0] ?? {});
            setFriends([...Friends].map((user)=>{
                if(activeUser.user.friendsId.includes(user.id))
                {
                    user.isFriend = true;
                }
                else{
                    user.isFriend = false;
                }
                return user;
            }));
        }
    }, [Friends]);

    const handleOnSearchChatsChange = async (e) => {
        const {value} = e.target;
        if(value.length < 3) {
            setFriends(Friends);
            return
        };

        // let filteredUser = Friends.filter((u)=> u.name.toLowerCase().includes(value.toLowerCase()))
        // if(filteredUser.length > 0){
        //     setFriends(filteredUser);
        //     return;
        // }
        
        const response = await api.getRequest(routes.SEARCH_USER, {
            params: {
                search:value
            }
        }) 
        if(!response.status){
            // response.showErrorAlerts();
            return;
        }
        const activeUser = loggedInUser.getUser();
        if(activeUser){
            response.message.map((user)=>{
                if(user.friendsId.includes(activeUser.user.id))
                {
                    user.isFriend = true;
                }
                else{
                    user.isFriend = false;
                }
            })
            setFriends(response.message);
        }
    }
    return (
        <div className="flex flex-col h-full sideBar">
            <div className="sideBarHeader">
                <div className="flex">
                    <input 
                    placeholder="Search..." 
                    className="pl-10 py-5 w-full outline-none" 
                    onChange={handleOnSearchChatsChange}
                    />
                    <div className="flex items-center justify-center p-5">
                        <span className="leading-tight text-3xl">+</span>
                    </div>
                </div>
            </div>
            <div className="sideBarBody h-full overflow-auto">
                {
                    friends.map((u, index)=>
                        <div 
                        key={index} 
                        className={`group hover:bg-gray-100 ${u._id === selectedFriend._id ? "bg-gray-100" : ""} cursor-pointer chatView flex items-center justify-center py-3 message relative`}
                        onClick={(e)=> setSelectedUser(e, u)}
                        >
                            <Avatar 
                                isActive = {u.isActive}
                            />
                            <div >
                                <div className="font-medium text-blue-400">{u.name}</div>
                                <div className="text-sm">I got two ticket to go see this awe...</div>
                            </div>

                                <UserDetailControl />
                                {
                                    !u.isFriend && <AddUserControl />
                                }
                                
                        </div>
                    )
                }
            </div>
        </div>
    )
}

function UserDetailControl() {
    return (
        <div className="absolute bg-gray-100 bg-white hidden border-l border-white flex h-full items-center justify-center msgControlsContainer right-0 w-14">
            <div className="msgControls userConfig  flex h-8 items-center justify-center relative w-8">
                <div className="absolute block h-auto">...</div>
            </div>  
        </div>
    )
}
function AddUserControl() {
    return (
        <div className="absolute addFriendContainer hidden h-full items-center justify-center w-full">
            <div className="addFriendControl">+</div>
        </div>
    )
}