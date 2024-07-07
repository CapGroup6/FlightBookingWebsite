import * as React from "react";
import { useState } from "react";
import Link from 'next/link';

function Header() {
  const [language, setLanguage] = useState("English");
  const [currency, setCurrency] = useState("CAD");

  const handleLanguageChange = (newLanguage) => {
    setLanguage(newLanguage);
    // 在这里添加切换语言的逻辑，比如调用i18n库
  };

  const handleCurrencyChange = (newCurrency) => {
    setCurrency(newCurrency);
    // 在这里添加切换货币的逻辑
  };

  return (
    <header className="flex flex-col w-full mt-0 p-0 z-10">
      <div className="flex justify-between items-center w-full p-5 bg-white border-b">
        <div className="flex gap-2 items-center">
          <button className="flex items-center gap-2 px-4 py-2 bg-black text-white rounded-xl">
            <img
              loading="lazy"
              src="https://cdn.builder.io/api/v1/image/assets/TEMP/e83753c221fd19ab205786cd31eeaaed84b32ac4285c65a98f5598031fba663f?apiKey=bfbc62932a264251916c1c27ced3ccfe&"
              className="w-5 aspect-square"
              alt="AI Chatbot Icon"
            />
            <span>
              <Link href="../chatbot">
                AI Chatbot
              </Link>
            </span>
          </button>
        </div>
        <div className="flex gap-5 items-center text-gray-600 ml-auto z-10">
          <div className="relative group">
            <button className="flex items-center gap-2 text-xl">
              {language}
              <img
                loading="lazy"
                src="https://cdn.builder.io/api/v1/image/assets/TEMP/50eb79d754ade9d8ac5e40350c6ab2eae4faaf08a074363f7e75defcfff6a888?apiKey=bfbc62932a264251916c1c27ced3ccfe&"
                className="w-4 aspect-square"
                alt="Dropdown Icon"
              />
            </button>
            <div className="absolute hidden group-hover:block bg-white border rounded mt-1 w-full">
              <a href="#" className="block px-4 py-2 text-gray-800" onClick={() => handleLanguageChange("English")}>English</a>
              <a href="#" className="block px-4 py-2 text-gray-800" onClick={() => handleLanguageChange("中文")}>中文</a>
            </div>
          </div>
          <div className="relative group z-10">
            <button className="flex items-center gap-2 text-xl">
              {currency}
              <img
                loading="lazy"
                src="https://cdn.builder.io/api/v1/image/assets/TEMP/50eb79d754ade9d8ac5e40350c6ab2eae4faaf08a074363f7e75defcfff6a888?apiKey=bfbc62932a264251916c1c27ced3ccfe&"
                className="w-4 aspect-square"
                alt="Dropdown Icon"
              />
            </button>
            <div className="absolute hidden group-hover:block bg-white border rounded mt-1 w-full">
              <a href="#" className="block px-4 py-2 text-gray-800" onClick={() => handleCurrencyChange("USD")}>USD</a>
              <a href="#" className="block px-4 py-2 text-gray-800" onClick={() => handleCurrencyChange("CAD")}>CAD</a>
            </div>
          </div>
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
