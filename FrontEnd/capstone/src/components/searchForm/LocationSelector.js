import React, { useEffect, useState } from 'react';
import axios from 'axios';
import styles from '../../styles/SearchForm.module.css';

const commonCities = [
  {
    countryName: 'United States',
    cities: [
      { cityName: 'New York', iataCodes: ['JFK', 'LGA', 'EWR'] },
      { cityName: 'Los Angeles', iataCodes: ['LAX'] },
      { cityName: 'Chicago', iataCodes: ['ORD', 'MDW'] },
      { cityName: 'San Francisco', iataCodes: ['SFO'] },
      { cityName: 'Miami', iataCodes: ['MIA'] }
    ]
  },
  {
    countryName: 'United Kingdom',
    cities: [
      { cityName: 'London', iataCodes: ['LHR', 'LGW', 'LCY'] },
      { cityName: 'Manchester', iataCodes: ['MAN'] },
      { cityName: 'Edinburgh', iataCodes: ['EDI'] },
      { cityName: 'Birmingham', iataCodes: ['BHX'] },
      { cityName: 'Glasgow', iataCodes: ['GLA'] }
    ]
  },
  {
    countryName: 'China',
    cities: [
      { cityName: 'Beijing', iataCodes: ['PEK', 'PKX'] },
      { cityName: 'Shanghai', iataCodes: ['PVG', 'SHA'] },
      { cityName: 'Guangzhou', iataCodes: ['CAN'] },
      { cityName: 'Shenzhen', iataCodes: ['SZX'] },
      { cityName: 'Chengdu', iataCodes: ['CTU', 'TFU'] }
    ]
  },
  {
    countryName: 'Japan',
    cities: [
      { cityName: 'Tokyo', iataCodes: ['NRT', 'HND'] },
      { cityName: 'Osaka', iataCodes: ['KIX', 'ITM'] },
      { cityName: 'Nagoya', iataCodes: ['NGO'] },
      { cityName: 'Fukuoka', iataCodes: ['FUK'] },
      { cityName: 'Sapporo', iataCodes: ['CTS'] }
    ]
  },
  {
    countryName: 'Canada',
    cities: [
      { cityName: 'Toronto', iataCodes: ['YYZ', 'YTZ'] },
      { cityName: 'Vancouver', iataCodes: ['YVR'] },
      { cityName: 'Montreal', iataCodes: ['YUL'] },
      { cityName: 'Calgary', iataCodes: ['YYC'] },
      { cityName: 'Ottawa', iataCodes: ['YOW'] }
    ]
  },
  {
    countryName: 'Australia',
    cities: [
      { cityName: 'Sydney', iataCodes: ['SYD'] },
      { cityName: 'Melbourne', iataCodes: ['MEL'] },
      { cityName: 'Brisbane', iataCodes: ['BNE'] },
      { cityName: 'Perth', iataCodes: ['PER'] },
      { cityName: 'Adelaide', iataCodes: ['ADL'] }
    ]
  }
];

const LocationSelector = ({ userInput, setUserInput, setLocation, locationType }) => {
  const [cityOptions, setCityOptions] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (userInput) {
          const response = await axios.get(`http://localhost:8080/api/locations?keyword=${userInput}`);
          const cities = response.data.reduce((acc, airport) => {
            const city = acc.find(c => c.cityName === airport.address.cityName);
            if (city) {
              if (!city.iataCodes.includes(airport.iataCode)) {
                city.iataCodes.push(airport.iataCode);
              }
            } else {
              acc.push({ cityName: airport.address.cityName, iataCodes: [airport.iataCode] });
            }
            return acc;
          }, []);
          setCityOptions(cities);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, [userInput]);

  const handleInputChange = (e) => {
    setUserInput(e.target.value);
  };

  const handleCitySelect = (e) => {
    const selectedCity = cityOptions.find(city => city.cityName === e.target.value);
    setLocation(selectedCity);
    setUserInput('');
  };

  return (
    <div className={styles.inputWrapper}>
      <input
        type="text"
        value={userInput}
        onChange={handleInputChange}
        placeholder={locationType === 'departure' ? "Leaving From" : "Going To"}
        className={styles.input}
      />
      <select className={styles.selectStyle} onChange={handleCitySelect}>
        {userInput ? (
          cityOptions.map((option, index) => (
            <option key={index} value={option.cityName}>
              {option.cityName}
            </option>
          ))
        ) : (
          commonCities.map((country) => (
            <optgroup label={country.countryName} key={country.countryName}>
              {country.cities.map((city, index) => (
                <option key={index} value={city.cityName}>
                  {city.cityName}
                </option>
              ))}
            </optgroup>
          ))
        )}
      </select>
    </div>
  );
};

export default LocationSelector;
