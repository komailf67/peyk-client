import React from 'react';
import TopNavbar from './partials/TopNavbar';

const Layout = ({ children }) => {
  return (
    <>
      <TopNavbar />
      {children}
    </>
  );
};
export default Layout;
