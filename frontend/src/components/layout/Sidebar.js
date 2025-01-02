import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Home, User, Settings, Calendar } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';
import { useAuth } from '../../context/AuthContext';

const Sidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { isDarkMode } = useTheme();
  const { isAdmin } = useAuth();

  const menuItems = [
    { icon: Home, label: '首页', path: '/' },
    { icon: Calendar, label: '个人日志', path: '/personal-log' },
    ...(isAdmin ? [{ icon: Settings, label: '管理面板', path: '/admin' }] : []),
  ];

  return (
    <div className={`fixed left-0 top-16 h-full w-64 ${
      isDarkMode ? 'bg-gray-800' : 'bg-white'
    } border-r ${
      isDarkMode ? 'border-gray-700' : 'border-gray-200'
    }`}>
      <div className="flex flex-col py-4">
        {menuItems.map((item) => (
          <button
            key={item.path}
            onClick={() => navigate(item.path)}
            className={`flex items-center space-x-2 px-4 py-3 ${
              location.pathname === item.path
                ? isDarkMode
                  ? 'bg-gray-700 text-white'
                  : 'bg-gray-100 text-gray-900'
                : isDarkMode
                ? 'text-gray-300 hover:bg-gray-700'
                : 'text-gray-600 hover:bg-gray-50'
            }`}
          >
            <item.icon className="w-5 h-5" />
            <span>{item.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default Sidebar;
