import React from 'react';

const Header = () => (
  <header className="header">
    <div className="logo">Logo</div>
    <nav className="nav">
      <a href="#">Customer Support</a>
      <a href="#">Language</a>
      <a href="#">Currency</a>
      <button className="sign-in">Sign in / Register</button>
    </nav>
  </header>
);

export default Header;
