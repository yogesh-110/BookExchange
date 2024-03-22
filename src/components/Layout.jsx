import React from 'react';
import NavBar from './NavBar';
import { Outlet } from 'react-router-dom';

function Layout() {
  return (
    <div className="container">
      <NavBar />
      <div className="hello">
        <Outlet />
      </div>
      {/* <footer>
        &copy; {new Date().getFullYear()} TradeEx - All Rights Reserved
      </footer> */}
    </div>
  );
}

export default Layout;
