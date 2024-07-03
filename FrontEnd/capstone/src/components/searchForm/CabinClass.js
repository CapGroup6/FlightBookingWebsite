import React from 'react';
import Select from 'react-select';
import styles from '../../styles/SearchForm.module.css';

const cabinClassOptions = [
  { label: 'Economy', value: 'Economy' },
  { label: 'Premium Economy', value: 'Premium_Economy' },
  { label: 'Business', value: 'Business' },
  { label: 'First', value: 'First' }
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
            width: 'auto', // 根据内容自适应宽度
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
            whiteSpace: 'nowrap', // 防止选项内容换行
            overflow: 'hidden',
            textOverflow: 'ellipsis'
          })
        }}
      />
    </div>
  );
};

export default CabinClass;
