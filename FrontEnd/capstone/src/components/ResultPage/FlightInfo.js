import React from 'react';

const FlightInfo = ({ flights }) => {
  return (
    <div className="flight-info">
      {flights.map((flight, index) => (
        <div key={index} className="p-4 mb-4 bg-white border border-gray-300">
          <div className="flight-details mb-4">
            <div className="flex justify-between">
              <span>{flight.departureTime} - {flight.arrivalTime}</span>
              <span>Duration: {flight.duration}</span>
            </div>
            <div className="flex justify-between">
              <span>{flight.departureLocation} - {flight.arrivalLocation}</span>
              <span>Airline: {flight.airline}</span>
            </div>
            <div className="flex justify-between">
              <span>Price: ${flight.price}</span>
            </div>
          </div>
          <button className="px-4 py-2 text-white bg-blue-500 hover:bg-blue-700">
            Select
          </button>
        </div>
      ))}
    </div>
  );
};

export default FlightInfo;
