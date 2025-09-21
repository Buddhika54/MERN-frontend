import React from 'react';
import './Header.css';

const Header = () => {
  return (
    <header className="header">
      <h1>Inventory Management</h1>
      <div className="header-actions">
        <span className="admin-text">Admin</span>
        <div className="profile-icon">👤</div>
      </div>
    </header>
  );
};

export default Header;