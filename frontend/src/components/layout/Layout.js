import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Layout as LayoutIcon, Moon, Sun } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useTheme } from '../../context/ThemeContext';

const Layout = ({ children }) => {
    const navigate = useNavigate();
    const location = useLocation();
    const { logout } = useAuth();
    const { isDarkMode, toggleDarkMode } = useTheme();

    const navigationItems = [
        { path: '/personal-log', label: '个人日志' },
        { path: '/news', label: '校园新闻' },
        { path: '/topics', label: '话题讨论' },
        { path: '/updates', label: '动态更新' },
    ];

    return (
        <div className={`min-h-screen ${isDarkMode ? 'bg-gray-900 text-white' : 'bg-pink-50 text-gray-800'}`}>
            {/* Navigation */}
            <nav className={`${isDarkMode ? 'bg-gray-800' : 'bg-white'} shadow-sm p-4`}>
                <div className="max-w-7xl mx-auto flex justify-between items-center">
                    <div className="flex items-center space-x-4">
                        <LayoutIcon className="w-6 h-6 text-pink-500" />
                        <span className={`text-xl font-semibold ${isDarkMode ? 'text-pink-400' : 'text-pink-600'}`}>
              校园社交
            </span>
                    </div>
                    <div className="flex items-center gap-4">
                        <button
                            onClick={toggleDarkMode}
                            className={`p-2 rounded-full ${
                                isDarkMode ? 'bg-gray-700 text-gray-300' : 'bg-gray-100 text-gray-600'
                            } hover:opacity-80 transition-opacity`}
                        >
                            {isDarkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
                        </button>
                        <button
                            onClick={logout}
                            className={`px-4 py-2 ${
                                isDarkMode ? 'text-pink-400 hover:text-pink-300' : 'text-pink-600 hover:text-pink-700'
                            }`}
                        >
                            退出
                        </button>
                    </div>
                </div>
            </nav>

            {/* Sidebar and Content */}
            <div className="flex">
                {/* Sidebar */}
                <div className={`w-64 ${isDarkMode ? 'bg-gray-800' : 'bg-white'} h-screen shadow-sm p-4`}>
                    <div className="space-y-2">
                        {navigationItems.map(item => (
                            <button
                                key={item.path}
                                onClick={() => navigate(item.path)}
                                className={`w-full text-left px-4 py-2 rounded-lg transition-colors ${
                                    location.pathname === item.path
                                        ? isDarkMode
                                            ? 'bg-pink-900/50 text-pink-400'
                                            : 'bg-pink-50 text-pink-600'
                                        : isDarkMode
                                            ? 'text-gray-300 hover:bg-gray-700'
                                            : 'text-gray-600 hover:bg-gray-50'
                                }`}
                            >
                                {item.label}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Main Content */}
                <div className="flex-1 p-6">{children}</div>
            </div>
        </div>
    );
};

export default Layout;