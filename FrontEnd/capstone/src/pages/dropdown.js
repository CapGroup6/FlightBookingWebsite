import * as React from "react";
import { useState, useEffect, useRef } from 'react';
import { getAirlineLogoUrls } from '../components/Common/logoMap';

const Airports = ({ airports }) => {
    return (
      <div className="flex flex-col">
        {airports.map((airport) => (
          <label key={airport.value}>
            <input type="checkbox" name="cities" value={airport.value} />
            {airport.label}
          </label>
        ))}
      </div>
    );
  };
  
  
  function DropdownBox({ airports, label }) {
    const [isOpen, setIsOpen] = useState(false);
    const toggleDropdown = () => setIsOpen(!isOpen);
  
    return (
      <div>
        <div className="flex gap-5 justify-between py-3 pr-14 mt-5 w-full text-sm leading-5 rounded-sm border border-gray-300 border-solid text-sky-950 cursor-pointer" onClick={toggleDropdown}>
          <div>{label}</div>
          <img loading="lazy" src="https://cdn.builder.io/api/v1/image/assets/TEMP/6711331a7a01d381e3668778eb46261c46c102739c5a1f11369941d95f312479?apiKey=e35f36ff56764292afe21d9cb1dc1589&" className="shrink-0 w-4 aspect-square" alt="Expand icon" /> 
        </div>
        {isOpen && 
        <div>
        {airports.map((airport, index) => (
          <div key={index}>
            <input type="checkbox" id={`airport-${index}`} name="airport" value={airport.code} />
            <label htmlFor={`airport-${index}`}>{airport.name}</label>
          </div>
        ))}
      </div>
      }
      </div>
    );
  }

  function MyComponent() {
    const airports = [
        { code: 'YVR', name: 'YVR' },
        { code: 'LAX', name: 'Los Angeles' },
        { code: 'HND', name: 'Tokyo Haneda' },
        { code: 'CDG', name: 'Paris Charles de Gaulle' },
        { code: 'LHR', name: 'London Heathrow' }
    ];
  
    return (
        <section className="flex flex-col max-w-[333px]">
          <header className="justify-center items-start px-9 py-3.5 w-full text-sm leading-5 text-center text-gray-500 whitespace-nowrap bg-sky-200">
            Preference
          </header>
          <main>
            <DropdownBox airports={airports} label={'Airports'}/>
          </main>
        </section>
      );
  }
  
  export default MyComponent;