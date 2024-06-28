// src/pages/chatbot.js
import React, { useState } from 'react';
import Navbar from '../components/ChatbotTest/Navbar';
import Sidebar from '../components/ChatbotTest/Sidebar';
import Guidance from '../components/ChatbotTest/Guidance';
import Input from '../components/ChatbotTest/Input';
import Box from '@mui/material/Box';

function ChatbotUI() {
  const [conversations, setConversations] = useState([]);
  const [currentContent, setCurrentContent] = useState('');

  const handleNewChat = () => {
    // Logic for creating new chat
  };

  const handleConversationAction = (id, action) => {
    // Logic for handling conversation actions (delete, share, rename)
  };

  const handleSend = (text) => {
    // Logic for sending text and updating the main content area
    setCurrentContent(text);
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
      <Navbar />
      <Box sx={{ display: 'flex', flexGrow: 1 }}>
        <Sidebar 
          conversations={conversations} 
          onNewChat={handleNewChat} 
          onConversationAction={handleConversationAction} 
        />
        <Box sx={{ display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
          <Guidance />
          <Input onSend={handleSend} />
        </Box>
      </Box>
    </Box>
  );
}

export default ChatbotUI;
