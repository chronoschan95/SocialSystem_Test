import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Sun, Moon, LogOut } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';
import { useAuth } from '../../context/AuthContext';
import AlertDialog from '../../components/AlertDialog';

const Navbar = () => {
  const navigate = useNavigate();
  const { isDarkMode, toggleDarkMode } = useTheme();
  const { logout } = useAuth();
  const [showLogoutAlert, setShowLogoutAlert] = useState(false);

  const handleLogout = () => {
    setShowLogoutAlert(true);
  };

  const confirmLogout = () => {
    logout();
    navigate('/auth', { 
      state: { message: '已安全退出登录' },
      replace: true 
    });
  };

  return (
    <>
      <nav className={`fixed top-0 left-0 right-0 z-50 ${
        isDarkMode ? 'bg-gray-800' : 'bg-white'
      } border-b ${
        isDarkMode ? 'border-gray-700' : 'border-gray-200'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <h1 className={`text-xl font-bold ${
                isDarkMode ? 'text-white' : 'text-gray-900'
              }`}>
                校园信息系统
              </h1>
            </div>
            <div className="flex items-center space-x-4">
              <button
                onClick={toggleDarkMode}
                className={`p-2 rounded-lg ${
                  isDarkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'
                }`}
              >
                {isDarkMode ? <Sun className="w-5 h-5 text-gray-200" /> : <Moon className="w-5 h-5" />}
              </button>
              <button
                onClick={handleLogout}
                className={`flex items-center space-x-2 px-3 py-2 rounded-lg ${
                  isDarkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'
                }`}
              >
                <LogOut className="w-5 h-5" />
                <span>退出</span>
              </button>
            </div>
          </div>
        </div>
      </nav>

      <AlertDialog
        isOpen={showLogoutAlert}
        onClose={() => setShowLogoutAlert(false)}
        title="退出确认"
        message="确定要退出登录吗？"
        confirmText="确定"
        cancelText="取消"
        type="warning"
        onConfirm={confirmLogout}
      />
    </>
  );
};

export default Navbar;
