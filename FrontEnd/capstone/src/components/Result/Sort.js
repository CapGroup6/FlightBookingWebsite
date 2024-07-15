import React, { useState } from 'react';
import Select from 'react-select';
import axios from 'axios';
import styles from '../../styles/SearchForm.module.css';

const sortOptions = [
  { label: 'Price', value: 'price' },
  { label: 'Duration', value: 'duration' },
  { label: 'Recommend', value: 'recommend' }
];

const Sort = () => {
  const [sortCriteria, setSortCriteria] = useState(null);
  const [sortedData, setSortedData] = useState([]);

  const handleSortChange = async (selectedOption) => {
    setSortCriteria(selectedOption);
    try {
      const response = await axios.get(`http://localhost:8080/result/sort?sortBy=${selectedOption.value}`);
      setSortedData(response.data);
    } catch (error) {
      console.error('Error fetching sorted data:', error);
    }
  };

  return (
    <div className={styles.noBorder}>
      <Select
        classNamePrefix="noBorder"
        placeholder="Sort By"
        value={sortCriteria}
        onChange={handleSortChange}
        options={sortOptions}
        styles={{
          control: (base) => ({
            ...base,
            border: 'none',
            boxShadow: 'none',
            minHeight: 'auto',
            '&:hover': {
              border: 'none'
            },
            width: '150px', // 调整宽度以适应内容
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
      {/* 展示 sortedData 中的原始 JSON 数据 */}
      <div>
        {sortedData.map((flight, index) => (
          <pre key={index}>
            {JSON.stringify(flight, null, 2)}
          </pre>
        ))}
      </div>
    </div>
  );
};

export default Sort;
