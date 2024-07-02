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
  const [isLoading, setIsLoading] = useState(false); // 添加加载状态

  const handleNewChat = () => {
    const newConversation = { id: Date.now(), messages: [], name: '' };
    setConversations([...conversations, newConversation]);
    setCurrentConversation(newConversation);
    setGuidanceVisible(true);
  };

  const handleSend = async (text) => {
    if (!currentConversation) return;
    const newMessage = { id: Date.now(), user: true, text };
    const updatedConversation = {
      ...currentConversation,
      messages: [...currentConversation.messages, newMessage],
    };
    setConversations(conversations.map(conv => conv.id === currentConversation.id ? updatedConversation : conv));
    setCurrentConversation(updatedConversation);
    setGuidanceVisible(false);
    setIsLoading(true); // 设置加载状态为true

    console.log("Sending message:", text); // 打印发送的消息以进行调试

    // Send the message to the backend
    try {
      const response = await axios.post('http://localhost:8080/api/chatbot/get-response', {
        prompt: text
      }, {
        params: {
          userId: 1, // 这里假设用户ID为1，请根据实际情况调整
          sessionId: currentConversation.id
        }
      });
      console.log("Received response:", response.data); // 打印接收到的响应以进行调试
      const responseMessage = { id: Date.now(), user: false, text: response.data }; // 确保response.data是返回的消息文本
      const updatedConversationWithResponse = {
        ...updatedConversation,
        messages: [...updatedConversation.messages, responseMessage],
      };
      setConversations(conversations.map(conv => conv.id === currentConversation.id ? updatedConversationWithResponse : conv));
      setCurrentConversation(updatedConversationWithResponse);
    } catch (error) {
      console.error("Error sending message:", error); // 打印错误信息以进行调试
    } finally {
      setIsLoading(false); // 设置加载状态为false
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
        <div className="flex flex-col w-3/4">
          <div className="flex-grow p-4 bg-blue-50 overflow-auto">
            {guidanceVisible ? (
              <Guidance />
            ) : (
              <>
                <ChatWindow conversations={currentConversation?.messages} />
                {isLoading && <div>Loading...</div>} {/* 添加加载指示器 */}
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
