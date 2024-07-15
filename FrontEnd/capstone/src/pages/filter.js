import React, { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import { getAirlineLogoUrls } from '../components/Common/logoMap';

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
    <div>
      <div className="flex gap-5 justify-between py-3 pr-14 mt-5 w-full text-sm leading-5 rounded-sm border border-gray-300 border-solid text-sky-950 cursor-pointer" onClick={toggleDropdown}>
        <div>{label}</div>
        <img loading="lazy" src="https://cdn.builder.io/api/v1/image/assets/TEMP/6711331a7a01d381e3668778eb46261c46c102739c5a1f11369941d95f312479?apiKey=e35f36ff56764292afe21d9cb1dc1589&" className="shrink-0 w-4 aspect-square" alt="Expand icon" />
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

const TimeSlider = ({ label }) => {
  const [leftValue, setLeftValue] = useState(0);
  const [rightValue, setRightValue] = useState(24);
  const sliderRef = useRef(null);
  const [sliderWidth, setSliderWidth] = useState(0);

  useEffect(() => {
    if (sliderRef.current) {
      setSliderWidth(sliderRef.current.offsetWidth);
    }
  }, []);

  const formatTime = (value) => {
    const hours = Math.floor(value);
    const minutes = Math.floor((value - hours) * 60);
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
  };

  const handleDrag = (e, slider) => {
    e.preventDefault();

    const updatePosition = (moveEvent) => {
      const sliderRect = sliderRef.current.getBoundingClientRect();
      let newLeft = (moveEvent.clientX - sliderRect.left) / sliderRect.width * 24;
      newLeft = Math.max(0, Math.min(newLeft, 24));
      slider === 'left' ? setLeftValue(newLeft) : setRightValue(newLeft);
    };

    const stopDrag = () => {
      document.removeEventListener('mousemove', updatePosition);
      document.removeEventListener('mouseup', stopDrag);
    };

    document.addEventListener('mousemove', updatePosition);
    document.addEventListener('mouseup', stopDrag);
  };

  return (
    <div className="flex flex-col pt-2 pb-0.5 mt-5 w-full">
      <div className="text-gray-500">{label}</div>
      <div className="flex gap-5 justify-between w-full text-xs leading-5 whitespace-nowrap text-slate-400">
        <div>{formatTime(leftValue)}</div>
        <div>{formatTime(rightValue)}</div>
      </div>
      <div ref={sliderRef} className="relative mt-2.5 h-2 bg-gray-300">
        <div
          className="absolute h-2 bg-blue-500"
          style={{
            left: `${leftValue / 24 * 100}%`,
            right: `${100 - rightValue / 24 * 100}%`,
          }}
        ></div>
        <div
          className="absolute w-4 h-4 bg-white border border-black rounded-full cursor-pointer"
          style={{ left: `${leftValue / 24 * sliderWidth - 8}px`, top: '50%', transform: 'translateY(-50%)' }}
          onMouseDown={(e) => handleDrag(e, 'left')}
        ></div>
        <div
          className="absolute w-4 h-4 bg-white border border-black rounded-full cursor-pointer"
          style={{ left: `${rightValue / 24 * sliderWidth - 8}px`, top: '50%', transform: 'translateY(-50%)' }}
          onMouseDown={(e) => handleDrag(e, 'right')}
        ></div>
      </div>
    </div>
  );
};

const filter = ({ tripType }) => {
  const [stopoverList, setStopoverList] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchStopoverList = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/result/getStopoverList?whichTrip=${tripType}`, {
          withCredentials: true,
        });
        setStopoverList(response.data);
      } catch (err) {
        setError(err);
      }
    };

    fetchStopoverList();
  }, [tripType]);

  return (
    <section className="flex flex-col max-w-[333px]">
      <header className="justify-center items-start px-9 py-3.5 w-full text-sm leading-5 text-center text-gray-500 whitespace-nowrap bg-sky-200">
        Preference
      </header>
      <main>
        <DropdownBox items={airlines} label="Airlines" isAirline />
        <DropdownBox items={cities} label="Cities" />
        <DropdownBox items={airports} label="Airports" />
        <h2 className="mt-5 w-full text-sm leading-5 text-black">Times</h2>
        <TimeSlider label="Departure time" value="00:00-24:00" />
        <TimeSlider label="Arrival time" value="00:00-24:00" />
        {error && <p className="text-red-500">{error.message}</p>}
        <h2 className="mt-5 w-full text-sm leading-5 text-black">Stopover Cities</h2>
        <ul>
          {stopoverList.map((stopover, index) => (
            <li key={index}>
              {stopover.from} - {stopover.to}
            </li>
          ))}
        </ul>
      </main>
    </section>
  );
};

export default filter;
