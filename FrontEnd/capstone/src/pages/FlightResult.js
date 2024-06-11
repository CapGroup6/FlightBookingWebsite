import React, { useState, useEffect } from 'react';
import Header from '../components/Common/Header';
import SearchForm from '../components/Common/SearchForm';
import Recommendation from '../components/ResultPage/Recommendation';
import FlightInfo from '../components/ResultPage/FlightInfo';

const FlightResult = () => {
  const [flights, setFlights] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Function to simulate fetching flight data
    const fetchFlights = async () => {
      try {
        // Simulated data
        const fakeData = [
          {
            departureTime: '12:05',
            arrivalTime: '12:05+2',
            departureLocation: 'YVR M',
            arrivalLocation: 'PVG T2',
            duration: '33h',
            airline: 'WestJet, EVA Air',
            price: 1410,
          },
          {
            departureTime: '12:05',
            arrivalTime: '12:05+2',
            departureLocation: 'YVR M',
            arrivalLocation: 'PVG T2',
            duration: '33h',
            airline: 'WestJet, EVA Air',
            price: 1412,
          },
        ];
        setFlights(fakeData);
      } catch (error) {
        console.error('Error fetching flight data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchFlights();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="app-container">
      <Header />
      <SearchForm />
      <div className="flex p-4">
        <div className="w-1/5 pr-4">
          <Recommendation />
        </div>
        <div className="w-4/5">
          <FlightInfo flights={flights} />
        </div>
      </div>
    </div>
  );
};

export default FlightResult;
