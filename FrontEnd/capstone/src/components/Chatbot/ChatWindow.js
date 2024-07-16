import React from 'react';
import { formatFlightDetails } from './formatFlightDetails';

const ChatWindow = ({ conversations }) => {
  if (!conversations) return null;

  const renderMessageText = (text) => {
    if (typeof text === 'object' && text !== null) {
      if (text.data) {
        if (typeof text.data === 'string') {
          try {
            const parsedData = JSON.parse(text.data);
            if (Array.isArray(parsedData)) {
              return JSON.stringify(parsedData);
            }
          } catch (e) {
            // If parsing fails, return the original string content
            return text.data;
          }
        } else {
          // If data is not a string, assume it's already a JSON object
          return (
            <div>
              {formatFlightDetails(text.data)}
            </div>
          );
        }
      }
      if (text.code && text.message) {
        return `Error ${text.code}: ${text.message}`;
      }
      return JSON.stringify(text);
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
