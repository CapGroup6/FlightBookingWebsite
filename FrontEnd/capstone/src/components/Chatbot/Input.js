// src/components/Chatbot/Input.js
import React, { useState } from 'react';

const Input = ({ onSend }) => {
  const [text, setText] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (text.trim() === '') return;
    onSend(text);
    setText('');
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 flex bg-blue-50">
      <input 
        type="text" 
        value={text} 
        onChange={(e) => setText(e.target.value)} 
        className="flex-grow p-2 border border-gray-300 rounded-lg text-black bg-white" 
        placeholder="Type your message here..."
      />
      <button type="submit" className="ml-2 p-2 bg-blue-500 text-white rounded-lg hover:bg-blue-700">Send</button>
    </form>
  );
};

export default Input;
