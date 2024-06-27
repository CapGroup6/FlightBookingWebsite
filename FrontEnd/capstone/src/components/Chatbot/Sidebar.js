// components/Sidebar.js
import React from 'react';

const Sidebar = ({ conversations, onNewChat, onConversationAction }) => {
  return (
    <div className="bg-gray-100 p-4 w-64">
      <button onClick={onNewChat} className="mb-4 p-2 bg-blue-500 text-white hover:bg-blue-700">New Chat</button>
      <div>
        {conversations.map(conv => (
          <div key={conv.id} className="flex justify-between items-center mb-2">
            <span>{conv.title}</span>
            <div className="relative">
              <button onClick={() => onConversationAction(conv.id, 'options')} className="p-2 bg-gray-200 rounded-full">...</button>
              <div className="absolute right-0 mt-2 w-48 bg-white shadow-md rounded-lg z-10">
                <button onClick={() => onConversationAction(conv.id, 'delete')} className="block w-full text-left px-4 py-2 hover:bg-gray-100">Delete</button>
                <button onClick={() => onConversationAction(conv.id, 'share')} className="block w-full text-left px-4 py-2 hover:bg-gray-100">Share</button>
                <button onClick={() => onConversationAction(conv.id, 'rename')} className="block w-full text-left px-4 py-2 hover:bg-gray-100">Rename</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Sidebar;
