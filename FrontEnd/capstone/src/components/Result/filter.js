import React, { useState, useEffect } from 'react';
import RangeSlider from '../Common/slider';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { getAirlineLogoUrls } from '../Common/logoMap';

const CheckboxItem = ({ id, value, isAirline, logoUrl, onChange }) => (
  <div className="flex items-center gap-5 mb-2">
    <input type="checkbox" id={id} value={value} onChange={onChange} />
    {isAirline && logoUrl && <img src={logoUrl} alt={value} style={{ width: '2rem', height: '2rem', borderRadius: '50%' }} />}
    <label htmlFor={id}>{value}</label>
  </div>
);

const DropdownBox = ({ items, label, isAirline, filterType, onChange }) => {
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
              value={item.name || item}
              isAirline={isAirline}
              logoUrl={item.logoUrl}
              onChange={(e) => onChange(e, filterType)}
            />
          ))}
        </div>
      )}
    </div>
  );
};

const Filter = ({ apiResult, onFilterChange, buttonClicked }) => {
  const [filterData, setFilterData] = useState({
    airlines: [],
    stopoverCities: [],
    airports: [],
    numStopover: 0
  });

  const [selectedAirlines, setSelectedAirlines] = useState([]);
  const [selectedStopoverCities, setSelectedStopoverCities] = useState([]);
  const [selectedAirports, setSelectedAirports] = useState([]);
  const [selectedFilters, setSelectedFilters] = useState({
    departureTime: [0, 24],
    arrivalTime: [0, 24]
  });
  const [originalApiResult, setOriginalApiResult] = useState([]);

  useEffect(() => {
    const extractFilterData = (data) => {
      const airlines = new Set();
      const stopoverCities = new Set();
      const airports = new Set();
      let numStopover = 0;

      data.forEach((offer) => {
        offer.itineraries.forEach((itinerary) => {
          const segments = itinerary.segments;
          if (segments.length > 0) {
            segments.forEach((segment) => {
              airlines.add(segment.airlineName);
            });

            airports.add(segments[0].departure.airportName);
            airports.add(segments[segments.length - 1].arrival.airportName);

            if (segments.length > 1) {
              for (let i = 0; i < segments.length - 1; i++) {
                stopoverCities.add(segments[i].arrival.cityName);
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

    if (apiResult) {
      const data = extractFilterData(apiResult);
      setFilterData(data);
      setOriginalApiResult(apiResult);  // Backup the original API result
    }
  }, [buttonClicked]);

  const handleFilterChange = (event, filterType) => {
    const { value } = event.target;
    const uppercaseValue = value.toUpperCase();

    if (filterType === 'airline') {
      setSelectedAirlines((prevItems) => {
        const updatedItems = prevItems.includes(uppercaseValue)
          ? prevItems.filter((item) => item !== uppercaseValue)
          : [...prevItems, uppercaseValue];
        return updatedItems;
      });
    } else if (filterType === 'stopoverCity') {
      setSelectedStopoverCities((prevItems) => {
        const updatedItems = prevItems.includes(uppercaseValue)
          ? prevItems.filter((item) => item !== uppercaseValue)
          : [...prevItems, uppercaseValue];
        return updatedItems;
      });
    } else if (filterType === 'airport') {
      setSelectedAirports((prevItems) => {
        const updatedItems = prevItems.includes(uppercaseValue)
          ? prevItems.filter((item) => item !== uppercaseValue)
          : [...prevItems, uppercaseValue];
        return updatedItems;
      });
    }
  };

  const handleTimeChange = (newValue, timeType) => {
    if (Array.isArray(newValue) && newValue.length === 2) {
      console.log(`Setting ${timeType} to`, newValue);
      setSelectedFilters((prevFilters) => ({
        ...prevFilters,
        [timeType]: newValue
      }));
    } else {
      console.error('Invalid time range:', newValue);
    }
  };

  useEffect(() => {
    const filterResults = () => {
      if (!Array.isArray(selectedFilters.departureTime) || !Array.isArray(selectedFilters.arrivalTime)) {
        console.error('Invalid time filters', selectedFilters);
        return;
      }

      const filteredData = originalApiResult.filter((offer) => {
        const itinerary = offer.itineraries[0];  // 只检查第一个 itinerary
        const segments = itinerary.segments;
        if (segments.length > 0) {
          const firstSegment = segments[0];
          const lastSegment = segments[segments.length - 1];

          const departureTime = parseInt(firstSegment.departure.at.split('T')[1].split(':')[0]);
          const arrivalTime = parseInt(lastSegment.arrival.at.split('T')[1].split(':')[0]);

          const matchesDepartureTime = departureTime >= selectedFilters.departureTime[0] && departureTime <= selectedFilters.departureTime[1];
          const matchesArrivalTime = arrivalTime >= selectedFilters.arrivalTime[0] && arrivalTime <= selectedFilters.arrivalTime[1];

          if (!matchesDepartureTime || !matchesArrivalTime) {
            return false;
          }

          return segments.some((segment) => {
            const matchesAirline = selectedAirlines.length === 0 || selectedAirlines.includes(segment.airlineName.toUpperCase());
            const matchesStopoverCity = selectedStopoverCities.length === 0 || selectedStopoverCities.includes(segment.arrival.cityName.toUpperCase());
            const matchesAirport = selectedAirports.length === 0 || selectedAirports.includes(segment.departure.airportName.toUpperCase()) || selectedAirports.includes(segment.arrival.airportName.toUpperCase());

            return matchesAirline && matchesStopoverCity && matchesAirport;
          });
        }
        return false;
      });

      console.log('Filtered Data:', filteredData);
      onFilterChange(filteredData);
    };

    filterResults();
  }, [selectedAirlines, selectedStopoverCities, selectedAirports, selectedFilters]);

  return (
    <section className="flex flex-col pl-2 w-[95%]">
      <header className="px-2 py-3 w-full leading-5 text-gray-500 bg-sky-200">
        Preference
      </header>
      <main>
        <DropdownBox items={filterData.airlines} label="Airlines" isAirline filterType="airline" onChange={handleFilterChange} />
        <DropdownBox items={filterData.stopoverCities} label="Stopover Cities" filterType="stopoverCity" onChange={handleFilterChange} />
        <DropdownBox items={filterData.airports} label="Airports" filterType="airport" onChange={handleFilterChange} />
        <h2 className="mt-5 text-m leading-5 text-black">Times</h2>
        <h3 className="mt-2 text-sm leading-5">Departure Time</h3>
        <RangeSlider
          value={selectedFilters.departureTime}
          onChange={(newValue) => handleTimeChange(newValue, 'departureTime')}
        />
        <h3 className="mt-2 text-sm leading-5">Arrival Time</h3>
        <RangeSlider
          value={selectedFilters.arrivalTime}
          onChange={(newValue) => handleTimeChange(newValue, 'arrivalTime')}
        />
      </main>
    </section>
  );
};

export default Filter;
