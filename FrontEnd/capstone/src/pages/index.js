import Image from "next/image";
import { Inter } from "next/font/google";
import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import * as React from "react";
import Header from '../components/Common/Header';
import SearchForm from '../components/Common/SearchForm';
import en from "../translations/en.json";
import zh from "../translations/zh.json";

i18n
  .use(initReactI18next)
  .init({
    resources: {
      en: { translation: en },
      zh: { translation: zh },
    },
    lng: "en",
    fallbackLng: "en",
    interpolation: {
      escapeValue: false,
    },
  });


function Home() {
  return (
    <div>
      <Header />
      <section style={styles.section}>
        <h1 style={styles.slogan}>Slogan</h1>
        <SearchForm />
      </section>
    </div>
  );
}

const styles = {
  section: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    width: '100%',
    maxWidth: '1200px',
  },
  slogan: {
    fontSize: '2rem',
    margin: '20px 0',
  },
  bottomContainer: {
    backgroundColor: '#ffffff',  
    padding: '20px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
};

export default Home;
