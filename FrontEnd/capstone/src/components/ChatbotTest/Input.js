// src/components/Chatbot/Input.js
import React, { useState } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

const Input = ({ onSend }) => {
  const [text, setText] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSend(text);
    setText('');
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ p: 4, bgcolor: 'lightblue', display: 'flex' }}>
      <TextField 
        value={text} 
        onChange={(e) => setText(e.target.value)} 
        variant="outlined" 
        fullWidth 
        placeholder="Type your message here..." 
      />
      <Button type="submit" variant="contained" color="primary" sx={{ ml: 2 }}>
        Send
      </Button>
    </Box>
  );
};

export default Input;
