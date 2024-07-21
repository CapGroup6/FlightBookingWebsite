import * as React from 'react';
import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';

export default function RangeSlider({ value = [0, 24], onChange }) {
  const formatTime = (value) => {
    const hours = Math.floor(value);
    const minutes = Math.floor((value - hours) * 60);
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
  };

  const handleChange = (event, newValue) => {
    console.log(`Slider value changed to: ${newValue}`);
    if (Array.isArray(newValue) && newValue.length === 2) {
      onChange(newValue);
    } else {
      console.error('Invalid slider value:', newValue);
    }
  };

  return (
    <div className="flex flex-col mt-2">
      <div className="flex justify-between text-xs leading-5 text-slate-400">
        <div>{formatTime(value[0])}</div>
        <div>{formatTime(value[1])}</div>
      </div>
      <Box>
        <Slider
          value={value}
          onChange={handleChange}
          valueLabelDisplay="auto"
          valueLabelFormat={formatTime}
          max={24}
          step={0.01}
        />
      </Box>
    </div>
  );
}
