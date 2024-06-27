// components/Navbar.js
import React from 'react';

const Navbar = () => {
  return (
    <div className="bg-gray-800 p-4">
      <button className="text-white" onClick={() => window.location.href = '/traditional-search'}>
        Traditional Search
      </button>
    </div>
  );
};

export default Navbar;
