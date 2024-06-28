import React from 'react';
import styles from '../../styles/SearchForm.module.css';

const DateSelector = ({ tripType, departureDate, setDepartureDate, returnDate, setReturnDate }) => {
  const customStyles = {
    height: '40px',  // 固定高度
    width: '170px', 
    padding: '0 10px', // 内边距，确保内容不会紧贴边框
    display: 'flex',
    alignItems: 'center',
    borderRadius: '4px', // 圆角
    border: '1px solid #ccc', // 边框颜色
  };

  const lineStyle = {
    width: '20px',
    height: '1px',
    backgroundColor: '#000',
  };

  return (
    <div className={styles.dateSelector}>
      <div className={styles.dateInputWrapper}>
        <input
          type="date"
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
            <input
              type="date"
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
