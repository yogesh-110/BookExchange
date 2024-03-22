import React from 'react';
import { Link } from 'react-router-dom';
// import './NoPage.scss';

const NoPage = () => {
  return (
    <>
      <div className="no-page-container">
        <div className="text-content">
          <h1 className="heading">404 - TradeEx</h1>
          <p className="sub-heading">Oops! Page not found</p>
          <p className="description">
            It looks like you've stumbled upon a mysterious page.
          </p>
          <Link to="/" className="button">
            Go back to Home
          </Link>
        </div>
        <p className="additional-text">Or explore more...</p>
        <div className="links">
          <Link to="/about" className="link">
            About Us
          </Link>
          <Link to="/contact" className="link">
            Contact Us
          </Link>
          <Link to="/login" className="link">
            Login
          </Link>
        </div>
      </div>
    </>
  );
};

export default NoPage;
