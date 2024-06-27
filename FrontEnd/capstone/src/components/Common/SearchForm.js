import React, { useState } from 'react';
import DateSelector from '../searchForm/DateSelector';
import LocationSelector from '../searchForm/LocationSelector';
import TripTypeAndCabinClass from '../searchForm/TripTypeAndCabinClass';
import PassengerCount from '../searchForm/PassengerCount';
import styles from '../../styles/SearchForm.module.css';
import axios from 'axios';

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
    <form onSubmit={handleSubmit} className={styles.form}>
      <TripTypeAndCabinClass
        tripType={tripType}
        setTripType={setTripType}
        cabinClass={cabinClass}
        setCabinClass={setCabinClass}
      />
      <PassengerCount
        adults={adults}
        setAdults={setAdults}
        children={children}
        setChildren={setChildren}
        infants={infants}
        setInfants={setInfants}
      />
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
      <DateSelector
        tripType={tripType}
        departureDate={departureDate}
        setDepartureDate={setDepartureDate}
        returnDate={returnDate}
        setReturnDate={setReturnDate}
      />
      <div className={styles.row}>
        <div className={styles.checkboxWrapper}>
          <input type="checkbox" checked={addNearbyAirport} onChange={() => setAddNearbyAirport(!addNearbyAirport)} />
          <label className={styles.label}>Add nearby airport</label>
        </div>
      </div>
      <button type="submit" className={styles.button}>Search</button>
      <div>
        <h3>Results:</h3>
        {apiResults.length > 0 ? (
          <pre>{JSON.stringify(apiResults, null, 2)}</pre>
        ) : (
          <p>No results found. Please adjust your search criteria.</p>
        )}
      </div>
    </form>
  );
};

export default SearchForm;
