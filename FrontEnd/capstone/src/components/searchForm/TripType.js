import React from 'react';
import Select from 'react-select';
import styles from '../../styles/SearchForm.module.css';

const tripTypeOptions = [
  { label: 'Round-Trip', value: 'Round-Trip' },
  { label: 'One-Way', value: 'One-Way' }
];

const TripType = ({ tripType, setTripType }) => {
  return (
    <div className={styles.noBorder}>
      <Select
        classNamePrefix="noBorder"
        placeholder="Round-Trip"
        value={tripType}
        onChange={setTripType}
        options={tripTypeOptions}
        styles={{
          control: (base) => ({
            ...base,
            border: 'none',
            boxShadow: 'none',
            minHeight: 'auto',
            '&:hover': {
              border: 'none'
            },
            width: '120px', // 调整宽度以适应内容
          }),
          valueContainer: (base) => ({
            ...base,
            padding: '0'
          }),
          input: (base) => ({
            ...base,
            margin: '0'
          }),
          indicatorSeparator: (base) => ({
            display: 'none'
          }),
          indicatorsContainer: (base) => ({
            ...base,
            padding: '0'
          })
        }}
      />
    </div>
  );
};

export default TripType;
