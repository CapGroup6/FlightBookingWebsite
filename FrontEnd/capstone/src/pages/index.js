import * as React from "react";
import Header from '../components/Common/Header';
import SearchForm from '../components/Common/SearchForm';


function Home() {
  return (
    <div>
      <div style={styles.topContainer}>
        <header style={styles.header}>
          <div style={styles.logoContainer}>
            <img
              loading="lazy"
              src="https://cdn.builder.io/api/v1/image/assets/TEMP/e893a466a5127afac788e7257ebec62963300ee85e5a0d660b172777b5d3967a?apiKey=e35f36ff56764292afe21d9cb1dc1589&"
              alt="Logo"
              style={styles.logo}
            />
            <h1 style={styles.logoText}>
              Flight<span style={styles.logoSpan}>Booking</span>
            </h1>
          </div>
          <nav style={styles.nav}>
            <a href="#">Customer Support</a>
            <a href="#">Language</a>
            <a href="#">Currency</a>
            <button style={styles.signIn}>Sign in / Register</button>
          </nav>
        </header>
        <section style={styles.section}>
          <h1 style={styles.slogan}>Slogan</h1>
          <SearchForm />
        </section>
      </div>

    </div>
  );
}

const styles = {
  topContainer: {
    padding: '20px',
    backgroundColor: '#5f7080',  
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    width: '100%',
    maxWidth: '1200px',
    paddingBottom: '20px',
    borderBottom: '1px solid #ccc',
  },
  logoContainer: {
    display: 'flex',
    alignItems: 'center',
  },
  logo: {
    width: '39px',
    aspectRatio: '1',
  },
  logoText: {
    fontSize: '2rem',
    fontWeight: 'bold',
    color: 'black',
  },
  nav: {
    display: 'flex',
    alignItems: 'center',
  },
  signIn: {
    marginLeft: '10px',
    padding: '5px 10px',
    border: '1px solid black',
    borderRadius: '5px',
    cursor: 'pointer',
  },
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
