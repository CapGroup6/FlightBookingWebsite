import React, { useState } from 'react';
import Header from '../components/Common/Header';
import Sidebar from '../components/Chatbot/Sidebar';
import Guidance from '../components/Chatbot/Guidance';
import ChatWindow from '../components/Chatbot/ChatWindow';
import Input from '../components/Chatbot/Input';
import axios from 'axios';
import qs from 'qs';

function Chatbot() {
  const [conversations, setConversations] = useState([]);
  const [currentConversation, setCurrentConversation] = useState(null);
  const [guidanceVisible, setGuidanceVisible] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [sendError, setSendError] = useState(null);

  const createNewConversation = () => {
    const newConversation = { id: Date.now(), messages: [], name: '' };
    return newConversation;
  };

  const handleNewChat = () => {
    const newConversation = createNewConversation();
    setConversations(prevConversations => [...prevConversations, newConversation]);
    setCurrentConversation(newConversation);
    setGuidanceVisible(true);
  };

  const handleSend = async (text) => {
    let conversation = currentConversation;

    if (!conversation) {
      // If there is no current conversation, create a new one
      conversation = createNewConversation();
      setConversations(prevConversations => [...prevConversations, conversation]);
      setCurrentConversation(conversation);
    }

    const newMessage = { id: Date.now(), user: 'user', text };
    const updatedConversation = {
      ...conversation,
      messages: [...conversation.messages, newMessage],
    };

    setConversations(prevConversations =>
      prevConversations.map(conv => conv.id === conversation.id ? updatedConversation : conv)
    );
    setCurrentConversation(updatedConversation);
    setGuidanceVisible(false);
    setIsLoading(true);
    setSendError(null);

    console.log("Sending message:", text);

    // Send the message to the backend
    try {
      const response = await axios.post('http://localhost:8080/api/chatbot/get-response', qs.stringify({
        prompt: text
      }), {
        params: {
          userId: 2,
          sessionId: conversation.id.toString()
        },
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      });
      if (response.status === 200) {
        console.log("Received response:", response.data);
        const responseMessage = { id: Date.now(), user: 'bot', text: response.data };
        const updatedConversationWithResponse = {
          ...updatedConversation,
          messages: [...updatedConversation.messages, responseMessage],
        };
        setConversations(prevConversations =>
          prevConversations.map(conv => conv.id === conversation.id ? updatedConversationWithResponse : conv)
        );
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
    setConversations(prevConversations => prevConversations.filter(conv => conv.id !== id));
    if (currentConversation?.id === id) {
      setCurrentConversation(null);
      setGuidanceVisible(true);
    } else {
      const firstConversation = conversations[0] || null;
      setCurrentConversation(firstConversation);
      setGuidanceVisible(!firstConversation);
    }
  };

  const handleRenameConversation = (id, newName) => {
    setConversations(prevConversations =>
      prevConversations.map(conv =>
        conv.id === id ? { ...conv, name: newName } : conv
      )
    );
    if (currentConversation?.id === id) {
      setCurrentConversation({ ...currentConversation, name: newName });
    }
  };

  return (
    <div className="flex flex-col h-screen">
      <Header />
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
                {sendError && <div className="text-red-500 mt-2">{sendError}</div>}
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
