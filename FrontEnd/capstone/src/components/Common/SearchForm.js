import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import Select from 'react-select';
import axios from 'axios';

const SearchForm = () => {
  const [tripType, setTripType] = useState('Round-Trip');
  const [adultCount, setAdultCount] = useState(1);
  const [childrenCount, setChildrenCount] = useState(0);
  const [infantCount, setInfantCount] = useState(0);
  const [cabinClass, setCabinClass] = useState('Economy');
  const [from, setFrom] = useState(null);
  const [to, setTo] = useState(null);
  const [leaveDate, setLeaveDate] = useState(null);
  const [backDate, setBackDate] = useState(null);
  const [options, setOptions] = useState([]);

  const fetchLocations = (inputValue) => {
    // Replace with your API endpoint to fetch locations
    axios.get(`https://api.example.com/locations?query=${inputValue}`)
      .then(response => {
        const locations = response.data.map(location => ({
          label: location.name,
          value: location.code,
        }));
        setOptions(locations);
      });
  };

  return (
    <div className="search-form">
      <div className="trip-type">
        <label>Trip Type</label>
        <select value={tripType} onChange={(e) => setTripType(e.target.value)}>
          <option value="Round-Trip">Round-Trip</option>
          <option value="One-Way">One-Way</option>
        </select>
      </div>
      <div className="passengers">
        <label>Adults</label>
        <select value={adultCount} onChange={(e) => setAdultCount(e.target.value)}>
          {[...Array(10).keys()].map(n => <option key={n} value={n}>{n}</option>)}
        </select>
        <label>Children</label>
        <select value={childrenCount} onChange={(e) => setChildrenCount(e.target.value)}>
          {[...Array(10).keys()].map(n => <option key={n} value={n}>{n}</option>)}
        </select>
        <label>Infants</label>
        <select value={infantCount} onChange={(e) => setInfantCount(e.target.value)}>
          {[...Array(10).keys()].map(n => <option key={n} value={n}>{n}</option>)}
        </select>
      </div>
      <div className="cabin-class">
        <label>Cabin Class</label>
        <select value={cabinClass} onChange={(e) => setCabinClass(e.target.value)}>
          <option value="Economy">Economy</option>
          <option value="Business">Business</option>
          <option value="First Class">First Class</option>
        </select>
      </div>
      <div className="locations">
        <Select
          placeholder="From"
          value={from}
          onChange={setFrom}
          onInputChange={fetchLocations}
          options={options}
        />
        <Select
          placeholder="To"
          value={to}
          onChange={setTo}
          onInputChange={fetchLocations}
          options={options}
        />
      </div>
      <div className="dates">
        <DatePicker
          selected={leaveDate}
          onChange={(date) => setLeaveDate(date)}
          placeholderText="Leave Date"
        />
        <DatePicker
          selected={backDate}
          onChange={(date) => setBackDate(date)}
          placeholderText="Back Date"
        />
      </div>
      <div className="extras">
        <label>
          <input type="checkbox" /> Add nearby airport
        </label>
        <label>
          <input type="checkbox" /> Add nearby airport
        </label>
      </div>
      <button className="search-btn">Search</button>
    </div>
  );
};

export default SearchForm;
