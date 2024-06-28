// src/pages/chatbot.js
import React, { useState } from 'react';
import Navbar from '../components/Chatbot/Navbar';
import Sidebar from '../components/Chatbot/Sidebar';
import Guidance from '../components/Chatbot/Guidance';
import Input from '../components/Chatbot/Input';

function Chatbot() {
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
    <div className="flex flex-col h-screen">
      <Navbar />
      <div className="flex flex-grow">
        <Sidebar 
          conversations={conversations} 
          onNewChat={handleNewChat} 
          onConversationAction={handleConversationAction} 
          className="w-1/4"
        />
        <div className="flex flex-col w-3/4">
          <Guidance />
          <Input onSend={handleSend} />
        </div>
      </div>
    </div>
  );
}

export default Chatbot;
