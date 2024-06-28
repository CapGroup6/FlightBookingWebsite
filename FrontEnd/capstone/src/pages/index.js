import * as React from "react";
import Header from '../components/Common/Header';
import SearchForm from '../components/Common/SearchForm';
import BackgroundPicture from '../components/Common/BackgroundPicture';
import styles from '../styles/Home.module.css'; // 导入CSS模块

function Home() {
  return (
    <div className={styles.container}>
      <Header />
      <div className={styles.relative}>
        <BackgroundPicture />
        <div className={styles.overlayIn}>
          <SearchForm />
        </div>
      </div>
    </div>
  );
}

export default Home;
