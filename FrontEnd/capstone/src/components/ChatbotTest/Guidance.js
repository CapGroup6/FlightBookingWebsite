// src/components/Chatbot/Guidance.js
import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';

const Guidance = () => {
  return (
    <Box sx={{ p: 4, bgcolor: 'lightblue', flexGrow: 1 }}>
      <Typography variant="h3" gutterBottom align="center" color="primary">
        ✈️ FlightSearch
      </Typography>
      <Box sx={{ display: 'flex', justifyContent: 'space-around', mt: 4 }}>
        <Box sx={{ width: '30%' }}>
          <Typography variant="h5" gutterBottom color="secondary">
            Examples
          </Typography>
          <Paper elevation={3} sx={{ p: 2, mb: 2 }}> 
            "I want to visit Shanghai, when the flights are the cheapest?"
          </Paper>
          <Paper elevation={3} sx={{ p: 2, mb: 2 }}>
            "I have a two-week vacation in July and my budget on flight is 2000, any recommendations for the destination?"
          </Paper>
          <Paper elevation={3} sx={{ p: 2 }}>
            "I'm in Vancouver and plan to go to Hong Kong at the end of July and return in early September. I want to find low-cost flights with a layover in Japan."
          </Paper>
        </Box>
        <Box sx={{ width: '30%' }}>
          <Typography variant="h5" gutterBottom color="secondary">
            Capabilities
          </Typography>
          <Paper elevation={3} sx={{ p: 2, mb: 2 }}>
            Remembers what user said earlier in the conversation.
          </Paper>
          <Paper elevation={3} sx={{ p: 2, mb: 2 }}>
            Allows user to provide follow-up corrections.
          </Paper>
          <Paper elevation={3} sx={{ p: 2 }}>
            Trained to decline inappropriate requests.
          </Paper>
        </Box>
        <Box sx={{ width: '30%' }}>
          <Typography variant="h5" gutterBottom color="secondary">
            Limitations
          </Typography>
          <Paper elevation={3} sx={{ p: 2, mb: 2 }}>
            May occasionally generate incorrect information.
          </Paper>
          <Paper elevation={3} sx={{ p: 2, mb: 2 }}>
            May occasionally produce harmful instructions or biased content.
          </Paper>
          <Paper elevation={3} sx={{ p: 2 }}>
            May provide less inspiring advice on other areas besides information related to tickets and flights.
          </Paper>
        </Box>
      </Box>
    </Box>
  );
};

export default Guidance;
