import React from 'react';
import { useTheme } from '../../context/ThemeContext';
import Navbar from './Navbar';
import Sidebar from './Sidebar';
import { useLocation } from 'react-router-dom';

const Layout = ({ children }) => {
  const { isDarkMode } = useTheme();
  const location = useLocation();

  return (
    <div className={`min-h-screen ${isDarkMode ? 'bg-gray-900' : 'bg-gray-50'}`}>
      <Navbar />
      <Sidebar />
      <main className="pt-16 pl-64 transition-all duration-300 ease-in-out">
        <div 
          key={location.pathname}
          className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 animate-fadeIn"
        >
          {children}
        </div>
      </main>
    </div>
  );
};

export default Layout;