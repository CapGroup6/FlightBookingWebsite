import React from 'react';

const DetailButton = ({ onClick, showDetails }) => {
  return (
    <div 
      className="justify-center px-3 py-2 text-base font-medium leading-6 text-center text-gray-500 bg-sky-200 hover:bg-sky-300 rounded cursor-pointer"
      onClick={onClick}
      style={{ width: 'fit-content' }}
    >
      {showDetails ? 'Hide' : 'Details'}
    </div>
  );
};

export default DetailButton;
