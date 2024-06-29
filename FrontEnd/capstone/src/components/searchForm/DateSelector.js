import React from 'react';
import styles from '../../styles/SearchForm.module.css';

const DateSelector = ({ tripType, departureDate, setDepartureDate, returnDate, setReturnDate }) => {
  return (
    <div className={styles.dateSelector}>
      <div className={styles.dateInputWrapper}>
        <label className={styles.label}>Leave Date:</label>
        <input
          type="date"
          value={departureDate}
          onChange={(e) => setDepartureDate(e.target.value)}
          required
          className={styles.dateInput}
        />
      </div>
      {tripType.value === 'Round-Trip' && (
        <div className={styles.dateInputWrapper}>
          <label className={styles.label}>Back Date:</label>
          <input
            type="date"
            value={returnDate}
            onChange={(e) => setReturnDate(e.target.value)}
            required
            className={styles.dateInput}
          />
        </div>
      )}
    </div>
  );
};

export default DateSelector;
