import React, { useState } from 'react';
import Select, { components } from 'react-select';
import apiClient from '../api/axiosConfig';

const Option = (props) => {
  return (
    <components.Option {...props}>
      {props.data.label}
      {props.data.customComponent}
    </components.Option>
  );
};

const getDefaultFutureDate = (daysInFuture) => {
  const date = new Date();
  date.setDate(date.getDate() + daysInFuture);
  return date.toISOString().split('T')[0]; // Format date as YYYY-MM-DD
};

const SearchForm = ({ setResults }) => {
  const [tripType, setTripType] = useState({ label: 'Round-Trip', value: 'Round-Trip' });
  const [origin, setOrigin] = useState('');
  const [destination, setDestination] = useState('');
  const [departureDate, setDepartureDate] = useState(getDefaultFutureDate(1)); // Default to tomorrow
  const [returnDate, setReturnDate] = useState(getDefaultFutureDate(7)); // Default to a week from now
  const [adults, setAdults] = useState(1);
  const [children, setChildren] = useState(0);
  const [infants, setInfants] = useState(0);
  const [cabinClass, setCabinClass] = useState({ label: 'Economy', value: 'Economy' });
  const [addNearbyAirport, setAddNearbyAirport] = useState(false);
  const [destinationOptions, setDestinationOptions] = useState([]);
  const [originOptions, setOriginOptions] = useState([]);

  const handleDestinationChange = async (inputValue) => {
    if (inputValue.length > 2) {
      try {
        const response = await apiClient.get('/locations', {
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

  const handleOriginChange = async (inputValue) => {
    if (inputValue.length > 2) {
      try {
        const response = await apiClient.get('/locations', {
          params: { keyword: inputValue },
        });
        const options = response.data.map(location => ({
          label: `${location.name} (${location.iataCode})`,
          value: location.iataCode,
        }));
        setOriginOptions(options);
      } catch (error) {
        console.error('Error fetching airport data', error);
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await apiClient.get('/flights', {
        params: {
          origin,
          destination,
          departureDate,
          returnDate: tripType.value === 'Round-Trip' ? returnDate : '',
          adults,
          children,
          infants,
          cabinClass: cabinClass.value,
          addNearbyAirport,
        }
      });
      setResults(response.data);
    } catch (error) {
      console.error('Error fetching flights', error);
    }
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
    <form onSubmit={handleSubmit} style={styles.form}>
      <div style={styles.row}>
        <Select
          placeholder="Round-Trip"
          value={tripType}
          onChange={setTripType}
          options={tripTypeOptions}
          styles={selectStyles}
        />
        <Select
          placeholder="Economy"
          value={cabinClass}
          onChange={setCabinClass}
          options={cabinClassOptions}
          styles={selectStyles}
        />
        <Select
          placeholder={`Adults: ${adults}, Children: ${children}, Infants: ${infants}`}
          components={{ Option }}
          options={passengerOptions}
          isMulti
          closeMenuOnSelect={false}
          hideSelectedOptions={false}
          styles={selectStyles}
        />
      </div>
      <div style={styles.row}>
        <div style={styles.inputWrapper}>
          <label style={styles.label}>From:</label>
          <Select
            placeholder="Enter origin"
            value={originOptions.find(option => option.value === origin)}
            onChange={(selectedOption) => setOrigin(selectedOption.value)}
            onInputChange={handleOriginChange}
            options={originOptions}
            styles={selectStyles}
          />
        </div>
        <div style={styles.inputWrapper}>
          <label style={styles.label}>To:</label>
          <Select
            placeholder="Enter destination"
            value={destinationOptions.find(option => option.value === destination)}
            onChange={(selectedOption) => setDestination(selectedOption.value)}
            onInputChange={handleDestinationChange}
            options={destinationOptions}
            styles={selectStyles}
          />
        </div>
        <div style={styles.inputWrapper}>
          <label style={styles.label}>Leave Date:</label>
          <input type="date" value={departureDate} onChange={(e) => setDepartureDate(e.target.value)} required style={styles.input} />
        </div>
        {tripType.value === 'Round-Trip' && (
          <div style={styles.inputWrapper}>
            <label style={styles.label}>Back Date:</label>
            <input type="date" value={returnDate} onChange={(e) => setReturnDate(e.target.value)} required style={styles.input} />
          </div>
        )}
        <button type="submit" style={styles.button}>Search</button>
      </div>
      <div style={styles.row}>
        <div style={styles.checkboxWrapper}>
          <input type="checkbox" checked={addNearbyAirport} onChange={() => setAddNearbyAirport(!addNearbyAirport)} />
          <label style={styles.label}>Add nearby airport</label>
        </div>
      </div>
    </form>
  );
};

const styles = {
  form: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    marginBottom: '20px'
  },
  row: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: '10px'
  },
  inputWrapper: {
    display: 'flex',
    flexDirection: 'column',
    marginRight: '10px'
  },
  label: {
    marginBottom: '5px'
  },
  input: {
    padding: '5px',
    borderRadius: '3px',
    border: '1px solid #ccc'
  },
  button: {
    padding: '10px 20px',
    backgroundColor: '#007BFF',
    color: 'white',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer'
  },
  checkboxWrapper: {
    display: 'flex',
    alignItems: 'center'
  },
  counter: {
    display: 'flex',
    alignItems: 'center'
  }
};

const selectStyles = {
  control: (provided) => ({
    ...provided,
    minWidth: '200px'
  })
};

export default SearchForm;
