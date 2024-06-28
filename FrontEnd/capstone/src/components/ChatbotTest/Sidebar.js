// src/components/Chatbot/Sidebar.js
import React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import IconButton from '@mui/material/IconButton';
import MoreVertIcon from '@mui/icons-material/MoreVert';

const Sidebar = ({ conversations, onNewChat, onConversationAction }) => {
  return (
    <Box sx={{ width: '25%', bgcolor: 'background.paper' }}>
      <Button variant="contained" color="primary" onClick={onNewChat} sx={{ m: 2 }}>
        New Chat
      </Button>
      <List>
        {conversations.map((conv) => (
          <ListItem key={conv.id} button>
            <ListItemText primary={conv.title} />
            <IconButton edge="end" onClick={() => onConversationAction(conv.id, 'options')}>
              <MoreVertIcon />
            </IconButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );
};

export default Sidebar;
