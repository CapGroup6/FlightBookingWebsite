import React, { useState } from 'react';
import Select, { components } from 'react-select';
import { fetchLocations } from '../../api/fetchLocations';
import { fetchFlights } from '../../api/fetchFlights';

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
  const [apiResults, setApiResults] = useState([]); // Define apiResults in state

  const handleDestinationInputChange = async (inputValue) => {
    const options = await fetchLocations(inputValue);
    setDestinationOptions(options);
  };

  const handleOriginInputChange = async (inputValue) => {
    const options = await fetchLocations(inputValue);
    setOriginOptions(options);
  };

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
    setApiResults(results); // Update apiResults with fetched data
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
            value={origin}
            onChange={setOrigin}
            onInputChange={handleOriginInputChange}
            options={originOptions}
            placeholder="Enter origin"
            styles={selectStyles}
          />
        </div>
        <div style={styles.inputWrapper}>
          <label style={styles.label}>To:</label>
          <Select
            value={destination}
            onChange={setDestination}
            onInputChange={handleDestinationInputChange}
            options={destinationOptions}
            placeholder="Enter destination"
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
      <div>
        <h3>Results:</h3>
        <pre>{JSON.stringify(apiResults, null, 2)}</pre> {/* Display API results */}
      </div>
    </form>
  );
};


const styles = {
  form: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    marginBottom: '20px',
    color: '#000' // 确保文字为黑色
  },
  row: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    marginBottom: '10px'
  },
  inputWrapper: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    marginBottom: '10px'
  },
  label: {
    marginBottom: '5px',
    color: '#000' // 确保标签文字为黑色
  },
  input: {
    padding: '10px',
    borderRadius: '5px',
    border: '1px solid #ccc',
    width: '200px'
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
    alignItems: 'center',
    gap: '10px'
  }
};

const selectStyles = {
  control: (provided) => ({
    ...provided,
    width: '200px',
    marginBottom: '10px',
    color: '#000' // 确保选项文字为黑色
  }),
  singleValue: (provided) => ({
    ...provided,
    color: '#000' // 确保单选选项文字为黑色
  }),
  placeholder: (provided) => ({
    ...provided,
    color: '#000' // 确保占位符文字为黑色
  }),
  multiValue: (provided) => ({
    ...provided,
    backgroundColor: '#f0f0f0',
    color: '#000' // 确保多选选项文字为黑色
  }),
  multiValueLabel: (provided) => ({
    ...provided,
    color: '#000' // 确保多选标签文字为黑色
  }),
  option: (provided, state) => ({
    ...provided,
    color: state.isSelected ? '#000' : '#000', // 确保选项文字为黑色
    backgroundColor: state.isSelected ? '#e0e0e0' : '#fff' // 设置选中和未选中的背景色
  })
};


export default SearchForm;
