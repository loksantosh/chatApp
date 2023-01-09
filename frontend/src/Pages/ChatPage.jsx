import { React, useState, useEffect } from 'react';
import { ChatState } from '../Context/ChatContext';
import { Box } from "@chakra-ui/layout";
import SideDrawer from '../Components/miscillenous/SideDrawer';
import ChatBox from '../Components/ChatBox';
import MyChats from '../Components/MyChats';


const ChatPage = () => {
    const { user } = ChatState();
    const [fetchAgain, setFetchAgain] = useState(false);



    return (

        <div style={{ width: "100%" }}>

            {user && <SideDrawer />}

            <Box display="flex" justifyContent="space-between" w="100%" h="91.5vh" p="10px">
                {user && <MyChats fetchAgain={fetchAgain} />}

                {user && <ChatBox fetchAgain={fetchAgain} setFetchAgain={setFetchAgain} />}

            </Box>
        </div>
    );
};

export default ChatPage









