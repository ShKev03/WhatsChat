import "./sidebarChat.css";

import React, { useEffect, useState } from "react";

import AddCommentIcon from "@material-ui/icons/AddComment";
import { Avatar } from "@material-ui/core";
import { Link } from "react-router-dom";
import db from "./firebase";

function SideBarChat({ id, name, addNewChat }) {
    const [seed, setSeed] = useState("");
    const [message, setMessages] = useState("");

    const createChat = () => {
        const roomName = prompt("Enter the Name for your new Group.....");
        if (roomName) {
            db.collection("rooms").add({
                name: roomName,
            });
        }
    };

    useEffect(() => {
        if (id) {
            db.collection("rooms")
                .doc(id)
                .collection("messages")
                .orderBy("timestamp", "desc")
                .onSnapshot((snapshot) => {
                    setMessages(snapshot.docs.map((doc) => doc.data()));
                });
        }
    }, [id]);

    useEffect(() => {
        setSeed(Math.floor(Math.random() * 5000));
    }, []);

    return !addNewChat ? (
        <Link to={`/rooms/${id}`}>
            <div className="sidebarChat">
                <Avatar
                    src={`https://avatars.dicebear.com/4.5/api/bottts/${seed}.svg`}
                    className="sidebarChat__avatar "
                />
                <div className="sidebarChat__info">
                    <h2 className="sidebarChat__roomName">{name}</h2>
                    <p className="sidebarChat__lastMes">
                        {message[0]?.message}
                    </p>
                </div>
            </div>
        </Link>
    ) : (
        <div className="sidebarChat addchat-btn" onClick={createChat}>
            <AddCommentIcon />
            <h2 className="sidebarChat__roomName h2a">Add NEW Group</h2>
        </div>
    );
}

export default SideBarChat;
