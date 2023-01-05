import { React } from 'react';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { ChatState } from '../Context/ChatContext';
import { Box } from "@chakra-ui/layout";
import SideDrawer from '../Components/miscillenous/SideDrawer';
import ChatBox from '../Components/ChatBox';
import MyChats from '../Components/MyChats';
import { Button } from '@chakra-ui/react';


const ChatPage = () => {
    const { user } = ChatState();

    function refreshPage() {
        window.location.reload(false);
    }
    
       
    
    

    return (
        
        <div style={{ width: "100%" }}>
          
            {user && <SideDrawer />}
            
            <Box display="flex" justifyContent="space-between" w="100%" h="91.5vh" p="10px">
                {user && <MyChats/>}
                {user && <ChatBox/>}
                

            </Box>
        </div>
    );
};

export default ChatPage