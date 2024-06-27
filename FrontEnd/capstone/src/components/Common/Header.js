import React from 'react';

const Header = () => (
  <header className="flex flex-col mt-14 max-md:mt-10 max-md:max-w-full">
    <div className="flex gap-2 text-3xl font-bold text-black max-md:flex-wrap">
      <img
        loading="lazy"
        src="https://cdn.builder.io/api/v1/image/assets/TEMP/e893a466a5127afac788e7257ebec62963300ee85e5a0d660b172777b5d3967a?apiKey=e35f36ff56764292afe21d9cb1dc1589&"
        alt="Logo"
        className="shrink-0 aspect-square w-[39px]"
      />
      <h1 className="flex-auto">
        Flight<span className="">Booking</span>
      </h1>
    </div>
  </header>
);

export default Header;
