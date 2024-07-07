import React, { useState, useEffect } from 'react';
import Select, { components } from 'react-select';
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
  { cityName: "Vancouver", iataCode: "YVR", countryName: "Canada" },
  { cityName: "Montreal", iataCode: "YUL", countryName: "Canada" },
  { cityName: "Calgary", iataCode: "YYC", countryName: "Canada" },
  { cityName: "Ottawa", iataCode: "YOW", countryName: "Canada" },
  { cityName: "Edmonton", iataCode: "YEG", countryName: "Canada" },
  { cityName: "Halifax", iataCode: "YHZ", countryName: "Canada" },
  { cityName: "Winnipeg", iataCode: "YWG", countryName: "Canada" },
  { cityName: "Quebec City", iataCode: "YQB", countryName: "Canada" },
  { cityName: "Victoria", iataCode: "YYJ", countryName: "Canada" },
  { cityName: "Saskatoon", iataCode: "YXE", countryName: "Canada" },
  { cityName: "Regina", iataCode: "YQR", countryName: "Canada" }
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
          setOptions([...commonCities, ...cities]);
        } else {
          setOptions(commonCities);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
        setOptions(commonCities); // 如果API请求失败，仍显示commonCities
      }
    };

    fetchData();
  }, [userInput]);

  const customStyles = {
    control: (provided) => ({
      ...provided,
      height: '40px',  
      minHeight: '40px',
      width: '240px',
      display: 'flex',
      alignItems: 'center'
    }),
    valueContainer: (provided) => ({
      ...provided,
      height: '40px', 
      display: 'flex',
      alignItems: 'center'
    }),
    input: (provided) => ({
      ...provided,
      margin: '0', 
      padding: '0', 
    }),
    placeholder: (provided) => ({
      ...provided,
      height: '40px', 
      display: 'flex',
      alignItems: 'center'
    }),
    singleValue: (provided) => ({
      ...provided,
      display: 'flex',
      alignItems: 'center'
    }),
    option: (provided) => ({
      ...provided,
      display: 'flex',
      alignItems: 'center',
      height: '40px',
      whiteSpace: 'nowrap',
    })
  };

  const SingleValue = (props) => (
    <components.SingleValue {...props}>
      {props.data.cityName} ({props.data.iataCode})
    </components.SingleValue>
  );

  return (
    <div className={styles.dateInputWrapper}>
      <Select
        placeholder={locationType === "departure" ? "Leaving From" : "Going To"}
        onInputChange={handleInputChange}
        onChange={setLocation}
        options={options.map(option => ({
          label: `${option.cityName}, ${option.countryName} (${option.iataCode})`,
          value: option.cityName,
          cityName: option.cityName,
          iataCode: option.iataCode
        }))}
        styles={customStyles}
        components={{ SingleValue }}
      />
    </div>
  );
};

export default LocationSelector;
