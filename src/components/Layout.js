import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from './Header';
import Sidebar from './Sidebar';
import SupplierSidebar from './SupplierSidebar';
import { useAuth } from '../context/AuthContext';
import './Layout.css';

const Layout = ({ children }) => {
  const { isAdmin, isSupplier } = useAuth();
  
  return (
    <div className={`app-container ${isSupplier() ? 'supplier-layout' : 'admin-layout'}`}>
      <Header />
      
      <div className="main-content">
        {/* Sidebar selection based on user role */}
        {isAdmin() && <Sidebar />}
        {isSupplier() && <SupplierSidebar />}
        
        <main className="content">
          {children || <Outlet />}
        </main>
      </div>
      
      {/* Footer removed as requested */}
    </div>
  );
};

export default Layout;