// src/pages/chatbot.js
import React, { useState } from 'react';
import Navbar from '../components/Chatbot/Navbar';
import Sidebar from '../components/Chatbot/Sidebar';
import Guidance from '../components/Chatbot/Guidance';
import ChatWindow from '../components/Chatbot/ChatWindow';
import Input from '../components/Chatbot/Input';

function Chatbot() {
  const [conversations, setConversations] = useState([]);
  const [currentConversation, setCurrentConversation] = useState(null);
  const [guidanceVisible, setGuidanceVisible] = useState(true);

  const handleNewChat = () => {
    const newConversation = { id: Date.now(), messages: [], name: '' };
    setConversations([...conversations, newConversation]);
    setCurrentConversation(newConversation);
    setGuidanceVisible(true);
  };

  const handleSend = (text) => {
    if (!currentConversation) return;
    const newMessage = { id: Date.now(), user: true, text };
    const updatedConversation = {
      ...currentConversation,
      messages: [...currentConversation.messages, newMessage],
    };
    setConversations(conversations.map(conv => conv.id === currentConversation.id ? updatedConversation : conv));
    setCurrentConversation(updatedConversation);
    setGuidanceVisible(false); // Hide guidance when a message is sent
  };

  const handleSelectConversation = (id) => {
    const conversation = conversations.find(conv => conv.id === id);
    setCurrentConversation(conversation);
    setGuidanceVisible(conversation.messages.length === 0);
  };

  const handleDeleteConversation = (id) => {
    setConversations(conversations.filter(conv => conv.id !== id));
    if (currentConversation?.id === id) {
      setCurrentConversation(null);
      setGuidanceVisible(true);
    } else {
      setCurrentConversation(conversations[0] || null);
      setGuidanceVisible(!conversations[0]);
    }
  };

  const handleRenameConversation = (id, newName) => {
    const updatedConversations = conversations.map(conv =>
      conv.id === id ? { ...conv, name: newName } : conv
    );
    setConversations(updatedConversations);
    if (currentConversation?.id === id) {
      setCurrentConversation({ ...currentConversation, name: newName });
    }
  };

  return (
    <div className="flex flex-col h-screen">
      <Navbar />
      <div className="flex flex-grow">
        <Sidebar 
          conversations={conversations} 
          onNewChat={handleNewChat}
          onSelectConversation={handleSelectConversation}
          currentConversationId={currentConversation?.id}
          onDeleteConversation={handleDeleteConversation}
          onRenameConversation={handleRenameConversation}
          className="w-1/4" 
        />
        <div className="flex flex-col w-3/4">
          <div className="flex-grow p-4 bg-blue-50">
            {guidanceVisible ? (
              <Guidance />
            ) : (
              <ChatWindow conversations={currentConversation?.messages} />
            )}
          </div>
          <Input onSend={handleSend} />
        </div>
      </div>
    </div>
  );
}

export default Chatbot;
