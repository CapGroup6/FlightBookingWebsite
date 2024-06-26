import React from 'react';
import Select, { components } from 'react-select';
import styles from '../../styles/SearchForm.module.css';

const Option = (props) => {
  return (
    <components.Option {...props}>
      {props.data.label}
      {props.data.customComponent}
    </components.Option>
  );
};

const MultiValueRemove = () => null; // Hides the remove "x" button

const PassengerCount = ({ adults, setAdults, children, setChildren, infants, setInfants }) => {
  const passengerOptions = [
    {
      label: `Adults: ${adults}`,
      value: 'adults',
      customComponent: (
        <div className={styles.counter}>
          <button type="button" onClick={() => setAdults(Math.max(1, adults - 1))}>-</button>
          <span>{adults}</span>
          <button type="button" onClick={() => setAdults(adults + 1)}>+</button>
        </div>
      )
    },
    {
      label: `Children: ${children}`,
      value: 'children',
      customComponent: (
        <div className={styles.counter}>
          <button type="button" onClick={() => setChildren(Math.max(0, children - 1))}>-</button>
          <span>{children}</span>
          <button type="button" onClick={() => setChildren(children + 1)}>+</button>
        </div>
      )
    },
    {
      label: `Infants: ${infants}`,
      value: 'infants',
      customComponent: (
        <div className={styles.counter}>
          <button type="button" onClick={() => setInfants(Math.max(0, infants - 1))}>-</button>
          <span>{infants}</span>
          <button type="button" onClick={() => setInfants(infants + 1)}>+</button>
        </div>
      )
    }
  ];

  return (
    <Select
      placeholder={`Adults: ${adults}, Children: ${children}, Infants: ${infants}`}
      components={{ Option, MultiValueRemove }} // Hides the "x" button
      options={passengerOptions}
      isMulti
      closeMenuOnSelect={false}
      hideSelectedOptions={false}
      value={passengerOptions.filter(option => (option.value === 'adults' || option.value === 'children' || option.value === 'infants') && (option.value !== 'adults' || adults > 0) && (option.value !== 'children' || children > 0) && (option.value !== 'infants' || infants > 0))}
      styles={{
        control: (provided) => ({
          ...provided,
          border: 'none',
          boxShadow: 'none',
          minHeight: 'auto',
          '&:hover': {
            border: 'none'
          },
          width: '180px', // Adjust width to fit content
        }),
        valueContainer: (base) => ({
          ...base,
          padding: '0',
          fontSize: '0.875rem', // Adjust font size
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
  );
};

export default PassengerCount;
