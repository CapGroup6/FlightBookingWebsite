import React from 'react';
import Select from 'react-select';
import styles from '../../styles/SearchForm.module.css';

const cabinClassOptions = [
  { label: 'Economy', value: 'ECONOMY' },
  { label: 'Premium Economy', value: 'PREMIUM_ECONOMY' },
  { label: 'Business', value: 'BUSINESS' },
  { label: 'First', value: 'FIRST' }
];

const CabinClass = ({ cabinClass, setCabinClass }) => {
  return (
    <div className={styles.noBorder}>
      <Select
        classNamePrefix="noBorder"
        placeholder="Economy"
        value={cabinClass}
        onChange={setCabinClass}
        options={cabinClassOptions}
        styles={{
          control: (base) => ({
            ...base,
            border: 'none',
            boxShadow: 'none',
            minHeight: 'auto',
            '&:hover': {
              border: 'none'
            },
            width: 'auto', 
            display: 'flex',
            flexWrap: 'nowrap'
          }),
          valueContainer: (base) => ({
            ...base,
            padding: '0',
            display: 'flex',
            flexWrap: 'nowrap'
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
          }),
          option: (provided) => ({
            ...provided,
            whiteSpace: 'nowrap', 
            overflow: 'hidden',
            textOverflow: 'ellipsis'
          })
        }}
      />
    </div>
  );
};

export default CabinClass;
