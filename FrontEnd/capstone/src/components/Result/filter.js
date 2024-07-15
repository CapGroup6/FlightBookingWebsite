import React, { useState, useEffect } from 'react';
import styles from '../../styles/SearchForm.module.css';
import RangeSlider from '../Common/slider';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { getAirlineLogoUrls } from '../Common/logoMap';

const capitalizeFirstLetter = (string) => {
  return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
};

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

  return (
    <div className="">
      <div className="flex justify-between items-center pl-2 py-1 pr-5 mb-3 text-sm rounded-sm border border-gray-300 border-solid text-sky-950" onClick={toggleDropdown}>
        <div>{label}</div>
        <KeyboardArrowDownIcon fontSize='large' className="my-0 py-0" style={isOpen ? {
          transform: `rotate(180deg)`,
          transition: `transform 0.3s ease-in-out`
        } : {}} alt="Expand icon" />
      </div>
      {isOpen && (
        <div className="mt-5">
          {items.map((item, index) => (
            <CheckboxItem
              key={index}
              id={`item-${index}`}
              value={item.name ? capitalizeFirstLetter(item.name) : capitalizeFirstLetter(item)}
              isAirline={isAirline}
              logoUrl={item.logoUrl}
            />
          ))}
        </div>
      )}
    </div>
  );
};

const Filter = ({ apiResult }) => {
  const [filterData, setFilterData] = useState({
    airlines: [],
    stopoverCities: [],
    airports: [],
    numStopover: 0
  });

  const extractFilterData = (apiResult) => {
    const airlines = new Set();
    const stopoverCities = new Set();
    const airports = new Set();
    let numStopover = 0;

    apiResult.forEach((offer) => {
      offer.itineraries.forEach((itinerary) => {
        const segments = itinerary.segments;
        if (segments.length > 0) {
          segments.forEach((segment) => {
            airlines.add(capitalizeFirstLetter(segment.airlineName));
          });

          airports.add(capitalizeFirstLetter(segments[0].departure.airportName));
          airports.add(capitalizeFirstLetter(segments[segments.length - 1].arrival.airportName));

          if (segments.length > 1) {
            for (let i = 0; i < segments.length - 1; i++) {
              stopoverCities.add(capitalizeFirstLetter(segments[i].arrival.cityName));
            }
            numStopover += segments.length - 1;
          }
        }
      });
    });

    const airlinesArray = Array.from(airlines);
    const logoUrls = getAirlineLogoUrls(airlinesArray);
    const airlinesWithLogos = airlinesArray.map((name, index) => ({
      name,
      logoUrl: logoUrls[index]
    }));

    return ({
      airlines: airlinesWithLogos,
      stopoverCities: Array.from(stopoverCities),
      airports: Array.from(airports),
      numStopover
    });
  };

  useEffect(() => {
    if (apiResult) {
      const data = extractFilterData(apiResult);
      setFilterData(data);
    }
  }, [apiResult]);

  return (
    <section className="flex flex-col pl-2 w-[95%]">
      <header className="px-2 py-3 w-full leading-5 text-gray-500 bg-sky-200">
        Preference
      </header>
      <main>
        <DropdownBox items={filterData.airlines} label="Airlines" isAirline />
        <DropdownBox items={filterData.stopoverCities} label="Stopover Cities" />
        <DropdownBox items={filterData.airports} label="Airports" />
        <h2 className="mt-5 text-m leading-5 text-black">Times</h2>
        <h3 className="mt-2 text-sm leading-5">Departure Time</h3>
        <RangeSlider />
        <h3 className="mt-2 text-sm leading-5">Arrival Time</h3>
        <RangeSlider />
      </main>
    </section>
  );
};

export default Filter;
