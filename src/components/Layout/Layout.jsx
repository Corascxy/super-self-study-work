import React from 'react';
import Header from './Header';
import Sidebar from './Sidebar';
import Footer from './Footer';

const Layout = ({ children }) => {
  return (
    <div className="layout">
      <Header />
      <main className="main-content">
        <div className="content-wrapper">
          {children}
        </div>
        <Sidebar />
      </main>
      <Footer />
    </div>
  );
};

export default Layout;