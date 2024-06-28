import React, { useState, useEffect } from 'react';
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
  const [loading, setLoading] = useState(false);
  const [buttonClicked, setButtonClicked] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (departure && destination && departure.label === destination.label) {
      alert('Departure and destination cannot be the same city.');
      return;
    }

    setLoading(true);
    setButtonClicked(true);

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
    } finally {
      setLoading(false);
      setTimeout(() => setButtonClicked(false), 300); // Remove the click effect after 300ms
    }
  };

  useEffect(() => {
    if (apiResults.length > 0) {
      handleSubmit(new Event('submit'));
    }
  }, [departure, destination, departureDate, returnDate, adults, children, infants, cabinClass, addNearbyAirport]);

  return (
    <div className="flex flex-col items-end px-16 pt-20 max-md:pl-5">
      <form onSubmit={handleSubmit} className={`flex gap-2 justify-between items-end pr-6 pb-3 pl-2.5 mt-48 bg-white rounded-lg shadow-sm ${styles.searchFormContainer} max-md:flex-wrap max-md:pr-5 max-md:mt-7`}>
        <div className="flex flex-col self-stretch gap-0.5 max-md:max-w-full">
          <div className={`flex z-10 gap-1 py-1 pr-20 pl-3 w-full text-sm leading-2 text-sky-950 ${styles.searchFormInner} max-md:flex-wrap max-md:pr-5 max-md:max-w-full`}>
            <div className="flex gap-1.5 justify-center py-px whitespace-nowrap">
              <img
                loading="lazy"
                src="https://cdn.builder.io/api/v1/image/assets/TEMP/6283ab735092d6ee58978d7bc83f0d04294b046ac513d55abccb6c17a478935f?apiKey=bfbc62932a264251916c1c27ced3ccfe&"
                className="shrink-0 w-4 aspect-square"
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
          <div className='flex flex-row item-center self-stretch gap-3 max-md:max-w-full'>
            <div className="flex flex-row gap-3 items-center justify-center h-10 px-4 text-sm font-bold leading-6 text-center text-gray-500 capitalize whitespace-nowrap rounded-lg max-md:mt-0 ${styles.imgContainer}">
              <LocationSelector
                userInput={userInputDeparture}
                setUserInput={setUserInputDeparture}
                setLocation={setDeparture}
                locationType="departure"
              />
              <div className="shrink-0 w-4 aspect-square self-stretch flex flex-col items-center justify-center">
                <img
                  loading="lazy"
                  srcSet="https://cdn.builder.io/api/v1/image/assets/TEMP/f858077400bf82af2a0b3714257676a245abea6f3371766742d88ff7c198f8a4?apiKey=bfbc62932a264251916c1c27ced3ccfe&width=100 100w, https://cdn.builder.io/api/v1/image/assets/TEMP/f858077400bf82af2a0b3714257676a245abea6f3371766742d88ff7c198f8a4?apiKey=bfbc62932a264251916c1c27ced3ccfe&width=200 200w, https://cdn.builder.io/api/v1/image/assets/TEMP/f858077400bf82af2a0b3714257676a245abea6f3371766742d88ff7c198f8a4?apiKey=bfbc62932a264251916c1c27ced3ccfe&width=400 400w, https://cdn.builder.io/api/v1/image/assets/TEMP/f858077400bf82af2a0b3714257676a245abea6f3371766742d88ff7c198f8a4?apiKey=bfbc62932a264251916c1c27ced3ccfe&width=800 800w, https://cdn.builder.io/api/v1/image/assets/TEMP/f858077400bf82af2a0b3714257676a245abea6f3371766742d88ff7c198f8a4?apiKey=bfbc62932a264251916c1c27ced3ccfe&width=1200 1200w, https://cdn.builder.io/api/v1/image/assets/TEMP/f858077400bf82af2a0b3714257676a245abea6f3371766742d88ff7c198f8a4?apiKey=bfbc62932a264251916c1c27ced3ccfe&width=1600 1600w, https://cdn.builder.io/api/v1/image/assets/TEMP/f858077400bf82af2a0b3714257676a245abea6f3371766742d88ff7c198f8a4?apiKey=bfbc62932a264251916c1c27ced3ccfe&width=2000 2000w, https://cdn.builder.io/api/v1/image/assets/TEMP/f858077400bf82af2a0b3714257676a245abea6f3371766742d88ff7c198f8a4?apiKey=bfbc62932a264251916c1c27ced3ccfe&"
                  className="img"
                />
                <img
                  loading="lazy"
                  srcSet="https://cdn.builder.io/api/v1/image/assets/TEMP/404b770a22f5348de34a603e903179f83823476f52b911502c7a740ddc20224a?apiKey=bfbc62932a264251916c1c27ced3ccfe&width=100 100w, https://cdn.builder.io/api/v1/image/assets/TEMP/404b770a22f5348de34a603e903179f83823476f52b911502c7a740ddc20224a?apiKey=bfbc62932a264251916c1c27ced3ccfe&width=200 200w, https://cdn.builder.io/api/v1/image/assets/TEMP/404b770a22f5348de34a603e903179f83823476f52b911502c7a740ddc20224a?apiKey=bfbc62932a264251916c1c27ced3ccfe&width=400 400w, https://cdn.builder.io/api/v1/image/assets/TEMP/404b770a22f5348de34a603e903179f83823476f52b911502c7a740ddc20224a?apiKey=bfbc62932a264251916c1c27ced3ccfe&width=800 800w, https://cdn.builder.io/api/v1/image/assets/TEMP/404b770a22f5348de34a603e903179f83823476f52b911502c7a740ddc20224a?apiKey=bfbc62932a264251916c1c27ced3ccfe&width=1200 1200w, https://cdn.builder.io/api/v1/image/assets/TEMP/404b770a22f5348de34a603e903179f83823476f52b911502c7a740ddc20224a?apiKey=bfbc62932a264251916c1c27ced3ccfe&width=1600 1600w, https://cdn.builder.io/api/v1/image/assets/TEMP/404b770a22f5348de34a603e903179f83823476f52b911502c7a740ddc20224a?apiKey=bfbc62932a264251916c1c27ced3ccfe&width=2000 2000w, https://cdn.builder.io/api/v1/image/assets/TEMP/404b770a22f5348de34a603e903179f83823476f52b911502c7a740ddc20224a?apiKey=bfbc62932a264251916c1c27ced3ccfe&"
                  className="img"
                />
              </div>
              <LocationSelector
                userInput={userInputDestination}
                setUserInput={setUserInputDestination}
                setLocation={setDestination}
                locationType="destination"
              />
            </div>
            <div className="flex flex-row items-center justify-center h-10 px-4 text-sm font-bold leading-6 text-center text-gray-500 capitalize whitespace-nowrap rounded-lg max-md:mt-0">
              <DateSelector
                tripType={tripType}
                departureDate={departureDate}
                setDepartureDate={setDepartureDate}
                returnDate={returnDate}
                setReturnDate={setReturnDate}
              />
            </div>
            <div className="flex flex-row items-center justify-center h-10 px-4 text-sm font-bold leading-6 text-center text-gray-500 capitalize whitespace-nowrap bg-sky-200 rounded-lg max-md:mt-0">
              <button type="submit" className={`h-10 px-7 max-md:px-5 ${buttonClicked ? 'btn-clicked' : ''}`}>
                {loading ? 'Searching...' : 'Search'}
              </button>
            </div>
          </div>
        </div>
      </form>
      <div>
        <h3>Results:</h3>
        {loading ? (
          <p>Loading...</p>
        ) : apiResults.length > 0 ? (
          <pre>{JSON.stringify(apiResults, null, 2)}</pre>
        ) : (
          <p>No results found. Please adjust your search criteria.</p>
        )}
      </div>
    </div>
  );
};

export default SearchForm;
