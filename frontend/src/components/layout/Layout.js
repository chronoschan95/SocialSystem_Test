import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useTheme } from '../../context/ThemeContext';
import { Sun, Moon, LogOut } from 'lucide-react';
import TimeDisplay from '../TimeDisplay';

const Layout = ({ children }) => {
  const navigate = useNavigate();
  const { logout } = useAuth();
  const { isDarkMode, toggleDarkMode } = useTheme();

  const handleLogout = () => {
    if (window.confirm('确定要退出登录吗？')) {
      logout();
      navigate('/auth');
    }
  };

  return (
    <div className={`min-h-screen transition-all duration-200 ${isDarkMode ? 'dark bg-gray-900' : 'bg-gray-50'}`}>
      {/* 左侧边栏 */}
      <div className={`fixed left-0 top-0 h-screen w-64 transition-colors duration-200 
        ${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} 
        border-r flex flex-col items-center`}
      >
        {/* Logo或标题 */}
        <div className="mt-6 mb-8">
          <h1 className={`text-xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>
            校园社交平台
          </h1>
        </div>

        {/* 时钟日历组件 */}
        <div className="w-full px-4">
          <TimeDisplay isDarkMode={isDarkMode} />
        </div>

        {/* 导航菜单 */}
        <nav className="mt-8 w-full px-4">
          {/* 这里可以添加导航链接 */}
        </nav>
      </div>

      {/* 主内容区域 */}
      <div className="ml-64 min-h-screen">
        {/* 顶部导航栏 */}
        <div className={`fixed top-0 right-0 left-64 z-10 transition-colors duration-200 
          ${isDarkMode ? 'bg-gray-800' : 'bg-white'} shadow-sm h-16 px-6 flex items-center justify-end`}
        >
          <div className="flex items-center gap-4">
            <button
              onClick={toggleDarkMode}
              className={`p-2 rounded-full transition-all duration-200 ${
                isDarkMode 
                  ? 'bg-gray-700 text-yellow-400 hover:bg-gray-600' 
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              {isDarkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 px-4 py-2 text-red-500 hover:text-red-600 transition-colors"
            >
              <LogOut className="w-5 h-5" />
              退出登录
            </button>
          </div>
        </div>

        {/* 页面内容 */}
        <div className="pt-16 p-6">
          {children}
        </div>
      </div>
    </div>
  );
};

export default Layout;