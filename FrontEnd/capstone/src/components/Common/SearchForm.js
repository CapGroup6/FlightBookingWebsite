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
  const [tripType, setTripType] = useState({ label: 'Round-Trip', value: 'Round-Trip' });
  const [origin, setOrigin] = useState('');
  const [destination, setDestination] = useState('');
  const [departureDate, setDepartureDate] = useState('');
  const [returnDate, setReturnDate] = useState('');
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

  const handleOriginChange = async (inputValue) => {
    if (inputValue.length > 2) {
      try {
        const response = await axios.get('http://localhost:8080/api/locations', {
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
      const response = await axios.get('http://localhost:8080/api/flights', {
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
    padding: '20px',
    borderRadius: '5px',
    backgroundColor: 'white',
    boxShadow: '0 0 10px rgba(0,0,0,0.1)',
    width: '100%',
    maxWidth: '800px',
    margin: '20px auto'
  },
  row: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginBottom: '10px'
  },
  selectWrapper: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    marginRight: '10px',
    flex: '1'
  },
  inputWrapper: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    marginRight: '10px',
    flex: '1'
  },
  counter: {
    display: 'flex',
    alignItems: 'center',
  },
  button: {
    padding: '10px 20px',
    backgroundColor: '#007BFF',
    color: 'white',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    marginLeft: '10px',
    alignSelf: 'center'
  },
  checkboxWrapper: {
    display: 'flex',
    alignItems: 'center',
  },
  label: {
    color: 'black',
    marginBottom: '5px'
  },
  input: {
    padding: '5px',
    borderRadius: '4px',
    border: '1px solid #ccc',
    width: '100%'
  },
  select: {
    padding: '5px',
    borderRadius: '4px',
    border: '1px solid #ccc',
    width: '100%'
  }
};

const selectStyles = {
  control: (base) => ({
    ...base,
    border: '1px solid #ccc',
    borderRadius: '4px',
    color: 'black'
  }),
  option: (base) => ({
    ...base,
    color: 'black'
  }),
  singleValue: (base) => ({
    ...base,
    color: 'black'
  })
};


export default SearchForm;
