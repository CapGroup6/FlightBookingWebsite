import React, { useState } from 'react';
import Navbar from '../components/Chatbot/Navbar';
import Sidebar from '../components/Chatbot/Sidebar';
import Guidance from '../components/Chatbot/Guidance';
import ChatWindow from '../components/Chatbot/ChatWindow';
import Input from '../components/Chatbot/Input';
import axios from 'axios';

function Chatbot() {
  const [conversations, setConversations] = useState([]);
  const [currentConversation, setCurrentConversation] = useState(null);
  const [guidanceVisible, setGuidanceVisible] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [sendError, setSendError] = useState(null); // 定义sendError状态变量

  const handleNewChat = () => {
    const newConversation = { id: Date.now(), messages: [], name: '' };
    setConversations([...conversations, newConversation]);
    setCurrentConversation(newConversation);
    setGuidanceVisible(true);
  };

  const handleSend = async (text) => {
    if (!currentConversation) return;
    const newMessage = { id: Date.now(), user: 'user', text };
    const updatedConversation = {
      ...currentConversation,
      messages: [...currentConversation.messages, newMessage],
    };
    setConversations(conversations.map(conv => conv.id === currentConversation.id ? updatedConversation : conv));
    setCurrentConversation(updatedConversation);
    setGuidanceVisible(false);
    setIsLoading(true);
    setSendError(null); // 重置错误状态
  
    console.log("Sending message:", text);
  
    // Send the message to the backend
    try {
      const response = await axios.post('http://localhost:8080/api/chatbot/get-response', {
        prompt: text
      }, {
        params: {
          userId: 1, // 这里假设用户ID为1，请根据实际情况调整
          sessionId: currentConversation.id.toString() // 确保sessionId为字符串
        }
      });
      if (response.status === 200) {
        console.log("Received response:", response.data);
        const responseMessage = { id: Date.now(), user: 'bot', text: response.data };
        const updatedConversationWithResponse = {
          ...updatedConversation,
          messages: [...updatedConversation.messages, responseMessage],
        };
        setConversations(conversations.map(conv => conv.id === currentConversation.id ? updatedConversationWithResponse : conv));
        setCurrentConversation(updatedConversationWithResponse);
      } else {
        setSendError("Failed to send message. Please try again.");
      }
    } catch (error) {
      if (!error.response) {
        // Network error or no response from server
        setSendError("Network error: Unable to connect to the server. Please check your internet connection.");
      } else {
        setSendError("Error sending message: " + error.message);
      }
      console.error("Error sending message:", error);
    } finally {
      setIsLoading(false);
    }
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
      <div className="flex flex-grow overflow-hidden">
        <Sidebar 
          conversations={conversations} 
          onNewChat={handleNewChat}
          onSelectConversation={handleSelectConversation}
          currentConversationId={currentConversation?.id}
          onDeleteConversation={handleDeleteConversation}
          onRenameConversation={handleRenameConversation}
          className="w-1/4" 
        />
        <div className="flex flex-col w-full">
          <div className="flex-grow p-4 bg-blue-50 overflow-auto">
            {guidanceVisible ? (
              <Guidance />
            ) : (
              <>
                <ChatWindow conversations={currentConversation?.messages} />
                {isLoading && <div>Loading...</div>}
                {sendError && <div className="text-red-500 mt-2">{sendError}</div>} {/* 显示错误消息 */}
              </>
            )}
          </div>
          <Input onSend={handleSend} />
        </div>
      </div>
    </div>
  );
}

export default Chatbot;
