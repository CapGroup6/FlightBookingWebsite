import React, { useState, useEffect } from "react";
import Link from 'next/link';
import { useRouter } from 'next/router';

function Header() {
  const router = useRouter();
  const [isChatbot, setIsChatbot] = useState(true);

  useEffect(() => {
    // Check the current path to set the initial state
    if (router.pathname === "/chatbot") {
      setIsChatbot(false);
    } else {
      setIsChatbot(true);
    }
  }, [router.pathname]);

  const toggleSearchType = () => {
    setIsChatbot(!isChatbot);
  };

  return (
    <header className="flex flex-col w-full mt-0 p-0 z-10">
      <div className="flex justify-between items-center w-full p-5 bg-white border-b">
        <div className="flex gap-2 items-center">
          <button 
            className="flex items-center gap-2 px-4 py-2 bg-black text-white rounded-xl"
            onClick={toggleSearchType}
          >
            <img
              loading="lazy"
              src="https://cdn.builder.io/api/v1/image/assets/TEMP/e83753c221fd19ab205786cd31eeaaed84b32ac4285c65a98f5598031fba663f?apiKey=bfbc62932a264251916c1c27ced3ccfe&"
              className="w-5 aspect-square"
              alt="AI Chatbot Icon"
            />
            <span>
              <Link href={isChatbot ? "../chatbot" : ".."}>
                {isChatbot ? "AI Chatbot" : "Traditional Search"}
              </Link>
            </span>
          </button>
        </div>
        <div className="flex gap-5 items-center text-gray-600 ml-auto z-10">
          <button className="text-xl">
            <Link href="./Login/login">
              Register/Sign in
            </Link>
          </button>
        </div>
        <div className="flex items-center ml-5">
          <img
            loading="lazy"
            src="https://cdn.builder.io/api/v1/image/assets/TEMP/e893a466a5127afac788e7257ebec62963300ee85e5a0d660b172777b5d3967a?apiKey=e35f36ff56764292afe21d9cb1dc1589&"
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
