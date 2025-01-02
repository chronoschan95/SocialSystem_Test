import React from 'react';
import { useTheme } from '../../context/ThemeContext';

const Button = ({ 
  children, 
  variant = 'primary', 
  size = 'md',
  className = '',
  ...props 
}) => {
  const { isDarkMode } = useTheme();

  const baseStyles = 'inline-flex items-center justify-center font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2';
  
  const variants = {
    primary: `${isDarkMode 
      ? 'bg-gradient-to-r from-pink-800 to-pink-900 hover:from-pink-700 hover:to-pink-800 text-white focus:ring-pink-700' 
      : 'bg-gradient-to-r from-pink-500 to-pink-600 hover:from-pink-600 hover:to-pink-700 text-white focus:ring-pink-500'}`,
    secondary: `${isDarkMode
      ? 'bg-gray-800 hover:bg-gray-700 text-gray-200 focus:ring-gray-700'
      : 'bg-gray-100 hover:bg-gray-200 text-gray-800 focus:ring-gray-300'}`,
    outline: `border-2 ${isDarkMode
      ? 'border-gray-700 hover:bg-gray-800 text-gray-300 focus:ring-gray-700'
      : 'border-gray-300 hover:bg-gray-100 text-gray-700 focus:ring-gray-300'}`
  };

  const sizes = {
    sm: 'px-3 py-1.5 text-sm rounded-xl',
    md: 'px-4 py-2 text-base rounded-2xl',
    lg: 'px-6 py-3 text-lg rounded-3xl'
  };

  return (
    <button
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
