// src/components/Chatbot/Navbar.js
import React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';

const Navbar = () => {
  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          Traditional Search
        </Typography>
        <Button color="inherit" onClick={() => window.location.href = '/traditional-search'}>
          Traditional Search
        </Button>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
