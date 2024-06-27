import React from 'react';
import Select from 'react-select';
import styles from '../../styles/SearchForm.module.css';

const tripTypeOptions = [
  { label: 'Round-Trip', value: 'Round-Trip' },
  { label: 'One-Way', value: 'One-Way' }
];

const cabinClassOptions = [
  { label: 'Economy', value: 'Economy' },
  { label: 'Premium Economy', value: 'Premium_Economy' },
  { label: 'Business', value: 'Business' },
  { label: 'First', value: 'First' }
];

const TripTypeAndCabinClass = ({ tripType, setTripType, cabinClass, setCabinClass }) => {
  return (
    <div className={styles.row}>
      <Select
        classNamePrefix="react-select"
        placeholder="Round-Trip"
        value={tripType}
        onChange={setTripType}
        options={tripTypeOptions}
      />
      <Select
        classNamePrefix="react-select"
        placeholder="Economy"
        value={cabinClass}
        onChange={setCabinClass}
        options={cabinClassOptions}
      />
    </div>
  );
};

export default TripTypeAndCabinClass;
