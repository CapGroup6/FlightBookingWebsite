import React, { useState } from 'react';
import Header from '../components/Common/Header';
import SearchForm from '../components/Common/SearchForm';
import Recommendation from '../components/ResultPage/Recommendation';
import FlightInfo from '../components/ResultPage/FlightInfo';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

const FlightResult = () => {
  const [searchParams, setSearchParams] = useState(null);

  const handleSearch = (params) => {
    setSearchParams(params);
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <div style={{ fontFamily: 'Arial, sans-serif' }}>
        <Header />
        <SearchForm onSearch={handleSearch} />
        <div style={{ display: 'flex', margin: '20px' }}>
          <div style={{ width: '20%', marginRight: '20px' }}>
            <Recommendation />
          </div>
          <div style={{ width: '80%' }}>
            {searchParams && <FlightInfo searchParams={searchParams} />}
          </div>
        </div>
      </div>
    </DndProvider>
  );
};

export default FlightResult;
