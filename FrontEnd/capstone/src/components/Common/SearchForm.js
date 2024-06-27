import React, { useState, useEffect } from 'react';
import Select, { components } from 'react-select';
import axios from 'axios';
import styles from '../../styles/SearchForm.module.css'; 

const Option = (props) => {
  return (
    <components.Option {...props}>
      {props.data.label}
      {props.data.customComponent}
    </components.Option>
  );
};

const SearchForm = ({ setResults }) => {
  const [tripType, setTripType] = useState({ label: 'Round-Trip', value: 'Round-Trip' });
  const [origin, setOrigin] = useState(null);
  const [userInput, setUserInput] = useState('');
  const [options, setOptions] = useState([]);
  const [destination, setDestination] = useState(null);
  const [departureDate, setDepartureDate] = useState(new Date().toISOString().split('T')[0]);
  const [returnDate, setReturnDate] = useState(new Date(new Date().setDate(new Date().getDate() + 7)).toISOString().split('T')[0]);
  const [adults, setAdults] = useState(1);
  const [children, setChildren] = useState(0);
  const [infants, setInfants] = useState(0);
  const [cabinClass, setCabinClass] = useState({ label: 'Economy', value: 'Economy' });
  const [addNearbyAirport, setAddNearbyAirport] = useState(false);
  const [destinationOptions, setDestinationOptions] = useState([]);
  const [originOptions, setOriginOptions] = useState([]);
  const [apiResults, setApiResults] = useState([]);

  const handleInputChange = (e) => {
    setUserInput(e.target.value);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (userInput) {
          const option = await axios.get(`http://localhost:8080/api/locations?keyword=${userInput}`);
          console.log(option.data);
          setOptions(option.data); 
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [userInput]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const params = {
      origin: origin ? origin.value : '',
      destination: destination ? destination.value : '',
      departureDate,
      returnDate: tripType.value === 'Round-Trip' ? returnDate : '',
      adults,
      children,
      infants,
      cabinClass: cabinClass.value,
      addNearbyAirport,
    };
    const results = await fetchFlights(params);
    setApiResults(results);
  };

  const tripTypeOptions = [
    { label: 'Round-Trip', value: 'Round-Trip' },
    { label: 'One-Way', value: 'One-Way' }
  ];

  const cabinClassOptions = [
    { label: 'Economy', value: 'Economy' },
    { label: 'Premium Economy', value: 'Premium_Economy' },
    { label: 'Business', value: 'Business' },
    { label: 'First', value: 'First' }
  ];

  const passengerOptions = [
    {
      label: 'Adults',
      value: 'adults',
      customComponent: (
        <div className={styles.counter}>
          <button type="button" onClick={() => setAdults(Math.max(1, adults - 1))}>-</button>
          <span>{adults}</span>
          <button type="button" onClick={() => setAdults(adults + 1)}>+</button>
        </div>
      )
    },
    {
      label: 'Children',
      value: 'children',
      customComponent: (
        <div className={styles.counter}>
          <button type="button" onClick={() => setChildren(Math.max(0, children - 1))}>-</button>
          <span>{children}</span>
          <button type="button" onClick={() => setChildren(children + 1)}>+</button>
        </div>
      )
    },
    {
      label: 'Infants',
      value: 'infants',
      customComponent: (
        <div className={styles.counter}>
          <button type="button" onClick={() => setInfants(Math.max(0, infants - 1))}>-</button>
          <span>{infants}</span>
          <button type="button" onClick={() => setInfants(infants + 1)}>+</button>
        </div>
      )
    }
  ];

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <div className={styles.row}>
        <Select
          classNamePrefix="react-select"
          placeholder="Round-Trip"
          value={tripType}
          onChange={setTripType}
          options={tripTypeOptions}
        />
        <Select
          classNamePrefix="react-select"
          placeholder="Economy"
          value={cabinClass}
          onChange={setCabinClass}
          options={cabinClassOptions}
        />
        <Select
          classNamePrefix="react-select"
          placeholder={`Adults: ${adults}, Children: ${children}, Infants: ${infants}`}
          components={{ Option }}
          options={passengerOptions}
          isMulti
          closeMenuOnSelect={false}
          hideSelectedOptions={false}
        />
      </div>
      <div className={styles.row}>
        <div className={styles.inputWrapper}>
          <input
          type="text"
          value={userInput}
          onChange={handleInputChange}
          placeholder="Leaving From"
          />
        </div>
        <select className={styles.selectStyle}>
          {options.map((option, index) => (
            <option key={index} value={option.iataCode}>
              {option.name}
            </option>
          ))}
        </select>
        <div className={styles.inputWrapper}>
          <label className={styles.label}>Leave Date:</label>
          <input type="date" value={departureDate} onChange={(e) => setDepartureDate(e.target.value)} required className={styles.input} />
        </div>
        {tripType.value === 'Round-Trip' && (
          <div className={styles.inputWrapper}>
            <label className={styles.label}>Back Date:</label>
            <input type="date" value={returnDate} onChange={(e) => setReturnDate(e.target.value)} required className={styles.input} />
          </div>
        )}
        <button type="submit" className={styles.button}>Search</button>
      </div>
      <div className={styles.row}>
        <div className={styles.checkboxWrapper}>
          <input type="checkbox" checked={addNearbyAirport} onChange={() => setAddNearbyAirport(!addNearbyAirport)} />
          <label className={styles.label}>Add nearby airport</label>
        </div>
      </div>
      <div>
        <h3>Results:</h3>
        <pre>{JSON.stringify(apiResults, null, 2)}</pre> {/* Display API results */}
      </div>
    </form>
  );
};

export default SearchForm;
