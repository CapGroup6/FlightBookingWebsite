/*
 * Author: Jiawei Zhou
 * Final Edit Date: 2024/07/06
*/
import * as React from "react";
import { useState, useRef, useEffect } from 'react';
import { getAirlineLogoUrls } from '../Common/logoMap';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import RangeSlider from '../Common/slider'

const airlines = ['Star Alliance', 'SkyTeam', 'Oneworld', 'Air Canada', 'Eastar Jet', 'Asiana Airlines'];
const cities = ['Los Angeles', 'Vancouver', 'Tokyo', 'Paris', 'London'];
const airports = ['YVR', 'LAX', 'HND', 'CDG', 'LHR'];

const CheckboxItem = ({ id, value, isAirline, logoUrl }) => (
  <div className="flex items-center gap-5 mb-2">
    <input type="checkbox" id={id} name="item" value={value} />
    {isAirline && logoUrl && <img src={logoUrl} alt={value} style={{ width: '2rem', height: '2rem', borderRadius: '50%' }} />}
    <label htmlFor={id}>{value}</label>
  </div>
);

const DropdownBox = ({ items, label, isAirline }) => {
  const [isOpen, setIsOpen] = useState(false);
  const toggleDropdown = () => setIsOpen(!isOpen);
  const airlineUrls = isAirline ? getAirlineLogoUrls(airlines) : [];

  return (
    <div className="">
      <div className="flex justify-between items-center pl-2 py-1 pr-5 mb-3 text-sm rounded-sm border border-gray-300 border-solid text-sky-950" onClick={toggleDropdown}>
        <div>{label}</div>
        <KeyboardArrowDownIcon fontSize='large' className="my-0 py-0" style={isOpen ? {transform: `rotate(180deg)`,
          transition: `transform 0.3s ease-in-out`
        } : {}} alt="Expand icon" />
      </div>
      {isOpen && (
        <div className="mt-5">
          {items.map((item, index) => (
            <CheckboxItem
              key={index}
              id={`item-${index}`}
              value={item}
              isAirline={isAirline}
              logoUrl={isAirline ? airlineUrls[index] : null}
            />
          ))}
        </div>
      )}
    </div>
  );
};


function Filter() {
  return (
    <section className="flex flex-col pl-2 w-[95%]">
      <header className="px-2 py-3 w-full leading-5 text-gray-500 bg-sky-200">
        Preference
      </header>
      <main>
        <DropdownBox items={airlines} label="Airlines" isAirline />
        <DropdownBox items={cities} label="Stopover Cities" />
        <DropdownBox items={airports} label="Airports" />
        <h2 className="mt-5 text-m leading-5 text-black">Times</h2>
        <h3 className="mt-2 text-sm leading-5">Departure Time</h3>
        <RangeSlider />
        <h3 className="mt-2 text-sm leading-5">Arrival Time</h3>
        <RangeSlider />
      </main>
    </section>
  );
}

export default Filter;