import React from 'react';
import axios from 'axios';
import { useEffect, useState } from 'react';

const ChatPage = () => {

    const [chat, setChats] = useState([]);

    const fetchChats = async () => {
        const { data: { chats } } = await axios.get('/api/chat')
        setChats(chats)
    }

    useEffect(() => {
        fetchChats()
    }, []);

    return (
        <div>
            {chat.map((chat) => (
                <div key={chat._id}>{chat.chatName}</div>
            ))}

        </div>
    );
};

export default ChatPage