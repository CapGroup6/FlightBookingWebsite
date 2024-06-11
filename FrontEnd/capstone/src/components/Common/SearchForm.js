import React, { useState } from 'react';
import Select, { components } from 'react-select';
import axios from 'axios';

const Option = (props) => {
  return (
    <components.Option {...props}>
      {props.data.label}
      {props.data.customComponent}
    </components.Option>
  );
};

const SearchForm = ({ setResults }) => {
  const [origin, setOrigin] = useState('');
  const [destination, setDestination] = useState('');
  const [departureDate, setDepartureDate] = useState('');
  const [adults, setAdults] = useState(1);
  const [children, setChildren] = useState(0);
  const [infants, setInfants] = useState(0);
  const [destinationOptions, setDestinationOptions] = useState([]);

  const handleDestinationChange = async (inputValue) => {
    if (inputValue.length > 2) {
      try {
        const response = await axios.get('http://localhost:8080/api/locations', {
          params: { keyword: inputValue },
        });
        const options = response.data.map(location => ({
          label: `${location.name} (${location.iataCode})`,
          value: location.iataCode,
        }));
        setDestinationOptions(options);
      } catch (error) {
        console.error('Error fetching airport data', error);
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.get('http://localhost:8080/api/flights', {
        params: {
          origin,
          destination,
          departureDate,
          adults,
          children,
          infants,
        }
      });
      setResults(response.data);
    } catch (error) {
      console.error('Error fetching flights', error);
    }
  };

  const passengerOptions = [
    {
      label: 'Adults',
      value: 'adults',
      customComponent: (
        <div style={styles.counter}>
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
        <div style={styles.counter}>
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
        <div style={styles.counter}>
          <button type="button" onClick={() => setInfants(Math.max(0, infants - 1))}>-</button>
          <span>{infants}</span>
          <button type="button" onClick={() => setInfants(infants + 1)}>+</button>
        </div>
      )
    }
  ];

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>From:</label>
        <input type="text" value={origin} onChange={(e) => setOrigin(e.target.value)} required />
      </div>
      <div>
        <label>To:</label>
        <Select
          placeholder="Select destination"
          value={destinationOptions.find(option => option.value === destination)}
          onChange={(selectedOption) => setDestination(selectedOption.value)}
          onInputChange={handleDestinationChange}
          options={destinationOptions}
        />
      </div>
      <div>
        <label>Leave Date:</label>
        <input type="date" value={departureDate} onChange={(e) => setDepartureDate(e.target.value)} required />
      </div>
      <div>
        <label>Passengers:</label>
        <Select
          components={{ Option }}
          options={passengerOptions}
          isMulti
          closeMenuOnSelect={false}
          hideSelectedOptions={false}
        />
      </div>
      <button type="submit">Search</button>
    </form>
  );
};

const styles = {
  counter: {
    display: 'flex',
    alignItems: 'center',
  },
  button: {
    padding: '5px 10px',
    margin: '0 5px',
    backgroundColor: '#007BFF',
    color: 'white',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer'
  }
};

export default SearchForm;
