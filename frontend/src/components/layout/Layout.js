import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useTheme } from '../../context/ThemeContext';
import { LayoutGrid, Moon, Sun, LogOut } from 'lucide-react';

const AppLayout = ({ children }) => {
    const navigate = useNavigate();
    const location = useLocation();
    const { logout } = useAuth();
    const { isDarkMode, toggleDarkMode } = useTheme();

    const navigation = [
        { name: '校园新闻', href: '/news' },
        { name: '话题讨论', href: '/topics' },
        { name: '动态更新', href: '/updates' },
        { name: '个人日志', href: '/personal-log' }
    ];

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
            <nav className="border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between h-16">
                        <div className="flex items-center">
                            <LayoutGrid className="w-6 h-6 text-pink-500" />
                            <span className="ml-2 text-xl font-semibold text-pink-600 dark:text-pink-400">
                                校园社交
                            </span>
                        </div>
                        <div className="flex items-center space-x-4">
                            <button
                                onClick={toggleDarkMode}
                                className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700"
                                aria-label="Toggle theme"
                            >
                                {isDarkMode ? (
                                    <Sun className="w-5 h-5 text-gray-300" />
                                ) : (
                                    <Moon className="w-5 h-5 text-gray-600" />
                                )}
                            </button>
                            <button
                                onClick={logout}
                                className="flex items-center text-gray-600 dark:text-gray-300 hover:text-pink-600 dark:hover:text-pink-400"
                            >
                                <LogOut className="w-5 h-5" />
                            </button>
                        </div>
                    </div>
                </div>
            </nav>

            <div className="flex h-[calc(100vh-4rem)]">
                <aside className="w-64 border-r border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900">
                    <nav className="p-4 space-y-2">
                        {navigation.map((item) => (
                            <button
                                key={item.href}
                                onClick={() => navigate(item.href)}
                                className={`w-full text-left px-4 py-2 rounded-lg transition-colors ${
                                    location.pathname === item.href
                                        ? 'bg-pink-50 dark:bg-gray-800 text-pink-600 dark:text-pink-400'
                                        : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
                                }`}
                            >
                                {item.name}
                            </button>
                        ))}
                    </nav>
                </aside>

                <main className="flex-1 p-6 overflow-auto bg-gray-50 dark:bg-gray-900">
                    <div className="space-y-4">
                        {children}
                    </div>
                </main>
            </div>
        </div>
    );
};

export default AppLayout;