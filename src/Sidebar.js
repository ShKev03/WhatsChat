import { Avatar, IconButton } from '@material-ui/core'
import React, { useEffect, useState } from 'react'
import './sidebar.css'
import DonutSmallIcon from '@material-ui/icons/DonutSmall';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import MessageIcon from '@material-ui/icons/Message';
import { SearchOutlined } from '@material-ui/icons';
import SideBarChat from './SideBarChat';
import db from './firebase';
import { useStateValue } from './StateProvider';

function Sidebar() {
    const [rooms, setRooms] = useState([])
    const [{ user }, dispatch] = useStateValue();

    useEffect(() => {
        const unsubscribe = db.collection('Quiz').onSnapshot(snapshot => 
            setRooms(
                snapshot.docs.map(doc => ({
                    id: doc.id,
                    data: doc.data(),
                }))
            )
        );

        return () => {
            unsubscribe();
        }
    }, [])

    const createChat = () => {
        const roomName = prompt("Enter the Name for your new Group.....")
        if (roomName) {
            console.log(roomName)
        }
    }

    return (
        <div className="sidebar">
            <div className="sidebar__header">
                <Avatar src={user?.photoURL}/>
                <div className="sidebar__headerRight">
                    <IconButton >
                        <DonutSmallIcon className="sidebar__headerRight-btn"/>
                    </IconButton>
                    <IconButton onClick={createChat}>
                        <MessageIcon className="sidebar__headerRight-btn"/>
                    </IconButton>
                    <IconButton>
                        <MoreVertIcon className="sidebar__headerRight-btn"/>
                    </IconButton>
                </div>
            </div>
            <div className="sidebar__search">
                <div className="sidebar__searchContainer">
                    <SearchOutlined className="sidebar__headerRight-btn search-btn"/>
                    <input className="search-message" placeholder="Search..." type="text"/>
                </div>
            </div>
            <div className="sidebar__chat">
                {rooms.map((room) => (
                    <SideBarChat key={room.id} id={room.id} name={room.data.name} />
                ))}
            </div>
            <div className="add-new-chat">
                <SideBarChat addNewChat />
            </div>
        </div>
    )
}

export default Sidebar
