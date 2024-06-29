import React, { useState } from 'react';
import DateSelector from '../searchForm/DateSelector';
import LocationSelector from '../searchForm/LocationSelector';
import TripType from '../searchForm/TripType';
import CabinClass from '../searchForm/CabinClass';
import PassengerCount from '../searchForm/PassengerCount';
import axios from 'axios';
import styles from '../../styles/SearchForm.module.css';

const SearchForm = () => {
  const [tripType, setTripType] = useState({ label: 'Round-Trip', value: 'Round-Trip' });
  const [departure, setDeparture] = useState(null);
  const [destination, setDestination] = useState(null);
  const [userInputDeparture, setUserInputDeparture] = useState('');
  const [userInputDestination, setUserInputDestination] = useState('');
  const [departureDate, setDepartureDate] = useState(new Date().toISOString().split('T')[0]);
  const [returnDate, setReturnDate] = useState(new Date(new Date().setDate(new Date().getDate() + 7)).toISOString().split('T')[0]);
  const [adults, setAdults] = useState(1);
  const [children, setChildren] = useState(0);
  const [infants, setInfants] = useState(0);
  const [cabinClass, setCabinClass] = useState({ label: 'Economy', value: 'Economy' });
  const [addNearbyAirport, setAddNearbyAirport] = useState(false);
  const [apiResults, setApiResults] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (departure && destination && departure.label === destination.label) {
      alert('Departure and destination cannot be the same city.');
      return;
    }

    const params = {
      origin: departure ? departure.iataCode : '',
      destination: destination ? destination.iataCode : '',
      departureDate,
      returnDate: tripType.value === 'Round-Trip' ? returnDate : '',
      adults,
      children,
      infants,
      cabinClass: cabinClass.value,
      addNearbyAirport,
    };

    const queryString = Object.keys(params)
      .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`)
      .join('&');

    try {
      const response = await axios.get(`http://localhost:8080/api/flights?${queryString}`);
      setApiResults(response.data);
    } catch (error) {
      console.error('Error fetching flights:', error);
      setApiResults([]); // Reset results on error
    }
  };

  return (
    <div className="flex flex-col items-end px-16 pt-20 max-md:pl-5">
      <form onSubmit={handleSubmit} className="flex gap-5 justify-between items-end pr-6 pb-6 pl-2.5 mt-48 bg-white rounded-lg shadow-sm max-md:flex-wrap max-md:pr-5 max-md:mt-10">
        <div className="flex flex-col self-stretch max-md:max-w-full">
          <div className="flex z-10 gap-5 py-2 pr-20 pl-3 w-full text-sm leading-5 text-sky-950 max-md:flex-wrap max-md:pr-5 max-md:max-w-full">
            <div className="flex gap-1.5 justify-center items-start py-0.5 whitespace-nowrap leading-[129%]">
              <img
                loading="lazy"
                src="https://cdn.builder.io/api/v1/image/assets/TEMP/6283ab735092d6ee58978d7bc83f0d04294b046ac513d55abccb6c17a478935f?apiKey=bfbc62932a264251916c1c27ced3ccfe&"
                className="shrink-0 w-3.5 aspect-square"
              />
              <TripType
                tripType={tripType}
                setTripType={setTripType}
              />

            </div>
            <div className="flex gap-1.5 justify-center items-center py-px">
              <img
                loading="lazy"
                src="https://cdn.builder.io/api/v1/image/assets/TEMP/3beeaee9d59b10c510bde73699c311161dd6f550e85e6365c9527bfde14dda4f?apiKey=bfbc62932a264251916c1c27ced3ccfe&"
                className="shrink-0 self-stretch w-4 aspect-square"
              />
              <PassengerCount
                adults={adults}
                setAdults={setAdults}
                children={children}
                setChildren={setChildren}
                infants={infants}
                setInfants={setInfants}
              />

              <div className="flex gap-1.5 justify-center py-px whitespace-nowrap">
                <img
                  loading="lazy"
                  src="https://cdn.builder.io/api/v1/image/assets/TEMP/86086eb472a749833dc8fd365a46723d001bb455fe85da08afecafb9ca8254c6?apiKey=bfbc62932a264251916c1c27ced3ccfe&"
                  className="shrink-0 w-4 aspect-square"
                />
                <CabinClass
                  cabinClass={cabinClass}
                  setCabinClass={setCabinClass}
                />
              </div>
            </div>
          </div>
          <div className="flex gap-3.5 px-0.5 max-md:flex-wrap">
            <LocationSelector
              userInput={userInputDeparture}
              setUserInput={setUserInputDeparture}
              setLocation={setDeparture}
              locationType="departure"
            />
            <LocationSelector
              userInput={userInputDestination}
              setUserInput={setUserInputDestination}
              setLocation={setDestination}
              locationType="destination"
            />
          </div>
        </div>
        <div className="flex gap-0 items-start py-px mt-8 text-sm font-semibold leading-6 text-right capitalize text-zinc-600">
          <DateSelector
            tripType={tripType}
            departureDate={departureDate}
            setDepartureDate={setDepartureDate}
            returnDate={returnDate}
            setReturnDate={setReturnDate}
          />
        </div>
        <div className="flex flex-col justify-center px-4 py-2 mt-11 text-sm font-bold leading-6 text-center text-gray-500 capitalize whitespace-nowrap bg-sky-200 rounded-lg max-md:mt-10">
          <button type="submit" className="justify-center px-7 max-md:px-5">Search</button>
        </div>
      </form>
      <div>
        <h3>Results:</h3>
        {apiResults.length > 0 ? (
          <pre>{JSON.stringify(apiResults, null, 2)}</pre>
        ) : (
          <p>No results found. Please adjust your search criteria.</p>
        )}
      </div>
    </div>
  );
};

export default SearchForm;
