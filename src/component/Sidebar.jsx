import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const Sidebar = () => {
  const location = useLocation();

  const menuItems = [
    { name: 'Dashboard', path: '/dashboard' },
    { name: 'Delivery List', path: '/' },
    { name: 'Make Delivery', path: '/make-delivery' },
    { name: 'Drivers', path: '/drivers' },
    { name: 'Vehicles', path: '/vehicles' },
    { name: 'Routes', path: '/routes' },
    { name: 'Notifications', path: '/notifications' },
    { name: 'Reports', path: '/reports' },
    { name: 'Profile', path: '/profile' },
    
  ];

  return (
    <div className="w-64 bg-green-800 text-white min-h-screen">
      {/* Logo/Title Section */}
      <div className="p-4 border-b border-green-700">
        <h2 className="text-lg font-semibold text-center">
          Delivery Management System
        </h2>
      </div>

      {/* Navigation Menu */}
      <nav className="mt-4">
        <ul className="space-y-1">
          {menuItems.map((item, index) => {
            const isActive = location.pathname === item.path;
            return (
              <li key={index}>
                <Link
                  to={item.path}
                  className={`block px-6 py-3 text-sm font-medium transition-colors duration-200 hover:bg-green-700 ${
                    isActive
                      ? 'bg-green-600 border-r-4 border-green-400 text-white'
                      : 'text-green-100 hover:text-white'
                  }`}
                >
                  {item.name}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;
