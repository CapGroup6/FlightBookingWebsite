import React, { useState } from 'react';

const DetailButton = () => {
  const [loading, setLoading] = useState(false);

  const handleClick = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false); 
    }, 2000);
  };

  return (
    <div 
      className="justify-center px-3 py-2 text-base font-medium leading-6 text-center text-gray-500 whitespace-nowrap bg-sky-200 hover:bg-sky-300 rounded max-md:px-5 cursor-pointer"
      onClick={handleClick}
    >
      {loading ? 'Loading...' : 'Details'}
    </div>
  );
};

export default DetailButton;
