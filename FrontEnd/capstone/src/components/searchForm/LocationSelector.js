import React, { useState, useEffect } from 'react';
import Select from 'react-select';
import styles from '../../styles/SearchForm.module.css';
import axios from 'axios';

const commonCities = [
  { cityName: "New York", iataCode: "JFK", countryName: "USA" },
  { cityName: "London", iataCode: "LHR", countryName: "UK" },
  { cityName: "Tokyo", iataCode: "NRT", countryName: "Japan" },
  { cityName: "Shanghai", iataCode: "PVG", countryName: "China" },
  { cityName: "Beijing", iataCode: "PEK", countryName: "China" },
  { cityName: "Paris", iataCode: "CDG", countryName: "France" },
  { cityName: "Dubai", iataCode: "DXB", countryName: "UAE" },
  { cityName: "Los Angeles", iataCode: "LAX", countryName: "USA" },
  { cityName: "Hong Kong", iataCode: "HKG", countryName: "China" },
  { cityName: "Sydney", iataCode: "SYD", countryName: "Australia" },
  { cityName: "Toronto", iataCode: "YYZ", countryName: "Canada" },
  { cityName: "Frankfurt", iataCode: "FRA", countryName: "Germany" },
  { cityName: "Singapore", iataCode: "SIN", countryName: "Singapore" },
  { cityName: "Bangkok", iataCode: "BKK", countryName: "Thailand" },
  { cityName: "Moscow", iataCode: "SVO", countryName: "Russia" },
];

const LocationSelector = ({ userInput, setUserInput, setLocation, locationType }) => {
  const [options, setOptions] = useState(commonCities);

  const handleInputChange = (inputValue) => {
    setUserInput(inputValue);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (userInput) {
          const response = await axios.get(`http://localhost:8080/api/locations?keyword=${userInput}`);
          const cities = response.data.map(item => ({
            cityName: item.address.cityName,
            iataCode: item.iataCode,
            countryName: item.address.countryName
          }));
          setOptions(cities);
        } else {
          setOptions(commonCities);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [userInput]);

  return (
    <div className={styles.inputWrapper}>
      <Select
        placeholder={locationType === "departure" ? "Leaving From" : "Going To"}
        onInputChange={handleInputChange}
        onChange={setLocation}
        options={options.map(option => ({
          label: `${option.cityName}, ${option.countryName} (${option.iataCode})`,
          value: option.cityName,
          iataCode: option.iataCode
        }))}
        styles={selectStyles}
      />
    </div>
  );
};

const selectStyles = {
  control: (provided) => ({
    ...provided,
    width: '200px',
    marginBottom: '10px',
    color: '#000'
  }),
  singleValue: (provided) => ({
    ...provided,
    color: '#000'
  }),
  placeholder: (provided) => ({
    ...provided,
    color: '#000'
  }),
  option: (provided, state) => ({
    ...provided,
    color: state.isSelected ? '#000' : '#000',
    backgroundColor: state.isSelected ? '#e0e0e0' : '#fff'
  })
};

export default LocationSelector;
