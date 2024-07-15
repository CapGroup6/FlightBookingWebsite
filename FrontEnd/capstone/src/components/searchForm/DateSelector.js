import React, { useState, useEffect } from 'react';
import styles from '../../styles/SearchForm.module.css';

const DateSelector = ({ tripType, departureDate, setDepartureDate, returnDate, setReturnDate }) => {
  const [departureId, setDepartureId] = useState('');
  const [returnId, setReturnId] = useState('');

  useEffect(() => {
    setDepartureId(`departure-date-${Math.floor(Math.random() * 1000)}`);
    setReturnId(`return-date-${Math.floor(Math.random() * 1000)}`);
  }, []);

  const customStyles = {
    height: '40px',
    width: '170px',
    padding: '0 10px',
    display: 'flex',
    alignItems: 'center',
    borderRadius: '4px',
    border: '1px solid #ccc',
  };

  const lineStyle = {
    width: '20px',
    height: '1px',
    backgroundColor: '#000',
  };

  return (
    <div className={styles.dateSelector}>
      <div className={styles.dateInputWrapper}>
        <label htmlFor={departureId} style={{ display: 'none' }}>Departure Date</label>
        <input
          type="date"
          id={departureId}
          value={departureDate}
          onChange={(e) => setDepartureDate(e.target.value)}
          required
          className={styles.dateInput}
          style={customStyles}
        />
      </div>
      {tripType.value === 'Round-Trip' && (
        <>
          <div style={lineStyle}></div>
          <div className={styles.dateInputWrapper}>
            <label htmlFor={returnId} style={{ display: 'none' }}>Return Date</label>
            <input
              type="date"
              id={returnId}
              value={returnDate}
              onChange={(e) => setReturnDate(e.target.value)}
              required
              className={styles.dateInput}
              style={customStyles}
            />
          </div>
        </>
      )}
    </div>
  );
};

export default DateSelector;
