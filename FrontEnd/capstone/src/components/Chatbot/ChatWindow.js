// src/components/Chatbot/ChatWindow.js
import React from 'react';

const ChatWindow = ({ conversations }) => {
  if (!conversations) return null;

  return (
    <div className="flex-grow p-4 bg-blue-50">
      {conversations.map((message) => (
        <div key={message.id} className={`flex ${message.user ? 'justify-end' : 'justify-start'} mb-4`}>
          <div className={`p-4 rounded-lg ${message.user ? 'bg-blue-500 text-white' : 'bg-gray-200 text-black'}`}>
            {message.text}
          </div>
        </div>
      ))}
    </div>
  );
};

export default ChatWindow;
