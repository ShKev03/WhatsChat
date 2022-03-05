import { Avatar, IconButton } from '@material-ui/core'
import MoreVertIcon from '@material-ui/icons/MoreVert';
import { AttachFile, SearchOutlined } from '@material-ui/icons';
import InsertEmoticonIcon from '@material-ui/icons/InsertEmoticon';
import MicNoneIcon from '@material-ui/icons/MicNone';
import React, { useEffect, useState } from 'react'
import './chat.css'
import SendIcon from '@material-ui/icons/Send';
import { useParams } from 'react-router-dom';
import db from './firebase';
import { useStateValue } from './StateProvider';
import firebase from "firebase";

function Chat() {

    const [input, setInput] = useState("");
    const { roomId } = useParams('');
    const [roomName, setRoomName ] = useState("");
    const [messages, setMessages ] = useState([]);
    const [{user}, dispatch] = useStateValue();

    useEffect(()=>{
        if(roomId) {
            db.collection('rooms').doc(roomId).onSnapshot(snapshot => (
                setRoomName(snapshot.data().name)
            ))

            db.collection('rooms')
                .doc(roomId)
                .collection("messages")
                .orderBy("timestamp", "asc")
                .onSnapshot(snapshot => (
                    setMessages(snapshot.docs.map((doc) => doc.data()))
                ))
        }
    }, [roomId])


    const sendMessage = (e) => {
        e.preventDefault();
        console.log('you typed :', input);

        db.collection('rooms').doc(roomId).collection('messages').add({
            message: input,
            name: user.displayName,
            timestamp: firebase.firestore.FieldValue.serverTimestamp(),
        })

        setInput('');
    }

    return (
        <div className="chat">
            <div className="chat__header">
                <Avatar src={`https://avatars.dicebear.com/4.5/api/bottts/${ Math.floor(Math.random()*5000)}.svg`} className="sidebarChat__avatar chat__avatar"/>
                <div className="chat__headerInfo">
                    <h2 className="sidebarChat__roomName">{roomName}</h2>
                    <p className="chat__lastSeenAt">
                        Last Message{"  "}
                        {new Date( messages[messages.length -1]?.timestamp?.toDate()).toUTCString()}
                    </p>
                </div>
                <div className="chat__headerRight">
                    <IconButton>
                        <SearchOutlined/>
                    </IconButton>
                    <IconButton>
                        <AttachFile/>
                    </IconButton>
                    <IconButton>
                        <MoreVertIcon/>
                    </IconButton>
                </div>
            </div> 
            <div className="chat__body">
                {messages.map(message => (
                    <p className={`chat__message ${ message.name === user.displayName && 'chat__reciever'}`}>
                        <spam className="chat__name">{message.name}</spam>
                        {message.message}
                        <spam className="chatTimeStamp chat__timeStampReciever"> 
                            {new Date(message.timestamp?.toDate()).toUTCString()}
                        </spam>
                    </p>
                ))}
            </div> 
            <div className="chat__footer">
                <InsertEmoticonIcon className="footer-btn"/>
                <form className="footer-form">
                    <input value={input} onChange={e=>setInput(e.target.value)} type="text" placeholder="Enter message here......" className="enter-chat"></input>
                    <SendIcon className="footer-btn sendicon"/> 
                    <button className="submit-btn" onClick={sendMessage}>Send the message</button>
                </form>
                <MicNoneIcon className="footer-btn"/>
            </div>
        </div>
    )
}

export default Chat
