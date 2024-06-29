// src/components/Chatbot/Navbar.js
import React from 'react';
import { useRouter } from 'next/router';

const Navbar = () => {
  const router = useRouter();

  const handleNavigation = () => {
    router.push('/'); // Navigate to the index page
  };

  return (
    <div className="bg-gray-800 p-4">
      <button className="text-white" onClick={handleNavigation}>
        Traditional Search
      </button>
    </div>
  );
};

export default Navbar;
