import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router'; 
import { useAuth } from '../../pages/Login/AuthContext'; 
function Header() {
  const { username, logout } = useAuth();
  const router = useRouter();
  const [isChatbot, setIsChatbot] = useState(router.pathname === "/chatbot");

  useEffect(() => {
    const handleRouteChange = (url) => {
      setIsChatbot(url === "/chatbot");
    };

    router.events.on('routeChangeComplete', handleRouteChange);
    return () => router.events.off('routeChangeComplete', handleRouteChange);
  }, [router.events]);

  useEffect(() => {
    console.log("Current username:", username); // Debug output to see the username load
}, [username]);

  return (
    <header className="flex flex-col w-full mt-0 p-0 z-10">
      <div className="flex justify-between items-center w-full p-5 bg-white border-b">
        <div className="flex gap-2 items-center">
          <Link href={isChatbot ? "../" : "../chatbot"} className="flex items-center gap-2 px-4 py-2 bg-black text-white rounded-xl">
            <img
              src="https://cdn.builder.io/api/v1/image/assets/TEMP/e83753c221fd19ab205786cd31eeaaed84b32ac4285c65a98f5598031fba663f"
              className="w-5 aspect-square"
              alt="AI Chatbot Icon"
            />
            <span>{isChatbot ? "Traditional Search" : "AI Chatbot"}</span>
          </Link>
        </div>
        {username ? (
          <div className="flex gap-5 items-center text-gray-600 ml-auto z-10">
            <span>Welcome, {username}</span>
            <button className="text-xl" onClick={logout}>
              Logout
            </button>
          </div>
        ) : (
          <div className="flex gap-5 items-center text-gray-600 ml-auto z-10">
          <Link href="../Login/signup" className="text-xl">Register</Link>
          <Link href="../Login/login" className="text-xl">Sign in</Link>
          </div>
        )}
        <div className="flex items-center ml-5">
          <img
            src="https://cdn.builder.io/api/v1/image/assets/TEMP/e893a466a5127afac788e7257ebec62963300ee85e5a0d660b172777b5d3967a"
            alt="Logo"
            className="w-10 h-10"
          />
          <h1 className="ml-2 text-3xl font-bold text-black">
            Flight<span>Searching</span>
          </h1>
        </div>
      </div>
    </header>
  );
}

export default Header;
