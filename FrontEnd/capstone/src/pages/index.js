import React, { useState } from 'react';
import Header from '../components/Common/Header';
import SearchForm from '../components/Common/SearchForm';
import BackgroundPicture from '../components/Common/BackgroundPicture';
import DateExpansion from '../components/Result/DateExpansion';
import ResultCard from '../components/Result/ResultsCard';
import styles from '../styles/Home.module.css'; 


function Home() {
  const [searchParams, setSearchParams] = useState(null);

  const handleSearch = (params) => {
    setSearchParams(params);
  };

  return (
    <div className={styles.container}>
      <Header />
      <div className={styles.relative}>
        <BackgroundPicture />
        <div className={styles.overlayIn}>
          <SearchForm onSearch={handleSearch}/>
          {/*{searchParams && (
             <DateExpansion baseDate={new Date(searchParams.departureDate)} />
          )}*/}

        </div>
      </div>
    </div>
  );
}

export default Home;
