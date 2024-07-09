/*
 * Author: Jiawei Zhou
 * Final Edit Date: 2024/07/08
*/

import * as React from 'react';
import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';
import { useState, useRef, useEffect } from 'react';

export default function RangeSlider() {
  const [value, setValue] = React.useState([0, 24]);
  const [leftSliderPosition, setLeftSliderPosition] = useState(0);
  const [rightSliderPosition, setRightSliderPosition] = useState(24);

  const handleChange = (event, newValue) => {
    const clampedValue = newValue.map(v => Math.min(v, 24));
    setValue(clampedValue);
    setLeftSliderPosition(newValue[0]);
    setRightSliderPosition(newValue[1]);
  };

  const formatTime = (value) => {
    const hours = Math.floor(value);
    const minutes = Math.floor((value - hours) * 60);
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
};

  return (
    <div className="flex flex-col mt-2">
        <div className="flex justify-between text-xs leading-5 text-slate-400">
            <div>{formatTime(leftSliderPosition)}</div>
            <div>{formatTime(rightSliderPosition)}</div>
        </div>
        <Box >
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
