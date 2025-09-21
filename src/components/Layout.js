import React from 'react';
import Sidebar from './Sidebar';
import Header from './Header';
import Footer from './Footer';
import './Layout.css';

const Layout = ({ children }) => {
  return (
    <div className="layout">
      {/* Background Image */}
      <div className="background-image"></div>
      
      {/* Components */}
      <Sidebar />
      <div className="main-wrapper">
        <Header />
        <div className="content-wrapper">
          <main className="content">
            {children}
          </main>
        </div>
        <Footer />
      </div>
    </div>
  );
};

export default Layout;