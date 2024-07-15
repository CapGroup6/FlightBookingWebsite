import React from 'react';

const ChatWindow = ({ conversations }) => {
  if (!conversations) return null;

  const renderMessageText = (text) => {
    if (typeof text === 'object' && text !== null) {
      if (text.data) {
        return text.data;
      }
      if (text.code && text.message) {
        return `Error ${text.code}: ${text.message}`;
      }
      return JSON.stringify(text); // 将对象转换为字符串
    }
    return text;
  };

  return (
    <div className="flex-grow p-4 bg-blue-50">
      {conversations.map((message) => (
        <div key={message.id} className={`flex ${message.user === 'user' ? 'justify-end' : 'justify-start'} mb-4`}>
          <div className={`p-4 rounded-lg ${message.user === 'user' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-black'}`}>
            {renderMessageText(message.text)}
          </div>
        </div>
      ))}
    </div>
  );
};

export default ChatWindow;
