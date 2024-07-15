import React from 'react';

const DetailDropdown = ({ visible, tripType, leftDetails, rightDetails }) => {
  if (!visible) return null;

  const renderAirlineNumbers = (validatingAirlineCodes, airlineNumbers) => {
    if (airlineNumbers.length > 1) {
      return airlineNumbers.map((number, index) => (
        <li key={index}><strong>Flight {index + 1} airlineNumber: </strong>{validatingAirlineCodes.join(', ')} {number}</li>
      ));
    } else if (airlineNumbers.length === 1) {
      return <li><strong>Flight number: </strong>{validatingAirlineCodes.join(', ')} {airlineNumbers[0]}</li>;
    } else {
      return <li>No flight information available</li>;
    }
  };

  return (
    <div
      className="mt-4 p-2 bg-gray-100 rounded shadow-lg text-gray-500"
      style={{ width: '300px' }}
    >
      <ul className="leading-8">
        {tripType === 'Round-Trip' ? (
          <>
            <div className='text-center'><strong>Departure</strong></div>
            <li><strong>Cabin: </strong>{leftDetails.cabin}</li>
            {renderAirlineNumbers(leftDetails.validatingAirlineCodes, leftDetails.airlineNumber)}
            <li><strong>Number of Bookable Seats: </strong>{leftDetails.numberOfBookableSeats}</li>
            <li><strong>Check-In Weight: </strong>{leftDetails.checkInWeight}</li>
            <li><strong>Refundable: </strong>{leftDetails.refund ? 'Yes' : 'No'}</li>
            <li><strong>No Restrictions: </strong>{leftDetails.restrict ? 'Yes' : 'No'}</li>
            <li><strong>No Penalties: </strong>{leftDetails.penalty ? 'Yes' : 'No'}</li>
            <div className='text-center'><strong>Return</strong></div>
            <li><strong>Cabin: </strong>{rightDetails.cabin}</li>
            <li><strong>Airline: </strong>{rightDetails.validatingAirlineCodes.join(', ')}</li>
            {renderAirlineNumbers(rightDetails.validatingAirlineCodes, rightDetails.airlineNumber)}
            <li><strong>Number of Bookable Seats: </strong>{rightDetails.numberOfBookableSeats}</li>
            <li><strong>Check-In Weight: </strong>{rightDetails.checkInWeight}</li>
            <li><strong>Refundable: </strong>{rightDetails.refund ? 'Yes' : 'No'}</li>
            <li><strong>No Restrictions: </strong>{rightDetails.restrict ? 'Yes' : 'No'}</li>
            <li><strong>No Penalties: </strong>{rightDetails.penalty ? 'Yes' : 'No'}</li>
          </>
        ) : (
          <>
            <li><strong>Cabin: </strong>{leftDetails.cabin}</li>
            {renderAirlineNumbers(leftDetails.validatingAirlineCodes, leftDetails.airlineNumber)}
            <li><strong>Number of Bookable Seats: </strong>{leftDetails.numberOfBookableSeats}</li>
            <li><strong>Check-In Weight: </strong>{leftDetails.checkInWeight}</li>
            <li><strong>Refundable: </strong>{leftDetails.refund ? 'Yes' : 'No'}</li>
            <li><strong>No Restrictions: </strong>{leftDetails.restrict ? 'Yes' : 'No'}</li>
            <li><strong>No Penalties: </strong>{leftDetails.penalty ? 'Yes' : 'No'}</li>
          </>
        )}
      </ul>
    </div>
  );
};

export default DetailDropdown;
